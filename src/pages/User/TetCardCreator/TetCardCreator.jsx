import { useState } from "react";
import { Lock, Share2, User, Sparkles, Eye, X } from "lucide-react";
import { createWish } from "../../../services/wish.service";
import WishSuccessModal from "../../../components/Modal/WishSuccessModal";

export default function TetCardCreate() {
  const [form, setForm] = useState({
    receiverId: null,
    content: "",
    isPrivate: false,
    enableShare: true,
  });

  const [showModal, setShowModal] = useState(false);
  const [createdWish, setCreatedWish] = useState(null);
  const [loading, setLoading] = useState(false);

  // 👉 MOBILE PREVIEW
  const [showPreviewMobile, setShowPreviewMobile] = useState(false);

  const handleSubmit = async () => {
    if (!form.content.trim()) return;

    try {
      setLoading(true);

      const res = await createWish({
        receiverId: form.receiverId,
        content: form.content,
        isPrivate: form.isPrivate,
        enableShare: form.enableShare,
      });

      setCreatedWish(res.data.data);
      setShowModal(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-red-800 to-amber-600 px-4 py-10 relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-red-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10">

        {/* ================= FORM ================= */}
        <div className="space-y-6">

          {/* HEADER */}
          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-300 to-orange-300 flex items-center justify-center lg:justify-start gap-3">
              <Sparkles className="text-yellow-300" size={32} />
              Thiệp Tết 2025
            </h1>
            <p className="text-yellow-100/80 mt-2">
              Gửi lời chúc đầu năm đến người thân yêu
            </p>
          </div>

          {/* FORM CARD */}
          <div className="bg-white/10 backdrop-blur-3xl p-5 sm:p-8 rounded-3xl shadow-2xl border border-white/20">

            {/* RECEIVER */}
            <div className="mb-5">
              <label className="text-yellow-100 font-bold flex items-center gap-2 mb-2">
                <User size={18} /> Người nhận
              </label>
              <select
                className="w-full p-3 sm:p-4 rounded-xl bg-white text-gray-800 font-semibold"
                onChange={(e) =>
                  setForm({ ...form, receiverId: e.target.value || null })
                }
              >
                <option value="">Gửi công khai</option>
                <option value="1">Nguyễn Văn A</option>
                <option value="2">Trần Thị B</option>
              </select>
            </div>

            {/* CONTENT */}
            <div className="mb-5">
              <label className="text-yellow-100 font-bold flex items-center gap-2 mb-2">
                <Sparkles size={18} /> Lời chúc Tết
              </label>
              <textarea
                rows={5}
                value={form.content}
                onChange={(e) =>
                  setForm({ ...form, content: e.target.value })
                }
                placeholder="Chúc mừng năm mới! An khang thịnh vượng..."
                className="w-full p-3 sm:p-4 rounded-xl bg-white text-gray-800 resize-none"
              />
              <div className="text-right text-yellow-200/70 text-xs mt-1">
                {form.content.length} ký tự
              </div>
            </div>

            {/* OPTIONS */}
            <div className="space-y-3 mb-6">
              <label className="flex items-center gap-3 bg-white/5 p-3 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isPrivate}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      isPrivate: e.target.checked,
                      enableShare: e.target.checked ? false : form.enableShare,
                    })
                  }
                  className="accent-yellow-400"
                />
                <Lock size={18} className="text-yellow-300" />
                <span className="text-white font-semibold">Thiệp riêng tư</span>
              </label>

              <label
                className={`flex items-center gap-3 p-3 rounded-xl ${
                  form.isPrivate
                    ? "opacity-50 bg-white/5"
                    : "bg-white/5 cursor-pointer"
                }`}
              >
                <input
                  type="checkbox"
                  disabled={form.isPrivate}
                  checked={form.enableShare}
                  onChange={(e) =>
                    setForm({ ...form, enableShare: e.target.checked })
                  }
                  className="accent-yellow-400"
                />
                <Share2 size={18} className="text-yellow-300" />
                <span className="text-white font-semibold">
                  Cho phép chia sẻ
                </span>
              </label>
            </div>

            {/* SUBMIT */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 rounded-xl font-black text-white"
            >
              {loading ? "Đang tạo..." : "Tạo Thiệp Ngay"}
            </button>

            {/* MOBILE PREVIEW BUTTON */}
            <button
              onClick={() => setShowPreviewMobile(true)}
              className="mt-4 w-full py-3 rounded-xl bg-white/20 text-white font-semibold flex items-center justify-center gap-2 lg:hidden"
            >
              <Eye size={18} /> Xem trước thiệp
            </button>
          </div>
        </div>

        {/* ================= DESKTOP PREVIEW ================= */}
        <div className="hidden lg:flex items-center justify-center">
          <PreviewCard content={form.content} form={form} />
        </div>
      </div>

      {/* ================= MOBILE PREVIEW ================= */}
      {showPreviewMobile && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 lg:hidden">
          <button
            onClick={() => setShowPreviewMobile(false)}
            className="absolute top-6 right-6 text-white"
          >
            <X size={32} />
          </button>
          <PreviewCard content={form.content} form={form} />
        </div>
      )}

      {showModal && (
        <WishSuccessModal
          wish={createdWish}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

/* ================= PREVIEW CARD ================= */
function PreviewCard({ content, form }) {
  return (
    <div className="w-full max-w-[700px] h-[480px] bg-white rounded-3xl shadow-2xl overflow-hidden flex">
      <div className="w-[55%] bg-gradient-to-br from-red-950 via-red-800 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl font-black text-yellow-300">Chúc Mừng</div>
          <div className="text-5xl font-black text-yellow-300 -mt-2">Năm Mới</div>
          <div className="text-6xl font-black text-yellow-400 mt-2">2025</div>
        </div>
      </div>

      <div className="w-[45%] bg-gradient-to-br from-amber-50 to-orange-100 p-6 flex flex-col">
        <h2 className="text-2xl font-black text-red-600 text-center mb-4">
          Thư Chúc Tết
        </h2>
        <div className="flex-1 bg-white rounded-xl p-4 overflow-y-auto text-gray-800 text-sm">
          {content || (
            <span className="italic text-gray-400">
              Nội dung lời chúc sẽ hiển thị ở đây
            </span>
          )}
        </div>

        <div className="flex gap-2 justify-center mt-4">
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs">
            {form.isPrivate ? "Riêng tư" : "Công khai"}
          </span>
          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
            {form.enableShare ? "Chia sẻ" : "Không share"}
          </span>
        </div>
      </div>
    </div>
  );
}
