import TetDecorations from '@/components/auth/TetDecorations';
import LoginHeader from '@/components/auth/LoginHeader';
import LoginForm from '@/components/auth/LoginForm';
import SocialLogin from '@/components/auth/SocialLogin';
import { useLoginForm } from '@/hooks/useLoginForm';

export default function TetLoginPage() {
  const login = useLoginForm();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-500 to-orange-500 flex items-center justify-center p-4 relative overflow-hidden">
      <TetDecorations />

      <div className="relative w-full max-w-md">
        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-2xl blur-lg opacity-75 animate-pulse"></div>

        <div className="relative bg-white rounded-2xl shadow-2xl p-8">
          <LoginHeader />
          <LoginForm {...login} />
          <div className="my-6 border-t" />
          <SocialLogin />

          <p className="text-center text-xs text-gray-500 mt-6 italic">
            "Xuân về niềm vui đến, Phúc lộc dồi dào tràn"
          </p>
        </div>
      </div>
    </div>
  );
}
