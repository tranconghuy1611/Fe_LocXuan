import { motion } from "framer-motion";

export default function GlowingLantern({ className, delay = 0 }) {
  return (
    <div className="hidden sm:block">
     <motion.div
      className={`absolute ${className} z-30`}
      initial={{ opacity: 0, y: -30, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.5, delay, type: "spring" }}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* String */}
        <div className="w-1 h-12 bg-yellow-800/50 mx-auto mb-2" />
        
        {/* Lantern Body */}
        <div className="relative">
          {/* Glow effect */}
          <motion.div
            className="absolute -inset-6 bg-orange-500/40 rounded-full blur-xl"
            animate={{
              opacity: [0.4, 0.7, 0.4],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          <div className="relative w-20 h-28 bg-gradient-to-b from-red-500 via-red-600 to-red-700 rounded-2xl border-2 border-yellow-600/50 overflow-hidden shadow-2xl">
            {/* Light effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-yellow-400/40 via-orange-400/20 to-transparent"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Top ring */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-yellow-600 rounded-full" />
            
            {/* Fortune character */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-yellow-400 font-bold text-xl"
              style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.8)' }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              An Bình
            </motion.div>
            
            {/* Tassel */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-14 bg-gradient-to-b from-yellow-500 via-yellow-600 to-red-600 opacity-90"
              style={{ clipPath: "polygon(30% 0%, 70% 0%, 85% 70%, 50% 100%, 15% 70%)" }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
    </div>
  );
}
