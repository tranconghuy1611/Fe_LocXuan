import React, { useEffect, useState } from "react";
import { Users, ArrowUpRight, ArrowDownLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { getWalletTransactions } from "../../../services/wallet.service";

export default function LichSu() {
  const [activeTab, setActiveTab] = useState("all");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State phân trang
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [pageSize] = useState(5); // Số giao dịch mỗi trang

  useEffect(() => {
    fetchTransactions();
  }, [currentPage, activeTab]); // Thêm activeTab để filter theo tab

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const data = await getWalletTransactions(currentPage, pageSize);
      
      setTransactions(data.content || []);
      setTotalPages(data.totalPages || 0);
      setTotalElements(data.totalElements || 0);
    } catch (err) {
      console.error("Lỗi lấy lịch sử giao dịch", err);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // MAP DATA BACKEND → UI
  // ===============================
  const mappedTransactions = transactions.map((t) => ({
    id: t.id,
    name: t.description.replace("Lì xì cho", "").trim(),
    amount: t.amount,
    type: t.amount > 0 ? "received" : "sent",
    time: t.createdAt 
      ? new Date(t.createdAt).toLocaleString("vi-VN", {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      : "Gần đây",
    avatar: t.amount > 0 ? "🧧" : "🎁",
  }));

  // Filter theo tab
  const filteredTransactions =
    activeTab === "all"
      ? mappedTransactions
      : mappedTransactions.filter((t) => t.type === activeTab);

  // Reset về trang đầu khi đổi tab
  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    setCurrentPage(0);
  };

  // Điều hướng phân trang
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-red-100 p-6 h-fit sticky top-24">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-bold text-xl text-gray-900">Hoạt động</h3>
        </div>
        
        {/* Hiển thị tổng số giao dịch */}
        {totalElements > 0 && (
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {totalElements} giao dịch
          </span>
        )}
      </div>

      {/* TABS */}
      <div className="flex gap-2 mb-6">
        {[
          { k: "all", t: "Tất cả", icon: Users },
          { k: "sent", t: "Đã gửi", icon: ArrowUpRight },
          { k: "received", t: "Đã nhận", icon: ArrowDownLeft },
        ].map((tab) => (
          <button
            key={tab.k}
            onClick={() => handleTabChange(tab.k)}
            className={`flex-1 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === tab.k
                ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab.t}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
        </div>
      ) : filteredTransactions.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-gray-500 text-sm font-medium">
            Chưa có giao dịch
          </p>
          <p className="text-gray-400 text-xs mt-1">
            Các giao dịch của bạn sẽ hiển thị ở đây
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-3 mb-5">
            {filteredTransactions.map((t) => (
              <div
                key={t.id}
                className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-red-200 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="text-3xl">{t.avatar}</div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">
                    {t.name}
                  </p>
                  <p className="text-xs text-gray-500">{t.time}</p>
                </div>

                <div className="flex flex-col items-end">
                  <div
                    className={`font-bold text-lg ${
                      t.type === "received"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {t.amount > 0 ? "+" : ""}
                    {t.amount.toLocaleString()}
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      t.type === "received"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {t.type === "received" ? "Nhận" : "Gửi"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className="flex items-center gap-1 px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-medium text-gray-700"
              >
                <ChevronLeft size={16} />
                <span className="hidden sm:inline">Trước</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600">
                  Trang <span className="font-bold text-red-600">{currentPage + 1}</span> / {totalPages}
                </span>
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages - 1}
                className="flex items-center gap-1 px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-medium text-gray-700"
              >
                <span className="hidden sm:inline">Sau</span>
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}