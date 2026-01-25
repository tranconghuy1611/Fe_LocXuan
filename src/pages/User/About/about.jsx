import React from 'react';

// Mock Reveal component
const Reveal = ({ children, effect, delay = 0 }) => {
  return <div className="animate-fade-in" style={{ animationDelay: `${delay}ms` }}>{children}</div>;
};

export default function AboutPage() {
  const members = [
    {
      name: "Nguyễn Hữu Tuấn",
      role: "Backend Developer",
      desc: "Phụ trách xây dựng hệ thống backend, API và xử lý logic ứng dụng.",
      avatar: "https://mona.media/wp-content/uploads/2021/07/backend-development.png",
      skills: ["Java", "MySQL", "API"],
    },
    {
      name: "Trần Công Huy",
      role: "Frontend Developer",
      desc: "Thiết kế giao diện, trải nghiệm người dùng và hiệu ứng tương tác.",
      avatar: "https://tse2.mm.bing.net/th/id/OIP.giJ0dPRsU1XQRGARYOx7awHaEH?pid=Api&P=0&h=180",
      skills: ["React", "Tailwind", "UI/UX"],
    },
  ];

  const stats = [
    { number: "2", label: "Thành viên", icon: "👥" },
    { number: "1", label: "Dự án hoàn thành chung", icon: "🚀" },
    { number: "100%", label: "Đam mê công nghệ", icon: "💡" },
  ];

  const values = [
    {
      icon: "🎯",
      title: "Sáng tạo",
      desc: "Không ngừng đổi mới và sáng tạo trong từng sản phẩm"
    },
    {
      icon: "🤝",
      title: "Hợp tác",
      desc: "Làm việc nhóm hiệu quả, hỗ trợ lẫn nhau"
    },
    {
      icon: "🏆",
      title: "Chất lượng",
      desc: "Cam kết mang đến trải nghiệm tốt nhất cho người dùng"
    },
    {
      icon: "🇻🇳",
      title: "Bản sắc",
      desc: "Giữ gìn và phát huy văn hóa Việt Nam"
    },
  ];

  return (
    <div className="bg-gradient-to-b from-red-50 via-pink-50 to-orange-50 min-h-screen">
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .gradient-animate {
          background-size: 200% 200%;
          animation: gradient-shift 5s ease infinite;
        }
      `}</style>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-red-200 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-orange-200 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-pink-200 rounded-full opacity-20 blur-xl"></div>

      {/* ===== HEADER ===== */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-20 text-center relative">
        <Reveal effect="fade-up">
          <div className="inline-block mb-6 px-5 py-2 bg-gradient-to-r from-red-500 to-orange-500 gradient-animate text-white rounded-full font-semibold shadow-lg">
            <span className="text-lg">👨‍💻 THT DEVELOP</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-red-600 via-orange-500 to-red-600 bg-clip-text text-transparent mb-6">
            Về Chúng Tôi
          </h1>
          <p className="text-gray-700 text-lg mt-6 max-w-3xl mx-auto leading-relaxed">
            Chúng tôi là nhóm sinh viên đam mê công nghệ, mong muốn mang đến
            những trải nghiệm Tết truyền thống kết hợp hiện đại thông qua nền tảng số.
          </p>
        </Reveal>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
          {stats.map((stat, i) => (
            <Reveal key={i} effect="fade-up" delay={i * 100}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-red-600">{stat.number}</div>
                <div className="text-gray-600 mt-1">{stat.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== GIỚI THIỆU NHÓM ===== */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <Reveal effect="fade-up">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-10 text-center mb-20 border border-red-100">
            <div className="inline-block p-4 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl mb-6 float-animation">
              <span className="text-4xl">🎊</span>
            </div>
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Nhóm THT Develop
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
              THT Develop được thành lập với mục tiêu xây dựng các sản phẩm
              công nghệ phục vụ học tập và trải nghiệm người dùng,
              đặc biệt là các dự án mang đậm bản sắc văn hóa Việt Nam.
            </p>
          </div>
        </Reveal>

        {/* ===== GIÁ TRỊ CỐT LÕI ===== */}
        <Reveal effect="fade-up">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Giá Trị Cốt Lõi
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {values.map((value, i) => (
            <Reveal key={i} effect="fade-up" delay={i * 100}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 group border border-red-50">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ===== THÀNH VIÊN ===== */}
        <Reveal effect="fade-up">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Đội Ngũ Của Chúng Tôi
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {members.map((m, i) => (
            <Reveal key={i} effect="fade-up" delay={i * 150}>
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all hover:-translate-y-2 group border border-red-100">
                <div className="relative inline-block mb-6">
                  <img
                    src={m.avatar}
                    alt={m.name}
                    className="w-32 h-32 rounded-full mx-auto border-4 border-red-100 group-hover:border-red-300 transition-all shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full p-3 shadow-lg">
                    <span className="text-xl">
                      {i === 0 ? "⚙️" : "🎨"}
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{m.name}</h3>
                <p className="text-red-500 font-semibold text-lg mb-4">{m.role}</p>
                <p className="text-gray-600 leading-relaxed mb-6">{m.desc}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {m.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-gradient-to-r from-red-100 to-orange-100 text-red-700 rounded-full text-sm font-medium shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <Reveal effect="fade-up">
          <div className="bg-gradient-to-r from-red-500 via-orange-500 to-red-500 gradient-animate rounded-3xl shadow-2xl p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Cùng Tạo Nên Điều Tuyệt Vời! 🚀
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Chúng tôi luôn sẵn sàng hợp tác và chia sẻ kiến thức với cộng đồng.
              Hãy kết nối với chúng tôi!
            </p>
            <button className="px-8 py-4 bg-white text-red-600 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105">
              Liên Hệ Ngay ✨
            </button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}