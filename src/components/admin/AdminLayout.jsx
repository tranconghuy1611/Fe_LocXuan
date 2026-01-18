import { useState } from "react"
import { Outlet } from "react-router-dom"
import AdminSidebar from "./AdminSidebar"
import AdminHeader from "./AdminHeader"

export default function AdminLayout() {
  const [open, setOpen] = useState(true)

  return (
    <div className="flex h-screen bg-[#FFF9F3]">
      {/* Sidebar */}
      <AdminSidebar open={open} />

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <AdminHeader open={open} setOpen={setOpen} />

        <main className="flex-1 p-6 overflow-y-auto">
          {/* 👇 ROUTE CON RENDER Ở ĐÂY */}
          <Outlet />
        </main>
      </div>
    </div>
  )
}
