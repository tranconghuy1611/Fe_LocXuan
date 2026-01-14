import React, { useEffect, useState } from "react";
import { Users, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { getWalletTransactions } from "../../../services/wallet.service";

export default function LichSu() {
  const [activeTab, setActiveTab] = useState("all");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await getWalletTransactions();
      setTransactions(res.data.data);
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
    time: new Date(t.createdAt).toLocaleString("vi-VN"),
    avatar: t.amount > 0 ? "🧧" : "🎁",
  }));

  const filteredTransactions =
    activeTab === "all"
      ? mappedTransactions
      : mappedTransactions.filter((t) => t.type === activeTab);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-red-100 p-6 h-fit sticky top-24">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
          <Users className="w-5 h-5 text-white" />
        </div>
        <h3 className="font-bold text-xl text-gray-900">Hoạt động</h3>
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
            onClick={() => setActiveTab(tab.k)}
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
        <p className="text-center text-gray-500 text-sm">Đang tải...</p>
      ) : filteredTransactions.length === 0 ? (
        <p className="text-center text-gray-500 text-sm">
          Chưa có giao dịch
        </p>
      ) : (
        <div className="space-y-3">
          {filteredTransactions.map((t) => (
            <div
              key={t.id}
              className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-red-200 hover:shadow-md transition-all"
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
                  {t.amount > 0 ? "+" : "-"}
                  {Math.abs(t.amount).toLocaleString()}
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
      )}
    </div>
  );
}
