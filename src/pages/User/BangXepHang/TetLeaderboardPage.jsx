import {
  Crown,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-[#FFF6F4] text-gray-800">
    

      {/* Title */}
      <section className="text-center mt-12">
        <h1 className="text-4xl font-bold text-red-600">
          Bảng Vàng Danh Dự
        </h1>
        <p className="text-gray-600 mt-3 max-w-xl mx-auto">
          Cùng đua top để nhận lì xì may mắn đầu năm! Tích lũy điểm bằng
          cách tham gia các hoạt động ngày Tết.
        </p>
      </section>

      {/* Main */}
      <div className="max-w-7xl mx-auto mt-12 grid grid-cols-12 gap-6 px-6">
        {/* Left */}
        <div className="col-span-4 space-y-6">
          {/* Wallet */}
          <div className="bg-white rounded-2xl p-6 shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Ví Của Tôi</h3>
              <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">
                HẠNG 42
              </span>
            </div>

            <div className="flex flex-col items-center">
              <img
                src="https://i.pravatar.cc/100?img=5"
                className="w-24 h-24 rounded-full ring-4 ring-yellow-400"
              />
              <h4 className="mt-3 font-semibold text-lg">
                Nguyễn Văn A
              </h4>
              <p className="text-sm text-gray-500">
                Thành viên tích cực
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <StatBox value="1,250" label="TỔNG ĐIỂM" />
              <StatBox value="12" label="NHIỆM VỤ" />
            </div>

            <button className="mt-6 w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition">
              🎁 Bốc Lộc Ngay
            </button>
          </div>

          {/* Tasks */}
          <div className="bg-white rounded-2xl p-6 shadow">
            <h3 className="font-semibold mb-4">Nhiệm Vụ Hôm Nay</h3>

            <Task title="Đăng nhập hằng ngày" point="+50 điểm" done />
            <Task title="Gửi 3 lời chúc" point="+150 điểm" />
            <Task title="Chia sẻ thiệp lên FB" point="+200 điểm" />
          </div>
        </div>

        {/* Right */}
        <div className="col-span-8 bg-white rounded-2xl shadow p-6">
          {/* Top 3 */}
          <div className="grid grid-cols-3 gap-6 mb-10 items-end">
            <TopUser rank={2} name="Trần B" point="4,850" color="bg-gray-300" />
            <TopUser
              rank={1}
              name="Lê Văn C"
              point="5,200"
              color="bg-yellow-400"
              crown
            />
            <TopUser
              rank={3}
              name="Phạm Thị D"
              point="4,100"
              color="bg-orange-700"
            />
          </div>

          {/* Table */}
          <table className="w-full text-sm">
            <thead className="text-gray-500">
              <tr className="border-b">
                <th className="py-3 text-left">HẠNG</th>
                <th className="text-left">THÀNH VIÊN</th>
                <th className="text-right">ĐIỂM SỐ</th>
                <th className="text-right">XU HƯỚNG</th>
              </tr>
            </thead>
            <tbody>
              <RankRow rank={4} name="Hoàng Nam" point="3,950" up={2} />
              <RankRow rank={5} name="Thu Hà" point="3,800" />
              <RankRow rank={6} name="Minh Tuấn" point="3,650" down={1} />
              <RankRow rank={7} name="Ngọc Anh" point="3,400" up={3} />
              <RankRow rank={8} name="Quốc Thái" point="3,200" />
              <RankRow rank={9} name="Đức Hùng" point="3,100" down={2} />
              <RankRow rank={10} name="Thanh Hương" point="3,050" up={5} />
            </tbody>
          </table>

          <div className="text-center mt-6 text-sm text-gray-500 hover:text-red-600 cursor-pointer">
            Xem toàn bộ bảng xếp hạng
          </div>
        </div>
      </div>

    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatBox({ value, label }) {
  return (
    <div className="bg-red-50 rounded-xl p-4 text-center">
      <div className="text-xl font-bold text-red-600">{value}</div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
    </div>
  );
}

function Task({ title, point, done }) {
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-none">
      <div>
        <p className={`font-medium ${done && "line-through text-gray-400"}`}>
          {title}
        </p>
        <span className="text-xs text-red-500">{point}</span>
      </div>
      <button className="text-xs bg-gray-100 px-3 py-1 rounded-full">
        {done ? "✓" : "Làm ngay"}
      </button>
    </div>
  );
}

function TopUser({ rank, name, point, color, crown }) {
  return (
    <div className="text-center">
      <div className="relative inline-block">
        {crown && (
          <Crown className="absolute -top-6 left-1/2 -translate-x-1/2 text-yellow-400" />
        )}
        <img
          src={`https://i.pravatar.cc/80?u=${name}`}
          className="w-16 h-16 rounded-full mx-auto border-4 border-white"
        />
        <span className="absolute -bottom-2 right-0 bg-yellow-400 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full">
          {rank}
        </span>
      </div>

      <div className={`${color} h-24 rounded-xl mt-4`} />
      <p className="font-semibold mt-2">{name}</p>
      <p className="text-sm text-red-600 font-semibold">{point} điểm</p>
    </div>
  );
}

function RankRow({ rank, name, point, up, down }) {
  return (
    <tr className="border-b last:border-none">
      <td className="py-3 font-semibold">#{rank}</td>
      <td className="flex items-center gap-3 py-3">
        <img
          src={`https://i.pravatar.cc/40?u=${name}`}
          className="w-8 h-8 rounded-full"
        />
        {name}
      </td>
      <td className="text-right text-red-600 font-semibold">{point}</td>
      <td className="text-right">
        {up && (
          <span className="text-green-600 flex justify-end items-center gap-1">
            <TrendingUp size={14} /> {up}
          </span>
        )}
        {down && (
          <span className="text-red-600 flex justify-end items-center gap-1">
            <TrendingDown size={14} /> {down}
          </span>
        )}
        {!up && !down && <Minus className="ml-auto text-gray-400" size={14} />}
      </td>
    </tr>
  );
}
