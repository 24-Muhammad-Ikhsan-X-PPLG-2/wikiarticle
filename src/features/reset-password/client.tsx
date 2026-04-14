"use client";

import NavbarAuth from "@/components/layout/NavbarAuth";
import PasswordInput from "@/components/ui/PasswordInput";
import { Check, Loader } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import useResetPassword from "./hooks/useResetPassword";
import PasswordStrengthIndicator from "./components/PasswordStrengthIndicator";
import { FC } from "react";

const ResetPasswordClient: FC<{ forgotId: string }> = ({ forgotId }) => {
  const {
    errors,
    handleSubmit,
    isSubmitting,
    isValid,
    register,
    submit,
    success,
    submitError,
    password,
    setSuccess,
  } = useResetPassword({ forgotId });

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
            {!success ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Reset Password Card */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-black/50 p-8 sm:p-10 border border-gray-200 dark:border-gray-800">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                      Reset Password
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                      Enter your new password below
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

                  {/* Form */}
                  <form onSubmit={handleSubmit(submit)} className="space-y-6">
                    {/* New Password Input */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          placeholder="Enter your new password"
                          className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 bg-white dark:bg-gray-900 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 ${
                            errors.password
                              ? "border-red-500 dark:border-red-500 focus:ring-red-500"
                              : "border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-transparent"
                          } text-gray-900 dark:text-white`}
                          {...register("password")}
                        />
                      </div>
                      {errors.password && (
                        <p className="text-sm text-red-500 dark:text-red-400">
                          {errors.password.message}
                        </p>
                      )}
                      {password && (
                        <PasswordStrengthIndicator password={password} />
                      )}
                    </div>

                    {/* Confirm Password Input */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          placeholder="Confirm your password"
                          className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 bg-white dark:bg-gray-900 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 ${
                            errors.confirmPassword
                              ? "border-red-500 dark:border-red-500 focus:ring-red-500"
                              : "border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-transparent"
                          } text-gray-900 dark:text-white`}
                          {...register("confirmPassword")}
                        />
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-sm text-red-500 dark:text-red-400">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting || !isValid}
                      whileHover={{
                        scale: isSubmitting || !isValid ? 1 : 1.02,
                      }}
                      whileTap={{ scale: isSubmitting || !isValid ? 1 : 0.98 }}
                      className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                        isSubmitting || !isValid
                          ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader className="w-5 h-5 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        "Update Password"
                      )}
                    </motion.button>
                  </form>

                  {/* Back to Login Link */}
                  <div className="mt-6 text-center">
                    <p className="text-gray-600 dark:text-gray-400">
                      Remember your password?{" "}
                      <Link
                        href="/login"
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors"
                      >
                        Back to Login
                      </Link>
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Success Card */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-black/50 p-8 sm:p-10 border border-gray-200 dark:border-gray-800">
                  {/* Success Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                    className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mb-6"
                  >
                    <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </motion.div>

                  {/* Success Message */}
                  <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                      Password Updated!
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                      Your password has been successfully reset. You can now
                      login with your new password.
                    </p>
                  </div>

                  {/* Go to Home Button */}
                  <Link
                    href="/"
                    className="block w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 text-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
                  >
                    Go to Home
                  </Link>

                  {/* Back Button */}
                  <motion.button
                    type="button"
                    onClick={() => setSuccess(false)}
                    className="w-full mt-4 py-3 px-4 rounded-lg font-semibold transition-all duration-300 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
                  >
                    Reset Another Password
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordClient;
