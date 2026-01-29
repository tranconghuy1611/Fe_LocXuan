import { motion } from "framer-motion";

export default function FloatingLuckyItems() {
  return (
    
    <div className="absolute bottom-8 left-8 z-[25] hidden sm:block">
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0, rotate: -45 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1, delay: 1.5, type: "spring", bounce: 0.6 }}
      >
        {/* Red Envelope */}
        <motion.div
          className="relative"
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="w-28 h-36 bg-gradient-to-br from-red-500 to-red-700 rounded-lg shadow-xl relative overflow-hidden border-2 border-yellow-600/50">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent" />
            <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 text-yellow-400 font-bold text-3xl">
                
            </div>
          </div>
        </motion.div>

        {/* Gold Coins */}
        {[
          { x: -20, y: -10, delay: 1.7, rotation: 15 },
          { x: 90, y: 20, delay: 1.9, rotation: -20 },
          { x: 40, y: -30, delay: 2.1, rotation: 10 },
        ].map((coin, i) => (
          <motion.div
            key={i}
            className="absolute w-14 h-14"
            style={{ left: coin.x, top: coin.y }}
            initial={{ scale: 0, rotate: coin.rotation }}
            animate={{ scale: 1, rotate: coin.rotation }}
            transition={{ delay: coin.delay, type: "spring", bounce: 0.7 }}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 border-2 border-yellow-700 shadow-lg flex items-center justify-center">
              <div className="w-6 h-6 rounded-full border-2 border-yellow-800/30" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
