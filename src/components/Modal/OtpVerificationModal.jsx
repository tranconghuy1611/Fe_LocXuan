import React, { useState } from 'react';
import { X, ShieldCheck } from 'lucide-react';

export default function OtpVerificationModal({
  isOpen,
  onClose,
  email,
  isVerifying,
  onVerify,   // async (code) => Promise<boolean>
  onResend,
}) {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (otp.length < 4) {
      setError('Vui lòng nhập đủ 4-6 số');
      return;
    }

    const success = await onVerify(otp);
    if (!success) {
      setError('Mã xác thực không đúng hoặc đã hết hạn');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-fadeIn">
        <div className="bg-gradient-to-r from-red-600 to-orange-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-yellow-200 transition"
            aria-label="Đóng"
          >
            <X size={24} />
          </button>
          <div className="flex items-center gap-3">
            <ShieldCheck size={32} className="text-yellow-300" />
            <h2 className="text-2xl font-bold">Xác thực tài khoản</h2>
          </div>
          <p className="mt-2 text-yellow-100 text-sm">
            Mã xác thực đã được gửi đến <strong>{email}</strong>
          </p>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nhập mã xác thực (OTP)
              </label>
              <input
                type="text"
                value={otp}
                onChange={handleChange}
                className="w-full px-4 py-3 text-center text-2xl font-bold tracking-widest border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none transition"
                placeholder="______"
                maxLength={6}
                required
                autoFocus
              />
              {error && <p className="mt-2 text-red-600 text-sm text-center">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={isVerifying || otp.length < 4}
              className={`w-full py-3 px-4 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg font-semibold shadow-lg transition-all flex items-center justify-center gap-2 ${
                isVerifying || otp.length < 4 ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-xl hover:-translate-y-0.5'
              }`}
            >
              {isVerifying ? 'Đang xác thực...' : (<><ShieldCheck size={20} /> Xác thực ngay</>)}
            </button>

            <div className="text-center text-sm text-gray-600">
              Không nhận được mã?{' '}
              <button
                type="button"
                className="text-red-600 hover:underline font-medium"
                onClick={onResend}
              >
                Gửi lại
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}