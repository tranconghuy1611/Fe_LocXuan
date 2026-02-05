import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import { Gift, Package, AlertCircle } from "lucide-react";

export default function InventoryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const res = await api.get("/shop/inventory");

      if (res.data?.success) {
        setItems(res.data.data || []);
      }
    } catch (err) {
      setError("Không thể tải túi mua sắm 😢");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF6F4] via-[#FFE8E8] to-[#FFF6F4] px-4 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full shadow-lg mb-4">
            <Gift />
            <span className="font-bold text-lg">Túi mua sắm Tết</span>
          </div>
          <h1 className="text-4xl font-extrabold text-red-600">
            Vật phẩm đã mua 🎁
          </h1>
          <p className="text-gray-600 mt-2">
            Nơi lưu giữ những vât phẩm Tết bạn đã mua
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center text-gray-500 py-20">
            Đang mở túi quà Tết...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 p-5 rounded-xl flex gap-3 text-red-700">
            <AlertCircle />
            {error}
          </div>
        )}

        {/* Empty */}
        {!loading && items.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <Package size={64} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg">Bạn chưa mua vật phẩm nào 🧧</p>
          </div>
        )}

        {/* Inventory Grid */}
        {items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.itemId}
                className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <div className="relative">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-44 object-contain rounded-xl"
                  />
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full shadow">
                    x{item.quantity}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-bold text-gray-800 text-center">
                  {item.name}
                </h3>

                <div className="mt-3 flex justify-center">
                  <span className="text-sm bg-red-100 text-red-700 px-4 py-1 rounded-full">
                    🧧 Vật phẩm Tết
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
