"use client";

import { Check, Clock, Mail } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { FC } from "react";

type Props = {
  handleResend: () => void;
  sentEmail: string | null;
  resendCooldown: number;
};

const SuccessState: FC<Props> = ({
  handleResend,
  resendCooldown,
  sentEmail,
}) => {
  return (
    <motion.div
      key="success-state"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-md"
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-black/50 p-8 sm:p-10 border border-gray-200 dark:border-gray-800 text-center">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="mb-6"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full">
            <Check
              className="w-8 h-8 text-green-600 dark:text-green-400"
              strokeWidth={2.5}
            />
          </div>
        </motion.div>

        {/* Success Message */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Check your email
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          We've sent a login link to:
        </p>
        <p className="text-base font-semibold text-blue-600 dark:text-blue-400 mb-6 break-all">
          {sentEmail}
        </p>

        {/* Steps */}
        <div className="bg-blue-50 dark:bg-blue-500/10 rounded-lg p-4 mb-6 border border-blue-200 dark:border-blue-500/30">
          <div className="text-left space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 text-blue-600 dark:text-blue-400 font-bold">
                1.
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Click the link in your email
              </p>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 text-blue-600 dark:text-blue-400 font-bold">
                2.
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                You'll be logged in instantly
              </p>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 text-blue-600 dark:text-blue-400 font-bold">
                3.
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Link expires in 24 hours
              </p>
            </div>
          </div>
        </div>

        {/* Check Spam */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          💡 Didn't see it? Check your spam or promotional folder.
        </p>

        {/* Resend Button */}
        <button
          onClick={handleResend}
          disabled={resendCooldown > 0}
          className="w-full py-3 px-4 rounded-lg font-semibold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {resendCooldown > 0 ? (
            <>
              <Clock className="w-4 h-4" />
              <span>Resend in {resendCooldown}s</span>
            </>
          ) : (
            <>
              <Mail className="w-4 h-4" />
              <span>Resend Email</span>
            </>
          )}
        </button>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 font-medium">
              or
            </span>
          </div>
        </div>

        {/* Back Link */}
        <button
          onClick={() => window.location.reload()}
          className="w-full py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
        >
          Try another email
        </button>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            <Link
              href="/"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              ← Back to home
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SuccessState;
