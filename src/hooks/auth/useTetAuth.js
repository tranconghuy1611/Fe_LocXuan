import { useState } from 'react';
import { login, register, verify, resend } from '../../services/auth.service';
import { useAuthStore } from '../../store/auth.store';
import { useNavigate } from 'react-router-dom';

export function useTetAuth() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  // UI state
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // OTP state
  const [showOtp, setShowOtp] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');

  // Form data
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [registerData, setRegisterData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // ================= LOGIN =================
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(loginData);

      setAuth({
        accessToken: res.accessToken,
        user: {
          id: res.userId,
          fullName: res.fullName,
          avatarUrl: res.avatarUrl,
        },
      });

      alert('🎉 Đăng nhập thành công!');
      navigate('/home');
    } catch (err) {
      alert(err.response?.data?.message || 'Đăng nhập thất bại');
    }
  };

  // ================= REGISTER =================
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (registerData.password !== registerData.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }

    try {
      const res = await register({
        fullName: registerData.fullName,
        email: registerData.email,
        password: registerData.password,
      });

      alert(res.message); // "Vui lòng kiểm tra email..."
      setPendingEmail(registerData.email);
      setShowOtp(true);
    } catch (err) {
      alert(err.response?.data?.message || 'Đăng ký thất bại');
    }
  };

  // ================= VERIFY OTP =================
  const handleVerifyOtp = async (code) => {
    try {
      setVerifying(true);

      const res = await verify({
        email: pendingEmail,
        code,
      });

      setAuth({
        accessToken: res.accessToken,
        user: {
          id: res.userId,
          fullName: res.fullName,
          avatarUrl: res.avatarUrl,
        },
      });

      setShowOtp(false);
      navigate('/home');
      return true;
    } catch (err) {
      return false;
    } finally {
      setVerifying(false);
    }
  };

  // ================= RESEND OTP =================
  const handleResendOtp = async () => {
    try {
      await resend({ email: pendingEmail });
      alert('📨 Đã gửi lại mã xác thực');
    } catch (err) {
      alert('Không thể gửi lại mã');
    }
  };

  return {
    // state
    isLogin,
    showPassword,
    showConfirmPassword,
    loginData,
    registerData,

    showOtp,
    verifying,
    pendingEmail,

    // setters
    setIsLogin,
    setShowPassword,
    setShowConfirmPassword,
    setLoginData,
    setRegisterData,
    setShowOtp,

    // handlers
    handleLoginSubmit,
    handleRegisterSubmit,
    handleVerifyOtp,
    handleResendOtp,
  };
}
