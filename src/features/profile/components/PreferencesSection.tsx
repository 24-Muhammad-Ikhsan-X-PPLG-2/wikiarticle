"use client";
import { motion } from "motion/react";
import FormSection from "./FormSection";
import { Bell, Moon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { ProfileSettingsSchemaType } from "@/schemas/profileSettingsSchema";
import { FC, useEffect } from "react";
import { useTheme } from "next-themes";

const PreferencesSection: FC = () => {
  const { register, setValue } = useFormContext<ProfileSettingsSchemaType>();
  const { theme } = useTheme();
  useEffect(() => {
    setValue("enableDarkMode", theme === "dark");
  }, [theme]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45 }}
    >
      <FormSection title="Preferences" description="Customize your experience">
        <div className="space-y-4">
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-100/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Dark Mode
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Use dark theme
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              className="w-5 h-5 rounded transition-all cursor-pointer"
              {...register("enableDarkMode")}
            />
          </div>

          {/* Email Notifications */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-100/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Email Notifications
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Receive email updates
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              className="w-5 h-5 rounded transition-all cursor-pointer"
              {...register("emailNotifications")}
            />
          </div>

          {/* Weekly Digest */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-100/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Weekly Digest
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Get weekly article digest
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              className="w-5 h-5 rounded transition-all cursor-pointer"
              {...register("weeklyDigest")}
            />
          </div>
        </div>
      </FormSection>
    </motion.div>
  );
};

export default PreferencesSection;
