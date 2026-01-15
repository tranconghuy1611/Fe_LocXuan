import { useAuthStore } from "../../store/auth.store";
import { Flame, Menu, X, User, LogOut } from "lucide-react";
import { useState,useEffect } from "react";
import { getMyProfile } from "../../services/profile";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
const navigate = useNavigate();

  const { user, accessToken, logout } = useAuthStore();

  const isAuth = !!accessToken;

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center gap-2">
          <Flame className="text-red-500" />
          <span className="font-bold text-lg text-red-500">
            Tết Online
          </span>
        </div>

        {/* MENU DESKTOP */}
        <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <a href="/home" className="hover:text-red-500">Trang chủ</a>
          <a href="gioithieu" className="hover:text-red-500">Giới thiệu</a>
          <a href="/activities" className="hover:text-red-500">Hoạt động</a>
          <a href="/about" className="hover:text-red-500">Về chúng tôi</a>
        </nav>

        {/* ACTION DESKTOP */}
        <div className="hidden md:flex items-center gap-3">
          {!isAuth ? (
            <>
              <button onClick={()=>navigate("/login")}
               className="px-4 py-2 rounded-full border hover:border-red-500 hover:text-red-500">
                Đăng nhập
              </button>
              <button className="px-5 py-2 rounded-full bg-red-500 text-white font-semibold">
                Bắt đầu ngay
              </button>
            </>
          ) : (
            <div className="relative group">
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="flex items-center gap-2 cursor-pointer">
                  <img
                    src={user?.avatarUrl || "/default-avatar.png"}
                    alt="avatar"
                    className="w-9 h-9 rounded-full object-cover border border-red-200"
                  />
                  <span className="font-medium">
                    {user?.fullName || "User"}
                  </span>
                </div>

              </div>

              {/* DROPDOWN */}
              <div className="absolute right-0 mt-3 w-40 bg-white shadow-lg rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition">
                <button
                  onClick={logout}
                  className="w-full px-4 py-2 flex items-center gap-2 hover:bg-red-50 text-red-500 rounded-xl"
                >
                  <LogOut size={16} />
                  Đăng xuất
                </button>
              </div>
            </div>
          )}
        </div>

        {/* HAMBURGER */}
        <button
          className="md:hidden"
          onClick={() => setOpenMenu(!openMenu)}
        >
          {openMenu ? <X /> : <Menu />}
        </button>
      </div>

      {/* MENU MOBILE */}
      {openMenu && (
        <div className="md:hidden bg-white border-t px-6 py-4 space-y-4">
          <a href="/" className="block">Trang chủ</a>
          <a href="/activities" className="block">Hoạt động</a>
          <a href="/about" className="block">Về chúng tôi</a>

          {!isAuth ? (
            <>
              <button onClick={()=>navigate("/login")}
               className="w-full py-2 border rounded-full">
                Đăng nhập
              </button>
              <button onClick={()=>navigate("/login")}
               className="w-full py-2 bg-red-500 text-white rounded-full">
                Bắt đầu ngay
              </button>
            </>
          ) : (
            <button
              onClick={logout}
              className="w-full py-2 flex justify-center gap-2 text-red-500 border rounded-full"
            >
              <LogOut size={16} />
              Đăng xuất
            </button>
          )}
        </div>
      )}
    </header>
  );
}
