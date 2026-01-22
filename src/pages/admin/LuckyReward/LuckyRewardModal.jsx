import { useEffect, useState } from "react";

export default function LuckyRewardModal({
  open,
  onClose,
  onSubmit,
  initialData = null,
}) {
  const [form, setForm] = useState({
    name: "",
    rewardType: "points",
    value: 0,
    message: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm({
        name: "",
        rewardType: "points",
        value: 0,
        message: "",
      });
    }
  }, [initialData, open]);

  if (!open) return null;

  const rewardTypes = [
    { value: "points", label: "Điểm thưởng" },
    { value: "sticker", label: "Sticker" },
    { value: "avatar", label: "Avatar khung" },
    { value: "message", label: "Lời chúc" },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 text-white">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            {initialData ? "✏️ Chỉnh sửa phần thưởng" : "➕ Thêm phần thưởng mới"}
          </h2>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Tên phần thưởng */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Tên phần thưởng
            </label>
            <input
              type="text"
              placeholder="Ví dụ: 500 Điểm May Mắn"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          {/* Loại phần thưởng */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Loại phần thưởng
            </label>
            <select
              value={form.rewardType}
              onChange={(e) => setForm({ ...form, rewardType: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
            >
              {rewardTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Giá trị (chỉ hiện khi là points) */}
          {form.rewardType === "points" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Số điểm
              </label>
              <input
                type="number"
                min="1"
                placeholder="100, 500, 1000..."
                value={form.value}
                onChange={(e) =>
                  setForm({ ...form, value: Number(e.target.value) || 0 })
                }
                className="w-full px-4 py-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          )}

          {/* Thông điệp */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Thông điệp khi nhận thưởng
            </label>
            <textarea
              rows={3}
              placeholder="Chúc mừng! Bạn vừa nhận được..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 bg-gray-50 flex justify-end gap-4 border-t">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Hủy
          </button>
          <button
            onClick={() => onSubmit(form)}
            disabled={!form.name.trim()}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {initialData ? "Cập nhật" : "Thêm mới"}
          </button>
        </div>
      </div>
    </div>
  );
}