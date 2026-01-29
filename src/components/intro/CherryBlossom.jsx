import { motion } from "framer-motion";

export default function CherryBlossom({ side = "left" }) {
  return (
    <div className="hidden sm:block">
     <motion.div
      className={`absolute top-0 ${side === 'left' ? 'left-0' : 'right-0'} w-96 h-64 z-20 pointer-events-none`}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, delay: 0.3 }}
    >
      <svg viewBox="0 0 400 300" className={side === 'right' ? 'scale-x-[-1]' : ''}>
        {/* Branch */}
        <motion.path
          d="M 50,0 Q 80,50 100,100 T 150,200"
          stroke="#8B4513"
          strokeWidth="8"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2 }}
        />
        <motion.path
          d="M 80,60 Q 120,80 160,85"
          stroke="#8B4513"
          strokeWidth="5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.3 }}
        />
        <motion.path
          d="M 120,120 Q 160,135 200,140"
          stroke="#8B4513"
          strokeWidth="4"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        
        {/* Flowers */}
        {[
          { cx: 120, cy: 60, delay: 0.8 },
          { cx: 160, cy: 75, delay: 1 },
          { cx: 100, cy: 90, delay: 0.9 },
          { cx: 140, cy: 110, delay: 1.1 },
          { cx: 180, cy: 130, delay: 1.2 },
          { cx: 200, cy: 140, delay: 1.3 },
          { cx: 80, cy: 45, delay: 0.7 },
          { cx: 150, cy: 95, delay: 1.4 },
        ].map((flower, i) => (
          <motion.g key={i} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: flower.delay }}>
            {[...Array(5)].map((_, j) => {
              const angle = (j * 72 - 90) * Math.PI / 180;
              return (
                <ellipse
                  key={j}
                  cx={flower.cx + Math.cos(angle) * 8}
                  cy={flower.cy + Math.sin(angle) * 8}
                  rx="6"
                  ry="10"
                  fill="#FFF5F7"
                  transform={`rotate(${j * 72}, ${flower.cx + Math.cos(angle) * 8}, ${flower.cy + Math.sin(angle) * 8})`}
                />
              );
            })}
            <circle cx={flower.cx} cy={flower.cy} r="4" fill="#FFD700" />
          </motion.g>
        ))}
        
        {/* Buds */}
        {[
          { cx: 70, cy: 30 },
          { cx: 190, cy: 150 },
          { cx: 130, cy: 130 },
        ].map((bud, i) => (
          <motion.circle
            key={i}
            cx={bud.cx}
            cy={bud.cy}
            r="3"
            fill="#FFE4E9"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ delay: 1.5 + i * 0.2, duration: 0.5 }}
          />
        ))}
      </svg>
    </motion.div></div>
  );
}
