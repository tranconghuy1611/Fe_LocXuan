export default function TetLeftPanel() {
  return (
    <div className="hidden lg:block flex-1 text-white space-y-6">
      <div className="text-center mb-8">
        <div className="text-9xl mb-4 animate-bounce">🧧</div>
        <div className="flex justify-center gap-4 text-6xl">
          <span className="animate-pulse">🌸</span>
          <span className="animate-pulse delay-200">🎋</span>
          <span className="animate-pulse delay-400">🏮</span>
        </div>
      </div>

      <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/30">
        <h2 className="text-4xl font-bold mb-4 text-yellow-300">
          Xuân Ất Tỵ 2025
        </h2>

        {[
          '🎊 Vạn sự như ý',
          '💰 Tài lộc đầy nhà',
          '🏆 Thành công rực rỡ',
          '❤️ An khang thịnh vượng',
          '🌟 Phát tài phát lộc',
        ].map((text) => (
          <p key={text} className="text-lg">{text}</p>
        ))}
      </div>

      <div className="text-center">
        <div className="bg-red-700 border-4 border-yellow-400 rounded-lg p-4 inline-block">
          <p className="text-yellow-300 text-xl font-bold italic">
            "Xuân về muôn nơi hân hoan<br />
            Phúc lộc đầy nhà, niềm vui tràn lan"
          </p>
        </div>
      </div>
    </div>
  );
}
