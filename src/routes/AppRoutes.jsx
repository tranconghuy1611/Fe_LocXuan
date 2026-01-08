import { Routes, Route } from "react-router-dom";
import IntroPage from "../pages/User/intro/IntroPage";
import TetAuthPage from "../pages/User/auth/TetAuthPage";
import OAuth2Success from "../hooks/oauth2/OAuth2Success";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<IntroPage />} />
      <Route path="/" element={<TetAuthPage />} />
      <Route path="/oauth2/success" element={<OAuth2Success />} />
    </Routes>
  );
}
