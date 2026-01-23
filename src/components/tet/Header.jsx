import { useAuthStore } from "../../store/auth.store";
import { Flame, Menu, X, LogOut, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const navigate = useNavigate();
  const menuRef = useRef(null);

  const { user, accessToken, logout } = useAuthStore();
  const isAuth = !!accessToken;

  // ✅ Click ngoài thì đóng dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenUserMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
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

        {/* USER MENU DESKTOP */}
        <div className="hidden md:flex items-center gap-4">
          {!isAuth ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded-full border border-red-500 text-red-500
                   hover:bg-red-50 transition"
              >
                Đăng nhập
              </button>

              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded-full bg-red-500 text-white
                   hover:bg-red-600 transition"
              >
                Bắt đầu ngay
              </button>
            </>
          ) : (
            <div ref={menuRef} className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenUserMenu((prev) => !prev);
                }}
                className="flex items-center gap-2 outline-none"
              >
                <img
                  src={user?.avatarUrl || "/default-avatar.png"}
                  alt="avatar"
                  className={`w-9 h-9 rounded-full object-cover transition
            ${openUserMenu ? "ring-2 ring-red-400" : ""}`}
                />

                <span className="font-medium hidden sm:block">
                  {user?.fullName || "User"}
                </span>

                <ChevronDown
                  size={16}
                  className={`transition ${openUserMenu ? "rotate-180" : ""}`}
                />
              </button>

              {openUserMenu && (
                <div
                  className="absolute right-0 mt-3 w-48 bg-white rounded-xl
                     shadow-lg border border-gray-100"
                >
                  <button
                    onClick={() => {
                      logout();
                      setOpenUserMenu(false);
                    }}
                    className="w-full px-4 py-3 flex items-center gap-2
                       text-red-500 hover:bg-red-50 rounded-xl"
                  >
                    Hồ sơ của tôi
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setOpenUserMenu(false);
                    }}
                    className="w-full px-4 py-3 flex items-center gap-2
                       text-red-500 hover:bg-red-50 rounded-xl"
                  >
                    <LogOut size={16} />
                    Đăng xuất
                  </button>

                </div>
              )}
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
              <button
                onClick={() => navigate("/login")}
                className="w-full py-2 border rounded-full"
              >
                Đăng nhập
              </button>
              <button
                onClick={() => navigate("/login")}
                className="w-full py-2 bg-red-500 text-white rounded-full"
              >
                Bắt đầu ngay
              </button>
            </>
          ) : (
            <button
              onClick={logout}
              className="w-full py-2 flex justify-center gap-2
                         text-red-500 border rounded-full"
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
