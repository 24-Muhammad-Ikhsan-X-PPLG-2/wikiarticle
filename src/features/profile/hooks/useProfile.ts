"use client";

import {
  profileSettingsSchema,
  ProfileSettingsSchemaType,
} from "@/schemas/profileSettingsSchema";
import { ProfileDB } from "@/supabase/dbTypes/profileDB";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@supabase/supabase-js";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Resolver, useForm } from "react-hook-form";

type Props = {
  user: User;
  profile: ProfileDB;
};

const useProfile = ({ user, profile }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    undefined,
  );
  const [croppedAvatar, setCroppedAvatar] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
    setValue,
  } = useForm<ProfileSettingsSchemaType>({
    resolver: zodResolver(
      profileSettingsSchema,
    ) as Resolver<ProfileSettingsSchemaType>,
    mode: "onBlur",
    defaultValues: {
      fullName: profile.username,
      email: user.email,
      username: profile.username,
      enableDarkMode: theme === "dark",
      emailNotifications: true,
      weeklyDigest: false,
      confirmNewPassword: "",
      currentPassword: "",
      newPassword: "",
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setValue("enableDarkMode", theme === "dark");
    }
  }, [theme, mounted, setValue]);

  const handleDarkModeToggle = (enabled: boolean) => {
    setTheme(enabled ? "dark" : "light");
  };

  const onSubmit = async (data: ProfileSettingsSchemaType) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Profile Settings:", {
        ...data,
        avatar: croppedAvatar,
      });

      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "An error occurred",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure? This action cannot be undone.")) {
      try {
        console.log("Account deletion initiated");
      } catch (error) {
        console.error("Error deleting account:", error);
      }
    }
  };

  const darkModeEnabled = watch("enableDarkMode");
  const newPassword = watch("newPassword");
  const confirmNewPassword = watch("confirmNewPassword");

  return {
    darkModeEnabled,
    newPassword,
    confirmNewPassword,
    register,
    handleSubmit,
    onSubmit,
    handleDeleteAccount,
    errors,
    isValid,
    reset,
    handleDarkModeToggle,
    isSubmitting,
    submitSuccess,
    submitError,
    avatarPreview,
    setAvatarPreview,
    setCroppedAvatar,
    setValue,
  };
};

export default useProfile;
