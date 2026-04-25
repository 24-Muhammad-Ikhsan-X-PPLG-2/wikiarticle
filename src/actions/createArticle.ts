"use server";

import { getUserSupabaseWithoutProfile } from "@/lib/getUserSupabase";
import serverActionReturn, {
  serverActionReturnError,
} from "@/lib/serverActionReturn";
import { slugify } from "@/lib/slugify";
import {
  createArticleSchema,
  CreateArticleSchemaType,
} from "@/schemas/createArticleSchema";
import { createClient } from "@/supabase/server";

export async function CreateArticle(form: FormData) {
  const rawData = String(form.get("data"));
  if (!rawData || rawData.trim() === "") {
    return serverActionReturnError("Bad request");
  }
  const rawData2 = JSON.parse(rawData) as CreateArticleSchemaType;
  const { error: ErrorParseRawData, data } =
    createArticleSchema.safeParse(rawData2);
  if (ErrorParseRawData) {
    return serverActionReturnError(ErrorParseRawData.message);
  }
  const supabase = await createClient();
  const user = await getUserSupabaseWithoutProfile();
  if (!user) {
    return serverActionReturnError("User not log in.");
  }
  const { data: checkCategoryData } = await supabase
    .from("categories")
    .select("*")
    .eq("id", Number(data.categoryId))
    .maybeSingle();
  if (!checkCategoryData) {
    return serverActionReturnError(
      `No category found with id ${data.categoryId}`,
    );
  }
  const { error: ErrorCreateArticle } = await supabase.from("articles").insert({
    author_id: user.id,
    category_id: data.categoryId,
    title: data.title,
    slug: slugify(data.title),
    content: data.content,
    description: data.subtitle,
    cover_image: "",
    status: "published",
    view_count: "0",
  });
  if (ErrorCreateArticle) {
    return serverActionReturnError(ErrorCreateArticle.message);
  }
  return serverActionReturn();
}
