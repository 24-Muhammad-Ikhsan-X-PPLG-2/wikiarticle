"use client";

import { useMemo, useState } from "react";
import { ARTICLES } from "../constants";

const useExploreArticles = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState(9);

  // Filter articles based on search query and category
  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === null || article.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  // Get trending articles (top 5 by views)
  const trendingArticles = ARTICLES.sort((a, b) => b.views - a.views).slice(
    0,
    5,
  );

  // Get displayed articles
  const displayedArticles = filteredArticles.slice(0, displayCount);
  const hasMore = displayCount < filteredArticles.length;

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 6);
  };
  return {
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    filteredArticles,
    trendingArticles,
    displayedArticles,
    hasMore,
    handleLoadMore,
  };
};

export default useExploreArticles;
