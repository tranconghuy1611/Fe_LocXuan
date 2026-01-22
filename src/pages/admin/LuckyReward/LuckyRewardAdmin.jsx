import { useEffect, useState } from "react";
import {
  Gift,
  Plus,
  Pencil,
  Ban,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { getAdminLuckyRewards, createLuckyReward, deleteLuckyReward, updateLuckyReward } from "../../../services/luckyDraw.service";

import LuckyRewardModal from "./LuckyRewardModal";
import ConfirmDisable from "./ConfirmDisable";
import { typeColor } from "./rewardStyles";
import Pagination from "../ShopAdminPage/Pagination";
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
    <div className="space-y-6">
      {/* Card chính */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center shadow-sm">
                <Gift className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
                  Quản lý Lucky Reward
                </h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  Quản lý các phần thưởng trong vòng quay may mắn
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setEditing(null);
                setOpenModal(true);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 
                       bg-gradient-to-r from-green-600 to-green-700 
                       hover:from-green-700 hover:to-green-800 
                       text-white font-medium rounded-lg shadow-md 
                       hover:shadow-lg transition-all duration-200 
                       active:scale-95"
            >
              <Plus size={18} />
              Thêm phần thưởng
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
              <Loader2 className="w-10 h-10 animate-spin text-orange-500 mb-4" />
              <span className="text-lg font-medium">Đang tải phần thưởng...</span>
            </div>
          ) : (
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-600 text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 text-left font-semibold">Tên</th>
                  <th className="px-6 py-4 text-left font-semibold">Loại</th>
                  <th className="px-6 py-4 text-left font-semibold">Giá trị</th>
                  <th className="px-6 py-4 text-left font-semibold">Thông điệp</th>
                  <th className="px-6 py-4 text-center font-semibold">Trạng thái</th>
                  <th className="px-6 py-4 text-center font-semibold">Thao tác</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {rewards.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-16 text-center">
                      <div className="text-gray-400 text-lg font-medium">
                        Chưa có phần thưởng nào
                      </div>
                      <p className="text-gray-500 mt-2 text-sm">
                        Nhấn "Thêm phần thưởng" để bắt đầu
                      </p>
                    </td>
                  </tr>
                ) : (
                  rewards.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-orange-50/40 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {item.name}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold
                                     ${typeColor[item.rewardType] || "bg-gray-100 text-gray-700"}`}
                        >
                          {item.rewardType.toUpperCase()}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-gray-700">
                        {item.rewardType === "points" ? (
                          <span className="font-medium text-orange-600">
                            {item.value.toLocaleString()} điểm
                          </span>
                        ) : (
                          "—"
                        )}
                      </td>

                      <td className="px-6 py-4 text-gray-600 max-w-md truncate">
                        {item.message || <span className="text-gray-400 italic">Không có</span>}
                      </td>

                      <td className="px-6 py-4 text-center">
                        {item.active ? (
                          <span className="inline-flex items-center gap-1.5 text-green-600 font-medium">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            Hoạt động
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-gray-500 font-medium">
                            <span className="w-2 h-2 rounded-full bg-gray-400" />
                            Đã tắt
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-4">
                          <button
                            onClick={() => {
                              setEditing(item);
                              setOpenModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-800 transition-colors p-1 rounded hover:bg-blue-50"
                            title="Chỉnh sửa"
                          >
                            <Pencil size={18} />
                          </button>

                          {item.active && (
                            <button
                              onClick={() => setConfirmId(item.id)}
                              className="text-red-600 hover:text-red-700 transition-colors p-1 rounded hover:bg-red-50"
                              title="Tắt phần thưởng"
                            >
                              <Ban size={18} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/40 flex justify-center">
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        )}


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