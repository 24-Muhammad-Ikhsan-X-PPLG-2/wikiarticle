import ReadClient from "@/features/read/client";

const Read = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return <ReadClient />;
};

export default Read;
