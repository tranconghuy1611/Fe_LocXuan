export default function TetDecorations() {
  return (
    <>
      {/* Pháo hoa */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-ping"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Trang trí */}
      <div className="absolute top-10 left-10 text-yellow-300 opacity-20 text-9xl">🌸</div>
      <div className="absolute bottom-10 right-10 text-yellow-300 opacity-20 text-9xl">🌸</div>
      <div className="absolute top-1/3 right-20 text-yellow-300 opacity-10 text-6xl">🎋</div>
      <div className="absolute bottom-1/3 left-20 text-yellow-300 opacity-10 text-6xl">🎋</div>
    </>
  );
}
