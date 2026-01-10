import React, { useState } from 'react';
import { Sparkles, Mail, Lock, Eye, EyeOff, User, Phone } from 'lucide-react';
import { useTetAuth } from '../../../hooks/auth/useTetAuth';
import OAuth2Success from '../../../hooks/oauth2/OAuth2Success';
import OtpVerificationModal from '../../../components/Modal/OtpVerificationModal';

export default function TetAuthPage() {
  const {
    isLogin,
    showPassword,
    showConfirmPassword,
    loginData,
    registerData,

    showOtp,
    verifying,
    pendingEmail,

    setIsLogin,
    setShowPassword,
    setShowConfirmPassword,
    setLoginData,
    setRegisterData,
    setShowOtp,

    handleLoginSubmit,
    handleRegisterSubmit,
    handleVerifyOtp,
    handleResendOtp,
  } = useTetAuth();


  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-500 to-orange-500 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Fireworks effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-ping"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-5xl flex items-center justify-center gap-8">
        {/* Left: Tết greetings (hidden on mobile) */}
        <div className="hidden lg:block flex-1 text-white">
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="text-9xl mb-4 animate-bounce">🧧</div>
              <div className="flex justify-center gap-4 text-6xl">
                <span className="animate-pulse">🌸</span>
                <span className="animate-pulse delay-200">🎋</span>
                <span className="animate-pulse delay-500">🏮</span>
              </div>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white border-opacity-30">
              <h2 className="text-4xl font-bold mb-4 text-yellow-300">Xuân Ất Tỵ 2025</h2>
              <div className="space-y-3 text-lg">
                <p className="flex items-center gap-2"><span className="text-2xl">🎊</span> <span className="text-yellow-300">Vạn sự như ý</span></p>
                <p className="flex items-center gap-2"><span className="text-2xl">💰</span> <span className="text-yellow-300">Tài lộc đầy nhà</span></p>
                <p className="flex items-center gap-2"><span className="text-2xl">🏆</span> <span className="text-yellow-300">Thành công rực rỡ</span></p>
                <p className="flex items-center gap-2"><span className="text-2xl">❤️</span> <span className="text-yellow-300">An khang thịnh vượng</span></p>
                <p className="flex items-center gap-2"><span className="text-2xl">🌟</span> <span className="text-yellow-300">Phát tài phát lộc</span></p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-red-700 border-4 border-yellow-400 rounded-lg p-4 inline-block">
                <p className="text-yellow-300 text-xl font-bold italic">
                  Xuân về muôn nơi hân hoan<br />
                  Phúc lộc đầy nhà, niềm vui tràn lan
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Auth Form */}
        <div className="relative w-full max-w-md lg:max-w-sm">
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-2xl blur-lg opacity-75 animate-pulse" />

          <div className="relative bg-white rounded-2xl shadow-2xl p-6 backdrop-blur-sm">
            {/* Toggle Login/Register */}
            <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 rounded-lg font-semibold transition-all text-sm ${isLogin
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                Đăng nhập
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 rounded-lg font-semibold transition-all text-sm ${!isLogin
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                Đăng ký
              </button>
            </div>

            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full mb-3 shadow-lg">
                <Sparkles className="w-8 h-8 text-yellow-300" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-1">
                {isLogin ? 'Đăng Nhập' : 'Đăng Ký'}
              </h1>
              <p className="text-gray-600 text-xs">
                {isLogin ? 'Chúc mừng năm mới!' : 'Tạo tài khoản mới'}
              </p>
            </div>

            {/* Forms */}
            {isLogin ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      className="w-full pl-10 pr-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
                      placeholder="example@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Mật khẩu</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className="w-full pl-10 pr-10 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="w-3 h-3 text-red-600 rounded border-gray-300" />
                    <span className="ml-2 text-gray-600">Ghi nhớ</span>
                  </label>
                  <a href="#" className="text-red-600 hover:text-red-700 font-medium">Quên mật khẩu?</a>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-2.5 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-sm flex items-center justify-center gap-2 group"
                >
                  <span>🎊 Đăng Nhập 🎊</span>
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-3">
                {/* All register fields with fixed onChange */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Họ và tên</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      value={registerData.fullName}
                      onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
                      className="w-full pl-10 pr-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none"
                      placeholder="Nguyễn Văn A"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      className="w-full pl-10 pr-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none"
                      placeholder="example@email.com"
                      required
                    />
                  </div>
                </div>


                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Mật khẩu</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      className="w-full pl-10 pr-10 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none"
                      placeholder="••••••••"
                      required
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Xác nhận mật khẩu</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      className="w-full pl-10 pr-10 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none"
                      placeholder="••••••••"
                      required
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-2">
                  <input type="checkbox" className="mt-0.5 w-3 h-3 text-red-600 rounded" required />
                  <label className="text-xs text-gray-600">
                    Tôi đồng ý với <a href="#" className="text-red-600 hover:text-red-700 font-medium">Điều khoản</a>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-2.5 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-sm"
                >
                  🎊 Đăng Ký Ngay 🎊
                </button>
              </form>
            )}

            {/* Divider & Social Login */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-gray-500">Hoặc</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {/* GOOGLE */}
              <button
                onClick={() =>
                  window.location.href = "http://localhost:8080/oauth2/authorization/google"
                }
                className="flex items-center justify-center px-3 py-2 border-2 border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors"
              >
                <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#4285F4" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#34A853" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="text-xs font-medium text-gray-700">Google</span>
              </button>

              {/* FACEBOOK (nếu có sau này) */}
              <button className="flex items-center justify-center px-3 py-2 border-2 border-gray-200 rounded-lg">
                Facebook
              </button>
            </div>

          </div>
        </div>
      </div>
      <OtpVerificationModal
        isOpen={showOtp}
        email={pendingEmail}
        isVerifying={verifying}
        onClose={() => setShowOtp(false)}
        onVerify={handleVerifyOtp}
        onResend={handleResendOtp}
      />

    </div>
  );
}