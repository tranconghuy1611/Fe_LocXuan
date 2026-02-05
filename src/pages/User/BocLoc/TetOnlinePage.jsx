import React, { useState } from 'react';
import { Gift, Calendar, X, Sparkles, Star, Heart } from 'lucide-react';
import "./TetOnlinePage.css";
import { bockLucky } from '../../../services/luckyDraw.service';

const TetOnlinePage = () => {
  const [reward, setReward] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const blessings = [
    "Chúc mừng năm mới! An khang thịnh vượng, vạn sự như ý!",
    "Năm mới tiền về đầy két, vàng đổ đầy nhà, tài lộc tràn đầy!",
    "Sức khỏe dồi dào, công việc hanh thông, gia đạo bình an!",
    "Phát tài phát lộc, vạn sự cát tường, hạnh phúc viên mãn!",
    "Xuân về đất trời đổi mới, chúc bạn luôn tràn đầy niềm vui!",
    "Năm mới may mắn liên tiếp, tài lộc kéo đến ầm ầm!",
    "Bước sang tuổi mới, chúc bạn luôn vui khỏe, hạnh phúc bên người thân!",
    "Vạn sự như ý, phát tài phát lộc, đại cát đại lợi!"
  ];

  const handleOpenEnvelope = async () => {
    if (loading) return;

    try {
      setLoading(true);
      setError("");

      const res = await bockLucky();

      setReward(res.data);
      setShowModal(true);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Có lỗi xảy ra, vui lòng thử lại";

      setError(msg);
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      {/* Decorative Elements - giảm opacity và size trên mobile */}
      <div className="absolute top-10 left-5 md:top-20 md:left-10 w-24 h-24 md:w-32 md:h-32 bg-red-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-5 md:bottom-20 md:right-10 w-32 h-32 md:w-40 md:h-40 bg-yellow-200/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 left-1/4 w-20 h-20 md:w-24 md:h-24 bg-orange-200/15 rounded-full blur-2xl"></div>

      {/* Floating Decorations - ẩn bớt trên mobile nhỏ */}
      <div className="absolute top-24 left-8 md:top-32 md:left-20 animate-float-slow hidden sm:block">
        <div className="text-3xl md:text-4xl">🏮</div>
      </div>
      <div className="absolute top-40 right-20 md:top-48 md:right-32 animate-float-slow-delay hidden sm:block">
        <div className="text-2xl md:text-3xl">🎋</div>
      </div>
      <div className="absolute bottom-24 left-1/3 animate-float-slow hidden sm:block">
        <div className="text-2xl md:text-3xl">🌸</div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-10 md:py-20">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left Content - Text + Button */}
          <div className="space-y-6 md:space-y-8 relative z-10 w-full">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-orange-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold shadow-sm border border-red-200">
              <Sparkles className="w-4 h-4" />
              RƯỚC LỘC ĐẦU NĂM
            </div>

            <div className="space-y-2 md:space-y-3">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="relative">
                  <Gift className="w-12 h-12 md:w-16 md:h-16 text-red-600" />
                  <div className="absolute -top-1 -right-1 w-5 h-5 md:w-6 md:h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-800 leading-tight">Hái Lộc</h1>
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent leading-tight">
                Nhận Quà Tết
              </h2>
            </div>

            <p className="text-base md:text-xl text-gray-600 leading-relaxed">
              Mỗi ngày chỉ được mở một bao lì xì — hàng ngàn phần quà may mắn đang chờ bạn!
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleOpenEnvelope}
                disabled={loading}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 md:px-10 md:py-5 rounded-2xl font-bold text-base md:text-lg hover:shadow-2xl transform hover:scale-105 transition flex items-center justify-center gap-3 shadow-xl relative overflow-hidden group flex-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 opacity-0 group-hover:opacity-100 transition"></div>
                <Gift className="w-5 h-5 md:w-6 md:h-6 relative z-10" />
                <span className="relative z-10">Bốc lộc ngay</span>
              </button>
              <button className="bg-white text-gray-700 px-8 py-4 md:px-10 md:py-5 rounded-2xl font-bold text-base md:text-lg hover:bg-gray-50 border-2 border-gray-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition transform hover:scale-105 flex-1">
                <Calendar className="w-5 h-5 md:w-6 md:h-6" />
                Lịch sử
              </button>
            </div>

            {/* Stats Cards - responsive grid */}
            <div className="grid grid-cols-3 gap-3 md:gap-4 pt-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 text-center shadow-lg border border-gray-100">
                <div className="text-2xl md:text-3xl font-black text-red-600">8.5K</div>
                <div className="text-xs text-gray-600 mt-1">Người tham gia</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 text-center shadow-lg border border-gray-100">
                <div className="text-2xl md:text-3xl font-black text-orange-600">2.3K</div>
                <div className="text-xs text-gray-600 mt-1">Quà đã trao</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 text-center shadow-lg border border-gray-100">
                <div className="text-2xl md:text-3xl font-black text-yellow-600">99%</div>
                <div className="text-xs text-gray-600 mt-1">Hài lòng</div>
              </div>
            </div>

            <div className="flex items-start gap-3 text-red-600 bg-red-50 px-4 py-3 rounded-xl border border-red-100 text-sm">
              <svg
                className="w-5 h-5 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>

              <div className="space-y-1">
                <span className="font-semibold block">
                  Quy tắc tham gia & giải thưởng
                </span>
                <ul className="list-disc list-inside text-red-500">
                  <li>Mỗi tài khoản chỉ được quay <b>1 lần mỗi ngày</b>.</li>
                  <li>Không cố tình spam hoặc quay lại sau khi đã hoàn tất lượt quay.</li>
                  <li>Không thực hiện hành vi phá hoại hoặc gây ảnh hưởng đến hệ thống.</li>
                  <li>Cảm ơn bạn đã tham gia văn minh ❤️</li>
                </ul>
              </div>
            </div>

          </div>

          {/* Right Content - Envelope */}
          <div className="relative flex justify-center items-center w-full min-h-[400px] md:min-h-[600px]">
            {/* Main Envelope - responsive size */}
            <button
              onClick={handleOpenEnvelope}
              className="relative transform hover:scale-105 transition-all duration-300 cursor-pointer group z-10 w-full max-w-[320px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[480px]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-600 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition"></div>

              <div className="relative aspect-[3/4] w-full bg-gradient-to-br from-red-600 via-red-700 to-red-800 rounded-3xl shadow-2xl flex flex-col items-center justify-center overflow-hidden border-6 md:border-8 border-yellow-500">
                {/* Decorative Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-6 left-6 md:top-10 md:left-10 text-4xl md:text-6xl">🐉</div>
                  <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 text-4xl md:text-6xl">🐉</div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl md:text-8xl opacity-5">福</div>
                </div>

                <div className="absolute top-0 left-0 right-0 h-16 md:h-24 bg-gradient-to-b from-yellow-500/20 to-transparent"></div>

                <div className="relative z-10 flex flex-col items-center gap-6 md:gap-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-yellow-300 rounded-full blur-xl animate-pulse"></div>
                    <div className="relative w-20 h-20 md:w-28 md:h-28 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition border-4 border-yellow-200">
                      <span className="text-4xl md:text-5xl animate-bounce-slow">💰</span>
                    </div>
                  </div>

                  <div className="text-center space-y-2 md:space-y-3">
                    <div className="text-yellow-200 text-4xl md:text-6xl font-black tracking-wider drop-shadow-2xl">
                      TẾT Bính Ngọ 2026
                    </div>
                    <div className="bg-yellow-400/20 backdrop-blur-sm px-5 py-2 md:px-6 md:py-3 rounded-full border-2 border-yellow-300/30">
                      <div className="text-yellow-100 text-base md:text-lg font-bold">Chạm để mở quà</div>
                    </div>
                  </div>
                </div>

                {/* Bottom decoration */}
                <div className="absolute bottom-0 left-0 right-0 w-full">
                  <div className="h-1.5 md:h-2 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300"></div>
                  <div className="bg-yellow-500/30 backdrop-blur-sm py-2 md:py-3 flex justify-center gap-3 md:gap-4">
                    <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-300 animate-pulse" />
                    <Heart className="w-4 h-4 md:w-5 md:h-5 text-yellow-300 animate-pulse delay-100" />
                    <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-300 animate-pulse delay-200" />
                  </div>
                </div>
              </div>
            </button>

            {/* Floating Elements - responsive */}
            <div className="absolute bottom-12 left-4 md:bottom-20 md:left-8 animate-float-slow hidden sm:block">
              <div className="w-16 h-16 md:w-20 h-20 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
                <span className="text-2xl md:text-3xl">💰</span>
              </div>
            </div>

            <div className="absolute top-20 left-4 md:top-32 md:left-4 animate-float-slow-delay hidden sm:block">
              <div className="w-12 h-12 md:w-16 h-16 bg-gradient-to-br from-pink-300 to-pink-400 rounded-full flex items-center justify-center shadow-lg border-3 border-white">
                <span className="text-xl md:text-2xl">🌸</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section - responsive */}
        <div className="mt-16 md:mt-24 grid md:grid-cols-3 gap-6 md:gap-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition transform hover:-translate-y-2">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-lg">
              <Gift className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-3">Quà tặng đa dạng</h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">Hàng ngàn phần quà hấp dẫn từ tiền mặt, voucher đến quà giá trị</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition transform hover:-translate-y-2">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-lg">
              <Sparkles className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-3">May mắn mỗi ngày</h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">Mỗi ngày một cơ hội mới để nhận quà và lời chúc ý nghĩa</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition transform hover:-translate-y-2">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-lg">
              <Star className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-3">Chia sẻ niềm vui</h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">Gửi lời chúc Tết đến bạn bè và người thân dễ dàng</p>
          </div>
        </div>
      </main>

      {/* Modal - responsive */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-gradient-to-br from-white to-red-50 rounded-2xl md:rounded-3xl max-w-md md:max-w-lg w-full p-6 md:p-10 relative animate-scale-in shadow-2xl border-4 border-red-200">

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-400 hover:text-gray-600 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <div className="text-center space-y-5 md:space-y-6">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                <div className="relative w-28 h-28 md:w-32 md:h-32 bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto shadow-2xl border-4 border-white">
                  <span className="text-5xl md:text-6xl animate-bounce-slow">
                    {reward?.rewardType === "points" && "⭐"}
                    {reward?.rewardType === "message" && "🧧"}
                    {reward?.rewardType === "sticker" && "🎁"}
                    {reward?.rewardType === "avatar" && "🖼️"}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-black text-gray-800 mb-2">
                  {reward?.rewardName || "Lộc đầu năm"}
                </h3>
                <div className="flex justify-center gap-2 mb-3 md:mb-4">
                  <div className="w-16 h-1 md:w-20 h-1.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 rounded-xl md:rounded-2xl p-6 md:p-8 border-4 border-red-200 shadow-inner min-h-[100px] md:min-h-[120px] flex items-center justify-center">
                {loading && (
                  <p className="text-lg md:text-xl font-semibold text-gray-500 animate-pulse">
                    ⏳ Đang bốc lộc...
                  </p>
                )}

                {!loading && error && (
                  <p className="text-lg md:text-xl font-semibold text-red-600">
                    ⚠️ {error}
                  </p>
                )}

                {!loading && reward && reward.rewardType === "points" && (
                  <div className="space-y-2 md:space-y-3">
                    <p className="text-3xl md:text-4xl font-black text-green-600">
                      +{reward.value} ⭐
                    </p>
                    <p className="text-base md:text-lg font-semibold text-gray-700">
                      {reward.message}
                    </p>
                  </div>
                )}

                {!loading && reward && reward.rewardType === "message" && (
                  <p className="text-lg md:text-2xl text-gray-700 font-semibold">
                    {reward.message}
                  </p>
                )}

                {!loading && reward && reward.rewardType === "sticker" && (
                  <p className="text-lg md:text-xl font-semibold text-purple-600">
                    🎁 Bạn đã nhận được sticker mới!
                  </p>
                )}

                {!loading && reward && reward.rewardType === "avatar" && (
                  <p className="text-lg md:text-xl font-semibold text-blue-600">
                    🖼️ Avatar mới đã được mở khóa!
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-white text-gray-700 px-6 py-3 md:py-4 rounded-xl font-bold hover:bg-gray-50 transition border-2 border-gray-200 shadow-lg transform hover:scale-105 text-base md:text-lg"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TetOnlinePage;