import { useState } from 'react';

export function useLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Đăng nhập với:', formData);
    alert('Chúc mừng năm mới! 🎊');
  };

  return {
    formData,
    setFormData,
    showPassword,
    setShowPassword,
    isHovered,
    setIsHovered,
    handleSubmit,
  };
}
