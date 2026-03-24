"use client";

import { FC } from "react";

type Props = {
  title: string;
  subtitle?: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedDate: string;
  readingTime: number;
  category?: string;
};

const ArticleHeader: FC<Props> = ({
  author,
  publishedDate,
  readingTime,
  title,
  category,
  subtitle,
}) => {
  const formattedDate = new Date(publishedDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 pb-12">
      {/* Category Badge */}
      {category && (
        <p className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded-full mb-6">
          {category}
        </p>
      )}

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
        {title}
      </h1>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Article Meta */}
      <div className="flex items-center gap-4 py-6 border-b border-gray-200 dark:border-gray-800">
        {/* Author Avatar & Info */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-lg font-bold text-white">
            {author.avatar}
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              {author.name}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Article Author
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-8 bg-gray-200 dark:bg-gray-800 mx-2"></div>

        {/* Date & Reading Time */}
        <div className="hidden sm:block text-sm text-gray-600 dark:text-gray-400">
          <p>{formattedDate}</p>
          <p>{readingTime} min read</p>
        </div>

        {/* Mobile Layout */}
        <div className="sm:hidden text-xs text-gray-600 dark:text-gray-400">
          <p>{formattedDate}</p>
          <p>{readingTime}m read</p>
        </div>
      </div>
    </div>
  );
};

export default ArticleHeader;
