import z from "zod";

export const createArticleSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  subtitle: z.string().max(160, "Subtitle must be 160 characters or less"),
  categoryId: z.string(),
  content: z.string().min(1, "Content is required"),
});

export type CreateArticleSchemaType = z.infer<typeof createArticleSchema>;
