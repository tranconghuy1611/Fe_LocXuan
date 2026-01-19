export default function Pagination({
  page,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from(
    { length: totalPages },
    (_, i) => i
  );

  return (
    <div className="flex justify-center gap-2 mt-6">
      {/* Prev */}
      <button
        disabled={page === 0}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-1 rounded border text-sm disabled:opacity-40"
      >
        ‹
      </button>

      {/* Page numbers */}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 rounded border text-sm
            ${
              page === p
                ? "bg-blue-600 text-white border-blue-600"
                : "hover:bg-gray-100"
            }`}
        >
          {p + 1}
        </button>
      ))}

      {/* Next */}
      <button
        disabled={page === totalPages - 1}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-1 rounded border text-sm disabled:opacity-40"
      >
        ›
      </button>
    </div>
  );
}
