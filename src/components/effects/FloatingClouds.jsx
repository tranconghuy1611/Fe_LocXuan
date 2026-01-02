import { motion } from "framer-motion";

export default function FloatingClouds() {
  return (
    <>
      <motion.div
        className="absolute top-20 left-10 w-32 h-16 bg-white/10 rounded-full blur-xl"
        animate={{ x: [0, 50, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-40 right-20 w-40 h-20 bg-white/10 rounded-full blur-xl"
        animate={{ x: [0, -40, 0], y: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}
