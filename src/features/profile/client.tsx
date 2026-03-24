"use client";

import NavbarAuth from "@/components/layout/NavbarAuth";
import EmailInput from "@/components/ui/EmailInput";
import PasswordInput from "@/components/ui/PasswordInput";
import TextInput from "@/components/ui/TextInput";
import {
  profileSettingsSchema,
  ProfileSettingsSchemaType,
} from "@/schemas/profileSettingsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  Lock,
  Loader2,
  Trash2,
  User as UserIcon,
  Bell,
  Moon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { FC, useEffect, useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { AnimatePresence, motion } from "motion/react";
import AvatarUploadCrop from "./components/AvatarUploadCrop";
import FormSection from "./components/FormSection";
import FormField from "./components/FormField";
import Navbar from "@/components/layout/Navbar";
import useProfile from "./hooks/useProfile";
import { User } from "@supabase/supabase-js";
import { ProfileDB } from "@/supabase/dbTypes/profileDB";

type Props = {
  user: User;
  profile: ProfileDB;
};

const ProfileClient: FC<Props> = ({ profile, user }) => {
  const {
    avatarPreview,
    confirmNewPassword,
    darkModeEnabled,
    errors,
    handleDarkModeToggle,
    handleDeleteAccount,
    handleSubmit,
    isSubmitting,
    isValid,
    newPassword,
    onSubmit,
    register,
    reset,
    setAvatarPreview,
    setCroppedAvatar,
    submitError,
    submitSuccess,
    setValue,
  } = useProfile({ profile, user });
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Navbar currentPage="Profile" />

      {/* Background Gradient */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-20 -right-48 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/3 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/3 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 pt-20 max-w-4xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Profile Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account and preferences
          </p>
        </motion.div>

        {/* Success Message */}
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

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Avatar Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <FormSection
              title="Profile Picture"
              description="Upload and crop your profile picture"
            >
              <AvatarUploadCrop
                onCropComplete={(croppedImage) => {
                  setCroppedAvatar(croppedImage);
                  setAvatarPreview(croppedImage);
                }}
                preview={avatarPreview}
              />
            </FormSection>
          </motion.div>

          {/* Personal Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <FormSection
              title="Personal Information"
              description="Update your account details"
            >
              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
                    <input
                      {...register("fullName")}
                      type="text"
                      className={`w-full pl-12 pr-4 py-3 rounded-lg border transition-all duration-300 bg-white dark:bg-gray-900 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 ${
                        errors.fullName
                          ? "border-red-500 dark:border-red-500 focus:ring-red-500"
                          : "border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-transparent"
                      } text-gray-900 dark:text-white`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-sm text-red-500 dark:text-red-400 mt-2">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <EmailInput
                  {...register("email")}
                  error={errors.email?.message}
                  placeholder="you@example.com"
                />

                {/* Username */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Username (Optional)
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
                    <input
                      {...register("username")}
                      type="text"
                      className={`w-full pl-12 pr-4 py-3 rounded-lg border transition-all duration-300 bg-white dark:bg-gray-900 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 ${
                        errors.username
                          ? "border-red-500 dark:border-red-500 focus:ring-red-500"
                          : "border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-transparent"
                      } text-gray-900 dark:text-white`}
                      placeholder="johndoe"
                    />
                  </div>
                  {errors.username && (
                    <p className="text-sm text-red-500 dark:text-red-400 mt-2">
                      {errors.username.message}
                    </p>
                  )}
                </div>
              </div>
            </FormSection>
          </motion.div>

          {/* Security Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
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
                      {...register("currentPassword")}
                      type="password"
                      className={`w-full pl-12 pr-4 py-3 rounded-lg border transition-all duration-300 bg-white dark:bg-gray-900 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 ${
                        errors.currentPassword
                          ? "border-red-500 dark:border-red-500 focus:ring-red-500"
                          : "border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-transparent"
                      } text-gray-900 dark:text-white`}
                      placeholder="••••••••"
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
                      {...register("newPassword")}
                      type="password"
                      className={`w-full pl-12 pr-4 py-3 rounded-lg border transition-all duration-300 bg-white dark:bg-gray-900 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 ${
                        errors.newPassword
                          ? "border-red-500 dark:border-red-500 focus:ring-red-500"
                          : "border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-transparent"
                      } text-gray-900 dark:text-white`}
                      placeholder="••••••••"
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
                      {...register("confirmNewPassword")}
                      type="password"
                      className={`w-full pl-12 pr-4 py-3 rounded-lg border transition-all duration-300 bg-white dark:bg-gray-900 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 ${
                        errors.confirmNewPassword
                          ? "border-red-500 dark:border-red-500 focus:ring-red-500"
                          : "border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-transparent"
                      } text-gray-900 dark:text-white`}
                      placeholder="••••••••"
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

          {/* Preferences Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <FormSection
              title="Preferences"
              description="Customize your experience"
            >
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
                    checked={darkModeEnabled}
                    onChange={(e) => {
                      handleDarkModeToggle(e.target.checked);
                      setValue("enableDarkMode", e.target.checked);
                    }}
                    className="w-5 h-5 rounded transition-all cursor-pointer"
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
                    {...register("emailNotifications")}
                    type="checkbox"
                    className="w-5 h-5 rounded transition-all cursor-pointer"
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
                    {...register("weeklyDigest")}
                    type="checkbox"
                    className="w-5 h-5 rounded transition-all cursor-pointer"
                  />
                </div>
              </div>
            </FormSection>
          </motion.div>

          {/* Danger Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <FormSection
              title="Danger Zone"
              description="Irreversible actions"
              isDanger
            >
              <button
                type="button"
                onClick={handleDeleteAccount}
                className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <Trash2 className="w-5 h-5" />
                Delete Account
              </button>
            </FormSection>
          </motion.div>

          {/* Form Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4 pt-6"
          >
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => reset()}
              className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-lg transition-all duration-300"
            >
              Cancel
            </button>
          </motion.div>
        </form>

        {/* Spacing */}
        <div className="h-12" />
      </div>
    </div>
  );
};

export default ProfileClient;
