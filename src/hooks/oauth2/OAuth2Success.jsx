import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { getMyProfile } from "../../services/profile";

export default function OAuth2Success() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    const initAuth = async () => {
      try {
        setAuth({ accessToken: token, user: null });

        const res = await getMyProfile();

        // 3️⃣ Lưu user
        setAuth({
          accessToken: token,
          user: res.data,
        });

        navigate("/home", { replace: true });
      } catch (err) {
        console.error("OAuth2 login failed", err);
        navigate("/", { replace: true });
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
