import { useState } from "react";
import { getShopItems,createShopItem,updateShopItem } from "../../../services/shop.service";

export default function ShopItemModal({ editingItem, onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: editingItem?.name || "",
    price: editingItem?.price || 0,
    category: editingItem?.category || "AVATAR",
    imageUrl: editingItem?.imageUrl || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingItem) {
      await updateShopItem(editingItem.id, form);
    } else {
      await createShopItem(form);
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
          />

          <input
            type="number"
            placeholder="Giá"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: +e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />

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
