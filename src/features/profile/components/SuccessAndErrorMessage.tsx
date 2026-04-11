"use client";

import { Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { FC } from "react";

type Props = {
  submitSuccess: boolean;
  submitError: string | null;
};

const SuccessAndErrorMessage: FC<Props> = ({ submitError, submitSuccess }) => {
  return (
    <AnimatePresence mode="wait">
      {submitSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mb-6 p-4 rounded-2xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 flex items-center gap-3"
        >
          <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
          <p className="text-sm text-green-700 dark:text-green-300">
            Your profile has been updated successfully!
          </p>
        </motion.div>
      )}
      {submitError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 flex items-center gap-3"
        >
          <p className="text-sm text-red-700 dark:text-red-300">
            {submitError}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessAndErrorMessage;
