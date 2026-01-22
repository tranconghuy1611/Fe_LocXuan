import {
  LayoutDashboard,
  Boxes,
  ShoppingCart,
  Users,
  Gift,
  BarChart3,
  Settings
} from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"

const menus = [
  { label: "Lucky Reward", icon: Boxes, path: "/admin/lucky-reward" },
  { label: "Shop", icon: ShoppingCart, path: "/admin/shop" },
  { label: "Customers", icon: Users, path: "/admin/customers" },
  { label: "Settings", icon: Settings, path: "/admin/settings" },
]

export default function AdminSidebar({ open }) {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <aside
      className={`bg-[#9B0000] text-white transition-all duration-300
      ${open ? "w-64" : "w-20"}`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center gap-3 px-5 border-b border-red-800">
        <div className="w-8 h-8 rounded-full bg-yellow-400" />
        {open && (
          <div>
            <h1 className="font-bold leading-4">Tet Manager</h1>
            <p className="text-xs opacity-70">Business Portal</p>
          </div>
        )}
      </div>

      {/* Menu */}
      <nav className="mt-6 space-y-2 px-3">
        {menus.map((item, i) => {
          const active = location.pathname === item.path

          return (
            <div
              key={i}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer
                transition
                ${active ? "bg-red-700" : "hover:bg-red-600"}
              `}
            >
              <item.icon size={20} />
              {open && <span>{item.label}</span>}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
