import React, { useState, useEffect } from "react";
import {
  Gift,
  Search,
  Send,
  TrendingUp,
  Mail,
  Users,
  Sparkles,
  ArrowUpRight,
  ArrowDownLeft,
  Check,
  X,
} from "lucide-react";

export default function LiXiApp() {
  const [selectedContact, setSelectedContact] = useState(null);
  const [amount, setAmount] = useState("");
  const [wish, setWish] = useState("Chúc bạn năm mới an khang thịnh vượng!");
  const [activeTab, setActiveTab] = useState("all");
  const [showSuccess, setShowSuccess] = useState(false);
  const [confetti, setConfetti] = useState([]);

  const contacts = [
    { id: 1, name: "Nguyễn Văn A", avatar: "👨‍🦱", email: "nguyenvana@email.com" },
    { id: 2, name: "Lê Thị B", avatar: "👩‍🦰", email: "lethib@email.com" },
    { id: 3, name: "Trần Minh C", avatar: "🧑‍🎓", email: "tranminhc@email.com" },
    { id: 4, name: "Phạm Thu D", avatar: "👩‍💼", email: "phamthud@email.com" },
  ];

  const transactions = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      amount: 500000,
      type: "received",
      time: "Hôm nay, 9:41",
      avatar: "👨‍🦱",
    },
    {
      id: 2,
      name: "Lê Thị B",
      amount: -100000,
      type: "sent",
      time: "Hôm qua, 20:30",
      avatar: "👩‍🦰",
    },
    {
      id: 3,
      name: "Trần Minh C",
      amount: -50000,
      type: "sent",
      time: "22/01, 10:00",
      avatar: "🧑‍🎓",
    },
    {
      id: 4,
      name: "Phạm Thu D",
      amount: 200000,
      type: "received",
      time: "21/01, 15:20",
      avatar: "👩‍💼",
    },
  ];

  const quickAmounts = [
    { label: "68.000", sub: "Lộc Phát", value: 68000 },
    { label: "88.000", sub: "Phát Tài", value: 88000 },
    { label: "99.999", sub: "Vĩnh Cửu", value: 99999 },
    { label: "200.000", sub: "Song Hỷ", value: 200000 },
  ];

  const wishTemplates = [
    "Chúc bạn năm mới an khang thịnh vượng! 🎊",
    "Năm mới tiến bước, thành công rực rỡ! ⭐",
    "Sức khỏe dồi dào, hạnh phúc tràn đầy! ❤️",
    "Tài lộc đầy nhà, vạn sự như ý! 💰",
  ];

  const filteredTransactions = transactions.filter((t) => {
    if (activeTab === "sent") return t.type === "sent";
    if (activeTab === "received") return t.type === "received";
    return true;
  });

  const handleSend = () => {
    if (selectedContact && amount) {
      // Create confetti effect
      const newConfetti = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -10,
        rotation: Math.random() * 360,
        color: ['#ef4444', '#f59e0b', '#eab308', '#84cc16'][Math.floor(Math.random() * 4)],
      }));
      setConfetti(newConfetti);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        setSelectedContact(null);
        setAmount("");
        setWish("Chúc bạn năm mới an khang thịnh vượng!");
        setConfetti([]);
      }, 4000);
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
            animation: 'confetti-fall 3s ease-out forwards',
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
                Lì xì của bạn đã được gửi đến {selectedContact?.name}
              </p>
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 space-y-3 border-2 border-red-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Số tiền:</span>
                  <span className="text-2xl font-bold text-red-600">
                    {Number(amount).toLocaleString()} VNĐ
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Người nhận:</span>
                  <span className="font-semibold text-gray-900">{selectedContact?.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          {/* TITLE */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 text-6xl opacity-20">🎆</div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent relative z-10">
              Chúc Mừng Năm Mới! 
            </h1>
            <p className="text-gray-600 mt-2 text-lg relative z-10">
              Lan tỏa may mắn và tài lộc đến gia đình và bạn bè ✨
            </p>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Stat
              title="SỐ DƯ HIỆN TẠI"
              value="5,000,000"
              sub="+200k từ mẹ"
              gradient="from-emerald-500 to-green-600"
              icon={<TrendingUp />}
            />
            <Stat
              title="ĐÃ GỬI"
              value="1,200,000"
              sub="Cho 12 người"
              gradient="from-red-500 to-orange-600"
              icon={<ArrowUpRight />}
            />
            <Stat
              title="ĐÃ NHẬN"
              value="800,000"
              sub="8 phong bao"
              gradient="from-yellow-500 to-orange-600"
              icon={<ArrowDownLeft />}
            />
          </div>

          {/* SEND FORM */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-red-100 p-8 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Gift className="w-5 h-5 text-white" />
              </div>
              <h2 className="font-bold text-2xl text-gray-900">Gửi Lì Xì</h2>
            </div>

            {/* CONTACT */}
            <div>
              <label className="block font-semibold text-gray-900 mb-3 text-lg">
                Ai là người nhận may mắn? 🍀
              </label>
              <div className="relative mb-4">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-red-400 focus:ring-4 focus:ring-red-100 outline-none transition"
                  placeholder="Tìm theo tên, số điện thoại hoặc email"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {contacts.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedContact(c)}
                    className={`group relative flex flex-col items-center p-4 rounded-2xl border-2 transition-all ${
                      selectedContact?.id === c.id
                        ? "border-red-500 bg-gradient-to-br from-red-50 to-orange-50 shadow-lg scale-105"
                        : "border-gray-200 hover:border-red-300 hover:shadow-md"
                    }`}
                  >
                    {selectedContact?.id === c.id && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className="text-4xl mb-2">{c.avatar}</div>
                    <span className="text-sm font-semibold text-gray-900 text-center">
                      {c.name}
                    </span>
                    <span className="text-xs text-gray-500 mt-1">{c.email}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* AMOUNT */}
            <div>
              <label className="block font-semibold text-gray-900 mb-3 text-lg">
                Số tiền lì xì 💰
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-2xl px-6 py-5 text-3xl font-bold text-red-600 focus:border-red-400 focus:ring-4 focus:ring-red-100 outline-none transition"
                  placeholder="0"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xl text-gray-400 font-semibold">
                  VNĐ
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                {quickAmounts.map((q) => (
                  <button
                    key={q.value}
                    onClick={() => setAmount(q.value)}
                    className="group px-4 py-3 rounded-xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-orange-50 hover:from-red-100 hover:to-orange-100 hover:border-red-400 transition-all hover:shadow-md"
                  >
                    <div className="text-lg font-bold text-red-600">{q.label}</div>
                    <div className="text-xs text-gray-600 mt-1">{q.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* WISH */}
            <div>
              <label className="block font-semibold text-gray-900 mb-3 text-lg">
                Lời chúc Tết 🎊
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
              disabled={!selectedContact || !amount}
              className="relative w-full bg-gradient-to-r from-red-600 via-red-500 to-orange-500 hover:from-red-700 hover:via-red-600 hover:to-orange-600 text-white py-5 rounded-2xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 disabled:transform-none overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition"></div>
              <div className="relative flex items-center justify-center gap-3">
                <Sparkles className="w-6 h-6" />
                <span>Gửi Lì Xì Ngay</span>
                <Send className="w-6 h-6" />
              </div>
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-red-100 p-6 h-fit sticky top-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-bold text-xl text-gray-900">Hoạt động</h3>
          </div>

          <div className="flex gap-2 mb-6">
            {[
              { k: "all", t: "Tất cả", icon: Users },
              { k: "sent", t: "Đã gửi", icon: ArrowUpRight },
              { k: "received", t: "Đã nhận", icon: ArrowDownLeft },
            ].map((tab) => (
              <button
                key={tab.k}
                onClick={() => setActiveTab(tab.k)}
                className={`flex-1 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === tab.k
                    ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab.t}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredTransactions.map((t) => (
              <div
                key={t.id}
                className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-red-200 hover:shadow-md transition-all group"
              >
                <div className="text-3xl flex-shrink-0">{t.avatar}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.time}</p>
                </div>
                <div className="flex flex-col items-end">
                  <div
                    className={`font-bold text-lg ${
                      t.type === "received" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {t.type === "received" ? "+" : "-"}
                    {Math.abs(t.amount).toLocaleString()}
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    t.type === "received" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-red-100 text-red-700"
                  }`}>
                    {t.type === "received" ? "Nhận" : "Gửi"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <style>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        @keyframes scale-in {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

/* STAT CARD */
function Stat({ title, value, sub, gradient, icon }) {
  return (
    <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all hover:scale-105">
      <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
        <div className={`w-full h-full bg-gradient-to-br ${gradient} rounded-bl-full`}></div>
      </div>
      <div className="relative">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              {title}
            </p>
            <p className="text-3xl font-bold text-gray-900">
              {value}
            </p>
            <span className="text-sm text-gray-500 font-medium">VNĐ</span>
          </div>
          <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-lg`}>
            <div className="text-white">{icon}</div>
          </div>
        </div>
        <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${gradient} text-white`}>
          {sub}
        </div>
      </div>
    </div>
  );
}