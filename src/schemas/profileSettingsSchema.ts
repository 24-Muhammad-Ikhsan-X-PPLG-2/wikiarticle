import z from "zod";

export const profileSettingsSchema = z
  .object({
    fullName: z
      .string()
      .min(3, "Full name must be at least 3 characters")
      .nonempty("Full name is required"),
    email: z.email("Please enter a valid email"),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .optional()
      .or(z.literal("")),
    currentPassword: z.string().optional(),
    newPassword: z.string().optional(),
    confirmNewPassword: z.string().optional(),
    enableDarkMode: z.boolean().default(false),
    emailNotifications: z.boolean().default(true),
    weeklyDigest: z.boolean().default(false),
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
