import { ProfileDB } from "@/supabase/dbTypes/profileDB";
import { CategoriesType } from "./categories";

export type ArticlesType = {
  id: number;
  created_at: string;
  updated_at: string;
  author: ProfileDB;
  category: CategoriesType;
  title: string;
  slug: string;
  content: string;
  description?: string;
  cover_image?: string;
  status: "published" | "draft" | "archieved";
  view_count: number;
};
