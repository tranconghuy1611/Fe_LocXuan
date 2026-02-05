import React, { useEffect, useState } from "react";
import { X, Share2, Plus } from "lucide-react";

import houseDesktop from "../../../assets/house.png";
import houseMobile from "../../../assets/housemobile.png";

import {
  getMyHouse,
  placeItemToHouse,
  updateDecorationPosition,
  removeDecoration, getHouseByShareToken, getMyShareToken
} from "../../../services/house.service";

import { getInventory } from "../../../services/inventory.service";

const TetVirtualHouse = () => {
  const [inventory, setInventory] = useState([]);
  const [placedItems, setPlacedItems] = useState([]);
  const [touchingId, setTouchingId] = useState(null);
  const [shareLink, setShareLink] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);

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
  const handleShare = async () => {
    try {
      const res = await getMyShareToken();
      const token = res.data.data;

      const link = `${window.location.origin}/share/${token}`;

      setShareLink(link);
      setShowShareModal(true);
    } catch (err) {
      console.error("Share failed:", err);
      alert("❌ Không thể tạo link chia sẻ");
    }
  };


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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 p-3 md:p-4">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4 md:mb-6 bg-white/80 rounded-2xl p-3 md:p-4 shadow-lg">
          <h1 className="text-xl md:text-3xl font-bold text-red-600">
            🏮 Nhà Tết Ảo
          </h1>
          <button
            onClick={handleShare}
            className="bg-red-600 text-white px-3 md:px-5 py-2 rounded-full flex gap-2 text-sm md:text-base"
          >
            <Share2 size={18} /> Chia sẻ
          </button>

        </div>

        {/* HOUSE */}
        <div
          className="relative rounded-3xl shadow-2xl mb-6 overflow-visible w-full"
          style={{
            aspectRatio: "4 / 3",
            backgroundImage: `url(${houseDesktop})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {/* Mobile house overlay */}
          <div
            className="absolute inset-0 block md:hidden"
            style={{
              backgroundImage: `url(${houseMobile})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* ITEMS */}
          {placedItems.map((item) => (
            <div
              key={item.decorationId}
              draggable
              onDragStart={(e) =>
                handleDragStart(e, item.decorationId)
              }

              /* ===== MOBILE TOUCH ===== */
              onTouchStart={() => setTouchingId(item.decorationId)}

              onTouchMove={(e) => {
                if (touchingId !== item.decorationId) return;

                const touch = e.touches[0];
                const house = e.currentTarget.parentElement;
                const rect = house.getBoundingClientRect();

                const posX = Math.round(
                  ((touch.clientX - rect.left) / rect.width) * 100
                );
                const posY = Math.round(
                  ((touch.clientY - rect.top) / rect.height) * 100
                );

                setPlacedItems((prev) =>
                  prev.map((i) =>
                    i.decorationId === item.decorationId
                      ? {
                        ...i,
                        posX: Math.max(5, Math.min(95, posX)),
                        posY: Math.max(5, Math.min(90, posY)),
                      }
                      : i
                  )
                );
              }}

              onTouchEnd={async () => {
                const movedItem = placedItems.find(
                  (i) => i.decorationId === item.decorationId
                );
                if (!movedItem) return;

                await updateDecorationPosition(item.decorationId, {
                  posX: movedItem.posX,
                  posY: movedItem.posY,
                });

                setTouchingId(null);
              }}
              className="absolute cursor-move z-30 group"
              style={{
                left: `${item.posX ?? 50}%`,
                top: `${item.posY ?? 50}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="relative">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="
                    w-14 h-14
                    sm:w-16 sm:h-16
                    md:w-24 md:h-24
                    object-cover
                  "
                />

                <button
                  onClick={() => handleRemoveItem(item.decorationId)}
                  className={`
    absolute -top-2 -right-2 
    bg-red-600 text-white rounded-full p-1
    transition-opacity
    ${touchingId === item.decorationId
                      ? "opacity-100"
                      : "opacity-0 md:group-hover:opacity-100"
                    }
  `}
                >
                  <X size={14} />
                </button>

              </div>
            </div>
          ))}
        </div>

        {/* INVENTORY */}
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-xl">
          <h2 className="text-xl md:text-2xl font-bold text-red-700 mb-4">
            🎒 Túi đồ
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
            {inventory.map((item) => (
              <div
                key={item.itemId}
                className="bg-amber-50 p-3 md:p-4 rounded-xl border"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-20 md:h-24 object-cover rounded"
                />

                <div className="text-center mt-2 font-semibold text-sm md:text-base">
                  {item.name}
                </div>
                <div className="text-center text-xs md:text-sm">
                  SL: {item.quantity}
                </div>

                <button
                  onClick={() => handlePlaceItem(item)}
                  disabled={item.quantity <= 0}
                  className="w-full mt-2 bg-red-600 text-white py-1 rounded disabled:opacity-50 flex justify-center gap-1 text-sm"
                >
                  <Plus size={14} /> Đặt vào nhà
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl w-[90%] max-w-md p-5 shadow-2xl animate-fade-in">

            <h3 className="text-xl font-bold text-red-600 mb-3 text-center">
              🔗 Chia sẻ Nhà Tết
            </h3>

            <div className="bg-gray-100 rounded-lg p-3 text-sm break-all select-all">
              {shareLink}
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={async () => {
                  await navigator.clipboard.writeText(shareLink);
                  alert("✅ Đã copy link!");
                }}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold"
              >
                📋 Copy link
              </button>

              <button
                onClick={() => setShowShareModal(false)}
                className="flex-1 bg-gray-200 py-2 rounded-lg font-semibold"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TetVirtualHouse;
