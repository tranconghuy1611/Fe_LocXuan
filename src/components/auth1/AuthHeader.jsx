import { Sparkles } from 'lucide-react';

export default function AuthHeader({ isLogin }) {
  return (
    <div className="text-center mb-6">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full mb-3 shadow-lg">
        <Sparkles className="w-8 h-8 text-yellow-300" />
      </div>

      <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
        {isLogin ? 'Đăng Nhập' : 'Đăng Ký'}
      </h1>

      <p className="text-gray-600 text-xs">
        {isLogin ? 'Chúc mừng năm mới!' : 'Tạo tài khoản mới'}
      </p>
    </div>
  );
}
