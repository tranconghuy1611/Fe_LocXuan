import { useState } from "react";
import { Sparkles, Search, ShoppingBag, Star } from "lucide-react";

const ITEMS = [
  {
    id: 1,
    name: "Hoa mai",
    price: 100,
    image: "https://cdn-icons-png.flaticon.com/512/415/415733.png",
    category: "Hoa",
    rating: 4.8,
    sold: 1200,
    rare: false,
  },
  {
    id: 2,
    name: "Đèn lồng",
    price: 80,
    image: "https://cdn-icons-png.flaticon.com/512/2997/2997974.png",
    category: "Trang trí",
    rating: 4.6,
    sold: 980,
    rare: false,
  },
  {
    id: 3,
    name: "Câu đối Tết",
    price: 60,
    image: "https://cdn-icons-png.flaticon.com/512/3194/3194873.png",
    category: "Trang trí",
    rating: 4.7,
    sold: 1500,
    rare: false,
  },
  {
    id: 4,
    name: "Pháo hoa",
    price: 120,
    image: "https://cdn-icons-png.flaticon.com/512/3468/3468377.png",
    category: "Hiệu ứng",
    rating: 4.9,
    sold: 600,
    rare: true,
  },
  {
    id: 5,
    name: "Linh vật năm mới",
    price: 200,
    image: "https://cdn-icons-png.flaticon.com/512/616/616554.png",
    category: "Linh vật",
    rating: 5.0,
    sold: 300,
    rare: true,
  },
];

export default function ChoTetShop() {
  const [points, setPoints] = useState(300);
  const [ownedItems, setOwnedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tất cả");

  const handleBuy = (item) => {
    if (points < item.price) return alert("Không đủ điểm 😢");
    setPoints(points - item.price);
    setOwnedItems([...ownedItems, item.id]);
    setSelectedItem(null);
  };

  const filteredItems = ITEMS.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "Tất cả" || item.category === category;
    return matchSearch && matchCategory;
  });

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="col-span-12 md:col-span-3 bg-white rounded-xl shadow p-5 h-fit">
          <h3 className="font-bold mb-4">Danh mục</h3>
          {["Tất cả", "Hoa", "Trang trí", "Linh vật", "Hiệu ứng"].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`block w-full text-left px-4 py-2 rounded-lg mb-2 transition ${
                category === c
                  ? "bg-red-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {c}
            </button>
          ))}
        </aside>

        {/* Products */}
        <main className="col-span-12 md:col-span-9 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => {
            const owned = ownedItems.includes(item.id);
            return (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden group"
              >
                <div className="relative bg-gray-50 p-6 flex justify-center">
                  {item.rare && (
                    <span className="absolute top-3 left-3 bg-yellow-400 text-white text-xs px-2 py-1 rounded">
                      HIẾM
                    </span>
                  )}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-contain group-hover:scale-110 transition"
                  />
                </div>

                <div className="p-4">
                  <h4 className="font-semibold mb-1 line-clamp-1">
                    {item.name}
                  </h4>

                  <div className="flex items-center text-sm text-yellow-500 mb-1">
                    <Star size={14} fill="currentColor" />
                    <span className="ml-1">{item.rating}</span>
                    <span className="ml-2 text-gray-400">| Đã bán {item.sold}</span>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-red-600 font-bold">
                      {item.price} điểm
                    </span>

                    {owned ? (
                      <span className="text-green-600 text-sm font-semibold">
                        Đã mua
                      </span>
                    ) : (
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="text-sm px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Mua
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </main>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-96 shadow-xl">
            <img
              src={selectedItem.image}
              className="w-28 h-28 mx-auto mb-4"
            />
            <h2 className="text-xl font-bold mb-1">{selectedItem.name}</h2>
            <p className="text-gray-500 mb-4">
              Giá: <b>{selectedItem.price} điểm</b>
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedItem(null)}
                className="flex-1 border rounded-lg py-2"
              >
                Hủy
              </button>
              <button
                onClick={() => handleBuy(selectedItem)}
                className="flex-1 bg-red-500 text-white rounded-lg py-2"
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
