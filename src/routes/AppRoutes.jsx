import { Routes, Route } from "react-router-dom";
import IntroPage from "../pages/User/intro/IntroPage";
import TetAuthPage from "../pages/User/auth/TetAuthPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<IntroPage />} />
      <Route path="/" element={<TetAuthPage />} />
    </Routes>
  );
}
