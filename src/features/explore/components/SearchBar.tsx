"use client";

import { Search, X } from "lucide-react";
import { FC, useState } from "react";

type Props = {
  placeholder?: string;
  onSearch: (query: string) => void;
  isSticky?: boolean;
};

const SearchBar: FC<Props> = ({ onSearch, isSticky, placeholder }) => {
  const [query, setQuery] = useState("");

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };
  return (
    <div
      className={`${isSticky ? "sticky top-16 z-40 py-4 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800" : "relative"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder={placeholder}
            className="w-full pl-12 pr-12 py-3 sm:py-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          />
          {query && (
            <button
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="Clear search"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
