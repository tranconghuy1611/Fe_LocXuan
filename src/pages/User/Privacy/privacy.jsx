import Reveal from "../../../components/Reveal/Reveal";
import { useNavigate } from "react-router-dom";

export default function PrivacyPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FFF5F5] min-h-screen">

      {/* ===== HEADER ===== */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-12 text-center">
        <Reveal effect="fade-up">
          <h1 className="text-3xl md:text-4xl font-extrabold">
            Chính Sách Bảo Mật
          </h1>
          <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
            Chúng tôi cam kết bảo vệ quyền riêng tư và thông tin cá nhân của người dùng
            khi tham gia các hoạt động trên website Tết Online.
          </p>
        </Reveal>
      </section>

      {/* ===== CONTENT ===== */}
      <section className="max-w-5xl mx-auto px-6 pb-20 space-y-10 text-gray-700">

        {/* 1 */}
        <Reveal effect="fade-up">
          <div>
            <h2 className="text-xl font-bold mb-2">
              1. Thông tin được thu thập
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Họ tên, số điện thoại hoặc email khi đăng ký tài khoản.</li>
              <li>Dữ liệu liên quan đến hoạt động Tết (lì xì, bốc lộc, tương tác).</li>
              <li>Thông tin kỹ thuật như IP, trình duyệt để đảm bảo an toàn hệ thống.</li>
            </ul>
          </div>
        </Reveal>

        {/* 2 */}
        <Reveal effect="fade-up">
          <div>
            <h2 className="text-xl font-bold mb-2">
              2. Mục đích sử dụng thông tin
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Vận hành và cải thiện trải nghiệm người dùng.</li>
              <li>Đảm bảo công bằng trong các hoạt động quay thưởng.</li>
              <li>Ngăn chặn gian lận, spam và hành vi phá hoại hệ thống.</li>
            </ul>
          </div>
        </Reveal>

        {/* 3 */}
        <Reveal effect="fade-up">
          <div>
            <h2 className="text-xl font-bold mb-2">
              3. Bảo mật dữ liệu
            </h2>
            <p>
              Dữ liệu người dùng được lưu trữ và bảo vệ bằng các biện pháp kỹ thuật
              phù hợp. Chúng tôi không cho phép truy cập trái phép, chỉnh sửa hoặc
              phá hoại dữ liệu dưới mọi hình thức.
            </p>
          </div>
        </Reveal>

        {/* 4 */}
        <Reveal effect="fade-up">
          <div>
            <h2 className="text-xl font-bold mb-2">
              4. Chia sẻ thông tin
            </h2>
            <p>
              Website <b>không chia sẻ, mua bán hoặc trao đổi</b> thông tin cá nhân
              của người dùng cho bên thứ ba, trừ khi có yêu cầu từ cơ quan pháp luật
              theo quy định.
            </p>
          </div>
        </Reveal>

        {/* 5 */}
        <Reveal effect="fade-up">
          <div>
            <h2 className="text-xl font-bold mb-2">
              5. Quyền của người dùng
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Có quyền kiểm tra, chỉnh sửa hoặc yêu cầu xóa thông tin cá nhân.</li>
              <li>Có quyền ngừng sử dụng dịch vụ bất kỳ lúc nào.</li>
              <li>Có quyền phản hồi nếu phát hiện rủi ro bảo mật.</li>
            </ul>
          </div>
        </Reveal>

        {/* 6 */}
        <Reveal effect="fade-up">
          <div>
            <h2 className="text-xl font-bold mb-2">
              6. Cookie & theo dõi
            </h2>
            <p>
              Website có thể sử dụng cookie để ghi nhớ phiên đăng nhập và cải thiện
              trải nghiệm. Người dùng có thể tắt cookie trong trình duyệt nếu muốn.
            </p>
          </div>
        </Reveal>

        {/* 7 */}
        <Reveal effect="fade-up">
          <div>
            <h2 className="text-xl font-bold mb-2">
              7. Thay đổi chính sách
            </h2>
            <p>
              Chính sách bảo mật có thể được cập nhật để phù hợp với hệ thống
              và quy định pháp luật. Các thay đổi sẽ được công bố công khai.
            </p>
          </div>
        </Reveal>

        {/* 8 */}
        <Reveal effect="fade-up">
          <div className="bg-red-50 border border-red-100 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-2 text-red-600">
              8. Cam kết
            </h2>
            <p>
              Nhóm <b>THT Develop</b> cam kết xây dựng một môi trường Tết Online
              an toàn, văn minh và tôn trọng quyền riêng tư của tất cả người dùng.
            </p>
          </div>
        </Reveal>

        {/* ===== BACK BUTTON ===== */}
        <Reveal effect="fade-up">
          <div className="text-center pt-6">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-full border border-gray-300
                         hover:border-red-500 hover:text-red-500 transition font-semibold"
            >
              ← Quay lại
            </button>
          </div>
        </Reveal>

      </section>
    </div>
  );
}
