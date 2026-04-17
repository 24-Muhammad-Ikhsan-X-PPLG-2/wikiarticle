import z from "zod";

export const loginEmailSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Please enter a valid email address"),
});

export type LoginEmailSchemaType = z.infer<typeof loginEmailSchema>;
