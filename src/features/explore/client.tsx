"use client";

import { useMemo, useState } from "react";
import { ARTICLES, CATEGORIES } from "./constants";
import { BookMarked, Sparkles, TrendingUp } from "lucide-react";
import ArticleCard from "../landing/components/ArticleCard";
import Navbar from "@/components/layout/Navbar";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import Footer from "@/components/layout/Footer";
import useExploreArticles from "./hooks/useExploreArticles";
import useModalLogout from "@/hooks/useModalLogout";
import ModalLogout from "@/components/ui/ModalLogout";

const ExploreClient = () => {
  const {
    activeCategory,
    displayedArticles,
    filteredArticles,
    handleLoadMore,
    hasMore,
    setActiveCategory,
    setSearchQuery,
    trendingArticles,
  } = useExploreArticles();
  const { handleClose, handleOpen, userInfo, showModalLogout } =
    useModalLogout();
  return (
    <>
      <ModalLogout
        onClose={handleClose}
        showModal={showModalLogout}
        username={userInfo.profile?.username}
      />
      <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
        <Navbar
          currentPage="Explore"
          showStatusLogin
          handleLogout={handleOpen}
        />
        <main className="pt-16">
          {/* Header Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="max-w-7xl mx-auto text-center">
              {/* Background Gradients */}
              <div className="absolute top-32 -right-48 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl -z-10"></div>

              {/* Badge */}
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
                Discover knowledge from our community of contributors. Search,
                filter, and explore thousands of articles.
              </p>
            </div>
          </section>

          {/* Search Bar */}
          <SearchBar onSearch={setSearchQuery} isSticky={true} />

          {/* Category Filter */}
          <div className="py-4 border-b border-gray-200 dark:border-gray-800">
            <CategoryFilter
              categories={CATEGORIES}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Articles Grid */}
              <div className="lg:col-span-2">
                {filteredArticles.length === 0 ? (
                  <div className="py-24 text-center">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      No articles found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Try adjusting your search query or selecting different
                      categories.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setActiveCategory(null);
                      }}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="grid gap-6">
                      {displayedArticles.map((article, index) => (
                        <ArticleCard key={index} {...article} />
                      ))}
                    </div>

                    {/* Load More Button */}
                    {hasMore && (
                      <div className="mt-12 text-center">
                        <button
                          onClick={handleLoadMore}
                          className="px-8 py-3 border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
                        >
                          Load More Articles
                        </button>
                      </div>
                    )}

                    {/* Results Count */}
                    <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                      Showing {displayedArticles.length} of{" "}
                      {filteredArticles.length} articles
                    </p>
                  </>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Trending Section */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Trending Now
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {trendingArticles.map((article, index) => (
                      <div
                        key={index}
                        className="pb-4 border-b border-gray-200 dark:border-gray-800 last:border-b-0 cursor-pointer hover:opacity-70 transition-opacity"
                      >
                        <div className="flex gap-3">
                          <span className="text-lg font-bold text-blue-600 dark:text-blue-400 shrink-0">
                            #{index + 1}
                          </span>
                          <div className="min-w-0">
                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                              {article.title}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {(article.views / 1000).toFixed(1)}K views
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Popular Categories */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <BookMarked className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    Popular Categories
                  </h3>

                  <div className="space-y-2">
                    {CATEGORIES.slice(0, 6).map((category) => (
                      <button
                        key={category}
                        onClick={() =>
                          setActiveCategory(
                            activeCategory === category ? null : category,
                          )
                        }
                        className={`w-full px-4 py-2 rounded-lg text-left font-medium transition-all duration-300 ${
                          activeCategory === category
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stats Card */}
                <div className="bg-linear-to-br from-blue-600 to-indigo-600 dark:from-blue-900/40 dark:to-indigo-900/40 rounded-2xl p-6 border border-blue-500/20 dark:border-blue-500/10">
                  <h3 className="text-lg font-bold text-white mb-4">
                    Browse Stats
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-white/70">Total Articles</p>
                      <p className="text-2xl font-bold text-white">
                        {ARTICLES.length}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-white/70">Results Found</p>
                      <p className="text-2xl font-bold text-white">
                        {filteredArticles.length}
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
