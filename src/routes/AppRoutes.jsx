import { Routes, Route } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";

/* ===== PUBLIC PAGES ===== */
import IntroPage from "../pages/User/intro/IntroPage";
import TetAuthPage from "../pages/User/auth/TetAuthPage";
import OAuth2Success from "../hooks/oauth2/OAuth2Success";
import WishSharePage from "../pages/User/TetCardCreator/WishSharePage";

/* ===== LAYOUT ===== */
import MainLayout from "../components/tet/MainLayout";
import AdminLayout from "../components/admin/AdminLayout";

/* ===== USER PAGES ===== */
import Home from "../pages/User/Home/Home";
import GioiThieuPage from "../pages/User/gioithieu/gioithieu";
import AboutPage from "../pages/User/About/about";
import HoatDongPage from "../pages/User/HoatDong/hoatdong";
import LiXiApp from "../pages/User/LiXi/LiXiApp";
import HoroscopeApp from "../pages/User/Horoscope/HoroscopeApp";
import ChoTetShop from "../pages/User/ChoTetShop/ChoTetShop";
import TetCardCreator from "../pages/User/TetCardCreator/TetCardCreator";
import TetOnlinePage from "../pages/User/BocLoc/TetOnlinePage";
import TetVirtualHouse from "../pages/User/House/TetVirtualHouse";
import ProfilePageUser from "../pages/User/profile/profile";
import LeaderboardPage from "../pages/User/BangXepHang/TetLeaderboardPage";
import InventoryPage from "../pages/User/Inventory/inventory";

/* ===== POLICY ===== */
import TermsPage from "../pages/User/Policy/term";
import PrivacyPage from "../pages/User/Privacy/privacy";

/* ===== ADMIN ===== */
import LuckyRewardAdmin from "../pages/admin/LuckyReward/LuckyRewardAdmin";
import ShopAdminPage from "../pages/admin/ShopAdminPage/ShopAdminPage";
import UserManagement from "../pages/admin/User/UserManagement";

/* ===== GUARDS ===== */
import AuthGuard from "./AuthGuard";
import RoleGuard from "./RoleGuard";

/* ===== ERROR ===== */
import Unauthorized from "../pages/Error/Unauthorized";
import NotFound from "../pages/Error/NotFound";

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* ===== PUBLIC ===== */}
        <Route path="/" element={<IntroPage />} />
        <Route path="/login" element={<TetAuthPage />} />
        <Route path="/oauth2/callback" element={<OAuth2Success />} />
        <Route path="/wish/share/:token" element={<WishSharePage />} />

        {/* ===== PUBLIC + MAIN LAYOUT ===== */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/gioithieu" element={<GioiThieuPage />} />
          <Route path="/vechungtoi" element={<AboutPage />} />
          <Route path="/dieukhoan" element={<TermsPage />} />
          <Route path="/baomat" element={<PrivacyPage />} />
        </Route>

        {/* ===== AUTH REQUIRED ===== */}
        <Route element={<AuthGuard />}>
          <Route element={<MainLayout />}>
            <Route path="/lixi" element={<LiXiApp />} />
            <Route path="/tuvi" element={<HoroscopeApp />} />
            <Route path="/chotet" element={<ChoTetShop />} />
            <Route path="/taothiep" element={<TetCardCreator />} />
            <Route path="/bocloc" element={<TetOnlinePage />} />
            <Route path="/bangxephang" element={<LeaderboardPage />} />
            <Route path="/house" element={<TetVirtualHouse />} />
            <Route path="/hoso" element={<ProfilePageUser />} />
            <Route path="/hoatdong" element={<HoatDongPage />} />
            <Route path="/khodo" element={<InventoryPage />} />
          </Route>
        </Route>

        {/* ===== ADMIN ONLY ===== */}
        <Route element={<AuthGuard />}>
          <Route element={<RoleGuard role="ROLE_ADMIN" />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/lucky-reward" element={<LuckyRewardAdmin />} />
              <Route path="/admin/profile" element={<ProfilePageUser />} />
              <Route path="/admin/shop" element={<ShopAdminPage />} />
              <Route path="/admin/customers" element={<UserManagement />} />
            </Route>
          </Route>
        </Route>

        {/* ===== ERROR ===== */}
        <Route path="/403" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
