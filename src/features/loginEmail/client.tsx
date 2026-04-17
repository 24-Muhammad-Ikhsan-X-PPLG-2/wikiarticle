"use client";

import NavbarAuth from "@/components/layout/NavbarAuth";
import EmailInput from "@/components/ui/EmailInput";
import SocialLoginButtons from "@/components/ui/SocialLoginButtons";
import { Check, ChevronRight, Clock, Mail, Loader } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import useLoginEmail from "./hooks/useLoginEmail";
import BgGradient from "./components/BgGradient";
import HeaderCard from "./components/Card/HeaderCard";
import ErrorMessage from "./components/Card/ErrorMessage";
import Divider from "./components/Card/Divider";
import FooterLink from "./components/Card/FooterLink";
import SuccessState from "./components/SuccessState";
import SubmitButton from "./components/Card/SubmitButton";

const LoginEmailClient = () => {
  const {
    errors,
    handleSubmit,
    isSubmitting,
    isValid,
    register,
    submit,
    success,
    submitError,
    resendCooldown,
    sentEmail,
    handleResend,
    emailValue,
  } = useLoginEmail();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <NavbarAuth />

      {/* Background Gradient Blobs */}
      <BgGradient />

      {/* Main Content */}
      <div className="flex relative z-10 items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 pt-24 pb-10">
        <AnimatePresence mode="wait">
          {!success ? (
            <motion.div
              key="login-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full max-w-md"
            >
              {/* Login Card */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-black/50 p-8 sm:p-10 border border-gray-200 dark:border-gray-800 backdrop-blur-sm">
                {/* Header */}
                <HeaderCard />

                {/* Error Message */}
                <ErrorMessage submitError={submitError} />

                {/* Login Form */}
                <form onSubmit={handleSubmit(submit)} className="space-y-6">
                  {/* Email Input */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.3 }}
                  >
                    <EmailInput
                      placeholder="you@example.com"
                      error={errors.email?.message}
                      {...register("email")}
                    />
                  </motion.div>

                  {/* Submit Button */}
                  <SubmitButton isSubmitting={isSubmitting} isValid={isValid} />
                </form>

                {/* Divider */}
                <Divider />

                {/* Social Login Buttons */}
                <div className="mb-6">
                  <SocialLoginButtons
                    onGoogleClick={() => console.log("Google login")}
                    onEmailClick={() => console.log("Email login")}
                  />
                </div>

                {/* Footer Links */}
                <FooterLink />
              </div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.3 }}
                className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400"
              >
                <p>🔒 Secure passwordless login • No password to remember</p>
              </motion.div>
            </motion.div>
          ) : (
            /* Success State */
            <SuccessState
              handleResend={handleResend}
              resendCooldown={resendCooldown}
              sentEmail={sentEmail}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoginEmailClient;
