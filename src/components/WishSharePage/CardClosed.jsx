// CardClosed.jsx
export default function CardClosed({ wish }) {
  return (
    <div className="card-face card-front relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer group">
      {/* Gradient nền + pattern nhẹ */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-700 via-red-600 to-amber-700" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,215,0,0.12),transparent_60%)]" />

      {/* Nội dung chính */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full py-12 sm:py-16 px-6 sm:px-10 text-center text-white">
        <div className="text-8xl sm:text-9xl mb-6 md:mb-8 animate-gentle-sway">🧧</div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-lg">
          CHÚC MỪNG NĂM MỚI
        </h2>

        <p className="text-xl sm:text-2xl text-amber-200 font-medium mb-6 md:mb-10 drop-shadow">
          Nhấn vào để mở thiệp
        </p>

        <div className="text-lg sm:text-xl opacity-95">
          Từ: <span className="font-bold text-amber-100">{wish?.senderName || "Một người đặc biệt"}</span>
        </div>

        <div className="mt-10 text-sm opacity-70 flex items-center gap-2">
          <span>🎊 Tet App • 2026 🎊</span>
        </div>
      </div>

      {/* Góc trang trí */}
      <div className="absolute top-4 left-4 w-14 h-14 sm:w-20 sm:h-20 border-t-4 border-l-4 border-amber-300 rounded-tl-3xl opacity-80 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-4 right-4 w-14 h-14 sm:w-20 sm:h-20 border-t-4 border-r-4 border-amber-300 rounded-tr-3xl opacity-80 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-4 left-4 w-14 h-14 sm:w-20 sm:h-20 border-b-4 border-l-4 border-amber-300 rounded-bl-3xl opacity-80 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-4 right-4 w-14 h-14 sm:w-20 sm:h-20 border-b-4 border-r-4 border-amber-300 rounded-br-3xl opacity-80 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}