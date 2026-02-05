import { useNavigate } from "react-router-dom";
import Reveal from "../../../components/Reveal/Reveal";

export default function TermsPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FFF5F5] min-h-screen">

      {/* ===== HEADER ===== */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-6 text-center">
        <Reveal effect="fade-up">
          <h1 className="text-3xl md:text-4xl font-extrabold">
            Điều Khoản Sử Dụng
          </h1>
          <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
            Vui lòng đọc kỹ các điều khoản dưới đây trước khi sử dụng website.
            Việc bạn tiếp tục truy cập và sử dụng đồng nghĩa với việc bạn đã
            hiểu và đồng ý với toàn bộ nội dung.
          </p>
        </Reveal>

        {/* ===== BACK BUTTON ===== */}
        <Reveal effect="fade-up" delay={150}>
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                         bg-white border border-red-200 text-red-600 text-sm font-medium
                         hover:bg-red-50 hover:border-red-300 transition"
            >
              ← Quay lại
            </button>
          </div>
        </Reveal>
      </section>

      {/* ===== CONTENT ===== */}
      <section className="max-w-5xl mx-auto px-6 pb-20 space-y-10 text-gray-700">

        {/* 1 */}
        <Reveal effect="fade-up">
          <div>
            <h2 className="text-xl font-bold mb-2">1. Giới thiệu chung</h2>
            <p>
              Website Tết Online được phát triển bởi <b>nhóm THT Develop</b>,
              nhằm mang đến các hoạt động trải nghiệm Tết truyền thống kết hợp
              công nghệ số như lì xì online, bốc lộc, tạo thiệp Tết, trang trí
              nhà ảo và các tính năng tương tác khác.
            </p>
          </div>
        </Reveal>

        {/* 2 */}
        <Reveal effect="fade-up">
          <div>
            <h2 className="text-xl font-bold mb-2">2. Đối tượng sử dụng</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Người dùng có đầy đủ năng lực hành vi dân sự theo pháp luật.</li>
              <li>Không sử dụng website cho mục đích trái pháp luật.</li>
              <li>Không mạo danh hoặc sử dụng tài khoản của người khác.</li>
            </ul>
          </div>
        </Reveal>

        {/* 3 */}
        <Reveal effect="fade-up">
          <div>
            <h2 className="text-xl font-bold mb-2">3. Tài khoản người dùng</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Mỗi người dùng chịu trách nhiệm bảo mật thông tin tài khoản.</li>
              <li>Không chia sẻ tài khoản cho người khác sử dụng.</li>
              <li>Website có quyền khóa hoặc xóa tài khoản nếu phát hiện vi phạm.</li>
            </ul>
          </div>
        </Reveal>

        {/* 4 */}
        <Reveal effect="fade-up">
          <div>
            <h2 className="text-xl font-bold mb-2">4. Quy định về hoạt động & phần thưởng</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Mỗi tài khoản chỉ được tham gia <b>1 lần mỗi ngày</b>.</li>
              <li>Nghiêm cấm spam, gian lận hoặc can thiệp hệ thống.</li>
              <li>Không cố tình quay lại khi đã hoàn tất lượt trong ngày.</li>
              <li>Kết quả được ghi nhận tự động và không thể chỉnh sửa.</li>
            </ul>
          </div>
        </Reveal>

        {/* 5 */}
        <Reveal effect="fade-up">
          <div>
            <h2 className="text-xl font-bold mb-2">5. Hành vi bị nghiêm cấm</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Cố tình phá hoại hoặc gây lỗi website.</li>
              <li>Tấn công, khai thác lỗ hổng bảo mật.</li>
              <li>Phát tán nội dung xấu hoặc mã độc.</li>
              <li>Gây ảnh hưởng trải nghiệm người khác.</li>
            </ul>
          </div>
        </Reveal>

        {/* 6 */}
        <Reveal effect="fade-up">
          <div>
            <h2 className="text-xl font-bold mb-2">6. Quyền và trách nhiệm của hệ thống</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Tạm ngưng dịch vụ để bảo trì khi cần.</li>
              <li>Thay đổi nội dung và tính năng mà không cần báo trước.</li>
              <li>Không chịu trách nhiệm cho sự cố ngoài kiểm soát.</li>
            </ul>
          </div>
        </Reveal>

        {/* 7 */}
        <Reveal effect="fade-up">
          <div>
            <h2 className="text-xl font-bold mb-2">7. Quyền riêng tư & dữ liệu</h2>
            <p>
              Dữ liệu người dùng chỉ phục vụ cho việc vận hành hệ thống
              và đảm bảo công bằng. Chúng tôi cam kết bảo mật và không
              chia sẻ cho bên thứ ba khi chưa có sự đồng ý.
            </p>
          </div>
        </Reveal>

        {/* 8 */}
        <Reveal effect="fade-up">
          <div>
            <h2 className="text-xl font-bold mb-2">8. Thay đổi điều khoản</h2>
            <p>
              Điều khoản có thể được cập nhật theo thời gian.
              Việc tiếp tục sử dụng đồng nghĩa với việc chấp nhận thay đổi.
            </p>
          </div>
        </Reveal>

        {/* 9 */}
        <Reveal effect="fade-up">
          <div className="bg-red-50 border border-red-100 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-2 text-red-600">
              9. Điều khoản cuối
            </h2>
            <p>
              Cảm ơn bạn đã sử dụng website một cách văn minh ❤️
            </p>
          </div>
        </Reveal>

      </section>
    </div>
  );
}
