"use client";

import { Mail } from "lucide-react";
import { motion } from "motion/react";

const HeaderCard = () => {
  return (
    <div className="text-center mb-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
          <Mail className="w-7 h-7 text-white" strokeWidth={1.5} />
        </div>
      </motion.div>

      <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
        Welcome Back
      </h1>
      <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
        Enter your email to continue
      </p>
    </div>
  );
};

export default HeaderCard;
