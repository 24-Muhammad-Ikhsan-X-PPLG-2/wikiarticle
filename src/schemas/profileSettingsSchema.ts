import { SocialLink } from "@/types/profileData";
import z from "zod";

export const profileSettingsSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .nonempty(),
    currentPassword: z.string().optional(),
    newPassword: z.string().optional(),
    confirmNewPassword: z.string().optional(),
    enableDarkMode: z.boolean().default(false),
    emailNotifications: z.boolean().default(true),
    weeklyDigest: z.boolean().default(false),
    bio: z
      .string()
      .max(500, "Bio must be at most 500 characters")
      .optional()
      .or(z.literal("")),
    website_url: z.url("Invalid URL format").optional().or(z.literal("")),
    twitter_url: z.url("Invalid URL format").optional().or(z.literal("")),
    github_url: z.url("Invalid URL format").optional().or(z.literal("")),
    linkedin_url: z.url("Invalid URL format").optional().or(z.literal("")),
    facebook_url: z.url("Invalid URL format").optional().or(z.literal("")),
    instagram_url: z.url("Invalid URL format").optional().or(z.literal("")),
    isAuthor: z.boolean().default(false),
  })
  .refine(
    (data) => {
      // If newPassword is provided, both currentPassword and confirmNewPassword are required
      if (data.newPassword) {
        return data.currentPassword && data.confirmNewPassword;
      }
      return true;
    },
    {
      message:
        "Current password and confirmation are required to change password",
      path: ["newPassword"],
    },
  )
  .refine(
    (data) => {
      // If new password is provided, it must be at least 6 characters
      if (data.newPassword) {
        return data.newPassword.length >= 6;
      }
      return true;
    },
    {
      message: "New password must be at least 6 characters",
      path: ["newPassword"],
    },
  )
  .refine(
    (data) => {
      // Passwords must match if both are provided
      if (data.newPassword && data.confirmNewPassword) {
        return data.newPassword === data.confirmNewPassword;
      }
      return true;
    },
    {
      message: "Passwords do not match",
      path: ["confirmNewPassword"],
    },
  );

export type ProfileSettingsSchemaType = z.infer<typeof profileSettingsSchema>;
