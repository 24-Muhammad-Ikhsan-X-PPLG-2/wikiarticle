"use client";

import NavbaraAuth from "@/components/layout/NavbarAuth";
import ConfirmPasswordInput from "@/components/ui/ConfirmPasswordInput";
import EmailInput from "@/components/ui/EmailInput";
import PasswordInput from "@/components/ui/PasswordInput";
import SocialLoginButtons from "@/components/ui/SocialLoginButtons";
import TextInput from "@/components/ui/TextInput";
import handleSocialLogin from "@/lib/socialLogin";
import { registerSchema, RegisterSchemaType } from "@/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const Register = () => {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful, isValid },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      confirmPassword: "",
      email: "",
      fullName: "",
      password: "",
    },
  });
  const submit: SubmitHandler<RegisterSchemaType> = () => {
    alert("Submit");
  };
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <NavbaraAuth />

      {/* Background Gradient */}
      <div className="fixed inset-0 z-1">
        <div className="absolute top-20 -right-48 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/3 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/3 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="flex relative z-2 items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 pt-24 pb-10">
        <div className="w-full max-w-md">
          {/* Register Card */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-black/50 p-8 sm:p-10 border border-gray-200 dark:border-gray-800">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Create an Account
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Join WikiArticle today
              </p>
            </div>

            {/* Submit Error Message */}
            {submitError && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30">
                <p className="text-sm text-red-700 dark:text-red-400">
                  {submitError}
                </p>
              </div>
            )}

            {/* Register Form */}
            <form onSubmit={handleSubmit(submit)} className="space-y-5">
              {/* Full Name Input */}
              <TextInput
                error={errors.fullName?.message}
                placeholder="John Doe"
                {...register("fullName")}
              />

              {/* Email Input */}
              <EmailInput
                error={errors.email?.message}
                placeholder="you@example.com"
                {...register("email")}
              />

              {/* Password Input */}
              <PasswordInput
                error={errors.password?.message}
                placeholder="At least 6 characters"
                {...register("password")}
              />

              {/* Confirm Password Input */}
              <ConfirmPasswordInput
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />

              {/* Terms & Conditions */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-gray-300 dark:border-gray-700 text-blue-600 focus:ring-blue-500 cursor-pointer mt-0.5 shrink-0"
                  required
                  {...register("terms")}
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors"
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>

              {/* Register Button */}
              <button
                type="submit"
                disabled={!isValid || isSubmitting || isSubmitSuccessful}
                className="w-full px-4 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Creating account...</span>
                  </>
                ) : isSubmitSuccessful ? (
                  <>
                    <div className="size-5 rounded-full bg-green-500 flex justify-center items-center">
                      <Check className="size-4" />
                    </div>
                    <span>Account created!</span>
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                or
              </span>
              <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
            </div>

            {/* Social Login Buttons */}
            <SocialLoginButtons
              onGoogleClick={() => handleSocialLogin("Google")}
              onGithubClick={() => handleSocialLogin("GitHub")}
            />

            {/* Login Link */}
            <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-6">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
