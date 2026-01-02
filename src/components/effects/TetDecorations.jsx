import { motion } from "framer-motion";

export default function TetDecorations() {
  const decorations = [
    { icon: "🧧", position: "top-32 left-20", size: "text-5xl", delay: 0 },
    { icon: "🎊", position: "top-48 right-32", size: "text-4xl", delay: 0.2 },
    { icon: "🏮", position: "bottom-40 left-16", size: "text-6xl", delay: 0.4 },
    { icon: "🎆", position: "bottom-32 right-24", size: "text-5xl", delay: 0.6 },
    { icon: "🍊", position: "top-64 left-48", size: "text-4xl", delay: 0.8 },
    { icon: "🍑", position: "top-72 right-48", size: "text-4xl", delay: 1 },
    { icon: "🎋", position: "bottom-64 left-32", size: "text-5xl", delay: 1.2 },
    { icon: "🎎", position: "bottom-56 right-40", size: "text-4xl", delay: 1.4 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-15">
      {decorations.map((deco, i) => (
        <motion.div
          key={i}
          className={`absolute ${deco.position} ${deco.size}`}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{
            opacity: [0.6, 1, 0.6],
            scale: [0.9, 1.1, 0.9],
            rotate: [-5, 5, -5],
          }}
          transition={{
            opacity: { duration: 3, delay: deco.delay, repeat: Infinity },
            scale: { duration: 3, delay: deco.delay, repeat: Infinity },
            rotate: { duration: 4, delay: deco.delay, repeat: Infinity },
          }}
        >
          {deco.icon}
        </motion.div>
      ))}
    </div>
  );
}
