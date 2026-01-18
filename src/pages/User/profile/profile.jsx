import React, { useState, useEffect } from 'react';
import {
  User,
  Trophy,
  Gift,
  Sparkles,
  Calendar,
  Award,
  Zap,
  RefreshCw,
  AlertCircle,
  Quote,
  Heart,
  Star,
  Edit,
  Crown,
  X
} from 'lucide-react';

import api from '../../../services/api';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animate, setAnimate] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: '',
    favoriteQuote: '',
    avatarUrl: ''
  });
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    fetchProfileData();
    setTimeout(() => setAnimate(true), 100);
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [profileRes, transactionsRes] = await Promise.all([
        api.get('/profile/me'),
        api.get('/wallet/transactions')
      ]);

      if (profileRes.data?.success) {
        setUser(profileRes.data.data);
      }

      if (transactionsRes.data?.success) {
        setTransactions(transactionsRes.data.data || []);
      }

      setLoading(false);
    } catch (err) {
      console.error('Error fetching profile:', err);

      let errorMessage = 'Không thể tải thông tin hồ sơ. Vui lòng thử lại sau.';
      if (err.response) {
        const { status, data } = err.response;
        if (status === 401) errorMessage = 'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.';
        else if (status === 403) errorMessage = 'Bạn không có quyền truy cập.';
        else if (data?.message) errorMessage = data.message;
      } else if (err.message?.includes('Network')) {
        errorMessage = 'Không kết nối được server. Kiểm tra mạng nhé!';
      }

      setError(errorMessage);
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchProfileData();
  };

  const handleEditClick = () => {
    setEditForm({
      fullName: user?.fullName || '',
      favoriteQuote: user?.favoriteQuote || '',
      avatarUrl: user?.avatarUrl || ''
    });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditForm({ fullName: '', favoriteQuote: '', avatarUrl: '' });
  };

  const handleUpdateProfile = async () => {
    try {
      setUpdateLoading(true);
      setError(null);

      const response = await api.put('/profile/me', editForm);

      if (response.data?.success) {
        setUser(response.data.data);
        setIsEditing(false);
        setEditForm({ fullName: '', favoriteQuote: '', avatarUrl: '' });
      }
      setUpdateLoading(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      let errorMessage = 'Không thể cập nhật hồ sơ. Vui lòng thử lại.';
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      setError(errorMessage);
      setUpdateLoading(false);
    }
  };

  const getAvatar = (userData) => {
    if (!userData) return 'https://ui-avatars.com/api/?name=User&background=random';
    return userData.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.fullName || 'User')}&background=random`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF6F4] via-[#FFE8E8] to-[#FFF6F4] text-gray-800 pb-12">
      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
        @keyframes pulse-slow { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.04); } }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .animate-fadeInUp { animation: fadeInUp 0.7s ease-out forwards; }
        .animate-scaleIn { animation: scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 3.5s ease-in-out infinite; }
        .animate-rotate { animation: rotate 2s linear infinite; }

        .card-hover:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 16px 32px rgba(239, 68, 68, 0.15);
        }

        .gradient-text {
          background: linear-gradient(135deg, #ef4444, #f97316, #eab308);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      {/* Decorative Tết elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-25">
        <div className="absolute top-16 left-8 text-6xl animate-bounce-slow">🏮</div>
        <div className="absolute top-40 right-12 text-5xl animate-bounce-slow delay-200">🍊</div>
        <div className="absolute bottom-24 left-1/3 text-4xl animate-bounce-slow delay-300">🎊</div>
        <div className="absolute bottom-16 right-20 text-5xl animate-bounce-slow delay-100">🧧</div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">

        {/* Header */}
        <section className="text-center mb-10 animate-fadeInUp">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full shadow-lg animate-pulse-slow mb-4">
            <Sparkles className="w-5 h-5" />
            <span className="font-bold text-lg">Hồ Sơ Tết 2026</span>
            <Sparkles className="w-5 h-5" />
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold gradient-text mb-3">
            Chào mừng năm mới!
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Chúc bạn một năm mới an khang, thịnh vượng và thật nhiều lì xì đỏ!
          </p>

          <button
            onClick={handleRefresh}
            disabled={loading}
            className={`mt-5 px-5 py-2.5 bg-white text-red-600 rounded-full shadow hover:shadow-lg transition-all flex items-center gap-2 mx-auto ${
              loading ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-rotate' : ''}`} />
            <span>{loading ? 'Đang tải...' : 'Làm mới'}</span>
          </button>
        </section>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-5 flex items-center gap-3 text-red-800 mb-8">
            <AlertCircle className="w-6 h-6 flex-shrink-0" />
            <div>
              <p className="font-medium">Có lỗi xảy ra</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <RefreshCw className="w-10 h-10 text-red-500 animate-rotate mb-4" />
            <p className="text-gray-500">Đang tải hồ sơ của bạn...</p>
          </div>
        ) : user ? (
          <div className="space-y-6 sm:space-y-8">

            {/* Profile Card chính */}
            <div className={`bg-white rounded-3xl p-6 sm:p-8 shadow-xl card-hover animate-scaleIn`}>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
                <div className="relative">
                  <img
                    src={getAvatar(user)}
                    alt={user.fullName}
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover ring-4 ring-yellow-400 shadow-lg animate-pulse-slow"
                  />
                  <div className="absolute -bottom-3 -right-3 bg-gradient-to-br from-red-500 to-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg border-2 border-white">
                    <Trophy size={20} />
                  </div>
                </div>

                <div className="text-center sm:text-left flex-1">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
                    {user.fullName}
                  </h2>
                  <p className="text-gray-500 mb-4 flex items-center justify-center sm:justify-start gap-1.5">
                    <Award size={16} className="text-yellow-600" />
                    {user.email}
                  </p>

                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-100 to-orange-100 px-5 py-2.5 rounded-full mb-5">
                    <Crown className="text-yellow-600" size={20} />
                    <span className="font-bold text-xl text-yellow-700">
                      {user.points?.toLocaleString() || 0} điểm
                    </span>
                  </div>

                  {user.favoriteQuote && (
                    <div className="bg-red-50/60 border border-red-100 rounded-2xl p-5 italic text-red-700 relative">
                      <Quote className="absolute -top-3 -left-2 text-red-300 w-8 h-8 opacity-40" />
                      <p className="text-base leading-relaxed">
                        "{user.favoriteQuote}"
                      </p>
                      <Heart className="absolute -bottom-3 -right-2 text-red-300 w-6 h-6 opacity-60" />
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
                <MiniStat icon={<Gift size={20} />} value={user.points?.toLocaleString() || '0'} label="Tổng điểm" color="text-red-600" />
                <MiniStat icon={<Zap size={20} />} value={transactions.length} label="Giao dịch" color="text-orange-600" />
                <MiniStat icon={<Star size={20} />} value="Tết 2026" label="Mùa" color="text-yellow-600" />
              </div>

              <button 
                onClick={handleEditClick}
                className="mt-8 w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-3.5 rounded-2xl font-semibold hover:from-red-700 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transform hover:scale-[1.02]"
              >
                <Edit size={18} />
                Chỉnh sửa hồ sơ
              </button>
            </div>

            {/* Lịch sử giao dịch */}
            {transactions.length > 0 && (
              <div className={`bg-white rounded-3xl p-6 sm:p-8 shadow-xl card-hover animate-scaleIn delay-100`}>
                <h3 className="text-xl font-bold mb-5 flex items-center gap-2">
                  <Calendar className="text-blue-600" />
                  Lịch sử giao dịch gần đây
                </h3>

                <div className="space-y-4">
                  {transactions.slice(0, 6).map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between py-3 border-b last:border-0 hover:bg-gray-50 rounded-lg px-3 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 line-clamp-1">{tx.description}</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {tx.createdAt
                            ? new Date(tx.createdAt).toLocaleString('vi-VN', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })
                            : 'Gần đây'}
                        </p>
                      </div>
                      <span
                        className={`font-bold text-lg ml-4 ${
                          tx.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {tx.amount > 0 ? '+' : ''}{tx.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Call-to-action vui Tết */}
            <div className="text-center mt-10">
              <button className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all">
                <Gift size={24} />
                Nhận thêm lì xì ngay!
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            <User size={64} className="mx-auto mb-4 opacity-50" />
            <p>Không tìm thấy thông tin hồ sơ</p>
          </div>
        )}

        {/* Modal chỉnh sửa hồ sơ */}
        {isEditing && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeInUp">
            <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl animate-scaleIn max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold gradient-text flex items-center gap-2">
                  <Edit size={24} />
                  Chỉnh sửa hồ sơ
                </h3>
                <button
                  onClick={handleCancelEdit}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    value={editForm.fullName}
                    onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                    placeholder="Nguyễn Văn A"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Câu châm ngôn Tết yêu thích 🧧
                  </label>
                  <textarea
                    value={editForm.favoriteQuote}
                    onChange={(e) => setEditForm({ ...editForm, favoriteQuote: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all resize-none"
                    rows="3"
                    placeholder="Ví dụ: An khang thịnh vượng, vạn sự như ý..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Avatar
                  </label>
                  <input
                    type="text"
                    value={editForm.avatarUrl}
                    onChange={(e) => setEditForm({ ...editForm, avatarUrl: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>

                {editForm.avatarUrl && (
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-2">Xem trước avatar:</p>
                    <img
                      src={editForm.avatarUrl}
                      alt="Preview"
                      className="w-20 h-20 rounded-full mx-auto object-cover ring-2 ring-yellow-400"
                      onError={(e) => {
                        e.target.src = 'https://ui-avatars.com/api/?name=User&background=random';
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={handleCancelEdit}
                  disabled={updateLoading}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all disabled:opacity-50"
                >
                  Hủy
                </button>
                <button
                  onClick={handleUpdateProfile}
                  disabled={updateLoading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-semibold hover:from-red-700 hover:to-orange-700 transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {updateLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-rotate" />
                      Đang lưu...
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} />
                      Lưu thay đổi
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MiniStat({ icon, value, label, color }) {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
      <div className={`mx-auto mb-2 ${color}`}>{icon}</div>
      <div className="text-xl font-bold text-gray-800">{value}</div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
    </div>
  );
}