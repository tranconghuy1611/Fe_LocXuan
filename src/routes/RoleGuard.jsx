import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

export default function RoleGuard({ role }) {
  const { roles, hydrated } = useAuthStore();

  // ⏳ CHỜ HYDRATE
  if (!hydrated) return null;

  if (!roles.includes(role)) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
}
