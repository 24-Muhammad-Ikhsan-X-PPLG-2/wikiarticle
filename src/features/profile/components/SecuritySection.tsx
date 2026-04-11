"use client";

import { motion } from "motion/react";
import FormSection from "./FormSection";
import { Lock } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { ProfileSettingsSchemaType } from "@/schemas/profileSettingsSchema";
import { FC } from "react";

const SecuritySection: FC = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<ProfileSettingsSchemaType>();
  const newPassword = watch("newPassword");
  const confirmNewPassword = watch("confirmNewPassword");
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
    >
      <FormSection
        title="Security"
        description="Change your password or security settings"
      >
        <div className="space-y-4">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Current Password (Optional)
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
              <input
                type="password"
                className={`w-full pl-12 pr-4 py-3 rounded-lg border transition-all duration-300 bg-white dark:bg-gray-900 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 ${
                  errors.currentPassword
                    ? "border-red-500 dark:border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-transparent"
                } text-gray-900 dark:text-white`}
                placeholder="••••••••"
                {...register("currentPassword")}
              />
            </div>
            {errors.currentPassword && (
              <p className="text-sm text-red-500 dark:text-red-400 mt-2">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              New Password (Optional)
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
              <input
                type="password"
                className={`w-full pl-12 pr-4 py-3 rounded-lg border transition-all duration-300 bg-white dark:bg-gray-900 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 ${
                  errors.newPassword
                    ? "border-red-500 dark:border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-transparent"
                } text-gray-900 dark:text-white`}
                placeholder="••••••••"
                {...register("newPassword")}
              />
            </div>
            {errors.newPassword && (
              <p className="text-sm text-red-500 dark:text-red-400 mt-2">
                {errors.newPassword.message}
              </p>
            )}
            {newPassword && !errors.newPassword && (
              <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                ✓ Password meets requirements
              </p>
            )}
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Confirm New Password (Optional)
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
              <input
                type="password"
                className={`w-full pl-12 pr-4 py-3 rounded-lg border transition-all duration-300 bg-white dark:bg-gray-900 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 ${
                  errors.confirmNewPassword
                    ? "border-red-500 dark:border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-transparent"
                } text-gray-900 dark:text-white`}
                placeholder="••••••••"
                {...register("confirmNewPassword")}
              />
            </div>
            {errors.confirmNewPassword && (
              <p className="text-sm text-red-500 dark:text-red-400 mt-2">
                {errors.confirmNewPassword.message}
              </p>
            )}
            {confirmNewPassword &&
              newPassword === confirmNewPassword &&
              !errors.confirmNewPassword && (
                <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                  ✓ Passwords match
                </p>
              )}
          </div>
        </div>
      </FormSection>
    </motion.div>
  );
};

export default SecuritySection;
