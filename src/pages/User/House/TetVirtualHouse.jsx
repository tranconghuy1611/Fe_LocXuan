import React, { useEffect, useState } from "react";
import { X, Share2, Plus } from "lucide-react";
import house from "../../../assets/house.jpg";

import {
  getMyHouse,
  placeItemToHouse,
  updateDecorationPosition,
  removeDecoration,
} from "../../../services/house.service";

import { getInventory } from "../../../services/inventory.service";

const TetVirtualHouse = () => {
  const [inventory, setInventory] = useState([]);
  const [placedItems, setPlacedItems] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [invRes, houseRes] = await Promise.all([
          getInventory(),
          getMyHouse(),
        ]);

        setInventory(invRes.data.data || []);
        setPlacedItems(houseRes.data.data || []);
      } catch (err) {
        console.error("Load data error:", err);
      }
    };

    loadData();
  }, []);

  // 🔹 Place item
  const handlePlaceItem = async (item) => {
    if (item.quantity <= 0) return;

    try {
      const posX = Math.floor(Math.random() * 70 + 15);
      const posY = Math.floor(Math.random() * 70 + 10);

      await placeItemToHouse({
        itemId: item.itemId,
        posX,
        posY,
      });

      const [houseRes, invRes] = await Promise.all([
        getMyHouse(),
        getInventory(),
      ]);

      setPlacedItems(houseRes.data.data || []);
      setInventory(invRes.data.data || []);
    } catch (err) {
      console.error("Place item failed:", err);
    }
  };

  const handleDragStart = (e, decorationId) => {
    e.dataTransfer.setData("decorationId", decorationId);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const decorationId = Number(e.dataTransfer.getData("decorationId"));
    if (!decorationId) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const posX = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const posY = Math.round(((e.clientY - rect.top) / rect.height) * 100);

    const newPosX = Math.max(5, Math.min(95, posX));
    const newPosY = Math.max(5, Math.min(90, posY));

    try {
      await updateDecorationPosition(decorationId, {
        posX: newPosX,
        posY: newPosY,
      });

      setPlacedItems((prev) =>
        prev.map((i) =>
          i.decorationId === decorationId
            ? { ...i, posX: newPosX, posY: newPosY }
            : i
        )
      );
    } catch (err) {
      console.error("Update position failed:", err);
    }
  };

  const handleRemoveItem = async (decorationId) => {
    try {
      await removeDecoration(decorationId);

      const [houseRes, invRes] = await Promise.all([
        getMyHouse(),
        getInventory(),
      ]);

      setPlacedItems(houseRes.data.data || []);
      setInventory(invRes.data.data || []);
    } catch (err) {
      console.error("Remove failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 p-4">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6 bg-white/80 rounded-2xl p-4 shadow-lg">
          <h1 className="text-3xl font-bold text-red-600">🏮 Nhà Tết Ảo</h1>
          <button className="bg-red-600 text-white px-5 py-2 rounded-full flex gap-2">
            <Share2 size={18} /> Chia sẻ
          </button>
        </div>

        {/* HOUSE */}
        <div
          className="relative rounded-3xl shadow-2xl mb-6 overflow-visible"
          style={{
            minHeight: 600,
            backgroundImage: `url(${house})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {placedItems.map((item) => (
            <div
              key={item.decorationId}
              draggable
              onDragStart={(e) =>
                handleDragStart(e, item.decorationId)
              }
              className="absolute cursor-move z-30 group"
              style={{
                left: `${item.posX ?? 50}%`,
                top: `${item.posY ?? 50}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="relative">
                <div className="w-24 h-24 bg-white rounded-lg shadow-xl border-4 border-white">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <button
                  onClick={() => handleRemoveItem(item.decorationId)}
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-red-700 mb-4">
            🎒 Túi đồ
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {inventory.map((item) => (
              <div
                key={item.itemId}
                className="bg-amber-50 p-4 rounded-xl border"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-24 object-cover rounded"
                />
                <div className="text-center mt-2 font-semibold">
                  {item.name}
                </div>
                <div className="text-center text-sm">
                  SL: {item.quantity}
                </div>

                <button
                  onClick={() => handlePlaceItem(item)}
                  disabled={item.quantity <= 0}
                  className="w-full mt-2 bg-red-600 text-white py-1 rounded disabled:opacity-50 flex justify-center gap-1"
                >
                  <Plus size={14} /> Đặt vào nhà
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TetVirtualHouse;
