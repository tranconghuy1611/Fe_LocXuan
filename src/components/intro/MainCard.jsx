import { motion } from "framer-motion";

export default function MainCard({ onOpenWish }) {
  return (
    <motion.div
      className="relative max-w-2xl mx-auto bg-gradient-to-br from-red-800/80 to-red-900/80 backdrop-blur-md rounded-3xl border-4 border-yellow-600/50 shadow-2xl overflow-hidden"
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, duration: 1, type: "spring" }}
    >
      {/* Decorative border pattern */}
      <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600" />
      <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600" />

      <div className="p-12 text-center">
        <motion.p
          className=" mt-7 text-yellow-100 text-lg md:text-xl leading-relaxed font-light "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          Nhân dịp năm mới, kính chúc quý khách hàng
          <br />
          năm mới hạnh phúc, sức khỏe, tràn đầy niềm vui, thành công.
        </motion.p>

        <motion.button
          onClick={onOpenWish}
          className="relative px-12 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-red-900 text-xl font-bold rounded-full shadow-xl border-2 border-yellow-300 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(251, 191, 36, 0.6)" }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            animate={{ x: ['-200%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <span className="relative z-10">🎁 Nhận Lời Chúc Năm Mới</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
