import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5F5]">
      <Header />

      {/* Nội dung page */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
