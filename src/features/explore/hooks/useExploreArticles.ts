"use client";

import { useMemo, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import supabase from "@/lib/supabase";
import { ArticlesType } from "@/types/articles";

// simple debounce hook
const useDebounce = (value: string, delay = 500) => {
  const [debounced, setDebounced] = useState(value);

  useMemo(() => {
    const handler = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
};

const PAGE_SIZE = 6;

const useExploreArticles = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);

  const debouncedSearch = useDebounce(searchQuery);

  // Infinite Articles Query
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["articles", activeCategoryId, debouncedSearch],
      queryFn: async ({ pageParam = 0 }) => {
        const from = pageParam * PAGE_SIZE;
        const to = from + PAGE_SIZE - 1;
        const baseQuery = () =>
          supabase
            .from("articles")
            .select(
              `
          *,
          author:author_id (*),
          category:category_id (*)
        `,
            )
            .range(from, to)
            .order("view_count", { ascending: false });

        let query = baseQuery();

        if (activeCategoryId) {
          query = query.eq("category_id", activeCategoryId);
        }
        // coba pake fts dlu, kalo kaga ada data fallback ke ilike
        if (debouncedSearch) {
          query = query.textSearch("fts", `${debouncedSearch}:*`, {
            type: "websearch",
          });
        }

        const { data, error } = await query;
        if (error) throw error;

        if (data && data.length == 0) {
          query = baseQuery();
          if (activeCategoryId) {
            query = query.eq("category_id", activeCategoryId);
          }
          if (debouncedSearch) {
            query = query.ilike("title", `%${debouncedSearch.trim()}%`);
          }
          const { data, error } = await query;
          if (error) throw error;
          return data as ArticlesType[];
        } else {
          return data as ArticlesType[];
        }
      },
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length < PAGE_SIZE ? undefined : allPages.length;
      },
      initialPageParam: 0,
    });

  // Flatten data
  const articles = useMemo(() => {
    return data?.pages.flat() ?? [];
  }, [data]);

  // Trending dari server (lebih akurat & ringan)
  const { data: trendingArticles = [] } = useQuery({
    queryKey: ["trending-articles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select(
          `
          *,
          author:author_id (*),
          category:category_id (*)
        `,
        )
        .order("view_count", { ascending: false })
        .limit(5);

      if (error) throw error;
      return data as ArticlesType[];
    },
  });

  return {
    // state
    searchQuery,
    setSearchQuery,
    activeCategoryId,
    setActiveCategoryId,

    // data
    articles,
    trendingArticles,

    // pagination
    hasMore: hasNextPage,
    loadMore: fetchNextPage,

    // loading states
    isLoading,
    isFetchingNextPage,
  };
};

export default useExploreArticles;
