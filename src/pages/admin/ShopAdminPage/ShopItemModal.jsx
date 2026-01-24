import { useState, useRef } from "react";
import {
  createShopItem,
  updateShopItem,
} from "../../../services/shop.service";
import { uploadImage } from "../../../services/upload.service";

export default function ShopItemModal({ editingItem, onClose, onSuccess }) {
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: editingItem?.name || "",
    price: editingItem?.price || 0,
    category: editingItem?.category || "AVATAR",
    imageFile: null,
    imagePreview: editingItem?.imageUrl || null,
  });

  const handleFileChange = (file) => {
    if (!file) return;
    setForm({
      ...form,
      imageFile: file,
      imagePreview: URL.createObjectURL(file),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = editingItem?.imageUrl || null; // ✅ dùng URL server cũ

    // Nếu chọn ảnh mới → upload
    if (form.imageFile) {
      imageUrl = await uploadImage(form.imageFile); // ✅ URL thật
    }

    const payload = {
      name: form.name,
      price: form.price,
      category: form.category,
      imageUrl,
    };

    if (editingItem) {
      await updateShopItem(editingItem.id, payload);
    } else {
      await createShopItem(payload);
    }

    onSuccess();
    onClose();
  };


  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">
          {editingItem ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Tên sản phẩm"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

          <input
            type="number"
            placeholder="Giá"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: +e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
            min={0}
          />

          {/* Upload ảnh */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Ảnh sản phẩm
            </label>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileChange(e.target.files?.[0])}
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg
                         hover:bg-blue-200"
            >
              📤 Chọn ảnh từ máy
            </button>

            {form.imagePreview && (
              <img
                src={form.imagePreview}
                alt="preview"
                className="mt-3 w-32 h-32 object-cover rounded-xl border"
              />
            )}
          </div>

          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="AVATAR">Avatar</option>
            <option value="STICKER">Sticker</option>
            <option value="FRAME">Khung ảnh</option>
            <option value="LANTERN">Đèn lồng</option>
            <option value="FLOWER">Hoa</option>
          </select>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
