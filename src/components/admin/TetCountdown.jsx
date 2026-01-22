import { useEffect, useState } from "react";

function getTimeLeft(targetDate) {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  };
}

export default function TetCountdown() {
  // ⏰ chỉnh ngày Tết ở đây (VD: Tết 2026 – 17/02/2026)
  const target = new Date("2026-02-17T00:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState(getTimeLeft(target));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(target));
    }, 1000);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="flex items-center gap-4 px-5 py-3 rounded-2xl border border-red-200 bg-red-50">
      <span className="text-xs font-bold text-red-600 tracking-wide">
        TẾT COUNTDOWN
      </span>

      {["days", "hours", "minutes", "seconds"].map((key) => (
        <div key={key} className="text-center">
          <div className="text-red-600 font-bold text-lg leading-none">
            {String(timeLeft[key]).padStart(2, "0")}
          </div>
          <div className="text-[10px] text-gray-500 uppercase">
            {key === "days" ? "Days" :
             key === "hours" ? "Hrs" :
             key === "minutes" ? "Min" : "Sec"}
          </div>
        </div>
      ))}
    </div>
  );
}
