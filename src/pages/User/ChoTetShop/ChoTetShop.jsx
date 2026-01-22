import { useEffect, useState } from "react";
import { Search, ShoppingBag, Sparkles } from "lucide-react";
import { getShopItems } from "@/services/shop.service";

const CATEGORY_MAP = {
  ALL: "Tất cả",
  FLOWER: "Hoa",
  LANTERN: "Trang trí",
  AVATAR: "Avatar",
  STICKER: "Sticker",
  FRAME: "Khung",
};

export default function ChoTetShop() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    setLoading(true);
    getShopItems({ page: 0, size: 20 })
      .then((res) => setItems(res.data.data.content))
      .finally(() => setLoading(false));
  }, []);

  const filteredItems = items.filter((item) => {
    const matchSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchCategory =
      category === "ALL" || item.category === category;
    return matchSearch && matchCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-red-600 flex items-center gap-2">
          <Sparkles /> Chợ Tết
        </h1>

        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm vật phẩm..."
            className="pl-10 pr-4 py-2 rounded-xl border focus:ring-2 focus:ring-red-400"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="col-span-12 md:col-span-3 bg-white rounded-2xl shadow p-5 h-fit">
          <h3 className="font-bold mb-4">Danh mục</h3>

          {Object.entries(CATEGORY_MAP).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setCategory(key)}
              className={`block w-full text-left px-4 py-2 rounded-lg mb-2 transition ${
                category === key
                  ? "bg-red-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {label}
            </button>
          ))}
        </aside>

        {/* Products */}
        <main className="col-span-12 md:col-span-9 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading &&
            Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-64 bg-white rounded-xl animate-pulse"
              />
            ))}

          {!loading &&
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden group"
              >
                <div className="relative bg-gray-50 p-6 flex justify-center">
                  <span className="absolute top-3 left-3 text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                    {CATEGORY_MAP[item.category]}
                  </span>

                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-24 h-24 object-contain group-hover:scale-110 transition"
                  />
                </div>

                <div className="p-4">
                  <h4 className="font-semibold mb-1 line-clamp-1">
                    {item.name}
                  </h4>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-red-600 font-bold">
                      {item.price.toLocaleString()} đ
                    </span>

                    <button
                      onClick={() => setSelectedItem(item)}
                      className="flex items-center gap-1 text-sm px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      <ShoppingBag size={14} /> Mua
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </main>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-96 shadow-xl animate-scale-in">
            <img
              src={selectedItem.imageUrl}
              className="w-28 h-28 mx-auto mb-4"
            />
            <h2 className="text-xl font-bold mb-1">
              {selectedItem.name}
            </h2>
            <p className="text-gray-500 mb-4">
              Giá:{" "}
              <b className="text-red-600">
                {selectedItem.price.toLocaleString()} đ
              </b>
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedItem(null)}
                className="flex-1 border rounded-lg py-2"
              >
                Hủy
              </button>
              <button className="flex-1 bg-red-500 text-white rounded-lg py-2">
                Mua ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
