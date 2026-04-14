"use client";

import NavbarAuth from "@/components/layout/NavbarAuth";
import EmailInput from "@/components/ui/EmailInput";
import Link from "next/link";
import { ArrowRight, CheckCircle, Mail, Loader } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import useForgot from "./hooks/useForgot";

const ForgotClient = () => {
  const {
    errors,
    handleSubmit,
    isSubmitting,
    isValid,
    register,
    submit,
    success,
    submitError,
    canResend,
    resendCountdown,
    resetState,
  } = useForgot();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <NavbarAuth />

      {/* Background Gradient */}
      <div className="fixed inset-0 z-1">
        <div className="absolute top-20 -right-48 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/3 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/3 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="flex relative z-2 items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 pt-24 pb-10">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {/* Forgot Password Card - Before Submit */}
            {!success ? (
              <motion.div
                key="forgot-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-black/50 p-8 sm:p-10 border border-gray-200 dark:border-gray-800"
              >
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-500/10">
                      <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    Forgot Password?
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    No worries! Enter your email and we&apos;ll send you a reset
                    link.
                  </p>
                </div>

                {/* Submit Error Message */}
                <AnimatePresence mode="wait">
                  {submitError && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30"
                    >
                      <p className="text-sm text-red-700 dark:text-red-400">
                        {submitError}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Forgot Password Form */}
                <form onSubmit={handleSubmit(submit)} className="space-y-6">
                  {/* Email Input */}
                  <EmailInput
                    error={errors.email?.message}
                    placeholder="Enter your email address"
                    {...register("email")}
                  />

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    className="w-full py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Reset Link
                        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                        or
                      </span>
                    </div>
                  </div>

                  {/* Additional Links */}
                  <div className="space-y-3 text-center">
                    <p className="text-gray-600 dark:text-gray-400">
                      Remember your password?{" "}
                      <Link
                        href="/login"
                        className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300"
                      >
                        Back to Login
                      </Link>
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Don&apos;t have an account?{" "}
                      <Link
                        href="/register"
                        className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300"
                      >
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </form>
              </motion.div>
            ) : (
              /* Success State */
              <motion.div
                key="success-state"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-black/50 p-8 sm:p-10 border border-gray-200 dark:border-gray-800"
              >
                {/* Success Icon */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="flex justify-center mb-4"
                  >
                    <div className="p-3 rounded-full bg-green-50 dark:bg-green-500/10">
                      <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                  </motion.div>

                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    Check Your Email
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    If an account exists with this email address, we&apos;ve
                    sent a password reset link.
                  </p>
                </div>

                {/* Success Message Box */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8 p-4 rounded-lg bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30"
                >
                  <p className="text-sm text-green-700 dark:text-green-400">
                    Please check your inbox and follow the link to reset your
                    password. The link expires in 24 hours.
                  </p>
                </motion.div>

                {/* Resend Section */}
                <div className="space-y-4 mb-8">
                  <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                    Didn&apos;t receive the email?
                  </p>
                  <button
                    onClick={() => {
                      resetState();
                    }}
                    disabled={!canResend || isSubmitting}
                    className="w-full py-3 px-4 rounded-lg border-2 border-blue-600 hover:border-blue-700 disabled:border-gray-300 dark:disabled:border-gray-700 disabled:cursor-not-allowed text-blue-600 hover:text-blue-700 disabled:text-gray-400 dark:disabled:text-gray-500 font-semibold transition-all duration-300 cursor-pointer"
                  >
                    {canResend ? (
                      "Try Again"
                    ) : (
                      <>
                        Resend in{" "}
                        <span className="ml-1 font-bold">
                          {resendCountdown}s
                        </span>
                      </>
                    )}
                  </button>
                </div>

                {/* Security Tips */}
                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 mb-8">
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    <strong>Security tip:</strong> Never share your reset link
                    with anyone. WikiArticle will never ask for your password
                    via email.
                  </p>
                </div>

                {/* Back to Login */}
                <Link
                  href="/login"
                  className="block w-full py-3 px-4 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold transition-all duration-300 text-center"
                >
                  Back to Login
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ForgotClient;
