"use client";

import { FC } from "react";

type Props = {
  categories: string[];
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
};

const CategoryFilter: FC<Props> = ({
  activeCategory,
  categories,
  onCategoryChange,
}) => {
  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
      <div className="flex gap-3 min-w-max px-4 sm:px-6 lg:px-8">
        {/* Show All Button */}
        <button
          onClick={() => onCategoryChange(null)}
          className={`px-4 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
            activeCategory === null
              ? "bg-blue-600 dark:bg-blue-600 text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          All Articles
        </button>

        {/* Category Pills */}
        {categories.map((category) => (
          <button
            key={category}
            onClick={() =>
              onCategoryChange(activeCategory === category ? null : category)
            }
            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
              activeCategory === category
                ? "bg-blue-600 dark:bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
