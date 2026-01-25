import { useAuthStore } from "../../store/auth.store";
import { Flame, Menu, X, LogOut, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openActivities, setOpenActivities] = useState(false);

  const navigate = useNavigate();
  const menuRef = useRef(null);

  const { user, accessToken, logout } = useAuthStore();
  const isAuth = !!accessToken;

  const ACTIVITIES = [
    { label: "Lì xì đầu năm", path: "/lixi" },
    { label: "Tử vi năm mới", path: "/tuvi" },
    { label: "Chợ Tết", path: "/chotet" },
    { label: "Tạo thiệp Tết", path: "/taothiep" },
    { label: "Bốc lộc", path: "/bocloc" },
  ];

  // Đóng dropdown user khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenUserMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Đóng menu mobile khi click link
  const handleNavigate = (path) => {
    navigate(path);
    setOpenMenu(false);
    setOpenActivities(false);
  };

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Flame className="text-red-600 w-8 h-8" />
          <span className="font-bold text-xl text-red-600">Tết Online</span>
        </div>

        {/* MENU DESKTOP */}
        <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <a href="/home" className="hover:text-red-600 transition-colors">Trang chủ</a>
          <a href="/gioithieu" className="hover:text-red-600 transition-colors">Giới thiệu</a>

          <div className="relative">
            <button
              onClick={() => setOpenActivities(!openActivities)}
              className="flex items-center gap-1 hover:text-red-600 transition-colors"
            >
              Hoạt động <ChevronDown size={14} className={`transition-transform ${openActivities ? "rotate-180" : ""}`} />
            </button>

            {openActivities && (
              <div className="absolute top-full left-0 mt-2 w-60 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                {ACTIVITIES.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setOpenActivities(false);
                    }}
                    className="w-full text-left px-5 py-3.5 hover:bg-red-50 text-gray-800 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a href="/about" className="hover:text-red-600 transition-colors">Về chúng tôi</a>
        </nav>

        {/* DESKTOP USER */}
        <div className="hidden md:flex items-center gap-4">
          {!isAuth ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-5 py-2 rounded-full border-2 border-red-600 text-red-600 hover:bg-red-50 transition-colors font-medium"
              >
                Đăng nhập
              </button>
              <button
                onClick={() => navigate("/login")}
                className="px-5 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors font-medium"
              >
                Bắt đầu ngay
              </button>
            </>
          ) : (
            <div ref={menuRef} className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenUserMenu(!openUserMenu);
                }}
                className="flex items-center gap-2.5 hover:opacity-90 transition-opacity"
              >
                <img
                  src={user?.avatarUrl || "/default-avatar.png"}
                  className="w-10 h-10 rounded-full object-cover border-2 border-red-100"
                  alt="avatar"
                />
                <span className="hidden lg:block font-medium text-gray-800">{user?.fullName}</span>
                <ChevronDown
                  size={18}
                  className={`text-gray-600 transition-transform ${openUserMenu ? "rotate-180" : ""}`}
                />
              </button>

              {openUserMenu && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => navigate("/bangxephang")}
                    className="w-full px-5 py-3.5 hover:bg-red-50 text-left transition-colors"
                  >
                    Bảng xếp hạng
                  </button>
                  <button
                    onClick={() => navigate("/hoso")}
                    className="w-full px-5 py-3.5 hover:bg-red-50 text-left transition-colors"
                  >
                    Hồ sơ của tôi
                  </button>
                  <button
                    onClick={logout}
                    className="w-full px-5 py-3.5 text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                  >
                    <LogOut size={18} /> Đăng xuất
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MOBILE RIGHT */}
        <div className="md:hidden flex items-center gap-4">
          {isAuth && (
            <div ref={menuRef} className="relative">
              <img
                src={user?.avatarUrl || "/default-avatar.png"}
                className="w-10 h-10 rounded-full object-cover border-2 border-red-100 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenUserMenu(!openUserMenu);
                }}
                alt="avatar"
              />

              {openUserMenu && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => navigate("/bangxephang")}
                    className="w-full px-5 py-3.5 hover:bg-red-50 text-left transition-colors"
                  >
                    Bảng xếp hạng
                  </button>
                  <button
                    onClick={() => navigate("/hoso")}
                    className="w-full px-5 py-3.5 hover:bg-red-50 text-left transition-colors"
                  >
                    Hồ sơ của tôi
                  </button>
                  <button
                    onClick={logout}
                    className="w-full px-5 py-3.5 text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                  >
                    <LogOut size={18} /> Đăng xuất
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Hamburger Button with animation */}
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="text-gray-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            {openMenu ? (
              <X className="w-8 h-8 transition-transform duration-300" />
            ) : (
              <Menu className="w-8 h-8 transition-transform duration-300" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU - Slide từ phải */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 ease-in-out ${
          openMenu ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
            openMenu ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpenMenu(false)}
        />

        {/* Menu panel */}
        <div
          className={`absolute top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
            openMenu ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Header của mobile menu */}
            <div className="flex items-center justify-between px-6 py-5 border-b">
              <div className="flex items-center gap-2">
                <Flame className="text-red-600 w-7 h-7" />
                <span className="font-bold text-lg text-red-600">Tết Online</span>
              </div>
              <button onClick={() => setOpenMenu(false)}>
                <X className="w-7 h-7 text-gray-700" />
              </button>
            </div>

            {/* Nội dung menu */}
            <div className="flex-1 px-6 py-8 space-y-6 overflow-y-auto">
              <a
                href="/home"
                className="block text-lg font-medium text-gray-800 hover:text-red-600 transition-colors"
                onClick={() => setOpenMenu(false)}
              >
                Trang chủ
              </a>
              <a
                href="/gioithieu"
                className="block text-lg font-medium text-gray-800 hover:text-red-600 transition-colors"
                onClick={() => setOpenMenu(false)}
              >
                Giới thiệu
              </a>

              {/* Dropdown Hoạt động */}
              <div>
                <button
                  onClick={() => setOpenActivities(!openActivities)}
                  className="w-full flex justify-between items-center text-lg font-medium text-gray-800 hover:text-red-600 transition-colors"
                >
                  Hoạt động
                  <ChevronDown
                    size={20}
                    className={`transition-transform ${openActivities ? "rotate-180" : ""}`}
                  />
                </button>

                {openActivities && (
                  <div className="mt-3 ml-4 space-y-4 border-l-2 border-red-200 pl-4">
                    {ACTIVITIES.map((item) => (
                      <button
                        key={item.path}
                        onClick={() => handleNavigate(item.path)}
                        className="block text-base text-gray-700 hover:text-red-600 transition-colors w-full text-left"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <a
                href="/about"
                className="block text-lg font-medium text-gray-800 hover:text-red-600 transition-colors"
                onClick={() => setOpenMenu(false)}
              >
                Về chúng tôi
              </a>

              {!isAuth && (
                <div className="pt-6 space-y-4">
                  <button
                    onClick={() => handleNavigate("/login")}
                    className="w-full py-3 border-2 border-red-600 text-red-600 rounded-full font-medium hover:bg-red-50 transition-colors"
                  >
                    Đăng nhập
                  </button>
                  <button
                    onClick={() => handleNavigate("/login")}
                    className="w-full py-3 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition-colors"
                  >
                    Bắt đầu ngay
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}