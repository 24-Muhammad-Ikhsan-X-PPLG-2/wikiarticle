"use client";

import { useEffect, useState } from "react";
import { CATEGORIES } from "./constants";
import { BookMarked, Sparkles, TrendingUp } from "lucide-react";
import ArticleCard from "../landing/components/ArticleCard";
import Navbar from "@/components/layout/Navbar";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import Footer from "@/components/layout/Footer";
import useExploreArticles from "./hooks/useExploreArticles";
import useModalLogout from "@/hooks/useModalLogout";
import ModalLogout from "@/components/ui/ModalLogout";
import { useQuery } from "@tanstack/react-query";
import supabase from "@/lib/supabase";
import { CategoriesType } from "@/types/categories";

async function getCategories(): Promise<CategoriesType[] | null> {
  const { data } = await supabase.from("categories").select("*");
  return data;
}

const ExploreClient = () => {
  // Ambil isFetchingNextPage dari hook
  const {
    activeCategoryId,
    searchQuery,
    loadMore,
    hasMore,
    setActiveCategoryId,
    setSearchQuery,
    trendingArticles,
    articles,
    isLoading: isLoadingArticle,
    isFetchingNextPage,
  } = useExploreArticles();

  const [isMounted, setIsMounted] = useState(false);

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { handleClose, handleOpen, userInfo, showModalLogout } =
    useModalLogout();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <ModalLogout
        onClose={handleClose}
        showModal={showModalLogout}
        username={userInfo?.profile?.username}
      />
      <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
        <Navbar
          currentPage="Explore"
          showStatusLogin
          handleLogout={handleOpen}
        />

        <main className="pt-16">
          {/* Header Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-center">
            <div className="absolute top-32 -right-48 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl"></div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-950/30 rounded-full border border-blue-100 dark:border-blue-900/50 mb-6">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                Discover Knowledge
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Explore Articles
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover knowledge from our community of contributors.
            </p>
          </section>

          <SearchBar onSearch={setSearchQuery} isSticky={true} />

          <div className="py-4 border-b border-gray-200 dark:border-gray-800">
            <CategoryFilter
              categories={categories || []}
              activeCategoryId={activeCategoryId}
              onCategoryChange={setActiveCategoryId}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Articles Grid Section */}
              <div className="lg:col-span-2">
                {isLoadingArticle ? (
                  <div className="py-24 text-center">
                    <h1 className="text-4xl font-bold animate-pulse text-gray-400">
                      Loading Articles...
                    </h1>
                  </div>
                ) : articles.length === 0 ? (
                  <div className="py-24 text-center">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      No articles found
                    </h3>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setActiveCategoryId(null);
                      }}
                      className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="grid gap-6">
                      {articles.map((article, index) => (
                        <ArticleCard key={article.id || index} {...article} />
                      ))}
                    </div>

                    {/* Load More Button - Terintegrasi Infinite Query */}
                    {hasMore && (
                      <div className="mt-12 text-center">
                        <button
                          onClick={() => loadMore()}
                          disabled={isFetchingNextPage}
                          className="px-8 py-3 border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all disabled:opacity-50"
                        >
                          {isFetchingNextPage
                            ? "Loading More..."
                            : "Load More Articles"}
                        </button>
                      </div>
                    )}

                    <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                      Showing {articles.length} articles
                    </p>
                  </>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Trending Now
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {trendingArticles?.map((article, index) => (
                      <div
                        key={article.id || index}
                        className="pb-4 border-b border-gray-200 dark:border-gray-800 last:border-b-0 "
                      >
                        <div className="flex gap-3">
                          <span className="text-lg font-bold text-blue-600 shrink-0">
                            #{index + 1}
                          </span>
                          <div className="min-w-0">
                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 hover:text-blue-600 cursor-pointer">
                              {article.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">
                              {(article.view_count / 1000).toFixed(1)}K views
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Popular Categories (Menggunakan data dari Supabase) */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <BookMarked className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    Popular Categories
                  </h3>
                  <div className="space-y-2">
                    {(categories || []).slice(0, 6).map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() =>
                          setActiveCategoryId(
                            activeCategoryId === cat.id ? null : cat.id,
                          )
                        }
                        className={`w-full px-4 py-2 rounded-lg text-left font-medium transition-all ${
                          activeCategoryId === cat.id
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-950 cursor-pointer"
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stats Card */}
                <div className="bg-blue-600 dark:bg-blue-900/40 rounded-2xl p-6 border border-blue-500/20">
                  <h3 className="text-lg font-bold text-white mb-4">
                    Browse Stats
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-white/70">Loaded Articles</p>
                      <p className="text-2xl font-bold text-white">
                        {articles?.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ExploreClient;
