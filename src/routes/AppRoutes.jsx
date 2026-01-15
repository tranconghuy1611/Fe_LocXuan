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
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<IntroPage />} />
      <Route path="/login" element={<TetAuthPage />} />
      <Route path="/oauth2/callback" element={<OAuth2Success />} />
      <Route element={<MainLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/lixi" element={<LiXiApp />} />
        <Route path="/tuvi" element={<HoroscopeApp />} />
        <Route path="/chotet" element={<ChoTetShop />} />
        <Route path="/taothiep" element={<TetCardCreator />} />
        <Route path="/bocloc" element={<TetOnlinePage />} />
        <Route path="/bangxephang" element={<LeaderboardPage />} />
      </Route>
    </Routes>
  );
}
