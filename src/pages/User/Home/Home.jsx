import { Gift, Home as HomeIcon, Users, Leaf } from "lucide-react";
import anh from "../../../assets/2026.png"
import Reveal from "../../../components/Reveal/Reveal";
import Feature from "../../../components/Home/Feature";
import FeatureCard from "../../../components/Home/FeatureCard";
import TraditionCard from "../../../components/Home/TraditionCard";

import banhchung from "../../../assets/banhchung.png";
import cunggiatien from "../../../assets/cunggiatien.png";
import lixi from "../../../assets/lixi.png";
import trangtri from "../../../assets/trangtri.png";
import duxuan from "../../../assets/duxuan.png";
import sumhop from "../../../assets/sumhop.png";
export default function Home() {
    return (
        <div className="bg-[#FFF5F5]">

            {/* ================= HERO ================= */}
            <Reveal>
                <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">

                    {/* Left */}
                    <div>
                        <span className="inline-block mb-4 px-4 py-1 text-sm bg-red-100 text-red-500 rounded-full font-semibold">
                            🎉 Chào xuân Bính Ngọ
                        </span>

                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                            Tết 2026 <br />
                            <span className="text-red-500">
                                Gắn kết, Chia sẻ &
                            </span>{" "}
                            <br />
                            Nhận Lộc Mỗi Ngày
                        </h1>

                        <p className="mt-6 text-gray-600 max-w-lg">
                            Khám phá các hoạt động Tết truyền thống và hiện đại ngay trên thiết bị
                            của bạn. Kết nối yêu thương, trao gửi lời chúc và nhận lì xì may mắn.
                        </p>

                        <div className="mt-8 flex gap-4">
                            <button className="px-6 py-3 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition">
                                Bắt đầu ngay
                            </button>
                            <button className="px-6 py-3 rounded-full border border-gray-300 hover:border-red-500 hover:text-red-500 transition">
                                Đăng nhập
                            </button>
                        </div>

                        <div className="mt-6 flex items-center gap-3 text-sm text-gray-500">
                            <div className="flex -space-x-2">
                                <img className="w-8 h-8 rounded-full border" src="https://i.pravatar.cc/40?1" />
                                <img className="w-8 h-8 rounded-full border" src="https://i.pravatar.cc/40?2" />
                                <img className="w-8 h-8 rounded-full border" src="https://i.pravatar.cc/40?3" />
                            </div>
                            <span>+2k người dùng đã tham gia hôm nay</span>
                        </div>
                    </div>

                    {/* Right image */}
                    <div className="relative animate-float">
                        <img
                            src={anh}
                            alt="Tet family"
                            className="rounded-2xl shadow-xl"
                        />
                    </div>

                </section>
            </Reveal>
            {/* ================= TRUYỀN THỐNG TẾT VIỆT NAM ================= */}
            <Reveal>
                <section className="max-w-7xl mx-auto px-6 py-20">

                    <div className="text-center mb-14">
                        <span className="text-red-500 font-semibold text-sm">
                            TẾT CỔ TRUYỀN VIỆT NAM
                        </span>
                        <h2 className="text-3xl font-bold mt-2">
                            Những Phong Tục Không Thể Thiếu
                        </h2>
                        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                            Tết Nguyên Đán không chỉ là thời khắc chuyển giao năm mới, mà còn là
                            dịp để người Việt gìn giữ những phong tục truyền thống mang đậm
                            giá trị văn hóa và tinh thần dân tộc.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">

                        <TraditionCard
                            title="Gói Bánh Chưng"
                            desc="Bánh chưng tượng trưng cho đất, thể hiện lòng biết ơn tổ tiên."
                            image={banhchung}
                        />

                        <TraditionCard
                            title="Cúng Gia Tiên"
                            desc="Nghi lễ thể hiện đạo lý uống nước nhớ nguồn."
                            image={cunggiatien}
                        />

                        <TraditionCard
                            title="Chúc Tết & Lì Xì"
                            desc="Trao nhau lời chúc và phong bao may mắn."
                            image={lixi}
                        />

                        <TraditionCard
                            title="Dọn Dẹp – Trang Trí Nhà"
                            desc="Chuẩn bị không gian đón năm mới."
                            image={trangtri}
                        />

                        <TraditionCard
                            title="Du Xuân – Lễ Hội"
                            desc="Đi chùa, tham gia lễ hội cầu may."
                            image={duxuan}
                        />

                        <TraditionCard
                            title="Sum Họp Gia Đình"
                            desc="Khoảnh khắc đoàn viên thiêng liêng."
                            image={sumhop}
                        />

                    </div>
                </section>
            </Reveal>

            {/* ================= GIÁ TRỊ VĂN HÓA ================= */}
            <Reveal>
                <section className="max-w-7xl mx-auto px-6 py-20 text-center">
                    <span className="text-red-500 font-semibold text-sm">
                        GIÁ TRỊ VĂN HÓA
                    </span>
                    <h2 className="text-3xl font-bold mt-2">
                        Hương Vị Tết Truyền Thống
                    </h2>
                    <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                        Những nét đẹp văn hóa ngàn đời được tái hiện sinh động, giúp bạn cảm
                        nhận trọn vẹn không khí Tết cổ truyền.
                    </p>

                    <div className="mt-12 grid md:grid-cols-4 gap-6">
                        <Feature icon={<Gift />} title="Lì xì may mắn" />
                        <Feature icon={<HomeIcon />} title="Trang trí nhà cửa" />
                        <Feature icon={<Users />} title="Sum vầy gia đình" />
                        <Feature icon={<Leaf />} title="Tưởng nhớ tổ tiên" />
                    </div>
                </section>
            </Reveal>

            {/* ================= TÍNH NĂNG ================= */}
            <Reveal>
                <section className="max-w-7xl mx-auto px-6 py-16">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold">Ứng dụng mang lại điều gì?</h2>
                            <p className="text-gray-600">
                                Trải nghiệm Tết hiện đại với công nghệ số
                            </p>
                        </div>
                        <a href="#" className="text-red-500 font-semibold hover:underline">
                            Xem tất cả tính năng →
                        </a>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        <FeatureCard
                            title="Tạo thiệp & Lời chúc"
                            desc="Gửi gắm yêu thương qua hàng ngàn mẫu thiệp điện tử."
                            action="Dùng ngay"
                            image=""
                        />
                        <FeatureCard
                            title="Bốc lộc may mắn"
                            desc="Gieo quẻ đầu năm, nhận lì xì ngẫu nhiên."
                            action="Thử vận may"
                            image=""
                        />
                        <FeatureCard
                            title="Nhà Tết ảo"
                            desc="Tự tay trang trí ngôi nhà mơ ước trong không gian 3D."
                            action="Khám phá"
                            image=""
                        />
                        <FeatureCard
                            title="Chợ Hoa Online"
                            desc="Đặt hoa xuân, sắm sửa vật phẩm Tết."
                            action="Mua sắm"
                            image=""
                        />
                    </div>
                </section>
            </Reveal>

            {/* ================= CTA ================= */}
            <Reveal>
                <section className="bg-red-50 py-20 text-center">
                    <h2 className="text-3xl font-bold mb-3">
                        Sẵn sàng đón Tết theo cách mới?
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Tham gia cộng đồng Tết Online ngay hôm nay để nhận lộc đầu xuân!
                    </p>

                    <div className="flex justify-center gap-4">
                        <button className="px-6 py-3 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600">
                            Tạo tài khoản miễn phí
                        </button>
                        <button className="px-6 py-3 rounded-full border border-gray-300 hover:border-red-500 hover:text-red-500">
                            Đăng nhập
                        </button>
                    </div>
                </section>
            </Reveal>


        </div>
    );
}
