import { X, Sparkles, Eye, Copy, Share2 } from "lucide-react";

export default function WishSuccessModal({ wish, onClose }) {
    if (!wish) return null;

    const shareLink = wish.shareToken
        ? `${window.location.origin}/wish/share/${wish.shareToken}`
        : null;


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            {/* Modal */}
            <div className="relative w-full max-w-lg bg-gradient-to-br from-red-700 via-red-600 to-amber-500 rounded-3xl shadow-2xl p-8 text-white animate-scaleIn">

                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20"
                >
                    <X />
                </button>

                {/* Header */}
                <div className="text-center mb-6">
                    <div className="mx-auto w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg mb-4">
                        <Sparkles className="text-red-700" size={40} />
                    </div>
                    <h2 className="text-3xl font-black">🎉 Tạo Thiệp Thành Công!</h2>
                    <p className="text-yellow-100 mt-2">
                        Lời chúc Tết của bạn đã sẵn sàng
                    </p>
                </div>

                {/* Link share */}
                {shareLink && (
                    <div className="bg-white/20 p-4 rounded-2xl mb-6">
                        <div className="text-sm font-bold mb-2 flex items-center gap-2">
                            <Share2 size={16} /> Link chia sẻ
                        </div>
                        <div className="flex gap-2">
                            <input
                                value={shareLink}
                                readOnly
                                className="flex-1 px-3 py-2 rounded-xl text-black text-sm"
                            />
                            <button
                                onClick={() => navigator.clipboard.writeText(shareLink)}
                                className="px-4 bg-yellow-400 text-red-700 rounded-xl font-bold hover:scale-105 transition"
                            >
                                <Copy size={18} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                    <a
                        href={`/wish/share/${wish.shareToken}`}
                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-white text-red-700 rounded-xl font-black hover:scale-105 transition"
                    >
                        <Eye /> Xem thiệp
                    </a>
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 bg-white/20 rounded-xl font-bold hover:bg-white/30"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
}
