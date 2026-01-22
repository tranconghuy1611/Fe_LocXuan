export default function ConfirmDisable({ open, onConfirm, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm">
        <h3 className="text-lg font-bold mb-2">
          ⚠️ Xác nhận ngừng lộc
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Lộc này sẽ không còn xuất hiện khi quay. Bạn có chắc không?
        </p>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Ngừng
          </button>
        </div>
      </div>
    </div>
  );
}
