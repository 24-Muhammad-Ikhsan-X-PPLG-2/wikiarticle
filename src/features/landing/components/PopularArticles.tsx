"use client";

import { useQuery } from "@tanstack/react-query";
import ArticleCard from "./ArticleCard";
import supabase from "@/lib/supabase";
import Link from "next/link";

const PopularArticles = () => {
  const { data: popularArticles, isLoading } = useQuery({
    queryKey: ["popularArticles"],
    queryFn: async () => {
      const { data } = await supabase
        .from("articles")
        .select(
          `
          *,
          author:author_id (*),
          category:category_id (*)
        `,
        )
        .order("view_count", { ascending: false })
        .limit(6);
      return data;
    },
    initialData: [],
  });
  return (
    <section
      id="explore"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            Popular Content
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
            Trending Articles
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover what millions of readers are exploring right now.
          </p>
        </div>

        {/* Articles Grid */}
        {isLoading ? (
          <div className="text-center">
            <h1 className="text-5xl font-bold">Loading...</h1>
          </div>
        ) : popularArticles ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularArticles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        ) : null}

        {/* View All Button */}
        <div className="flex justify-center mt-12">
          <Link href={"/explore"}>
            <button className="px-8 py-4 border-2  cursor-pointer border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 rounded-xl font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300">
              View All Articles
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularArticles;
