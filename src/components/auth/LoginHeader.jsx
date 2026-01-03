import { Sparkles } from 'lucide-react';

export default function LoginHeader() {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full mb-4 shadow-lg animate-bounce">
        <Sparkles className="w-10 h-10 text-yellow-300" />
      </div>

      <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-2">
        Chào Mừng Xuân Mới
      </h1>

      <p className="text-gray-600 text-sm">
        Vạn sự như ý - An khang thịnh vượng
      </p>
    </div>
  );
}
