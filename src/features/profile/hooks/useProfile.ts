"use client";

import { EditProfile } from "@/actions/editProfile";
import base64ToBlob from "@/lib/base64ToBlob";
import { imageCompressionBlob } from "@/lib/imageCompression";
import { uploadAvatar } from "@/lib/supabase";
import {
  profileSettingsSchema,
  ProfileSettingsSchemaType,
} from "@/schemas/profileSettingsSchema";
import { ProfileDB } from "@/supabase/dbTypes/profileDB";
import { ProfileDataType, SocialLink } from "@/types/profileData";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@supabase/supabase-js";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import {
  Resolver,
  useForm,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

type Props = {
  user: User;
  profile: ProfileDB;
};

const useProfile = ({ user, profile }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    profile.avatar_url ?? undefined,
  );
  const [croppedAvatar, setCroppedAvatar] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = async (data: ProfileSettingsSchemaType) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      let imageUrl: string | null = null;
      if (croppedAvatar) {
        const blobAvatar = base64ToBlob(croppedAvatar ?? "");
        console.log("Compress image...");
        const compressFile = await imageCompressionBlob(
          blobAvatar,
          `avatar-${user.email}`,
        );
        const { publicUrl, error } = await uploadAvatar(
          compressFile,
          user.email ?? "",
        );
        if (error) throw new Error(error);
        imageUrl = publicUrl;
      }

      // Combine individual social links into one object
      const socialLinks: SocialLink = {
        ...(data.twitter_url && { twitter: data.twitter_url }),
        ...(data.github_url && { github: data.github_url }),
        ...(data.linkedin_url && { linkedin: data.linkedin_url }),
        ...(data.facebook_url && { facebook: data.facebook_url }),
        ...(data.instagram_url && { instagram: data.instagram_url }),
      };

      const profileData: ProfileDataType = {
        username: data.username,
        bio: data.bio,
        website_url: data.website_url,
        social_links: socialLinks,
        is_author: data.isAuthor,
        avatar_url: imageUrl,
      };
      const profilePassword = {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmNewPassword: data.confirmNewPassword,
      };
      setTheme(data.enableDarkMode ? "dark" : "light");
      const form = new FormData();
      form.append("profile", JSON.stringify(profileData));
      form.append("profilePassword", JSON.stringify(profilePassword));
      const { error } = await EditProfile(form);
      if (error) throw new Error(error);
      setSubmitSuccess(true);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error(error);
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

  return {
    onSubmit,
    handleDeleteAccount,
    isSubmitting,
    submitSuccess,
    submitError,
    avatarPreview,
    setAvatarPreview,
    setCroppedAvatar,
  };
};

export default useProfile;
