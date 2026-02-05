import React, { useState, useEffect } from "react";
import {
  Gift,
  Mail,
  Sparkles,
  Send,
  Check,
} from "lucide-react";
import Stat from "../../../components/LiXi/Stat";
import LichSu from "./LichSu";
import "./LiXiApp.css";
import { sendGift } from "../../../services/gift.service";
import { checkEmailExact } from "../../../services/user.service";

export default function LiXiApp() {
  const [points, setPoints] = useState("");
  const [wish, setWish] = useState("Chúc bạn năm mới an khang thịnh vượng! 🎊");
  const [activeTab, setActiveTab] = useState("all");
  const [showSuccess, setShowSuccess] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const [pointsError, setPointsError] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");
  const [receiver, setReceiver] = useState(null);
  const [emailError, setEmailError] = useState("");

  // Dữ liệu lịch sử (hiển thị là "điểm")
  

  const quickPoints = [
    { label: "68", sub: "Lộc Phát", value: 68 },
    { label: "88", sub: "Phát Tài", value: 88 },
    { label: "99", sub: "Trường Cửu", value: 99 },
    { label: "200", sub: "Song Hỷ", value: 200 },
  ];

  const wishTemplates = [
    "Chúc bạn năm mới an khang thịnh vượng! 🎊",
    "Năm mới tiến bước, thành công rực rỡ! ⭐",
    "Sức khỏe dồi dào, hạnh phúc tràn đầy! ❤️",
    "Tài lộc đầy nhà, vạn sự như ý! 💰",
  ];

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  useEffect(() => {
    if (!isValidEmail(receiverEmail)) {
      setReceiver(null);
      setEmailError("");
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const data = await checkEmailExact(receiverEmail.trim());

        if (!data.exists) {
          setReceiver(null);
          setEmailError("Email không tồn tại");
          return;
        }

        if (!data.active) {
          setReceiver(null);
          setEmailError("Tài khoản người nhận đang bị khóa");
          return;
        }

        setReceiver(data);
        setEmailError("");
      } catch (e) {
        setReceiver(null);
        setEmailError("Không kiểm tra được email");
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [receiverEmail]);

  const handleSend = async () => {
    if (!receiver) {
      alert("❗ Email người nhận không hợp lệ");
      return;
    }

    const pointValue = Number(points);
    if (!pointValue || pointValue <= 0) {
      alert("❗ Số điểm phải lớn hơn 0");
      return;
    }

    if (pointValue < 50) {
      alert("❗ Số điểm tối thiểu là 50");
      return;
    }

    try {
      const payload = {
        email: receiverEmail.trim(),
        amount: pointValue,          // ← Backend vẫn nhận "amount"
        message: wish,
      };

      await sendGift(payload);

      // Confetti
      const newConfetti = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -10,
        rotation: Math.random() * 360,
        color: ["#ef4444", "#f59e0b", "#eab308", "#84cc16"][
          Math.floor(Math.random() * 4)
        ],
      }));

      setConfetti(newConfetti);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        setReceiver(null);
        setReceiverEmail("");
        setPoints("");
        setWish("Chúc bạn năm mới an khang thịnh vượng!");
        setConfetti([]);
      }, 4000);
    } catch (error) {
      console.error("Gửi điểm thất bại", error);
      alert("❌ Gửi điểm thất bại, vui lòng thử lại!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      {/* Confetti */}
      {confetti.map((c) => (
        <div
          key={c.id}
          className="fixed w-3 h-3 rounded-sm pointer-events-none z-50"
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            backgroundColor: c.color,
            transform: `rotate(${c.rotation}deg)`,
            animation: "confetti-fall 3s ease-out forwards",
          }}
        />
      ))}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl transform animate-scale-in">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-6 shadow-lg">
                <Check className="w-10 h-10 text-white animate-bounce" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">
                Gửi thành công! 🎉
              </h3>
              <p className="text-gray-600 mb-6">
                Điểm may mắn đã được gửi đến {receiver?.fullName}
              </p>

              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 space-y-3 border-2 border-red-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Số điểm:</span>
                  <span className="text-2xl font-bold text-red-600">
                    {Number(points).toLocaleString()} điểm
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Người nhận:</span>
                  <span className="font-semibold text-gray-900">
                    {receiver?.fullName}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent relative z-10">
              Chúc Mừng Năm Mới!
            </h1>
            <p className="text-gray-600 mt-2 text-lg relative z-10">
              Lan tỏa may mắn và điểm tích lũy đến bạn bè ✨
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-red-100 p-8 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Gift className="w-5 h-5 text-white" />
              </div>
              <h2 className="font-bold text-2xl text-gray-900">Gửi Điểm May Mắn</h2>
            </div>

            {/* Email phần */}
            <div>
              <label className="block font-semibold text-gray-900 mb-3 text-lg">
                Ai là người nhận may mắn? 🍀
              </label>
              <div className="relative mb-2">
                <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={receiverEmail}
                  onChange={(e) => setReceiverEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-red-400 focus:ring-4 focus:ring-red-100 outline-none"
                  placeholder="Nhập chính xác email người nhận"
                />
              </div>
              {emailError && <p className="text-red-500 font-semibold mt-2">⚠️ {emailError}</p>}
              {receiver && (
                <div className="mt-4 flex items-center gap-4 p-4 border-2 border-green-400 rounded-2xl bg-green-50">
                  <div className="text-4xl">{receiver.avatarUrl ? "🧧" : "👤"}</div>
                  <div>
                    <p className="font-bold text-gray-900">{receiver.fullName}</p>
                    <p className="text-sm text-gray-500">{receiverEmail}</p>
                  </div>
                  <Check className="w-6 h-6 text-green-600 ml-auto" />
                </div>
              )}
            </div>

            {/* Points phần */}
            <div>
              <label className="block font-semibold text-gray-900 mb-3 text-lg">
                Số điểm tặng 🎁
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={points}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || Number(value) >= 0) {
                      setPoints(value);
                      const num = Number(value);
                      if (num > 0 && num < 50) {
                        setPointsError("Số điểm tối thiểu là 50");
                      } else {
                        setPointsError("");
                      }
                    }
                  }}
                  className={`w-full border-2 rounded-2xl px-6 py-5 text-3xl font-bold 
                    ${pointsError ? "border-red-400" : "border-gray-200"}
                    text-red-600 focus:border-red-400 focus:ring-4 focus:ring-red-100 outline-none transition`}
                  placeholder="0"
                />
                {pointsError && <p className="mt-2 text-red-500 font-semibold">⚠️ {pointsError}</p>}

                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xl text-gray-400 font-semibold">
                  điểm
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                {quickPoints.map((q) => (
                  <button
                    key={q.value}
                    onClick={() => setPoints(q.value)}
                    className="group px-4 py-3 rounded-xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-orange-50 hover:from-red-100 hover:to-orange-100 hover:border-red-400 transition-all hover:shadow-md"
                  >
                    <div className="text-lg font-bold text-red-600">{q.label}</div>
                    <div className="text-xs text-gray-600 mt-1">{q.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Lời chúc */}
            <div>
              <label className="block font-semibold text-gray-900 mb-3 text-lg">
                Lời chúc Tết 
              </label>
              <textarea
                value={wish}
                onChange={(e) => setWish(e.target.value)}
                rows={3}
                className="w-full border-2 border-gray-200 rounded-2xl px-5 py-4 focus:border-red-400 focus:ring-4 focus:ring-red-100 outline-none transition resize-none"
                placeholder="Nhập lời chúc của bạn..."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                {wishTemplates.map((w, idx) => (
                  <button
                    key={idx}
                    onClick={() => setWish(w)}
                    className="text-left px-4 py-2 rounded-xl bg-yellow-50 hover:bg-yellow-100 text-sm text-gray-700 border border-yellow-200 transition"
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleSend}
              disabled={!receiver || !points || Number(points) < 50 || !!pointsError}
              className="relative w-full bg-gradient-to-r from-red-600 via-red-500 to-orange-500 hover:from-red-700 hover:via-red-600 hover:to-orange-600 text-white py-5 rounded-2xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 disabled:transform-none overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition"></div>
              <div className="relative flex items-center justify-center gap-3">
                <Sparkles className="w-6 h-6" />
                <span>Gửi Điểm May Mắn Ngay</span>
                <Send className="w-6 h-6" />
              </div>
            </button>
          </div>
        </div>

        <LichSu /> {/* Cập nhật component này để hiển thị "điểm" thay vì "VNĐ" nếu cần */}
      </main>
    </div>
  );
}