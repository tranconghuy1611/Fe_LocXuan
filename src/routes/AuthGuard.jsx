import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

export default function AuthGuard() {
  const { accessToken, hydrated } = useAuthStore();

  if (!hydrated) return null;

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
