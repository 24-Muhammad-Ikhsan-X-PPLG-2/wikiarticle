import appName from "@/constants/appName";
import CreateArticleClient from "@/features/create-article/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${appName} - Create Article`,
};

const CreateArticle = () => {
  return <CreateArticleClient />;
};

export default CreateArticle;
