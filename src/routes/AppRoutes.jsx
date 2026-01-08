import { Routes, Route } from "react-router-dom";
import IntroPage from "../pages/User/intro/IntroPage";
import TetAuthPage from "../pages/User/auth/TetAuthPage";
import OAuth2Success from "../hooks/oauth2/OAuth2Success";
import Home from "../pages/User/Home/Home";
import MainLayout from "../components/tet/MainLayout";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<IntroPage />} />
      <Route path="/login" element={<TetAuthPage />} />
      <Route path="/oauth2/success" element={<OAuth2Success />} />
      <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
        </Route>
    </Routes>
  );
}
