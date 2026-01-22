import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.div
      className="absolute top-24 left-0 right-0 text-center z-30 px-4"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
    >
      <motion.h1
        className="text-6xl md:text-8xl font-black tracking-wider mb-4"
        style={{
          background: 'linear-gradient(180deg, #FCD34D 0%, #F59E0B 50%, #D97706 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 4px 20px rgba(252, 211, 77, 0.4)',
        }}
        initial={{ letterSpacing: '0.5em', opacity: 0 }}
        animate={{ letterSpacing: '0.15em', opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        CHÚC MỪNG
        <br />
        NĂM MỚI
      </motion.h1>

      <motion.div
        className="text-4xl md:text-5xl font-bold text-yellow-400 mb-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        2026
      </motion.div>

      <motion.div
        className="inline-block px-8 py-3 bg-gradient-to-r from-red-800/80 to-red-900/80 backdrop-blur-sm rounded-full border-2 border-yellow-600/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        <p className="text-xl md:text-2xl text-yellow-100 font-serif italic">
          An Khang Thịnh Vượng
        </p>
      </motion.div>
    </motion.div>
  );
}
