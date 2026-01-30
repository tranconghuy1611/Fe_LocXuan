import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Star,
  Moon,
  Heart,
  Briefcase,
  TrendingUp,
  Users,
  Shield,
  Clock,
  Calendar,
} from "lucide-react";
import { getTodayHoroscope } from "../../../services/horoscope.api";

export default function HoroscopeMysticApp() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [horoscopeData, setHoroscopeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAdviceModal, setShowAdviceModal] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [particles, setParticles] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const categories = [
    { id: "general", name: "Tổng Quan", icon: Star, color: "from-purple-600 to-indigo-700" },
    { id: "love", name: "Tình Yêu", icon: Heart, color: "from-pink-600 to-rose-700" },
    { id: "career", name: "Sự Nghiệp", icon: Briefcase, color: "from-blue-600 to-cyan-700" },
    { id: "finance", name: "Tài Chính", icon: TrendingUp, color: "from-green-600 to-emerald-700" },
    { id: "health", name: "Sức Khỏe", icon: Shield, color: "from-red-600 to-orange-700" },
    { id: "social", name: "Quan Hệ", icon: Users, color: "from-yellow-600 to-amber-700" },
  ];

  // Map category frontend → backend
  const categoryMap = {
    general: "overview",
    love: "love",
    career: "career",
    finance: "finance",
    health: "health",
    social: "relationship",
  };

  // Advice dùng cho typewriter trong modal (vẫn giữ nguyên)
  const adviceMap = {
    general: "Vũ trụ mở ra một chu kỳ mới. Hãy bước đi bằng niềm tin và sự tỉnh thức.",
    love: "Tình cảm được thử thách để trở nên bền vững. Lắng nghe trái tim nhiều hơn.",
    career: "Con đường sự nghiệp đang dịch chuyển. Dũng khí sẽ dẫn lối cho bạn.",
    finance: "Tiền bạc là dòng chảy năng lượng. Kiểm soát nó bằng sự khôn ngoan.",
    health: "Thân – tâm – trí cần được cân bằng. Đừng bỏ quên sự nghỉ ngơi.",
    social: "Nhân duyên đến đúng lúc. Chân thành sẽ giữ được người ở lại.",
  };

  const fetchHoroscope = async (category) => {
    setLoading(true);
    setShowAdviceModal(false);
    setDisplayText("");
    setErrorMessage(null);

    const backendCategory = categoryMap[category];

    if (!backendCategory) {
      console.error("Không tìm thấy mapping cho category:", category);
      setErrorMessage("Danh mục không hợp lệ.");
      setLoading(false);
      return;
    }

    try {
      const res = await getTodayHoroscope(backendCategory);

      // Lấy trực tiếp từ API response
      setHoroscopeData({
        category,
        message: res.data?.data?.message,
        date: res.data?.data?.date,
      });

      setShowAdviceModal(true);

      setParticles(
        Array.from({ length: 18 }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
        }))
      );
      setTimeout(() => setParticles([]), 4000);
    } catch (err) {
      console.error("Lỗi gọi API horoscope:", err);
      setErrorMessage("Không thể kết nối tới vũ trụ lúc này. Vui lòng thử lại sau.");
      setShowAdviceModal(true);
      // Vẫn giữ particles để giữ hiệu ứng
      setParticles(
        Array.from({ length: 18 }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
        }))
      );
      setTimeout(() => setParticles([]), 4000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!showAdviceModal || !horoscopeData) return;

    let i = 0;
    const text = errorMessage
      ? errorMessage
      : horoscopeData?.message ||
      adviceMap[horoscopeData.category] ||
      "Thông điệp từ vũ trụ...";



    const timer = setInterval(() => {
      setDisplayText(text.slice(0, i++));
      if (i > text.length) clearInterval(timer);
    }, 45);

    return () => clearInterval(timer);
  }, [showAdviceModal, horoscopeData, errorMessage]);

  const currentCat = categories.find((c) => c.id === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-indigo-950 to-purple-950 relative overflow-hidden">
      {/* SƯƠNG HUYỀN BÍ */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_70%)] pointer-events-none" />

      {/* VÒNG TRÒN MA PHÁP */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
        <div className="w-[600px] h-[600px] border border-purple-500 rounded-full animate-spin-slower" />
        <div className="absolute w-[420px] h-[420px] border border-pink-500 rounded-full animate-spin-reverse" />
      </div>

      {/* PARTICLES */}
      {particles.map((p) => (
        <Moon
          key={p.id}
          className="absolute text-purple-300 animate-float"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
        />
      ))}

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-10">
        {/* HEADER */}
        <div className="text-center mb-14">
          <Moon className="w-24 h-24 text-purple-300 mx-auto animate-spin-slow" />
          <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 tracking-widest">
            VŨ TRỤ TIÊN TRI
          </h1>
          <p className="text-purple-300 mt-2 italic">Kết nối định mệnh – Đọc lời vũ trụ</p>
          <div className="flex justify-center items-center gap-2 text-purple-400 mt-4">
            <Calendar className="w-5 h-5" />
            {new Date().toLocaleDateString("vi-VN", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
        </div>

        {/* CATEGORY */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  fetchHoroscope(cat.id);
                }}
                className="bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 p-5 rounded-2xl text-white transition transform hover:scale-105"
              >
                <div
                  className={`w-14 h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-lg`}
                >
                  <Icon />
                </div>
                <p className="font-bold tracking-wide">{cat.name}</p>
              </button>
            );
          })}
        </div>

        {/* RESULT */}
        {selectedCategory && (
          <div className="bg-white/90 backdrop-blur rounded-3xl p-8 shadow-2xl">
            {loading ? (
              <p className="text-center text-xl italic">Đang kết nối vũ trụ...</p>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-3">{currentCat.name}</h2>
                <p className="text-gray-700 text-lg">{horoscopeData?.message}</p>
                <p className="mt-2 flex items-center gap-2 text-gray-500">
                  <Clock className="w-4 h-4" /> {horoscopeData?.date}
                </p>
              </>
            )}
          </div>
        )}
      </div>

      {/* MODAL LỜI PHÁN */}
      {showAdviceModal && (horoscopeData || errorMessage) && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur flex items-center justify-center">
          <div className="relative bg-white rounded-3xl p-10 max-w-md w-full animate-scaleIn shadow-[0_0_80px_rgba(168,85,247,0.7)]">
            <button
              onClick={() => setShowAdviceModal(false)}
              className="absolute top-4 right-4 text-xl font-bold text-gray-400 hover:text-red-500"
            >
              ✕
            </button>

            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
              <Sparkles className="w-10 h-10 text-white" />
            </div>

            <h3 className="text-2xl font-bold text-center mb-4 text-purple-900">
              🔮 LỜI PHÁN TỪ VŨ TRỤ
            </h3>

            <p className="text-center italic text-lg text-gray-800 min-h-[90px]">
              “{displayText}”
            </p>

            <button
              onClick={() => setShowAdviceModal(false)}
              className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-purple-700 to-pink-700 text-white font-bold tracking-wide"
            >
              Tiếp Nhận Định Mệnh ✨
            </button>
          </div>
        </div>
      )}
    </div>
  );
}