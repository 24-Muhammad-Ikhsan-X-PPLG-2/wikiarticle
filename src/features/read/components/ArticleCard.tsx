"use client";

import { Bookmark, Eye } from "lucide-react";
import { FC } from "react";

type Props = {
  title: string;
  category: string;
  excerpt: string;
  views: number;
  gradient: string;
};

const ArticleCard: FC<Props> = ({
  category,
  excerpt,
  gradient,
  title,
  views,
}) => {
  return (
    <div className="group h-full">
      <div className="h-full bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 hover:shadow-xl dark:hover:shadow-indigo-500/10 hover:shadow-indigo-500/10 hover:-translate-y-1 flex flex-col">
        {/* Image Placeholder */}
        <div
          className={`h-40 bg-linear-to-br ${gradient} relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-all duration-300"></div>
        </div>

        {/* Content */}
        <div className="p-6 grow flex flex-col">
          {/* Category Badge */}
          <span className="inline-block w-fit px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded-full mb-3">
            {category}
          </span>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 grow">
            {excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
              <Eye className="w-4 h-4" />
              <span>{views.toLocaleString()}</span>
            </div>
            <button className="p-2 rounded-lg text-gray-400 dark:text-gray-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300">
              <Bookmark className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
