import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { exchangeOAuth2Code } from "../../services/auth.service";
import { getMyProfile,updateMyProfile } from "../../services/profile.service";

export default function OAuth2Success() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const setAuth = useAuthStore((s) => s.setAuth);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const code = searchParams.get("code");

        if (!code) {
          throw new Error("Missing OAuth2 code");
        }

        // 1️⃣ Exchange code → accessToken
        const exchangeRes = await exchangeOAuth2Code(code);
        const accessToken = exchangeRes.data.data.accessToken;

        // 2️⃣ Lưu token (zustand / localStorage)
        setAuth({
          accessToken,
          user: null,
        });

        // 3️⃣ Gọi profile
        const profileRes = await getMyProfile();

        setAuth({
          accessToken,
          user: profileRes,
        });

        navigate("/trangchu", { replace: true });
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
