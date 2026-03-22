import z from "zod";

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "Full name must be at least 3 characters")
      .nonempty("Full name is required"),
    email: z
      .email("Please enter a valid email address")
      .nonempty("Email is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .nonempty("Password is required"),
    confirmPassword: z.string().nonempty("Please confirm your password"),
    birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Incorrect date of birth format",
    }),
    terms: z.literal(true, {
      error: () => ({
        message: "Checklist the terms of service and privacy policy",
      }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;
