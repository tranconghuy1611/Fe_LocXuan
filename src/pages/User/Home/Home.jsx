import { Gift, Home as HomeIcon, Users, Leaf } from "lucide-react";
import anh from "../../../assets/2026.png"
import Reveal from "../../../components/Reveal/Reveal";
import Feature from "../../../components/Home/Feature";
import FeatureCard from "../../../components/Home/FeatureCard";
import TraditionCard from "../../../components/Home/TraditionCard";
import { useAuthStore } from "../../../store/auth.store";
import { useNavigate } from "react-router-dom";

import banhchung from "../../../assets/banhchung.png";
import cunggiatien from "../../../assets/cunggiatien.png";
import lixi from "../../../assets/lixi.png";
import trangtri from "../../../assets/trangtri.png";
import duxuan from "../../../assets/duxuan.png";
import sumhop from "../../../assets/sumhop.png";
import boclocmayman from "../../../assets/boclocmayman.jpg";
import lixidaunam from "../../../assets/lixidaunam.jpg";
import muasamtet from "../../../assets/muasamtet.jpg";
import trangtrinhatet from "../../../assets/trangtrinhatet.jpg";
import { image } from "framer-motion/client";
import TetAIChatBox from "./TetAIChatBox";

export default function Home() {
  const features = [
    { icon: <Gift />, title: "Lì xì may mắn" },
    { icon: <HomeIcon />, title: "Trang trí nhà cửa" },
    { icon: <Users />, title: "Sum vầy gia đình" },
    { icon: <Leaf />, title: "Tưởng nhớ tổ tiên" },
  ];
  const traditions = [
    { title: "Gói Bánh Chưng", desc: "Bánh chưng tượng trưng cho đất, thể hiện lòng biết ơn tổ tiên.", image: banhchung },
    { title: "Cúng Gia Tiên", desc: "Nghi lễ thể hiện đạo lý uống nước nhớ nguồn.", image: cunggiatien },
    { title: "Chúc Tết & Lì Xì", desc: "Trao nhau lời chúc và phong bao may mắn.", image: lixi },
    { title: "Dọn Dẹp – Trang Trí Nhà", desc: "Chuẩn bị không gian đón năm mới.", image: trangtri },
    { title: "Du Xuân – Lễ Hội", desc: "Đi chùa, tham gia lễ hội cầu may.", image: duxuan },
    { title: "Sum Họp Gia Đình", desc: "Khoảnh khắc đoàn viên thiêng liêng.", image: sumhop },
  ];
  const cards = [
    {
      title: "Lì xì đầu năm",
      desc: "Trao lì xì đầu năm, gửi trọn may mắn và lời chúc tốt đẹp đến nhau",
      action: "Dùng ngay",
      image: lixidaunam,
      to: "/LiXi",

    },
    {
      title: "Bốc lộc may mắn",
      desc: "Gieo quẻ đầu năm, nhận lì xì ngẫu nhiên.",
      action: "Thử vận may",
      image: boclocmayman,
      to: "/bocloc",
    },
    {
      title: "Nhà Tết ảo",
      desc: "Tự tay trang trí ngôi nhà mơ ước trong không gian 3D.",
      action: "Khám phá",
      image: trangtrinhatet,
      to: "/nha",
    },
    {
      title: "Chợ Hoa Online",
      desc: "Đặt hoa xuân, sắm sửa vật phẩm Tết.",
      action: "Mua sắm",
      image: muasamtet,
      to: "/chotet",
    },
  ];
  const navigate = useNavigate();
  const { user, accessToken } = useAuthStore();
  const isAuth = !!accessToken;

  return (
    <div className="bg-[#FFF5F5]">

      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* IMAGE */}
        <Reveal
          effect="zoom-out"
          delay={200}
          duration={1200}
          className="order-1 md:order-2"
        >
          <div className="relative animate-float">
            <img
              src={anh}
              alt="Tet family"
              className="rounded-2xl shadow-xl w-full"
            />
          </div>
        </Reveal>

        {/* CONTENT */}
        <Reveal
          effect="fade-up"
          duration={1000}
          className="order-2 md:order-1"
        >
          <div>
            <span className="inline-block mb-4 px-4 py-1 text-sm bg-red-100 text-red-500 rounded-full font-semibold">
              🎉 Chào xuân Bính Ngọ
            </span>

            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              {isAuth ? (
                <>
                  Xin chào {user?.fullName}! <br />
                  <span className="text-red-500">Chúc bạn năm mới</span>
                  <br />
                  An Khang Thịnh Vượng
                </>
              ) : (
                <>
                  Tết 2026 <br />
                  <span className="text-red-500">Gắn kết, Chia sẻ &</span>
                  <br />
                  Nhận Lộc Mỗi Ngày
                </>
              )}
            </h1>

            <p className="mt-6 text-gray-600 max-w-lg">
              {isAuth
                ? "Khám phá các hoạt động Tết đặc sắc, nhận lì xì may mắn và chia sẻ niềm vui với mọi người trong dịp xuân này."
                : "Khám phá các hoạt động Tết truyền thống và hiện đại ngay trên thiết bị của bạn. Kết nối yêu thương, trao gửi lời chúc và nhận lì xì may mắn."
              }
            </p>

            <div className="mt-8 flex gap-4 flex-wrap">
              {!isAuth ? (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="px-6 py-3 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition"
                  >
                    Bắt đầu ngay
                  </button>
                  <button
                    onClick={() => navigate("/login")}
                    className="px-6 py-3 rounded-full border border-gray-300 hover:border-red-500 hover:text-red-500 transition"
                  >
                    Đăng nhập
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/hoatdong")}
                    className="px-6 py-3 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition"
                  >
                    Khám phá hoạt động
                  </button>
                  <button
                    onClick={() => navigate("/bocloc")}
                    className="px-6 py-3 rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
                  >
                    Bốc lộc ngay
                  </button>
                </>
              )}
            </div>

            <div className="mt-6 flex items-center gap-3 text-sm text-gray-500">
              <div className="flex -space-x-2">
                <img className="w-8 h-8 rounded-full border" src="https://i.pravatar.cc/40?1" alt="user" />
                <img className="w-8 h-8 rounded-full border" src="https://i.pravatar.cc/40?2" alt="user" />
                <img className="w-8 h-8 rounded-full border" src="https://i.pravatar.cc/40?3" alt="user" />
              </div>
              <span>+2k người dùng đã tham gia hôm nay</span>
            </div>
          </div>
        </Reveal>

      </section>



      {/* ================= TRUYỀN THỐNG TẾT VIỆT NAM ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <Reveal effect="fade-up">
          <div className="text-center mb-14">
            <span className="text-red-500 font-semibold text-sm">TẾT CỔ TRUYỀN VIỆT NAM</span>
            <h2 className="text-3xl font-bold mt-2">Những Phong Tục Không Thể Thiếu</h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Những giá trị văn hóa truyền thống ngàn đời của dân tộc Việt.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {traditions.map((item, i) => (
            <Reveal key={i} effect="fade-up" delay={i * 120}>
              <TraditionCard {...item} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= GIÁ TRỊ VĂN HÓA ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <Reveal effect="fade-up">
          <span className="text-red-500 font-semibold text-sm">GIÁ TRỊ VĂN HÓA</span>
          <h2 className="text-3xl font-bold mt-2">Hương Vị Tết Truyền Thống</h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Nét đẹp truyền thống được tái hiện sinh động trong không gian số.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <Reveal key={i} effect="zoom-in" delay={i * 100}>
              <Feature {...f} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= TÍNH NĂNG ================= */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <Reveal effect="fade-up">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold">Ứng dụng mang lại điều gì?</h2>
              <p className="text-gray-600">
                Trải nghiệm Tết hiện đại với công nghệ số
              </p>
            </div>

            {/* 🔥 NÚT XEM TẤT CẢ */}
            <button
              onClick={() => navigate("/hoatdong")}
              className="px-5 py-2 rounded-full border border-red-500 text-red-500 
                       hover:bg-red-500 hover:text-white transition font-semibold"
            >
              Xem tất cả hoạt động →
            </button>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <Reveal key={i} effect="fade-left" delay={i * 120}>
              <FeatureCard {...card} />
            </Reveal>
          ))}
        </div>
      </section>
      {isAuth && <TetAIChatBox />}

      {/* ================= CTA ================= */}
      {
        !isAuth && (
          <Reveal effect="zoom-in">
            <section className="bg-red-50 py-20 text-center">
              <h2 className="text-3xl font-bold mb-3">
                Sẵn sàng đón Tết theo cách mới?
              </h2>
              <p className="text-gray-600 mb-8">
                Tham gia cộng đồng Tết Online ngay hôm nay để nhận lộc đầu xuân!
              </p>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() => navigate("/login")}
                  className="px-6 py-3 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600"
                >
                  Tạo tài khoản miễn phí
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="px-6 py-3 rounded-full border border-gray-300 hover:border-red-500 hover:text-red-500"
                >
                  Đăng nhập
                </button>
              </div>
            </section>
          </Reveal>
        )
      }
    </div >
  );
}