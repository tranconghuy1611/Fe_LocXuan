import React, { useState } from 'react';
import { X, Share2 } from 'lucide-react';
import  house from "../../../assets/house.jpg"
const TetVirtualHouse = () => {
  const [coins, setCoins] = useState(1220);
  const [selectedItem, setSelectedItem] = useState(null);
  const [placedItems, setPlacedItems] = useState([]);

  // Danh sách vật phẩm có thể mua với hình ảnh
  const shopItems = [
    { 
      id: 1, 
      name: 'Cây đào', 
      price: 20, 
      quantity: 20, 
      image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=200&h=200&fit=crop'
    },
    { 
      id: 2, 
      name: 'Cây mai', 
      price: 20, 
      quantity: 20, 
      image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=200&h=200&fit=crop'
    },
    { 
      id: 3, 
      name: 'Hộp quà', 
      price: 20, 
      quantity: 20, 
      image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=200&h=200&fit=crop'
    },
    { 
      id: 4, 
      name: 'Trống', 
      price: 20, 
      quantity: 20, 
      image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=200&h=200&fit=crop'
    },
    { 
      id: 5, 
      name: 'Bình hoa', 
      price: 30, 
      quantity: 30, 
      image: 'https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=200&h=200&fit=crop'
    },
    { 
      id: 6, 
      name: 'Pháo', 
      price: 50, 
      quantity: 50, 
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=200&h=200&fit=crop'
    },
  ];

  const handleBuyItem = (item) => {
    if (coins >= item.price) {
      setCoins(coins - item.price);
      setPlacedItems([...placedItems, {
        ...item,
        placedId: Date.now(),
        x: Math.random() * 60 + 20,
        y: Math.random() * 40 + 30
      }]);
    }
  };

  const handleRemoveItem = (placedId) => {
    const item = placedItems.find(i => i.placedId === placedId);
    setPlacedItems(placedItems.filter(i => i.placedId !== placedId));
    setCoins(coins + Math.floor(item.price * 0.5));
  };

  const handleDragStart = (e, placedId) => {
    e.dataTransfer.setData('placedId', placedId);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const placedId = parseInt(e.dataTransfer.getData('placedId'));
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setPlacedItems(placedItems.map(item =>
      item.placedId === placedId ? { ...item, x: Math.max(0, Math.min(95, x)), y: Math.max(0, Math.min(85, y)) } : item
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
          <h1 className="text-3xl font-bold text-red-600 flex items-center gap-2">
            🏮 Nhà Tết Ảo Của Bạn
          </h1>
          <div className="flex items-center gap-4">
            <div className="bg-yellow-400 text-red-700 font-bold px-5 py-2 rounded-full shadow-md flex items-center gap-2">
              <span className="text-xl">🪙</span>
              <span className="text-lg">{coins} coin</span>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold shadow-md transition-all flex items-center gap-2">
              <Share2 size={18} />
              Chia sẻ Nhà
            </button>
          </div>
        </div>

        {/* Main House Display */}
        <div 
          className="relative rounded-3xl shadow-2xl overflow-hidden mb-6"
          style={{ 
            minHeight: '600px',
            backgroundImage: `url(${house})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {/* Subtle overlay to brighten */}
          <div className="absolute inset-0 bg-gradient-to-b from-orange-100/30 via-transparent to-amber-100/40"></div>
          
          {/* Traditional Vietnamese House Image */}
          <div className="absolute inset-0 flex items-end justify-center pb-8 z-10">
            <div className="relative w-full max-w-3xl px-8">
            </div>
          </div>

          {/* Placed Items */}
          {placedItems.map((item) => (
            <div
              key={item.placedId}
              draggable
              onDragStart={(e) => handleDragStart(e, item.placedId)}
              className="absolute cursor-move group z-30"
              style={{ 
                left: `${item.x}%`, 
                top: `${item.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="relative transition-transform hover:scale-110">
                <div className="w-24 h-24 rounded-lg overflow-hidden shadow-2xl border-4 border-white bg-white/90">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => handleRemoveItem(item.placedId)}
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-700"
                >
                  <X size={18} />
                </button>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.name}
                </div>
              </div>
            </div>
          ))}

          {/* Floating decorative elements */}
          <div className="absolute bottom-20 left-20 text-5xl opacity-40 animate-pulse z-5">🌸</div>
          <div className="absolute bottom-24 right-20 text-5xl opacity-40 animate-pulse z-5" style={{ animationDelay: '1s' }}>🌼</div>
        </div>

        {/* Shop */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6">
          <h2 className="text-2xl font-bold text-red-700 mb-4 flex items-center gap-2">
            🏪 Kho đồ của bạn
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {shopItems.map((item) => (
              <div
                key={item.id}
                className="bg-gradient-to-b from-amber-50 to-amber-100 rounded-xl p-4 border-4 border-amber-300 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="w-full aspect-square mb-3 rounded-lg overflow-hidden border-2 border-amber-400 shadow-md">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center text-sm font-semibold text-gray-700 mb-2">
                  {item.name}
                </div>
                <div className="flex items-center justify-center gap-1 text-yellow-600 font-bold mb-3">
                  <span className="text-lg">🪙</span>
                  <span>{item.price}</span>
                </div>
                <button
                  onClick={() => handleBuyItem(item)}
                  disabled={coins < item.price}
                  className={`w-full py-2 rounded-lg font-bold text-sm transition-all ${
                    coins >= item.price
                      ? 'bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {coins >= item.price ? 'Mua' : 'Không đủ coin'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 text-sm text-gray-700">
          <p className="font-semibold mb-2">💡 Hướng dẫn:</p>
          <ul className="space-y-1 ml-4">
            <li>• Mua vật phẩm từ kho đồ bên dưới bằng coin</li>
            <li>• Kéo thả vật phẩm để trang trí nhà Tết của bạn</li>
            <li>• Rê chuột vào vật phẩm để xem tên và nhấn ❌ để xóa (hoàn lại 50% coin)</li>
            <li>• Nhấn "Chia sẻ Nhà" để khoe với bạn bè!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TetVirtualHouse;