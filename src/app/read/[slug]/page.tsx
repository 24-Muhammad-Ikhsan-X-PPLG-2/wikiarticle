import ReadClient from "@/features/read/client";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";

const Read = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select(
      `
      *,
      author:author_id (*),
      category:category_id (*)
    `,
    )
    .eq("slug", slug)
    .maybeSingle();
  if (!data) redirect("/explore");
  return <ReadClient articleData={data} />;
};

export default Read;
