import { useEffect, useState } from "react";
import { Crown, Medal } from "lucide-react";
import { getTop10Leaderboard } from "../../../services/leaderboard.service";

export default function Dashboard() {
  const [top10, setTop10] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTop10();
  }, []);

  const fetchTop10 = async () => {
    setLoading(true);
    try {
      const data = await getTop10Leaderboard();
      setTop10(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Greeting */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-1">
          Xin chào, Minh Anh! 👋
        </h2>
        <p className="text-gray-500">
          Tổng quan hệ thống Tết & hoạt động người dùng
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {[
          ["Tổng lượt lì xì", "12,480", "+18%"],
          ["Người dùng hoạt động", "1,240", "+6%"],
          ["Điểm đã phát", "8,900,000", "+12%"],
          ["Vòng quay hôm nay", "3,420", "+9%"],
        ].map((c, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border shadow-sm">
            <div className="text-gray-500 text-sm mb-1">{c[0]}</div>
            <div className="text-3xl font-bold">{c[1]}</div>
            <div className="text-green-600 text-sm font-medium">{c[2]}</div>
          </div>
        ))}
      </div>

      {/* Chart + Leaderboard */}
      <div className="grid grid-cols-3 gap-6">
        {/* Revenue */}
        <div className="col-span-2 bg-white p-6 rounded-2xl border shadow-sm h-[360px]">
          <h3 className="font-bold mb-4">📈 Thống kê điểm theo ngày</h3>
          <div className="h-full flex items-center justify-center text-gray-400">
            (Chart sẽ gắn sau)
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Crown className="text-yellow-500" size={20} />
            Top 10 Lì Xì
          </h3>

          {loading ? (
            <div className="text-center py-10 text-gray-400">
              Đang tải bảng xếp hạng...
            </div>
          ) : (
            <ul className="space-y-4">
              {top10.map((u, idx) => (
                <li
                  key={u.userId}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl
                    ${idx === 0 && "bg-yellow-50"}
                    ${idx === 1 && "bg-gray-50"}
                    ${idx === 2 && "bg-orange-50"}
                  `}
                >
                  <div className="flex items-center gap-3">
                    {/* Rank */}
                    <div className="w-6 text-center font-bold">
                      {idx < 3 ? (
                        <Medal
                          size={18}
                          className={
                            idx === 0
                              ? "text-yellow-500"
                              : idx === 1
                              ? "text-gray-400"
                              : "text-orange-500"
                          }
                        />
                      ) : (
                        idx + 1
                      )}
                    </div>

                    {/* Avatar */}
                    <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center font-bold text-red-600">
                      {u.fullName?.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <p className="font-medium text-sm">{u.fullName}</p>
                      <p className="text-xs text-gray-500">{u.email}</p>
                    </div>
                  </div>

                  <div className="font-semibold text-orange-600">
                    {u.points.toLocaleString()} đ
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
