import { useState } from "react";
import { Lock, Share2, User, Sparkles } from "lucide-react";

export default function TetCardCreate() {
  const [form, setForm] = useState({
    receiverId: null,
    content: "",
    isPrivate: false,
    enableShare: true,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-500 to-yellow-400 flex items-center justify-center px-4">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-10">

        {/* FORM */}
        <div className="bg-white/20 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl border border-white/30">
          <h2 className="text-3xl font-extrabold text-yellow-300 flex items-center gap-3 mb-8">
            <Sparkles /> Tạo Thiệp Tết
          </h2>

          {/* Người nhận */}
          <div className="mb-6">
            <label className="text-white font-semibold mb-2 flex items-center gap-2">
              <User size={18} /> Người nhận
            </label>
            <select
              className="w-full p-3 rounded-xl bg-white focus:ring-4 focus:ring-yellow-300"
              onChange={(e) =>
                setForm({
                  ...form,
                  receiverId: e.target.value || null,
                })
              }
            >
              <option value="">🌍 Công khai (không chọn người)</option>
              <option value="1">Nguyễn Văn A</option>
              <option value="2">Trần Thị B</option>
              <option value="3">Lê Văn C</option>
            </select>
          </div>

          {/* Nội dung */}
          <div className="mb-6">
            <label className="text-white font-semibold mb-2">
              🎉 Lời chúc Tết
            </label>
            <textarea
              rows={4}
              value={form.content}
              onChange={(e) =>
                setForm({ ...form, content: e.target.value })
              }
              placeholder="Nhập lời chúc Tết của bạn..."
              className="w-full p-4 rounded-xl focus:ring-4 focus:ring-yellow-300"
            />
          </div>

          {/* Riêng tư */}
          <div className="mb-4">
            <label className="flex items-center gap-3 text-white font-semibold">
              <input
                type="checkbox"
                checked={form.isPrivate}
                onChange={(e) =>
                  setForm({
                    ...form,
                    isPrivate: e.target.checked,
                    enableShare: e.target.checked ? false : form.enableShare,
                  })
                }
                className="scale-125"
              />
              <Lock size={18} /> Thiệp riêng tư (chỉ người nhận xem)
            </label>
          </div>

          {/* Chia sẻ */}
          <div className="mb-8">
            <label
              className={`flex items-center gap-3 font-semibold ${
                form.isPrivate
                  ? "text-white/50"
                  : "text-white"
              }`}
            >
              <input
                type="checkbox"
                disabled={form.isPrivate}
                checked={form.enableShare}
                onChange={(e) =>
                  setForm({
                    ...form,
                    enableShare: e.target.checked,
                  })
                }
                className="scale-125"
              />
              <Share2 size={18} /> Cho phép chia sẻ thiệp
            </label>
          </div>

          <button className="w-full py-4 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-2xl font-extrabold text-red-900 text-lg hover:scale-105 transition shadow-xl">
            🎁 Tạo Thiệp
          </button>
        </div>

        {/* PREVIEW */}
        <div className="flex justify-center items-center">
          <div className="w-[340px] h-[500px] rounded-[2.5rem] bg-gradient-to-br from-red-500 to-yellow-400 shadow-[0_30px_80px_rgba(0,0,0,0.4)] p-6 text-white flex flex-col justify-between relative overflow-hidden">
            
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/20 blur-3xl rounded-full" />

            <div className="text-center relative z-10">
              <h1 className="text-3xl font-extrabold">
                🎊 Chúc Mừng Năm Mới 🎊
              </h1>
              <p className="italic text-yellow-200 mt-1">
                {form.isPrivate ? "Thiệp Riêng Tư 🔒" : "Thiệp Công Khai 🌍"}
              </p>
            </div>

            <div className="bg-white/25 backdrop-blur-lg p-5 rounded-3xl text-center text-lg font-semibold leading-relaxed relative z-10">
              {form.content || "Lời chúc Tết sẽ hiển thị ở đây ✨"}
            </div>

            <div className="text-right font-bold relative z-10">
              {form.enableShare ? "🔗 Có thể chia sẻ" : "🚫 Không chia sẻ"}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
