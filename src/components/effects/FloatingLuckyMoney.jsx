import { motion } from "framer-motion";
import { useMemo } from "react";

export default function FloatingLuckyMoney() {
  const envelopes = useMemo(
    () =>
      Array.from({ length: 8 }).map((_, i) => ({
        id: i,
        x: Math.random() * 80 + 10,
        y: Math.random() * 100,
        delay: Math.random() * 3,
        duration: Math.random() * 4 + 4,
      })),
    []
  );

  return (
    <div className="absolute inset-0 pointer-events-none z-12">
      {envelopes.map((env) => (
        <motion.div
          key={env.id}
          className="absolute text-5xl"
          style={{ left: `${env.x}%`, top: `${env.y}%` }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, -20, 0],
            rotate: [-10, 10, -10],
          }}
          transition={{
            duration: env.duration,
            delay: env.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🧧
        </motion.div>
      ))}
    </div>
  );
}
