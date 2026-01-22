import { Routes, Route } from "react-router-dom";
import IntroPage from "../pages/User/intro/IntroPage";
import TetAuthPage from "../pages/User/auth/TetAuthPage";
import OAuth2Success from "../hooks/oauth2/OAuth2Success";
import Home from "../pages/User/Home/Home";
import MainLayout from "../components/tet/MainLayout";
import LiXiApp from "../pages/User/LiXi/LiXiApp";
import HoroscopeApp from "../pages/User/Horoscope/HoroscopeApp";
import ChoTetShop from "../pages/User/ChoTetShop/ChoTetShop";
import TetCardCreator from "../pages/User/TetCardCreator/TetCardCreator";
import TetOnlinePage from "../pages/User/BocLoc/TetOnlinePage";
import TetLeaderboardPage from "../pages/User/BangXepHang/TetLeaderboardPage";
import LeaderboardPage from "../pages/User/BangXepHang/TetLeaderboardPage";
import WishSharePage from "../pages/User/TetCardCreator/WishSharePage";
import AdminLayout from "../components/admin/AdminLayout";
import Dashboard from "../pages/admin/Dashboard/Dashboard";
import LuckyRewardAdmin from "../pages/admin/LuckyReward/LuckyRewardAdmin";
import ProfilePage from "../pages/admin/profile/ProfilePage";
import ShopAdminPage from "../pages/admin/ShopAdminPage/ShopAdminPage";
import MyHouse from "../pages/User/House/MyHouse";
import UserManagement from "../pages/admin/User/UserManagement";
import TetVirtualHouse from "../pages/User/House/TetVirtualHouse";
import AuthGuard from "./AuthGuard";
import RoleGuard from "./RoleGuard";
import Unauthorized from "../pages/Error/Unauthorized";
import NotFound from "../pages/Error/NotFound";
export default function AppRoutes() {
  return (
     <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<IntroPage />} />
      <Route path="/login" element={<TetAuthPage />} />
      <Route path="/oauth2/callback" element={<OAuth2Success />} />

      {/* AUTH REQUIRED */}
      <Route element={<AuthGuard />}>
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/lixi" element={<LiXiApp />} />
          <Route path="/tuvi" element={<HoroscopeApp />} />
          <Route path="/chotet" element={<ChoTetShop />} />
          <Route path="/taothiep" element={<TetCardCreator />} />
          <Route path="/bocloc" element={<TetOnlinePage />} />
          <Route path="/bangxephang" element={<LeaderboardPage />} />
          <Route path="/house" element={<TetVirtualHouse />} />
        </Route>
      </Route>

      {/* ADMIN ONLY */}
      <Route element={<AuthGuard />}>
        <Route element={<RoleGuard role="ROLE_ADMIN" />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/lucky-reward" element={<LuckyRewardAdmin />} />
            <Route path="/admin/profile" element={<ProfilePage />} />
            <Route path="/admin/shop" element={<ShopAdminPage />} />
            <Route path="/admin/customers" element={<UserManagement />} />
          </Route>
        </Route>
      </Route>

      {/* ERROR */}
      <Route path="/403" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
