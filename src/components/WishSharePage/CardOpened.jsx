// CardOpened.jsx
import { X } from "lucide-react";

export default function CardOpened({ wish, onClose }) {
  return (
    <div className="card-face card-back relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-amber-50 via-white to-red-50">
      {/* Nút đóng */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-30 p-2 rounded-full bg-white/80 hover:bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110 active:scale-95"
        aria-label="Đóng thiệp"
      >
        <X size={28} className="text-red-700" />
      </button>

      <div className="p-8 sm:p-10 md:p-12 relative">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-red-800 drop-shadow-sm">
            Chúc Mừng Năm Mới
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-amber-700 font-medium mt-2">
            An khang • Thịnh vượng • Bình an
          </p>
        </div>

        {/* Nội dung chính */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 md:p-10 shadow-inner border border-amber-100/60 mb-10 md:mb-12">
          <div className="text-gray-800 text-base sm:text-lg md:text-xl leading-relaxed whitespace-pre-line text-center md:text-left">
            {wish?.content || "Chúc bạn một năm mới thật nhiều niềm vui, sức khỏe và thành công!"}
          </div>
        </div>

        {/* Chữ ký */}
        <div className="text-right">
          <div className="inline-block bg-gradient-to-r from-amber-50 to-white rounded-2xl px-8 py-4 shadow-md border border-amber-200">
            <p className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center gap-3 justify-end">
              <span className="text-red-500 text-2xl animate-pulse">♥</span>
              {wish?.senderName || "Một người giấu tên"}
            </p>
          </div>
        </div>
      </div>

      {/* Trang trí nhỏ */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-6xl md:text-7xl opacity-90">🎁</div>
      <div className="absolute bottom-6 left-6 text-4xl opacity-70 animate-gentle-sway">🌸</div>
      <div className="absolute bottom-8 right-8 text-4xl opacity-70 animate-gentle-sway delay-300">🌺</div>
    </div>
  );
}