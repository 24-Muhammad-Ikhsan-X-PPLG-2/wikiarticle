"use client";

import {
  Check,
  Lock,
  Loader2,
  Trash2,
  Bell,
  Moon,
  Briefcase,
  LogOut,
} from "lucide-react";
import { FC, useEffect } from "react";
import { motion } from "motion/react";
import FormSection from "./components/FormSection";
import Navbar from "@/components/layout/Navbar";
import useProfile from "./hooks/useProfile";
import { User } from "@supabase/supabase-js";
import { ProfileDB } from "@/supabase/dbTypes/profileDB";
import BackgroundGradient from "./components/BackgroundGradient";
import PageHeader from "./components/PageHeader";
import SuccessAndErrorMessage from "./components/SuccessAndErrorMessage";
import AvatarSection from "./components/AvatarSection";
import PersonalInfoSection from "./components/PersonalInfoSection";
import AdditionalInfoSection from "./components/AdditionalInfoSection";
import AuthorSection from "./components/AuthorSection";
import SecuritySection from "./components/SecuritySection";
import {
  FormProvider,
  Resolver,
  useForm,
  useFormContext,
} from "react-hook-form";
import {
  profileSettingsSchema,
  ProfileSettingsSchemaType,
} from "@/schemas/profileSettingsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import ModalLogout from "@/components/ui/ModalLogout";
import useModalLogout from "@/hooks/useModalLogout";

const PreferencesSection = dynamic(
  () => import("./components/PreferencesSection"),
  {
    ssr: false,
  },
);

type Props = {
  user: User;
  profile: ProfileDB;
};

const ProfileClient: FC<Props> = ({ profile, user }) => {
  const { theme } = useTheme();
  const { showModalLogout, handleClose, handleOpen } = useModalLogout();
  const methods = useForm<ProfileSettingsSchemaType>({
    resolver: zodResolver(
      profileSettingsSchema,
    ) as Resolver<ProfileSettingsSchemaType>,
    mode: "onChange",
    defaultValues: {
      username: profile.username,
      emailNotifications: true,
      weeklyDigest: false,
      confirmNewPassword: "",
      enableDarkMode: theme === "dark",
      currentPassword: "",
      newPassword: "",
      bio: profile.bio || "",
      website_url: profile.website_url || "",
      twitter_url: profile.social_links?.twitter || "",
      github_url: profile.social_links?.github || "",
      linkedin_url: profile.social_links?.linkedin || "",
      facebook_url: profile.social_links?.facebook || "",
      instagram_url: profile.social_links?.instagram || "",
      isAuthor: profile.is_author || false,
    },
  });
  methods.setValue;
  const {
    avatarPreview,
    handleDeleteAccount,
    isSubmitting,
    onSubmit,
    setAvatarPreview,
    setCroppedAvatar,
    submitError,
    submitSuccess,
  } = useProfile({ profile, user, setValue: methods.setValue });
  useEffect(() => {
    if (profile.avatar_url && profile.avatar_url.trim() !== "") {
      setAvatarPreview(profile.avatar_url);
    }
  }, [profile.avatar_url]);
  const resetForm = () => {
    methods.setValue("username", profile.username);
    methods.setValue("bio", profile.bio);
    methods.setValue("website_url", profile.website_url || "");
    methods.setValue("twitter_url", profile.social_links?.twitter || "");
    methods.setValue("github_url", profile.social_links?.github || "");
    methods.setValue("linkedin_url", profile.social_links?.linkedin || "");
    methods.setValue("facebook_url", profile.social_links?.facebook || "");
    methods.setValue("instagram_url", profile.social_links?.instagram || "");
    methods.setValue("isAuthor", profile.is_author || false);
    if (profile.avatar_url) {
      setAvatarPreview(profile.avatar_url);
      setCroppedAvatar(null);
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <ModalLogout
        showModal={showModalLogout}
        onClose={handleClose}
        username={profile.username}
      />
      <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
        <Navbar currentPage="Profile" />

        {/* Background Gradient */}
        <BackgroundGradient />

        {/* Main Content */}
        <FormProvider {...methods}>
          <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 pt-20 max-w-4xl mx-auto">
            {/* Page Header */}
            <PageHeader />

            {/* Success And Error Message */}
            <SuccessAndErrorMessage
              submitError={submitError}
              submitSuccess={submitSuccess}
            />

            {/* Form */}
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              {/* Avatar Section */}
              <AvatarSection
                avatarPreview={avatarPreview}
                setAvatarPreview={setAvatarPreview}
                setCroppedAvatar={setCroppedAvatar}
              />

              {/* Personal Info Section */}
              <PersonalInfoSection userEmail={user.email} />

              {/* Additional Information Section */}
              <AdditionalInfoSection />

              {/* Author Section */}
              <AuthorSection />

              {/* Security Section */}
              <SecuritySection />

              {/* Preferences Section */}
              <PreferencesSection />
              {/* Logout */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
              >
                <FormSection
                  title="Logout"
                  description="Logout from you're account"
                  isDanger
                >
                  <button
                    type="button"
                    onClick={handleOpen}
                    className="w-full px-6 py-3 dark:bg-red-500/15 border-red-500/20 border cursor-pointer dark:text-white hover:text-red-500 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </FormSection>
              </motion.div>
              {/* Danger Zone */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
              >
                <FormSection
                  title="Danger Zone"
                  description="Irreversible actions"
                  isDanger
                >
                  <button
                    type="button"
                    onClick={handleDeleteAccount}
                    className="w-full px-6 py-3 dark:bg-red-500/15 border-red-500/20 border cursor-pointer dark:text-white hover:text-red-500 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
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
                transition={{ delay: 0.65 }}
                className="flex gap-4 pt-6"
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-blue-600/15 border border-blue-600/25 hover:bg-blue-700/25 cursor-pointer disabled:bg-gray-400 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-blue-500 dark:text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
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
                  onClick={resetForm}
                  className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-800/20 border border-gray-800/30 hover:bg-gray-300 dark:hover:bg-gray-800/40 cursor-pointer text-gray-900 dark:text-white font-medium rounded-lg transition-all duration-300"
                >
                  Cancel
                </button>
              </motion.div>
            </form>

            {/* Spacing */}
            <div className="h-12" />
          </div>
        </FormProvider>
      </div>
    </>
  );
};

export default ProfileClient;
