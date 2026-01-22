import { motion } from "framer-motion";

export default function WishModal({ wish, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 backdrop-blur-md px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-2xl w-full bg-gradient-to-br from-red-800 to-red-950 rounded-3xl border-4 border-yellow-600/60 shadow-2xl p-12 text-center"
        initial={{ scale: 0.7, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0.4 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />

        <motion.div
          className="text-6xl mb-6"
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🌸
        </motion.div>

        <motion.p
          className="text-yellow-100 font-serif text-2xl md:text-3xl leading-relaxed mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {wish}
        </motion.p>

        <motion.div
          className="text-yellow-500/60 text-sm tracking-widest mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          ───  NĂM BÍNH NGỌ 2026  ───
        </motion.div>

        <motion.button
          onClick={onClose}
          className="px-10 py-3 bg-gradient-to-r from-yellow-600 to-yellow-700 text-red-900 font-bold rounded-full border-2 border-yellow-400 shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Đóng
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
