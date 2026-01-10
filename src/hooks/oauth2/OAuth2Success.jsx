import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { getMyProfile } from "../../services/profile";

export default function OAuth2Success() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // ⚠️ Cookie đã có sẵn → chỉ gọi API
        const res = await getMyProfile();

        setAuth({
          user: res.data,
          accessToken: null, // không cần lưu
        });

        navigate("/home", { replace: true });
      } catch (err) {
        console.error("OAuth2 login failed", err);
        navigate("/login", { replace: true });
      }
    };

    initAuth();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      Đang đăng nhập bằng Google...
    </div>
  );
}
