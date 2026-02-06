// WishSharePage.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getWishByShareToken, getSenderName } from "../../../services/wish.service";
import CardClosed from "../../../components/WishSharePage/CardClosed";
import CardOpened from "../../../components/WishSharePage/CardOpened";
import "./WishSharePage.css";

export default function WishSharePage() {
  const { token } = useParams();
  const [wish, setWish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchWish = async () => {
      try {
        const res = await getWishByShareToken(token);
        let wishData = res.data.data;

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-tet-gradient">
        <div className="text-center">
          <div className="loader-flower">🧧</div>
          <p className="text-2xl text-white font-bold animate-pulse mt-6">
            Đang mở thiệp chúc Tết...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md text-center">
          <div className="text-red-500 text-6xl mb-4">!</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Rất tiếc!</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  // WishSharePage.jsx (chỉ phần return chính, giữ nguyên fetch logic)
return (
  <div className="min-h-screen bg-tet-gradient flex items-center justify-center px-4 py-8 md:py-12 overflow-hidden relative">
    {/* Background rơi hoa mai - dày hơn khi mở */}
    {/* <div className="absolute inset-0 pointer-events-none">
      {[...Array(isOpen ? 24 : 12)].map((_, i) => (
        <div
          key={i}
          className="absolute text-3xl md:text-4xl animate-fall-flower opacity-70"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${8 + Math.random() * 10}s`,
          }}
        >
          {Math.random() > 0.4 ? "🌸" : "🌺"}
        </div>
      ))}
    </div> */}

    {/* Thiệp chính */}
    <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl perspective-[1200px]">
      <div
        className={`card-3d transform-gpu ${isOpen ? "is-open" : ""}`}
        onClick={() => !isOpen && setIsOpen(true)}
      >
        {!isOpen ? (
          <CardClosed wish={wish} />
        ) : (
          <CardOpened wish={wish} onClose={() => setIsOpen(false)} />
        )}
      </div>
    </div>

    {/* Decor góc dưới */}
    <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-10 text-5xl md:text-6xl opacity-90 animate-bounce-slow">
      🧧
    </div>
    <div className="absolute bottom-6 sm:bottom-10 right-6 sm:right-12 text-5xl md:text-6xl opacity-90 animate-bounce-slow delay-500">
      🏮
    </div>
  </div>
);
}