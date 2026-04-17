"use client";

import { AnimatePresence, motion } from "motion/react";
import { FC } from "react";

type Props = {
  submitError: string | null;
};

const ErrorMessage: FC<Props> = ({ submitError }) => {
  return (
    <AnimatePresence mode="wait">
      {submitError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30"
        >
          <p className="text-sm font-medium text-red-700 dark:text-red-400">
            {submitError}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorMessage;
