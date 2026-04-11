"use client";

import { CategoriesType } from "@/types/categories";
import { FC } from "react";

type Props = {
  categories: CategoriesType[] | null;
  activeCategoryId: number | null;
  onCategoryChange: (category: number | null) => void;
};

const CategoryFilter: FC<Props> = ({
  activeCategoryId,
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
            activeCategoryId === null
              ? "bg-blue-600 dark:bg-blue-600 text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          All Articles
        </button>

        {/* Category Pills */}
        {categories?.map((category) => (
          <button
            key={category.id}
            onClick={() =>
              onCategoryChange(
                activeCategoryId === category.id ? null : category.id,
              )
            }
            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
              activeCategoryId === category.id
                ? "bg-blue-600 dark:bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
