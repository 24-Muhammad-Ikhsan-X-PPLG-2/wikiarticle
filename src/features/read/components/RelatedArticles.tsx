"use client";

import { FC } from "react";
import ArticleCard from "./ArticleCard";

type Props = {
  articles?: Array<{
    title: string;
    category: string;
    excerpt: string;
    views: number;
    gradient: string;
  }>;
};

const RelatedArticles: FC<Props> = ({ articles = [] }) => {
  if (articles.length === 0) return null;
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 border-t border-gray-200 dark:border-gray-800">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        Related Articles
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.slice(0, 4).map((article, index) => (
          <ArticleCard key={index} {...article} />
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;
