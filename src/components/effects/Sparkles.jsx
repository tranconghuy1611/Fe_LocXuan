import { motion } from "framer-motion";
import { useMemo } from "react";

export default function Sparkles() {
  const sparkles = useMemo(
    () =>
      Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3,
        duration: Math.random() * 2 + 1,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-5">
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute w-2 h-2"
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-full h-full bg-yellow-200 rounded-full blur-sm" />
        </motion.div>
      ))}
    </div>
  );
}
