import React, { useState, useEffect } from 'react';
import {
  Crown,
  TrendingUp,
  TrendingDown,
  Minus,
  Trophy,
  Gift,
  Target,
  Calendar,
  Sparkles,
  Award,
  Zap,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from "react-router-dom";
import api from '../../../services/api';
import "./TetLeaderboardPage.css"
export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRank, setUserRank] = useState(null);
  const [animateCards, setAnimateCards] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchAllData();
    setTimeout(() => setAnimateCards(true), 100);
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [leaderboardRes, transactionsRes, userRes] = await Promise.all([
        api.get('/leaderboard/top10'),
        api.get('/wallet/transactions'),
        api.get('/profile/me')
      ]);

      // Leaderboard
      if (leaderboardRes.data?.success) {
        const lbData = leaderboardRes.data.data || [];
        setLeaderboard(lbData);

        // Tính rank của user hiện tại
        if (userRes.data?.success && userRes.data?.data?.id) {
          const currentUserId = userRes.data.data.id;
          const rankIndex = lbData.findIndex(u => u.userId === currentUserId);
          setUserRank(rankIndex !== -1 ? rankIndex + 1 : null);
        }
      }

      // Transactions
      if (transactionsRes.data?.success) {
        setTransactions(transactionsRes.data.data || []);
      }

      // Current user
      if (userRes.data?.success) {
        setCurrentUser(userRes.data.data);
      }

      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);

      let errorMessage = 'Không thể tải dữ liệu. Vui lòng thử lại sau.';
      
      if (err.response) {
        const { status, data } = err.response;
        if (status === 401) {
          errorMessage = 'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.';
        } else if (status === 403) {
          errorMessage = 'Bạn không có quyền truy cập dữ liệu này.';
        } else if (status === 404) {
          errorMessage = 'Không tìm thấy tài nguyên.';
        } else if (data?.message) {
          errorMessage = data.message;
        }
      } else if (err.message?.includes('Network')) {
        errorMessage = 'Không kết nối được với server. Vui lòng kiểm tra mạng.';
      }

      setError(errorMessage);
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchAllData();
  };

  const top3 = leaderboard.slice(0, 3);
  const remaining = leaderboard.slice(3);

  // Avatar fallback
  const getAvatar = (user) => {
    if (!user) return 'https://ui-avatars.com/api/?name=User&background=random';
    return user.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName || 'User')}&background=random`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF6F4] via-[#FFE8E8] to-[#FFF6F4] text-gray-800">
      {/* Decorative Background */}
      {/* <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-20 left-10 text-5xl animate-bounce-slow">🏆</div>
        <div className="absolute top-40 right-20 text-4xl animate-bounce-slow delay-200">👑</div>
        <div className="absolute bottom-32 left-1/4 text-3xl animate-bounce-slow delay-400">⭐</div>
        <div className="absolute bottom-20 right-1/3 text-4xl animate-bounce-slow delay-300">🎖️</div>
      </div> */}

      <div className="relative z-10">
        {/* Header */}
        <section className="text-center pt-8 sm:pt-12 px-4 animate-fadeInUp">
          <div className="inline-block mb-4">
            <div className="flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full shadow-lg animate-pulse-slow">
              <Trophy className="w-6 h-6" />
              <span className="font-bold">Bảng Vàng Danh Dự</span>
              <Trophy className="w-6 h-6" />
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-4">
            Bảng Xếp Hạng Tết 2026
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-3 max-w-2xl mx-auto px-4">
            Cùng đua top để nhận lì xì may mắn đầu năm! Tích lũy điểm bằng cách tham gia các hoạt động ngày Tết.
          </p>

          <button
            onClick={handleRefresh}
            disabled={loading}
            className={`mt-4 px-4 py-2 bg-white text-red-600 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2 mx-auto ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-rotate' : ''}`} />
            <span className="text-sm font-medium">{loading ? 'Đang tải...' : 'Làm mới'}</span>
          </button>
        </section>

        {/* Error */}
        {error && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 text-red-800">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-medium">Có lỗi xảy ra</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-7xl mx-auto mt-8 sm:mt-12 px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
            
            {/* Left Sidebar */}
            <div className="lg:col-span-4 space-y-4 sm:space-y-6">
              {/* User Wallet Card */}
              {currentUser && (
                <div className={`bg-white rounded-2xl p-4 sm:p-6 shadow-lg card-hover ${animateCards ? 'animate-scaleIn' : 'opacity-0'}`}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-base sm:text-lg flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-yellow-500" />
                      Ví Của Tôi
                    </h3>
                    {userRank && (
                      <span className="text-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full font-semibold animate-pulse-slow">
                        HẠNG {userRank}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <img
                        src={getAvatar(currentUser)}
                        alt={currentUser.fullName}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full ring-4 ring-yellow-400 animate-pulse-slow"
                      />
                      {userRank && (
                        <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-red-500 to-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                          {userRank}
                        </div>
                      )}
                    </div>
                    
                    <h4 className="mt-3 font-semibold text-base sm:text-lg">
                      {currentUser.fullName}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      {currentUser.email || '—'}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6">
                    <StatBox 
                      value={currentUser.points?.toLocaleString() || '0'} 
                      label="TỔNG ĐIỂM" 
                      icon={<Trophy className="w-4 h-4" />} 
                    />
                    <StatBox 
                      value={transactions.length} 
                      label="GIAO DỊCH" 
                      icon={<Zap className="w-4 h-4" />} 
                    />
                  </div>

                  <button className="mt-6 w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 rounded-xl font-semibold hover:from-red-700 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                  onClick={()=>navigate("/bocloc")}>
                    <Gift className="w-5 h-5"  />
                    Bốc Lộc Ngay
                  </button>
                </div>
              )}
              {/* Recent Transactions */}
              {transactions.length > 0 && (
                <div className={`bg-white rounded-2xl p-4 sm:p-6 shadow-lg card-hover ${animateCards ? 'animate-scaleIn delay-200' : 'opacity-0'}`}>
                  <h3 className="font-semibold mb-4 flex items-center gap-2 text-base sm:text-lg">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    Lịch Sử Gần Đây
                  </h3>
                  
                  <div className="space-y-3">
                    {transactions.slice(0, 3).map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between py-2 border-b last:border-0">
                        <div className="flex-1">
                          <p className="text-sm font-medium line-clamp-1">{tx.description}</p>
                          <p className="text-xs text-gray-500">
                            {tx.createdAt 
                              ? new Date(tx.createdAt).toLocaleDateString('vi-VN', { year: 'numeric', month: 'short', day: 'numeric' })
                              : 'Gần đây'}
                          </p>
                        </div>
                        <span className={`text-sm font-bold ml-2 ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {tx.amount > 0 ? '+' : ''}{tx.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Leaderboard Main */}
            <div className={`lg:col-span-8 bg-white rounded-2xl shadow-lg p-4 sm:p-6 ${animateCards ? 'animate-fadeInUp delay-300' : 'opacity-0'}`}>
              {loading ? (
                <div className="flex flex-col justify-center items-center h-64 gap-3">
                  <RefreshCw className="w-8 h-8 text-red-500 animate-rotate" />
                  <p className="text-gray-500 text-sm">Đang tải bảng xếp hạng...</p>
                </div>
              ) : leaderboard.length === 0 ? (
                <div className="flex flex-col justify-center items-center h-64 gap-3">
                  <Trophy className="w-12 h-12 text-gray-300" />
                  <p className="text-gray-500">Chưa có dữ liệu xếp hạng</p>
                </div>
              ) : (
                <>
                  {/* Top 3 Podium */}
                  <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-8 sm:mb-10 items-end">
                    {top3[1] && (
                      <TopUser rank={2} user={top3[1]} color="bg-gradient-to-br from-gray-300 to-gray-400" height="h-20 sm:h-24" />
                    )}
                    {top3[0] && (
                      <TopUser rank={1} user={top3[0]} color="bg-gradient-to-br from-yellow-400 to-yellow-500" crown height="h-28 sm:h-32" />
                    )}
                    {top3[2] && (
                      <TopUser rank={3} user={top3[2]} color="bg-gradient-to-br from-orange-600 to-orange-700" height="h-16 sm:h-20" />
                    )}
                  </div>

                  {/* Table */}
                  {remaining.length > 0 && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs sm:text-sm">
                        <thead className="text-gray-500 bg-gray-50">
                          <tr className="border-b">
                            <th className="py-3 px-2 sm:px-4 text-left font-semibold">HẠNG</th>
                            <th className="px-2 sm:px-4 text-left font-semibold">THÀNH VIÊN</th>
                            <th className="px-2 sm:px-4 text-right font-semibold">ĐIỂM SỐ</th>
                            <th className="px-2 sm:px-4 text-right font-semibold hidden sm:table-cell">XU HƯỚNG</th>
                          </tr>
                        </thead>
                        <tbody>
                          {remaining.map((user, idx) => (
                            <RankRow 
                              key={user.userId} 
                              rank={idx + 4} 
                              user={user}
                              isCurrentUser={currentUser && user.userId === currentUser.id}
                            />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* <div className="text-center mt-6 text-xs sm:text-sm text-gray-500 hover:text-red-600 cursor-pointer transition-colors font-medium">
                    Xem toàn bộ bảng xếp hạng →
                  </div> */}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Sub-components (giữ nguyên nhưng thêm type an toàn hơn) */
function StatBox({ value, label, icon }) {
  return (
    <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-3 sm:p-4 text-center hover:shadow-md transition-shadow">
      <div className="flex items-center justify-center gap-1 mb-1">
        <span className="text-red-500">{icon}</span>
      </div>
      <div className="text-lg sm:text-xl font-bold text-red-600">{value}</div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
    </div>
  );
}

function Task({ title, point, done }) {
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-none hover:bg-gray-50 transition-colors px-2 rounded">
      <div className="flex-1">
        <p className={`font-medium text-sm ${done ? "line-through text-gray-400" : ""}`}>
          {title}
        </p>
        <span className="text-xs text-red-500 font-semibold">{point}</span>
      </div>
      <button className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
        done 
          ? 'bg-green-100 text-green-600 cursor-default' 
          : 'bg-gradient-to-r from-red-500 to-orange-500 text-white hover:shadow-lg'
      }`}>
        {done ? "✓ Hoàn thành" : "Làm ngay"}
      </button>
    </div>
  );
}

function TopUser({ rank, user, color, crown, height }) {
  const avatar = user.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=random`;
  
  return (
    <div className="text-center animate-scaleIn" style={{ animationDelay: `${rank * 0.1}s` }}>
      <div className="relative inline-block mb-3">
        {crown && (
          <Crown className="absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 text-yellow-400 w-6 h-6 sm:w-8 sm:h-8 animate-bounce-slow trophy-shadow" />
        )}
        <img
          src={avatar}
          alt={user.fullName}
          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full mx-auto border-4 border-white shadow-lg hover:scale-110 transition-transform"
        />
        <span className={`absolute -bottom-2 -right-1 ${
          rank === 1 ? 'bg-yellow-400' : rank === 2 ? 'bg-gray-400' : 'bg-orange-600'
        } text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-lg`}>
          {rank}
        </span>
      </div>

      <div className={`${color} ${height} rounded-xl shadow-lg hover:shadow-xl transition-all`} />
      <p className="font-semibold mt-2 text-sm sm:text-base line-clamp-1 px-1">{user.fullName}</p>
      <p className="text-xs sm:text-sm text-red-600 font-bold flex items-center justify-center gap-1">
        <Trophy className="w-3 h-3" />
        {user.points.toLocaleString()} điểm
      </p>
    </div>
  );
}

function RankRow({ rank, user, isCurrentUser }) {
  const avatar = user.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=random`;
  // Trend giả lập (bạn có thể lấy từ API nếu backend hỗ trợ)
  const trendUp = Math.random() > 0.5;
  const trendValue = Math.floor(Math.random() * 5) + 1;
  const showTrend = Math.random() > 0.3;

  return (
    <tr className={`border-b last:border-none hover:bg-red-50/50 transition-colors ${
      isCurrentUser ? 'bg-yellow-50/50 font-medium' : ''
    }`}>
      <td className="py-3 px-2 sm:px-4 font-semibold text-gray-700">
        <div className="flex items-center gap-1">
          #{rank}
          {isCurrentUser && <span className="text-yellow-500">⭐</span>}
        </div>
      </td>
      <td className="px-2 sm:px-4">
        <div className="flex items-center gap-2 sm:gap-3 py-3">
          <img
            src={avatar}
            alt={user.fullName}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white shadow"
          />
          <span className="font-medium line-clamp-1 text-sm sm:text-base">{user.fullName}</span>
        </div>
      </td>
      <td className="px-2 sm:px-4 text-right text-red-600 font-bold text-sm sm:text-base">
        {user.points.toLocaleString()}
      </td>
      <td className="px-2 sm:px-4 text-right hidden sm:table-cell">
        {showTrend ? (
          trendUp ? (
            <span className="text-green-600 flex justify-end items-center gap-1 font-medium">
              <TrendingUp size={14} /> +{trendValue}
            </span>
          ) : (
            <span className="text-red-600 flex justify-end items-center gap-1 font-medium">
              <TrendingDown size={14} /> -{trendValue}
            </span>
          )
        ) : (
          <Minus className="ml-auto text-gray-400" size={14} />
        )}
      </td>
    </tr>
  );
}