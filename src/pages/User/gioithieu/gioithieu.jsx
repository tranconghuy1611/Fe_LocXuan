import React, { useState, useEffect } from 'react';
import { Calendar, Heart, Users, Sparkles, Gift, Home, Leaf, Star, Zap, MessageCircle } from 'lucide-react';
import "./gioithieu.css"
export default function GioiThieuPage() {
    const [scrollY, setScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState({});

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('[data-animate]').forEach((el) => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="bg-[#FFF5F5] min-h-screen overflow-hidden">
            {/* Floating Decorations */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-20 left-10 text-5xl animate-float">🧧</div>
                <div className="absolute top-40 right-20 text-4xl animate-bounce-slow" style={{ animationDelay: '0.5s' }}>🏮</div>
                <div className="absolute bottom-32 left-1/4 text-3xl animate-float" style={{ animationDelay: '1s' }}>🎋</div>
                <div className="absolute top-1/3 right-16 text-4xl animate-bounce-slow" style={{ animationDelay: '1.5s' }}>🎆</div>
                <div className="absolute bottom-20 right-1/3 text-3xl animate-float" style={{ animationDelay: '2s' }}>✨</div>
            </div>

            <div className="relative z-10">
                {/* ================= HERO SECTION ================= */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
                    <div className="text-center mb-8 sm:mb-12">
                        <span 
                            data-animate 
                            id="hero-badge"
                            className={`inline-block mb-4 px-4 sm:px-6 py-2 text-xs sm:text-sm bg-red-100 text-red-500 rounded-full font-semibold ${isVisible['hero-badge'] ? 'animate-scaleIn' : ''}`}
                        >
                            🎊 Giới Thiệu Tết Online
                        </span>
                        <h1 
                            data-animate
                            id="hero-title"
                            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4 sm:mb-6 px-4 ${isVisible['hero-title'] ? 'animate-fadeInUp' : ''}`}
                        >
                            Tết Online - Nền Tảng
                            <br />
                            <span className="text-red-500">Kết Nối & Chia Sẻ</span>
                            <br />
                            Không Gian Tết Số
                        </h1>
                        <p 
                            data-animate
                            id="hero-desc"
                            className={`text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 ${isVisible['hero-desc'] ? 'animate-fadeInUp delay-200' : ''}`}
                        >
                            Chúng tôi mang đến một không gian độc đáo, nơi truyền thống Tết Việt gặp gỡ công nghệ hiện đại. 
                            Kết nối yêu thương, lưu giữ văn hóa và tạo ra những kỷ niệm đáng nhớ cùng người thân trong dịp xuân mới.
                        </p>
                    </div>

                    {/* Stats */}
                    <div 
                        data-animate
                        id="stats"
                        className={`grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mt-8 sm:mt-16 ${isVisible['stats'] ? 'animate-fadeInUp delay-300' : ''}`}
                    >
                        {[
                            { number: '10K+', label: 'Người dùng' },
                            { number: '50K+', label: 'Lời chúc gửi đi' },
                            { number: '5K+', label: 'Lì xì may mắn' },
                            { number: '100%', label: 'Miễn phí' }
                        ].map((stat, idx) => (
                            <div 
                                key={idx}
                                className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                                style={{ animationDelay: `${idx * 0.1}s` }}
                            >
                                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-500 mb-1 sm:mb-2">{stat.number}</div>
                                <div className="text-xs sm:text-sm lg:text-base text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ================= SỨ MỆNH ================= */}
                <section className="bg-gradient-to-br from-red-50 to-orange-50 py-12 sm:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6">
                        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
                            <div 
                                data-animate
                                id="mission-content"
                                className={`order-2 md:order-1 ${isVisible['mission-content'] ? 'animate-fadeInLeft' : ''}`}
                            >
                                <span className="text-red-500 font-semibold text-xs sm:text-sm">
                                    SỨ MỆNH CỦA CHÚNG TÔI
                                </span>
                                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 sm:mt-3 mb-4 sm:mb-6">
                                    Bảo Tồn Văn Hóa <br />
                                    Trong Thời Đại Số
                                </h2>
                                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                                    Tết Online ra đời với mục tiêu giúp thế hệ trẻ hiểu và yêu quý hơn những giá trị truyền thống Tết Việt. 
                                    Chúng tôi tin rằng công nghệ có thể là cầu nối để gìn giữ bản sắc văn hóa dân tộc.
                                </p>
                                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                    Dù ở bất kỳ đâu, bạn vẫn có thể cảm nhận trọn vẹn không khí Tết cổ truyền, 
                                    kết nối với gia đình và tạo ra những khoảnh khắc ý nghĩa trong dịp đầu năm mới.
                                </p>
                            </div>
                            <div 
                                data-animate
                                id="mission-card"
                                className={`relative order-1 md:order-2 ${isVisible['mission-card'] ? 'animate-fadeInRight' : ''}`}
                            >
                                <div className="bg-red-500 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
                                    <div className="space-y-6 sm:space-y-8">
                                        {[
                                            { icon: Heart, title: 'Kết Nối Yêu Thương', desc: 'Gắn kết gia đình qua không gian số' },
                                            { icon: Sparkles, title: 'Trải Nghiệm Độc Đáo', desc: 'Tết truyền thống gặp công nghệ hiện đại' },
                                            { icon: Leaf, title: 'Bảo Tồn Văn Hóa', desc: 'Lưu giữ những giá trị truyền thống' }
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex items-start gap-3 sm:gap-4 animate-fadeInUp" style={{ animationDelay: `${idx * 0.2}s` }}>
                                                <div className="bg-white/20 p-2 sm:p-3 rounded-lg sm:rounded-xl hover:bg-white/30 transition-colors">
                                                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-base sm:text-lg mb-1">{item.title}</h3>
                                                    <p className="text-red-100 text-xs sm:text-sm">{item.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ================= TÍNH NĂNG NỔI BẬT ================= */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
                    <div 
                        data-animate
                        id="features-header"
                        className={`text-center mb-8 sm:mb-14 ${isVisible['features-header'] ? 'animate-fadeInUp' : ''}`}
                    >
                        <span className="text-red-500 font-semibold text-xs sm:text-sm">
                            TÍNH NĂNG NỔI BẬT
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold mt-2 px-4">
                            Những Điều Đặc Biệt Tại Tết Online
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 mt-2 sm:mt-3 max-w-2xl mx-auto px-4">
                            Khám phá các tính năng được thiết kế đặc biệt để mang đến trải nghiệm Tết trọn vẹn nhất
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        {[
                            { icon: Gift, color: 'red', title: 'Thiệp & Lì Xì Điện Tử', desc: 'Tạo và gửi thiệp chúc Tết độc đáo, bốc lì xì may mắn với hàng nghìn mẫu thiết kế đẹp mắt.' },
                            { icon: Home, color: 'orange', title: 'Nhà Tết Ảo 3D', desc: 'Tự tay trang trí ngôi nhà Tết trong không gian 3D sinh động, thể hiện phong cách riêng của bạn.' },
                            { icon: Calendar, color: 'yellow', title: 'Lịch Hoạt Động Tết', desc: 'Theo dõi các hoạt động, sự kiện đặc biệt và nhận thông báo nhắc nhở các ngày lễ quan trọng.' },
                            { icon: Star, color: 'green', title: 'Bốc Thăm May Mắn', desc: 'Xem bói đầu năm, gieo quẻ cầu tài lộc và nhận lời khuyên may mắn cho năm mới.' },
                            { icon: Users, color: 'blue', title: 'Kết Nối Cộng Đồng', desc: 'Chia sẻ khoảnh khắc Tết, tham gia thử thách và kết nối với hàng nghìn người dùng.' },
                            { icon: MessageCircle, color: 'purple', title: 'Lời Chúc AI', desc: 'Công nghệ AI giúp tạo lời chúc độc đáo, phù hợp với từng đối tượng và hoàn cảnh.' }
                        ].map((feature, idx) => (
                            <div 
                                key={idx}
                                data-animate
                                id={`feature-${idx}`}
                                className={`bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer ${isVisible[`feature-${idx}`] ? 'animate-scaleIn' : ''}`}
                                style={{ animationDelay: `${idx * 0.1}s` }}
                            >
                                <div className={`bg-${feature.color}-100 w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 animate-pulse-slow`}>
                                    <feature.icon className={`w-6 h-6 sm:w-7 sm:h-7 text-${feature.color}-500`} />
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{feature.title}</h3>
                                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ================= GIÁ TRỊ CỐT LÕI ================= */}
                <section className="bg-white py-12 sm:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6">
                        <div 
                            data-animate
                            id="values-header"
                            className={`text-center mb-8 sm:mb-14 ${isVisible['values-header'] ? 'animate-fadeInUp' : ''}`}
                        >
                            <span className="text-red-500 font-semibold text-xs sm:text-sm">
                                GIÁ TRỊ CỐT LÕI
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-bold mt-2">
                                Điều Chúng Tôi Tin Tưởng
                            </h2>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                            {[
                                { icon: Heart, gradient: 'from-red-500 to-orange-500', title: 'Tình Thân', desc: 'Kết nối gia đình là ưu tiên hàng đầu' },
                                { icon: Leaf, gradient: 'from-orange-500 to-yellow-500', title: 'Văn Hóa', desc: 'Bảo tồn bản sắc truyền thống' },
                                { icon: Zap, gradient: 'from-blue-500 to-cyan-500', title: 'Đổi Mới', desc: 'Ứng dụng công nghệ sáng tạo' },
                                { icon: Sparkles, gradient: 'from-purple-500 to-pink-500', title: 'Trải Nghiệm', desc: 'Mang đến niềm vui mỗi ngày' }
                            ].map((value, idx) => (
                                <div 
                                    key={idx}
                                    data-animate
                                    id={`value-${idx}`}
                                    className={`text-center ${isVisible[`value-${idx}`] ? 'animate-scaleIn' : ''}`}
                                    style={{ animationDelay: `${idx * 0.15}s` }}
                                >
                                    <div className={`bg-gradient-to-br ${value.gradient} w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer animate-bounce-slow`}>
                                        <value.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                                    </div>
                                    <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2">{value.title}</h3>
                                    <p className="text-gray-600 text-xs sm:text-sm px-2">{value.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ================= CTA ================= */}
                <section 
                    data-animate
                    id="cta"
                    className={`bg-gradient-to-r from-red-500 via-orange-500 to-red-600 py-12 sm:py-20 text-center text-white ${isVisible['cta'] ? 'animate-fadeInUp' : ''}`}
                >
                    <div className="max-w-4xl mx-auto px-4 sm:px-6">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 animate-pulse-slow px-4">
                            Bắt Đầu Hành Trình Tết Của Bạn
                        </h2>
                        <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 text-red-50 px-4">
                            Tham gia cộng đồng Tết Online và trải nghiệm Tết truyền thống theo cách hoàn toàn mới!
                        </p>

                        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 text-red-50 px-4">
                            <div className="flex -space-x-2">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 border-2 border-white animate-bounce-slow"></div>
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-pink-400 to-red-500 border-2 border-white animate-bounce-slow" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-white animate-bounce-slow" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                            <span className="font-medium text-sm sm:text-base text-center">Nhiều người đã tin tưởng Tết Online</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}