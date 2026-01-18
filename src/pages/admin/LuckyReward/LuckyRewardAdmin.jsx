import { useEffect, useState } from "react";
import {
  Gift,
  Plus,
  Pencil,
  Ban,
  Loader2,
} from "lucide-react";

import { getAdminLuckyRewards,createLuckyReward,deleteLuckyReward,updateLuckyReward } from "../../../services/luckyDraw.service";

import LuckyRewardModal from "./LuckyRewardModal";
import ConfirmDisable from "./ConfirmDisable";
import { typeColor } from "./rewardStyles";

export default function LuckyRewardAdmin() {
  const [rewards, setRewards] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmId, setConfirmId] = useState(null);

  useEffect(() => {
    fetchRewards();
  }, [page]);

  const fetchRewards = async () => {
    setLoading(true);
    try {
      const res = await getAdminLuckyRewards(page, 10);
      setRewards(res.data.content);
      setTotalPages(res.data.totalPages);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data) => {
    if (editing) {
      await updateLuckyReward(editing.id, data);
    } else {
      await createLuckyReward(data);
    }
    setOpenModal(false);
    fetchRewards();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
            <Gift className="text-orange-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              Quản lý Lucky Reward
            </h1>
            <p className="text-sm text-gray-500">
              Danh sách phần thưởng vòng quay may mắn
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setEditing(null);
            setOpenModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow"
        >
          <Plus size={18} />
          Thêm lộc
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border">
        {loading ? (
          <div className="flex items-center justify-center py-12 text-gray-500">
            <Loader2 className="animate-spin mr-2" />
            Đang tải dữ liệu...
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr className="text-gray-600">
                <th className="p-3 text-left">Tên</th>
                <th className="p-3 text-left">Loại</th>
                <th className="p-3 text-left">Giá trị</th>
                <th className="p-3 text-left">Thông điệp</th>
                <th className="p-3 text-center">Trạng thái</th>
                <th className="p-3 text-center">Hành động</th>
              </tr>
            </thead>

            <tbody>
              {rewards.map((item) => (
                <tr
                  key={item.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-medium text-gray-800">
                    {item.name}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-medium ${typeColor[item.rewardType]}`}
                    >
                      {item.rewardType.toUpperCase()}
                    </span>
                  </td>

                  <td className="p-3">
                    {item.rewardType === "points"
                      ? `${item.value} điểm`
                      : "—"}
                  </td>

                  <td className="p-3 text-gray-600 max-w-xs truncate">
                    {item.message}
                  </td>

                  <td className="p-3 text-center">
                    {item.active ? (
                      <span className="inline-flex items-center gap-1 text-green-600">
                        ● Hoạt động
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-500">
                        ● Đã tắt
                      </span>
                    )}
                  </td>

                  <td className="p-3 text-center space-x-3">
                    <button
                      onClick={() => {
                        setEditing(item);
                        setOpenModal(true);
                      }}
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={16} />
                      Sửa
                    </button>

                    {item.active && (
                      <button
                        onClick={() => setConfirmId(item.id)}
                        className="inline-flex items-center gap-1 text-red-600 hover:text-red-800"
                      >
                        <Ban size={16} />
                        Disable
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {rewards.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-8 text-gray-500"
                  >
                    Không có Lucky Reward nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-500">
          Trang {page + 1} / {totalPages}
        </span>

        <div className="flex gap-2">
          <button
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border rounded-lg text-sm disabled:opacity-40 hover:bg-gray-50"
          >
            ← Trước
          </button>

          <button
            disabled={page + 1 >= totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border rounded-lg text-sm disabled:opacity-40 hover:bg-gray-50"
          >
            Sau →
          </button>
        </div>
      </div>

      {/* Modals */}
      <LuckyRewardModal
        open={openModal}
        initialData={editing}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSave}
      />

      <ConfirmDisable
        open={!!confirmId}
        onClose={() => setConfirmId(null)}
        onConfirm={async () => {
          await deleteLuckyReward(confirmId);
          setConfirmId(null);
          fetchRewards();
        }}
      />
    </div>
  );
}
