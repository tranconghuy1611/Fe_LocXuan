import { useEffect, useState, useRef } from "react";


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
    imageFile: null,
    imagePreview: null,
  });
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        imageFile: null,
        imagePreview: initialData.imageUrl || null,
      });
    } else {
      resetForm();
    }
  }, [initialData, open]);

  const resetForm = () => {
    setForm({
      name: "",
      rewardType: "points",
      value: 0,
      message: "",
      imageFile: null,
      imagePreview: null,
    });
  };

  if (!open) return null;

  const rewardTypes = [
    { value: "points", label: "Điểm thưởng" },
    { value: "sticker", label: "Sticker" },
    { value: "avatar", label: "Avatar khung" },
    { value: "message", label: "Lời chúc" },
  ];

  const handleFileChange = (file) => {
    if (!file) return;

    setForm({
      ...form,
      imageFile: file,
      imagePreview: URL.createObjectURL(file),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 text-white">
          <h2 className="text-2xl font-bold">
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
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Loại phần thưởng */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Loại phần thưởng
            </label>
            <select
              value={form.rewardType}
              onChange={(e) =>
                setForm({ ...form, rewardType: e.target.value })
              }
              className="w-full px-4 py-3 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
            >
              {rewardTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Điểm */}
          {form.rewardType === "points" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Số điểm
              </label>
              <input
                type="number"
                min="1"
                value={form.value}
                onChange={(e) =>
                  setForm({ ...form, value: Number(e.target.value) || 0 })
                }
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Upload ảnh */}
          {/* Upload ảnh */}
          {(form.rewardType === "sticker" ||
            form.rewardType === "avatar") && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ảnh phần thưởng
                </label>

                {/* Input file ẩn */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e.target.files?.[0])}
                  className="hidden"
                />

                {/* Nút upload */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg
                 hover:bg-blue-200 transition"
                >
                  📤 Chọn ảnh từ máy
                </button>

                {/* Preview ảnh */}
                {form.imagePreview && (
                  <div className="mt-4">
                    <img
                      src={form.imagePreview}
                      alt="preview"
                      className="w-32 h-32 object-cover rounded-xl border"
                    />
                  </div>
                )}
              </div>
            )}


          {/* Thông điệp */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Thông điệp khi nhận thưởng
            </label>
            <textarea
              rows={3}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 bg-gray-50 flex justify-end gap-4 border-t">
          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="px-6 py-2.5 border rounded-lg hover:bg-gray-100"
          >
            Hủy
          </button>

          <button
            onClick={() => onSubmit(form)}
            disabled={!form.name.trim()}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg
                       hover:bg-blue-700 disabled:opacity-50"
          >
            {initialData ? "Cập nhật" : "Thêm mới"}
          </button>
        </div>
      </div>
    </div>
  );
}
