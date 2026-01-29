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
    price: editingItem?.price ?? 0,           // dùng ?? để xử lý undefined
    category: editingItem?.category || "AVATAR",
    imageFile: null,
    imagePreview: editingItem?.imageUrl || null,
    active: editingItem?.active ?? true,      // mặc định active = true khi tạo mới
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

    // Giữ URL cũ nếu không upload ảnh mới
    let imageUrl = editingItem?.imageUrl || null;

    if (form.imageFile) {
      try {
        imageUrl = await uploadImage(form.imageFile);
      } catch (err) {
        console.error("Upload ảnh thất bại:", err);
        alert("Không thể upload ảnh. Vui lòng thử lại.");
        return;
      }
    }

    const payload = {
      name: form.name.trim(),
      price: Number(form.price),           // ép về number → backend nhận Integer
      category: form.category,
      imageUrl,
      active: form.active,
    };

    // Validation cơ bản phía client
    if (!payload.name) {
      alert("Vui lòng nhập tên sản phẩm");
      return;
    }
    if (payload.price < 0) {
      alert("Giá không được âm");
      return;
    }

    try {
      if (editingItem) {
        await updateShopItem(editingItem.id, payload);
      } else {
        await createShopItem(payload);
      }
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Lưu sản phẩm thất bại:", err);
      alert("Có lỗi xảy ra khi lưu. Vui lòng thử lại.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">
          {editingItem ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tên */}
          <div>
            <label className="block text-sm font-medium mb-1">Tên sản phẩm</label>
            <input
              placeholder="Nhập tên sản phẩm"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Giá */}
          <div>
            <label className="block text-sm font-medium mb-1">Giá</label>
            <input
              type="number"
              placeholder="0"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              min={0}
            />
          </div>

          {/* Ảnh */}
          <div>
            <label className="block text-sm font-medium mb-1">Ảnh sản phẩm</label>
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
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
            >
              📤 Chọn ảnh
            </button>

            {form.imagePreview && (
              <div className="mt-3">
                <img
                  src={form.imagePreview}
                  alt="preview"
                  className="w-32 h-32 object-cover rounded-xl border shadow-sm"
                />
              </div>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">Danh mục</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="AVATAR">Avatar</option>
              <option value="STICKER">Sticker</option>
              <option value="FRAME">Khung ảnh</option>
              <option value="LANTERN">Đèn lồng</option>
              <option value="FLOWER">Hoa</option>
            </select>
          </div>

          {/* Active status */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="active"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="active" className="ml-2 text-sm font-medium text-gray-700">
              Sản phẩm đang hoạt động (hiển thị cho người dùng)
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              {editingItem ? "Cập nhật" : "Thêm mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}