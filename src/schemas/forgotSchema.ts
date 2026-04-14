import z from "zod";

export const forgotSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .nonempty("Email is required"),
});

export type ForgotSchemaType = z.infer<typeof forgotSchema>;
