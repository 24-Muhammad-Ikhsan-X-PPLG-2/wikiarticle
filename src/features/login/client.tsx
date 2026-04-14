"use client";

import NavbarAuth from "@/components/layout/NavbarAuth";
import EmailInput from "@/components/ui/EmailInput";
import PasswordInput from "@/components/ui/PasswordInput";
import SocialLoginButtons from "@/components/ui/SocialLoginButtons";
import handleSocialLogin from "@/lib/socialLogin";
import { Check, Loader } from "lucide-react";
import Link from "next/link";
import useLogin from "./hooks/useLogin";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const Login = () => {
  const searchParams = useSearchParams();
  const redirectParams = searchParams.get("redirect");
  const [isSuccessReg, setIsSuccessReg] = useState(
    searchParams.get("regSuccess") ? true : false,
  );
  const router = useRouter();
  const {
    errors,
    handleSubmit,
    isSubmitting,
    isValid,
    register,
    submit,
    success,
    submitError,
  } = useLogin({ redirect: redirectParams });

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isSuccessReg) {
        setIsSuccessReg(false);
        router.replace("/login", {
          scroll: false,
        });
      }
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

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
          {/* Login Card */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-black/50 p-8 sm:p-10 border border-gray-200 dark:border-gray-800">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Login to your WikiArticle account
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
              {isSuccessReg && (
                <motion.div
                  exit={{ opacity: 0 }}
                  className="mb-6 p-4 rounded-lg bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30"
                >
                  <p className="text-sm text-green-700 dark:text-green-400">
                    You&apos;re in! Sign in to start exploring.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Login Form */}
            <form onSubmit={handleSubmit(submit)} className="space-y-5">
              {/* Email Input */}
              <EmailInput
                error={errors.email?.message}
                placeholder="you@example.com"
                {...register("email")}
              />

              {/* Password Input */}
              <PasswordInput
                error={errors.password?.message}
                {...register("password")}
              />

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-700 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    {...register("rememberMe")}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Remember me
                  </span>
                </label>
                <Link
                  href="/forgot"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isSubmitting || success || !isValid}
                className="w-full px-4 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Logging in...</span>
                  </>
                ) : success ? (
                  <>
                    <div className="size-5 rounded-full bg-green-500 flex justify-center items-center">
                      <Check className="size-4" />
                    </div>
                    <span>Success</span>
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                or continue with
              </span>
              <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
            </div>

            {/* Social Login */}
            <SocialLoginButtons
              onGoogleClick={() => handleSocialLogin("Google")}
              onGithubClick={() => handleSocialLogin("GitHub")}
            />

            {/* Sign Up Link */}
            <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>

          {/* Footer Note */}
          <p className="text-center text-xs text-gray-500 dark:text-gray-500 mt-6">
            By logging in, you agree to our{" "}
            <a
              href="#"
              className="text-gray-700 dark:text-gray-300 hover:underline"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-gray-700 dark:text-gray-300 hover:underline"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
