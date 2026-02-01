import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getWishByShareToken,
  getSenderName,
} from "../../../services/wish.service";
import "./WishSharePage.css";
import { Sparkles, Heart, Gift, AlertCircle } from "lucide-react";

export default function WishSharePage() {
  const { token } = useParams();

  const [wish, setWish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWish = async () => {
      try {
        // 1️⃣ Lấy thiệp
        const res = await getWishByShareToken(token);
        const wishData = res.data.data;

        // 2️⃣ Lấy tên người gửi
        if (wishData?.senderId) {
          try {
            const senderRes = await getSenderName(wishData.senderId);
            wishData.senderName = senderRes.data.data.fullName;
          } catch {
            wishData.senderName = "Một người bí ẩn 🎭";
          }
        }

        setWish(wishData);
      } catch (err) {
        setError("Thiệp không tồn tại hoặc đã bị khóa");
      } finally {
        setLoading(false);
      }
    };

    fetchWish();
  }, [token]);

  // ⏳ Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-700 via-rose-600 to-amber-500">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-white/30 border-t-white animate-spin"></div>
            <div className="absolute inset-3 rounded-full bg-white/20 flex items-center justify-center text-4xl">
              🧧
            </div>
          </div>
          <p className="text-2xl text-white font-bold animate-pulse">
            Đang mở thiệp chúc Tết...
          </p>
        </div>
      </div>
    );
  }

  // ❌ Error
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={40} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Rất tiếc!</h2>
          <p className="text-lg text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-red-800 via-rose-700 to-amber-500 flex items-center justify-center px-4 py-10 overflow-hidden">
      
      {/* 🌸 Hoa mai rơi - nhiều lớp khác nhau */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={`flower-${i}`}
            className="absolute text-3xl animate-flower opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${10 + Math.random() * 5}s`,
            }}
          >
            🌸
          </div>
        ))}
      </div>

      {/* ✨ Pháo hoa nền */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute text-yellow-300 text-xl animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            ✨
          </div>
        ))}
      </div>

      {/* Thiệp chính */}
      <div className="relative max-w-4xl w-full animate-scaleIn">
        
        {/* Đèn lồng treo góc */}
        <div className="absolute -top-8 left-8 text-5xl animate-swing origin-top">🏮</div>
        <div className="absolute -top-8 right-8 text-5xl animate-swing origin-top" style={{animationDelay: '0.5s'}}>🏮</div>

        {/* Card container với viền vàng */}
        <div className="bg-gradient-to-br from-amber-100 to-red-50 rounded-[40px] p-3 shadow-[0_25px_80px_rgba(0,0,0,0.4)]">
          <div className="bg-white rounded-[32px] overflow-hidden shadow-lg">

            {/* Header với họa tiết */}
            <div className="relative bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-center py-10 text-white overflow-hidden">
              
              {/* Hoa văn trang trí */}
              <div className="absolute top-0 left-0 text-6xl opacity-20">🌺</div>
              <div className="absolute top-0 right-0 text-6xl opacity-20">🌺</div>
              <div className="absolute bottom-0 left-1/4 text-4xl opacity-10">✿</div>
              <div className="absolute bottom-0 right-1/4 text-4xl opacity-10">✿</div>

              <div className="relative z-10">
                <h1 className="text-5xl md:text-6xl font-black flex items-center justify-center gap-3 mb-3">
                  <Sparkles className="animate-pulse" size={40} />
                  Chúc Mừng Năm Mới
                  <Sparkles className="animate-pulse" size={40} />
                </h1>
                <div className="flex items-center justify-center gap-2 text-amber-300 text-lg tracking-widest font-semibold">
                  <span>✦</span>
                  <span>An khang – Thịnh vượng – Vạn sự như ý</span>
                  <span>✦</span>
                </div>
              </div>
            </div>

            {/* Đường viền trang trí */}
            <div className="h-2 bg-gradient-to-r from-red-500 via-amber-400 to-red-500"></div>
            
            {/* Khung trang trí trên nội dung */}
            <div className="relative">
              {/* Góc trang trí */}
              <div className="absolute top-6 left-6 w-12 h-12 border-t-4 border-l-4 border-amber-400 rounded-tl-2xl"></div>
              <div className="absolute top-6 right-6 w-12 h-12 border-t-4 border-r-4 border-amber-400 rounded-tr-2xl"></div>
              <div className="absolute bottom-6 left-6 w-12 h-12 border-b-4 border-l-4 border-amber-400 rounded-bl-2xl"></div>
              <div className="absolute bottom-6 right-6 w-12 h-12 border-b-4 border-r-4 border-amber-400 rounded-br-2xl"></div>

              {/* Nội dung thiệp */}
              <div className="px-12 py-16 md:px-20 md:py-20">
                <div className="relative bg-gradient-to-br from-amber-50/50 to-red-50/30 rounded-3xl p-8 md:p-12 shadow-inner">
                  
                  {/* Icon trang trí */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-white rounded-full p-3 shadow-lg">
                      <Gift className="text-red-600" size={24} />
                    </div>
                  </div>

                  <div className="text-gray-800 text-lg md:text-xl leading-relaxed whitespace-pre-line text-center md:text-left">
                    {wish?.content}
                  </div>
                </div>

                {/* Chữ ký */}
                <div className="mt-8 text-right">
                  <div className="inline-block bg-white rounded-2xl px-6 py-3 shadow-md border-2 border-amber-200">
                    <p className="text-gray-700 text-lg font-semibold flex items-center gap-2">
                      <Heart size={20} className="text-red-500 animate-pulse" />
                      <span className="italic">{wish?.senderName || "Một người giấu tên"}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gradient-to-r from-amber-100 via-red-50 to-amber-100 text-center py-5 border-t-2 border-amber-200">
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <span className="text-xl">🎊</span>
                <span className="text-sm">Thiệp được gửi từ</span>
                <span className="font-bold text-red-700 text-base">Tet App</span>
                <span className="text-xl">🎊</span>
              </div>
            </div>

          </div>
        </div>

        {/* Lì xì trang trí góc dưới */}
        <div className="absolute -bottom-4 -left-4 text-6xl rotate-12 animate-bounce" style={{animationDuration: '3s'}}>🧧</div>
        <div className="absolute -bottom-4 -right-4 text-6xl -rotate-12 animate-bounce" style={{animationDuration: '3s', animationDelay: '0.5s'}}>🧧</div>
      </div>
    </div>
  );
}