import { Menu, Bell, Search } from "lucide-react"
import TetCountdown from "./TetCountdown";
export default function AdminHeader({ open, setOpen }) {
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
                <Bell />
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-yellow-400" />
                    <div className="text-sm">
                        <p className="font-semibold">Minh Anh</p>
                        <p className="text-xs text-gray-500">Store Manager</p>
                    </div>
                </div>
            </div>
        </header>
    )
}
