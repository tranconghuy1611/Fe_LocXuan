export default function AuthToggle({ isLogin, setIsLogin }) {
  return (
    <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-xl">
      {['Đăng nhập', 'Đăng ký'].map((label, index) => {
        const active = index === 0 ? isLogin : !isLogin;
        return (
          <button
            key={label}
            onClick={() => setIsLogin(index === 0)}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
              active
                ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow'
                : 'text-gray-600'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
