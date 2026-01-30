import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

export default function RedirectByRole() {
  const { roles, accessToken, hydrated } = useAuthStore();

  if (!hydrated) return null;

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  if (roles.includes("ROLE_ADMIN")) {
    return <Navigate to="/admin/QuanLyPhanThuong" replace />;
  }

  return <Navigate to="/trangchu" replace />;
}
