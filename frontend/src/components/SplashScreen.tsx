import { Sprout } from "lucide-react";
import { motion } from "motion/react";

export function SplashScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 1, delay: 0.5 }}
          className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl mb-6 shadow-xl"
        >
          <Sprout className="w-12 h-12 text-white" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-emerald-900"
        >
          Blue Bridge
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-emerald-700 mt-2"
        >
          Connecting Farmers to the Future
        </motion.p>
      </motion.div>
    </div>
  );
}
