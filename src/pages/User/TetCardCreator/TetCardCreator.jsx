import { useState } from "react";
import { Lock, Share2, User, Sparkles, Send, Eye } from "lucide-react";

export default function TetCardCreate() {
  const [form, setForm] = useState({
    receiverId: null,
    content: "",
    isPrivate: false,
    enableShare: true,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-red-800 to-amber-600 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 relative z-10">

        {/* FORM SECTION */}
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center lg:text-left mb-8">
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-300 to-orange-300 mb-3 flex items-center justify-center lg:justify-start gap-3">
              <Sparkles className="text-yellow-300" size={40} />
              Thiệp Tết 2025
            </h1>
            <p className="text-yellow-100/80 text-lg">Gửi lời chúc đầu năm đến người thân yêu</p>
          </div>

          {/* Form Card */}
          <div className="bg-white/10 backdrop-blur-3xl p-8 rounded-3xl shadow-2xl border border-white/20 hover:border-white/30 transition-all duration-300">
            
            {/* Người nhận */}
            <div className="mb-6">
              <label className="text-yellow-100 font-bold mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                <User size={20} className="text-yellow-300" /> Người nhận
              </label>
              <div className="relative">
                <select
                  className="w-full p-4 pr-10 rounded-2xl bg-white/95 backdrop-blur-sm text-gray-800 font-semibold focus:ring-4 focus:ring-yellow-400/50 focus:outline-none transition-all appearance-none cursor-pointer hover:bg-white"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      receiverId: e.target.value || null,
                    })
                  }
                >
                  <option value="">Gửi công khai</option>
                  <option value="1">Nguyễn Văn A</option>
                  <option value="2">Trần Thị B</option>
                  <option value="3">Lê Văn C</option>
                  <option value="4">Phạm Minh D</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Nội dung */}
            <div className="mb-6">
              <label className="text-yellow-100 font-bold mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                <Sparkles size={20} className="text-yellow-300" /> Lời chúc Tết
              </label>
              <textarea
                rows={5}
                value={form.content}
                onChange={(e) =>
                  setForm({ ...form, content: e.target.value })
                }
                placeholder="Chúc mừng năm mới! An khang thịnh vượng, vạn sự như ý..."
                className="w-full p-4 rounded-2xl bg-white/95 backdrop-blur-sm text-gray-800 focus:ring-4 focus:ring-yellow-400/50 focus:outline-none transition-all resize-none hover:bg-white placeholder:text-gray-400"
              />
              <div className="text-right text-yellow-200/70 text-sm mt-2">
                {form.content.length} ký tự
              </div>
            </div>

            {/* Options */}
            <div className="space-y-4 mb-8">
              {/* Riêng tư */}
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                <label className="flex items-center gap-3 cursor-pointer">
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
                    className="w-5 h-5 rounded accent-yellow-400 cursor-pointer"
                  />
                  <Lock size={20} className={form.isPrivate ? "text-yellow-300" : "text-yellow-100"} />
                  <div className="flex-1">
                    <div className="text-white font-bold">Thiệp riêng tư</div>
                    <div className="text-yellow-100/60 text-sm">Chỉ người nhận được chọn mới xem được</div>
                  </div>
                </label>
              </div>

              {/* Chia sẻ */}
              <div className={`p-4 rounded-xl border transition-all ${
                form.isPrivate 
                  ? "bg-white/5 border-white/10 opacity-50" 
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}>
                <label className="flex items-center gap-3 cursor-pointer">
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
                    className="w-5 h-5 rounded accent-yellow-400 cursor-pointer disabled:cursor-not-allowed"
                  />
                  <Share2 size={20} className={form.isPrivate ? "text-yellow-100/50" : form.enableShare ? "text-yellow-300" : "text-yellow-100"} />
                  <div className="flex-1">
                    <div className={`font-bold ${form.isPrivate ? "text-white/50" : "text-white"}`}>
                      Cho phép chia sẻ
                    </div>
                    <div className={`text-sm ${form.isPrivate ? "text-yellow-100/30" : "text-yellow-100/60"}`}>
                      Người khác có thể share thiệp này
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button className="w-full py-5 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 rounded-2xl font-black text-white text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl hover:shadow-yellow-500/50 flex items-center justify-center gap-3 group">
              <Send size={22} className="group-hover:translate-x-1 transition-transform" />
              Tạo Thiệp Ngay
              <Sparkles size={22} className="group-hover:rotate-180 transition-transform" />
            </button>
          </div>
        </div>

        {/* PREVIEW SECTION */}
        <div className="flex flex-col items-center justify-center">
          <div className="mb-6 flex items-center gap-2 text-yellow-100">
            <Eye size={20} />
            <span className="font-semibold">Xem trước thiệp</span>
          </div>

          {/* Traditional Card Design */}
          <div className="relative w-[700px] h-[500px]">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-red-500/20 blur-3xl -z-10 rounded-3xl" />
            
            {/* Main Card */}
            <div className="w-full h-full bg-white rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden flex">
              
              {/* Left Side - Red Background with Decorations */}
              <div className="w-[55%] bg-gradient-to-br from-red-700 via-red-600 to-red-700 p-8 relative overflow-hidden">
                
                {/* Cherry Blossom Branch - Top Left */}
                <div className="absolute -top-4 -left-8 w-64 h-64">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    {/* Branch */}
                    <path d="M 10 150 Q 40 120, 70 100 T 130 60 T 180 20" stroke="#8B4513" strokeWidth="4" fill="none" />
                    <path d="M 70 100 Q 60 110, 50 130" stroke="#8B4513" strokeWidth="3" fill="none" />
                    <path d="M 130 60 Q 140 70, 150 85" stroke="#8B4513" strokeWidth="3" fill="none" />
                    
                    {/* Flowers */}
                    <g transform="translate(65, 95)">
                      <circle cx="0" cy="0" r="8" fill="#FFD700" />
                      <circle cx="-6" cy="-6" r="5" fill="#FFA500" />
                      <circle cx="6" cy="-6" r="5" fill="#FFA500" />
                      <circle cx="-6" cy="6" r="5" fill="#FFA500" />
                      <circle cx="6" cy="6" r="5" fill="#FFA500" />
                    </g>
                    <g transform="translate(125, 55)">
                      <circle cx="0" cy="0" r="7" fill="#FFD700" />
                      <circle cx="-5" cy="-5" r="4" fill="#FFA500" />
                      <circle cx="5" cy="-5" r="4" fill="#FFA500" />
                      <circle cx="-5" cy="5" r="4" fill="#FFA500" />
                      <circle cx="5" cy="5" r="4" fill="#FFA500" />
                    </g>
                    <g transform="translate(175, 25)">
                      <circle cx="0" cy="0" r="6" fill="#FFD700" />
                      <circle cx="-4" cy="-4" r="3" fill="#FFA500" />
                      <circle cx="4" cy="-4" r="3" fill="#FFA500" />
                      <circle cx="-4" cy="4" r="3" fill="#FFA500" />
                      <circle cx="4" cy="4" r="3" fill="#FFA500" />
                    </g>
                    <g transform="translate(45, 125)">
                      <circle cx="0" cy="0" r="6" fill="#FFD700" />
                      <circle cx="-4" cy="-4" r="3" fill="#FFA500" />
                      <circle cx="4" cy="-4" r="3" fill="#FFA500" />
                      <circle cx="-4" cy="4" r="3" fill="#FFA500" />
                      <circle cx="4" cy="4" r="3" fill="#FFA500" />
                    </g>
                  </svg>
                </div>

                {/* Lanterns - Small decorative */}
                <div className="absolute top-8 left-16 w-8 h-12 bg-yellow-500 rounded-full opacity-80" style={{ boxShadow: '0 4px 10px rgba(255,215,0,0.5)' }} />
                <div className="absolute top-12 left-24 w-10 h-14 bg-yellow-400 rounded-full opacity-90" style={{ boxShadow: '0 4px 12px rgba(255,215,0,0.6)' }} />

                {/* Main Text */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                  <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-300 to-yellow-500" style={{ fontFamily: 'cursive', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                    Chúc Mừng
                  </div>
                  <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-300 to-yellow-500 -mt-2" style={{ fontFamily: 'cursive', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                    Năm Mới
                  </div>
                  <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-600 mt-2" style={{ fontFamily: 'serif', textShadow: '3px 3px 6px rgba(0,0,0,0.4)' }}>
                    2025
                  </div>
                </div>

                {/* Dragon decoration - Bottom */}
                <div className="absolute -bottom-8 -right-4 w-48 h-32 opacity-50">
                  <svg viewBox="0 0 200 120" className="w-full h-full">
                    <path d="M 10 80 Q 40 60, 70 65 T 130 75 Q 160 80, 190 70 L 185 85 Q 155 95, 125 90 T 65 80 Q 35 75, 10 95 Z" fill="#FFA500" opacity="0.7" />
                    <circle cx="175" cy="65" r="8" fill="#FFD700" />
                    <path d="M 175 50 L 180 60 L 170 60 Z" fill="#FFD700" />
                  </svg>
                </div>

                {/* Cloud decorations */}
                <div className="absolute bottom-12 left-4 w-24 h-12">
                  <svg viewBox="0 0 100 50" className="w-full h-full">
                    <ellipse cx="25" cy="35" rx="20" ry="12" fill="white" opacity="0.9" />
                    <ellipse cx="45" cy="30" rx="22" ry="14" fill="white" opacity="0.9" />
                    <ellipse cx="65" cy="35" rx="20" ry="12" fill="white" opacity="0.9" />
                  </svg>
                </div>
                <div className="absolute bottom-8 left-32 w-20 h-10">
                  <svg viewBox="0 0 100 50" className="w-full h-full">
                    <ellipse cx="25" cy="35" rx="18" ry="10" fill="white" opacity="0.8" />
                    <ellipse cx="45" cy="30" rx="20" ry="12" fill="white" opacity="0.8" />
                    <ellipse cx="65" cy="35" rx="18" ry="10" fill="white" opacity="0.8" />
                  </svg>
                </div>

                {/* Peony flowers - Bottom Left */}
                <div className="absolute bottom-16 left-8 w-32 h-32 opacity-90">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Large flower */}
                    <circle cx="50" cy="50" r="20" fill="#DC143C" opacity="0.8" />
                    <circle cx="35" cy="40" r="12" fill="#DC143C" opacity="0.9" />
                    <circle cx="65" cy="40" r="12" fill="#DC143C" opacity="0.9" />
                    <circle cx="35" cy="60" r="12" fill="#DC143C" opacity="0.9" />
                    <circle cx="65" cy="60" r="12" fill="#DC143C" opacity="0.9" />
                    <circle cx="50" cy="50" r="8" fill="#FFD700" />
                  </svg>
                </div>
              </div>

              {/* Right Side - Beige Background with Content */}
              <div className="w-[45%] bg-gradient-to-br from-amber-50 to-orange-100 p-8 relative overflow-hidden">
                
                {/* Lanterns hanging */}
                <div className="absolute -top-2 left-8 flex gap-6">
                  {/* Lantern 1 */}
                  <div className="flex flex-col items-center">
                    <div className="w-1 h-8 bg-yellow-700" />
                    <div className="w-14 h-20 bg-gradient-to-b from-red-500 to-red-600 rounded-full relative shadow-lg">
                      <div className="absolute inset-x-2 top-3 bottom-3 border-2 border-yellow-400 rounded-full" />
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 w-4 h-4 bg-yellow-500 rounded-full" />
                    </div>
                  </div>
                  
                  {/* Flower decoration */}
                  <div className="flex flex-col items-center">
                    <div className="w-1 h-6 bg-yellow-700" />
                    <div className="w-12 h-12 relative">
                      <div className="absolute inset-0 bg-pink-400 rounded-full" />
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-yellow-300 rounded-full" />
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-4 h-4 bg-pink-300 rounded-full" />
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-4 h-4 bg-pink-300 rounded-full" />
                      <div className="absolute top-1/2 left-0 transform -translate-x-1 -translate-y-1/2 w-4 h-4 bg-pink-300 rounded-full" />
                      <div className="absolute top-1/2 right-0 transform translate-x-1 -translate-y-1/2 w-4 h-4 bg-pink-300 rounded-full" />
                    </div>
                  </div>
                  
                  {/* Lantern 2 */}
                  <div className="flex flex-col items-center">
                    <div className="w-1 h-8 bg-yellow-700" />
                    <div className="w-16 h-22 bg-gradient-to-b from-red-500 to-red-600 rounded-full relative shadow-lg">
                      <div className="absolute inset-x-2 top-3 bottom-3 border-2 border-yellow-400 rounded-full" />
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 w-4 h-4 bg-yellow-500 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Logo placeholder */}
                <div className="absolute top-6 right-6 w-16 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <div className="text-red-800 font-black text-xs text-center">LOGO<br/>HERE</div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full pt-24 pb-4">
                  {/* Title */}
                  <h2 className="text-3xl font-black text-red-600 text-center mb-6">Thư Chúc Tết</h2>

                  {/* Message Box */}
                  <div className="flex-1 bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-inner border border-orange-200">
                    <div className="text-gray-800 text-base leading-relaxed h-full overflow-auto">
                      {form.content || (
                        <div className="text-gray-500 italic">
                          Nhân dịp Năm mới, Công ty xin chân thành cảm ơn Quý Lãnh đạo, Quý Doanh nghiệp đã luôn đồng hành với Công ty trong suốt thời gian vừa qua.<br/><br/>
                          Mừng Xuân 202x, Công ty kính chúc Quý Lãnh đạo, Quý Doanh nghiệp đời đời sức khỏe, mã đáo thành công.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status badges */}
                  <div className="flex gap-2 justify-center mt-4">
                    <div className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                      {form.isPrivate ? "Riêng tư" : "Công khai"}
                    </div>
                    <div className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
                      {form.enableShare ? "Chia sẻ" : "Không share"}
                    </div>
                  </div>
                </div>

                {/* Bottom decorations - Banh chung and firecrackers */}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 opacity-90">
                  {/* Banh chung */}
                  <div className="absolute bottom-8 right-20 w-16 h-16 bg-green-600 transform rotate-45 rounded-lg">
                    <div className="absolute inset-2 bg-green-500 rounded-sm" />
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-yellow-600 transform -translate-y-1/2" />
                    <div className="absolute top-0 left-1/2 w-1 h-full bg-yellow-600 transform -translate-x-1/2" />
                  </div>
                  {/* Firecrackers */}
                  <div className="absolute bottom-4 right-8 flex gap-1">
                    <div className="w-3 h-12 bg-red-600 rounded-sm" />
                    <div className="w-3 h-12 bg-red-500 rounded-sm" />
                    <div className="w-3 h-12 bg-red-600 rounded-sm" />
                  </div>
                </div>

                {/* Bottom left decoration - plant */}
                <div className="absolute -bottom-2 left-4 w-20 h-24">
                  <svg viewBox="0 0 80 100" className="w-full h-full">
                    {/* Leaves */}
                    <ellipse cx="20" cy="70" rx="12" ry="25" fill="#22C55E" transform="rotate(-20 20 70)" />
                    <ellipse cx="40" cy="65" rx="14" ry="28" fill="#16A34A" />
                    <ellipse cx="60" cy="70" rx="12" ry="25" fill="#22C55E" transform="rotate(20 60 70)" />
                  </svg>
                </div>

                {/* Coin decoration */}
                <div className="absolute bottom-12 left-16 w-8 h-8 bg-yellow-500 rounded-full border-2 border-yellow-600 flex items-center justify-center shadow-lg">
                  <div className="w-4 h-4 border-2 border-yellow-700 rounded-full" />
                </div>

                {/* Flower decoration bottom */}
                <div className="absolute bottom-8 right-24 w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-yellow-300 rounded-full" />
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}