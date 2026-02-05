import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Share2 } from "lucide-react";

import houseDesktop from "../../../assets/house.png";
import houseMobile from "../../../assets/housemobile.png";

import { getHouseByShareToken } from "../../../services/house.service";

const ShareHouse = () => {
  const { token } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getHouseByShareToken(token);
        setItems(res.data.data || []);
      } catch (err) {
        console.error("Load shared house failed:", err);
      }
    };
    load();
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 p-3 md:p-4">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4 md:mb-6 bg-white/80 rounded-2xl p-3 md:p-4 shadow-lg">
          <h1 className="text-xl md:text-3xl font-bold text-red-600">
            🏮 Nhà Tết Được Chia Sẻ
          </h1>

          <div className="flex items-center gap-2 text-red-600 font-semibold text-sm md:text-base">
            <Share2 size={18} />
            Read-only
          </div>
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

          {/* ITEMS (readonly) */}
          {items.map((item) => (
            <div
              key={item.decorationId}
              className="absolute z-30"
              style={{
                left: `${item.posX ?? 50}%`,
                top: `${item.posY ?? 50}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
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
            </div>
          ))}
        </div>

        {/* FOOTER NOTE */}
        <div className="text-center text-sm md:text-base text-red-700 font-semibold">
          🎉 Đây là nhà Tết được chia sẻ — chỉ xem, không chỉnh sửa
        </div>

      </div>
    </div>
  );
};

export default ShareHouse;
