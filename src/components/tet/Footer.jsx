import { Flame } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-20">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Logo */}
        <div className="flex items-center gap-2 text-red-500 font-bold">
          <Flame />
          <span>Tết Online</span>
        </div>

        {/* Links */}
        <div className="flex gap-6 text-gray-600 text-sm">
          <a href="/terms" className="hover:text-red-500">Điều khoản</a>
          <a href="/privacy" className="hover:text-red-500">Bảo mật</a>
          <a href="/contact" className="hover:text-red-500">Liên hệ</a>
        </div>

        {/* Copyright */}
        <p className="text-gray-400 text-sm">
          © 2026 Tết Online. All rights reserved.
        </p>

      </div>
    </footer>
  );
}
