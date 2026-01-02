import React from 'react';
import { motion } from 'framer-motion';

export default function CherryBlossom({ side = 'left' }) {
  return (
    <motion.div
      className={`absolute top-0 ${side === 'left' ? 'left-0' : 'right-0'} w-96 h-64 z-20 pointer-events-none`}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, delay: 0.3 }}
    >
      <svg viewBox="0 0 400 300" className={side === 'right' ? 'scale-x-[-1]' : ''}>
        {/* Branch & Flowers code giống cũ */}
      </svg>
    </motion.div>
  );
}
