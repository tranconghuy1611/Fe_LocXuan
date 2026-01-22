import { Menu, Bell, Search, LogOut, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import TetCountdown from "./TetCountdown";
import { useAuthStore } from "../../store/auth.store";
import { useNavigate } from "react-router-dom";
export default function AdminHeader({ open, setOpen }) {
    const { user, logout } = useAuthStore();
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    // 👉 Click outside để đóng dropdown
    useEffect(() => {
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);
    const goProfile = () => {
        setShowMenu(false);
        navigate("/admin/profile");
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };
    return (
        <header className="h-16 bg-white flex items-center justify-between px-6 shadow-sm">
            {/* Left */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setOpen(!open)}
                    className="p-2 rounded hover:bg-gray-100"
                >
                    <Menu />
                </button>
                <h2 className="text-xl font-bold">Admin Dashboard</h2>
            </div>

            {/* Center */}
            <div className="hidden md:flex items-center bg-gray-50 px-4 py-2 rounded-xl border w-96">
                <Search size={18} className="text-gray-400" />
                <input
                    className="bg-transparent outline-none px-3 text-sm flex-1"
                    placeholder="Search orders, customers..."
                />
            </div>

            {/* Countdown */}
            <TetCountdown />

            {/* Right */}
            <div className="flex items-center gap-4">
                {/* Notification */}
                <button className="relative p-2 rounded hover:bg-gray-100">
                    <Bell />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>

                {/* User Dropdown */}
                <div className="relative" ref={menuRef}>
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-100"
                    >
                        <img
                            src={user?.avatarUrl || "/avatar-default.png"}
                            className="w-8 h-8 rounded-full object-cover"
                            alt="avatar"
                        />
                        <div className="text-left hidden md:block">
                            <p className="text-sm font-semibold">
                                {user?.fullName || "Admin"}
                            </p>
                            <p className="text-xs text-gray-500">
                                {user?.role || "Administrator"}
                            </p>
                        </div>
                    </button>

                    {/* Dropdown menu */}
                    {showMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-lg overflow-hidden z-50">
                            <button
                                onClick={goProfile}
                                className="w-full flex items-center gap-2 px-4 py-3 text-sm hover:bg-gray-50"
                            >
                                <User size={16} />
                                Hồ sơ cá nhân
                            </button>

                            <div className="h-px bg-gray-100" />

                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50"
                            >
                                <LogOut size={16} />
                                Đăng xuất
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
