import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getWishByShareToken } from "../../../services/wish.service";
import { Sparkles, Heart, Gift, AlertCircle } from "lucide-react";

export default function WishSharePage() {
  const { token } = useParams();

  const [wish, setWish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getWishByShareToken(token)
      .then((res) => {
        setWish(res.data.data);
      })
      .catch(() => {
        setError("Thiệp không tồn tại hoặc đã bị khóa");
      })
      .finally(() => setLoading(false));
  }, [token]);

  // ⏳ Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl bg-gradient-to-br from-red-700 to-amber-500 text-white">
        🎆 Đang mở thiệp chúc Tết...
      </div>
    );
  }

  // ❌ Error
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-500 gap-3">
        <AlertCircle size={40} />
        <p className="text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-800 via-red-700 to-amber-500 flex items-center justify-center px-4 py-10">
      <div className="relative max-w-3xl w-full bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden animate-scaleIn">

        {/* 🌸 Decorative corners */}
        <div className="absolute top-4 left-4 text-red-200">
          <Sparkles />
        </div>
        <div className="absolute top-4 right-4 text-red-200">
          <Gift />
        </div>

        {/* Header */}
        <div className="bg-red-700 text-center py-8 text-white">
          <h1 className="text-4xl md:text-5xl font-black flex items-center justify-center gap-3">
            <Sparkles className="animate-pulse" />
            Chúc Mừng Năm Mới
          </h1>
          <p className="mt-2 text-red-100 text-sm tracking-wide">
            An khang – Thịnh vượng – Vạn sự như ý
          </p>
        </div>

        {/* Divider */}
        <div className="h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

        {/* Content */}
        <div className="p-10 text-gray-800 text-lg md:text-xl leading-relaxed whitespace-pre-line">
          {wish.content}
        </div>

        {/* Signature */}
        {wish.senderName && (
          <div className="text-right px-10 pb-6 text-gray-700 italic">
            💖 {wish.senderName}
          </div>
        )}

        {/* Footer */}
        <div className="bg-amber-50 text-center py-4 text-sm text-gray-600 flex items-center justify-center gap-2">
          <Heart size={16} className="text-red-500" />
          Thiệp được gửi từ <b>Tet App</b>
        </div>
      </div>
    </div>
  );
}
