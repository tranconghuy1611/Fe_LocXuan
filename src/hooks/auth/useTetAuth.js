import { useState } from 'react';
import { login, register } from '../../services/auth.service';
import { useAuthStore } from '../../store/auth.store';
import { useNavigate } from 'react-router-dom';

export function useTetAuth() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        accessToken: res.token,
        user: {
          id: res.userId,
          fullName: res.fullName,
          avatarUrl: res.avatarUrl,
        },
      });

      alert('🎉 Đăng nhập thành công!');
      navigate('/home');
    } catch (err) {
      console.error('LOGIN ERROR:', err.response);
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

      setAuth({
        accessToken: res.token,
        user: {
          id: res.userId,
          fullName: res.fullName,
          avatarUrl: res.avatarUrl,
        },
      });

      alert('🎉 Đăng ký & đăng nhập thành công!');
      navigate('/home');
    } catch (err) {
      console.error('REGISTER ERROR:', err.response);
      alert(err.response?.data?.message || 'Đăng ký thất bại');
    }
  };

  return {
    // state
    isLogin,
    showPassword,
    showConfirmPassword,
    loginData,
    registerData,

    // setters
    setIsLogin,
    setShowPassword,
    setShowConfirmPassword,
    setLoginData,
    setRegisterData,

    // handlers
    handleLoginSubmit,
    handleRegisterSubmit,
  };
}
