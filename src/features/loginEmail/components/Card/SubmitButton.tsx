"use client";

import { ChevronRight, Loader } from "lucide-react";
import { motion } from "motion/react";
import { FC } from "react";

type Props = {
  isSubmitting: boolean;
  isValid: boolean;
};

const SubmitButton: FC<Props> = ({ isSubmitting, isValid }) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.3 }}
      type="submit"
      disabled={isSubmitting || !isValid}
      className="w-full relative py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/50 group-disabled:shadow-none" />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-disabled:opacity-0" />

      {/* Button content */}
      <div className="relative flex items-center justify-center gap-2">
        {isSubmitting ? (
          <>
            <Loader className="w-4 h-4 animate-spin" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <span>Send Magic Link</span>
            <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-disabled:translate-x-0" />
          </>
        )}
      </div>
    </motion.button>
  );
};

export default SubmitButton;
