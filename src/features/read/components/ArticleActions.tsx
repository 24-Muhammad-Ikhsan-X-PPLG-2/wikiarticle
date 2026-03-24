"use client";

import { Bookmark, Heart, Share2 } from "lucide-react";
import { FC, useState } from "react";

type Props = {
  articleTitle: string;
  isSticky?: boolean;
};

const ArticleActions: FC<Props> = ({ articleTitle, isSticky = false }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: articleTitle,
          text: "Check out this article on WikiArticle",
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const buttonClass =
    "p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300";
  const activeButtonClass =
    "p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 transition-all duration-300";

  return (
    <div
      className={`${isSticky ? "fixed right-8 top-1/2 -translate-y-1/2 hidden lg:flex" : ""} flex-col gap-3`}
    >
      {/* Bookmark */}
      <button
        onClick={() => setIsBookmarked(!isBookmarked)}
        className={isBookmarked ? activeButtonClass : buttonClass}
        title="Bookmark this article"
        aria-label="Bookmark"
      >
        <Bookmark className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`} />
      </button>

      {/* Like */}
      <button
        onClick={() => setIsLiked(!isLiked)}
        className={isLiked ? activeButtonClass : buttonClass}
        title="Like this article"
        aria-label="Like"
      >
        <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
      </button>

      {/* Share */}
      <button
        onClick={handleShare}
        className={buttonClass}
        title="Share this article"
        aria-label="Share"
      >
        <Share2 className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ArticleActions;
