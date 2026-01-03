import { useState } from 'react';

export function useAuthForm() {
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
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Đăng nhập:', loginData);
    alert('Chúc mừng năm mới! 🎊');
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert('Mật khẩu không khớp!');
      return;
    }
    console.log('Đăng ký:', registerData);
    alert('Đăng ký thành công! 🎉');
  };

  return {
    isLogin,
    setIsLogin,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    loginData,
    setLoginData,
    registerData,
    setRegisterData,
    handleLoginSubmit,
    handleRegisterSubmit,
  };
}
