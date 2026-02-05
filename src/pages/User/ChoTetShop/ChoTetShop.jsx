import { useEffect, useState } from "react";
import { Search, ShoppingBag, Sparkles } from "lucide-react";
import { getShopItems, buyShopItem } from "../../../services/shop.service";

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

  const handleBuyItem = async () => {
    if (!selectedItem) return;
    try {
      await buyShopItem(selectedItem.id);
      alert("🎉 Mua thành công!");
      setSelectedItem(null);
    } catch (err) {
      alert(err.response?.data?.message || "Mua thất bại");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6
        flex flex-col gap-4
        md:flex-row md:justify-between md:items-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-red-600 flex items-center gap-2">
          <Sparkles /> Chợ Tết
        </h1>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm vật phẩm..."
            className="w-full pl-10 pr-4 py-2 text-sm
              rounded-xl border focus:ring-2 focus:ring-red-400"
          />
        </div>
      </div>

      {/* CATEGORY MOBILE */}
      <div className="md:hidden px-4 pb-4 overflow-x-auto">
        <div className="flex gap-2 w-max">
          {Object.entries(CATEGORY_MAP).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setCategory(key)}
              className={`px-4 py-2 text-sm rounded-full whitespace-nowrap
                ${category === key
                  ? "bg-red-500 text-white"
                  : "bg-white border"
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-12 gap-6">
        {/* SIDEBAR DESKTOP */}
        <aside className="hidden md:block col-span-3
    bg-white rounded-2xl shadow p-5
    h-fit
    sticky top-24">
          <h3 className="font-bold mb-4">Danh mục</h3>
          {Object.entries(CATEGORY_MAP).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setCategory(key)}
              className={`block w-full text-left px-4 py-2 rounded-lg mb-2 transition
                ${category === key
                  ? "bg-red-500 text-white"
                  : "hover:bg-gray-100"
                }`}
            >
              {label}
            </button>
          ))}
        </aside>

        {/* PRODUCTS */}
        <main
          className="
            col-span-12 md:col-span-9
            grid grid-cols-2
            sm:grid-cols-3
            lg:grid-cols-4
            gap-4 sm:gap-6
          "
        >
          {loading &&
            Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-56 sm:h-64 bg-white rounded-xl animate-pulse"
              />
            ))}

          {!loading &&
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden group"
              >
                <div className="relative bg-gray-50 p-4 sm:p-6 flex justify-center">
                  <span className="absolute top-3 left-3 text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                    {CATEGORY_MAP[item.category]}
                  </span>

                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-contain
                      group-hover:scale-110 transition"
                  />
                </div>

                <div className="p-3 sm:p-4">
                  <h4 className="text-sm sm:text-base font-semibold mb-1 line-clamp-1">
                    {item.name}
                  </h4>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-red-600 font-bold text-sm sm:text-base">
                      {item.price.toLocaleString()} đ
                    </span>

                    <button
                      onClick={() => setSelectedItem(item)}
                      className="flex items-center gap-1 text-xs sm:text-sm
                        px-2.5 sm:px-3 py-1.5
                        bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      <ShoppingBag size={14} /> Mua
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </main>
      </div>

      {/* MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-5 sm:p-6
            w-[90%] sm:w-96 shadow-xl animate-scale-in">
            <img
              src={selectedItem.imageUrl}
              className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-4"
            />
            <h2 className="text-lg sm:text-xl font-bold mb-1 text-center">
              {selectedItem.name}
            </h2>
            <p className="text-gray-500 mb-4 text-center">
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
              <button
                onClick={handleBuyItem}
                className="flex-1 bg-red-500 text-white rounded-lg py-2 hover:bg-red-600"
              >
                Mua ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
