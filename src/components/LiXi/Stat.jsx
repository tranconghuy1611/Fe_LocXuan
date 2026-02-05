export default function Stat({ title, value, sub, gradient, icon }) {
  return (
    <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all hover:scale-105">
      <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
        <div className={`w-full h-full bg-gradient-to-br ${gradient} rounded-bl-full`}></div>
      </div>
      <div className="relative">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              {title}
            </p>
            <p className="text-3xl font-bold text-gray-900">
              {value}
            </p>
            <span className="text-sm text-gray-500 font-medium">VNĐ</span>
          </div>
          <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-lg`}>
            <div className="text-white">{icon}</div>
          </div>
        </div>
        <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${gradient} text-white`}>
          {sub}
        </div>
      </div>
    </div>
  );
}