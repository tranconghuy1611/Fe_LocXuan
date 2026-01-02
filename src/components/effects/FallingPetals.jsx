import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function FallingPetals() {
  const petals = useMemo(
    () => Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 15,
      size: Math.random() * 8 + 6,
    })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{ left: `${p.x}%`, width: p.size, height: p.size }}
          initial={{ y: -20, opacity: 0, rotate: 0 }}
          animate={{
            y: '110vh',
            x: [0, 30, -30, 0],
            opacity: [0, 1, 1, 0],
            rotate: [0, 360, 720],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <svg viewBox="0 0 20 20">
            {[...Array(5)].map((_, j) => {
              const angle = (j * 72 - 90) * Math.PI / 180;
              return (
                <ellipse
                  key={j}
                  cx={10 + Math.cos(angle) * 5}
                  cy={10 + Math.sin(angle) * 5}
                  rx="3"
                  ry="6"
                  fill="#FFF5F7"
                  opacity="0.9"
                  transform={`rotate(${j * 72}, ${10 + Math.cos(angle) * 5}, ${10 + Math.sin(angle) * 5})`}
                />
              );
            })}
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
