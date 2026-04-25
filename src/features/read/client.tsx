"use client";

import { FC, useEffect, useState } from "react";
import TableOfContentsItem from "./types/TableOfContentsItem";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ArticleActions from "./components/ArticleActions";
import TableOfContents from "./components/TableOfContents";
import ArticleHeader from "./components/ArticleHeader";
import AuthorBio from "./components/AuthorBio";
import RelatedArticles from "./components/RelatedArticles";
import CommentSection from "./components/CommentSection";
import markdownToHtml from "@/lib/markdownToHtml";
import { ArticlesType } from "@/types/articles";

type Props = {
  articleData: ArticlesType;
};

const ReadClient: FC<Props> = ({ articleData }) => {
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>(
    [],
  );
  const [content, setContent] = useState<string | null>(null);

  // Extract headings for table of contents
  useEffect(() => {
    (async () => {
      const parser = new DOMParser();
      const html = articleData.content;
      setContent(html);
      const doc = parser.parseFromString(html, "text/html");
      const headings = Array.from(doc.querySelectorAll("h1, h2, h3")).map(
        (heading) => {
          const level = parseInt(heading.tagName[1]);
          const id = heading.getAttribute("id") || `heading-${Math.random()}`;
          return {
            id,
            title: heading.textContent || "",
            level,
          };
        },
      );
      setTableOfContents(headings);
    })();
  }, []);
  const publishedDate = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "long",
  }).format(new Date(articleData.created_at));
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Navbar currentPage="Read" />

      {/* Article Actions (Sticky Sidebar) */}
      <ArticleActions articleTitle={articleData.title} isSticky />

      {/* Table of Contents */}
      <TableOfContents items={tableOfContents} />

      {/* Article Header */}
      <ArticleHeader
        title={articleData.title}
        subtitle={articleData.description}
        author={{
          avatar: articleData.author.avatar_url,
          name: articleData.author.username,
        }}
        publishedDate={publishedDate}
        readingTime={8}
        category={articleData.category.name}
      />

      {/* Main Article Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 pb-12">
        <div className="prose dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-lg prose-p:leading-8 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:mb-4 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-pink-600 dark:prose-code:text-pink-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded">
          <div dangerouslySetInnerHTML={{ __html: content! }} />
        </div>
      </article>

      {/* Author Bio */}
      <AuthorBio
        name={articleData.author.username}
        avatar={articleData.author.avatar_url}
        bio={articleData.author.bio}
        articles={24}
      />

      {/* Related Articles */}
      <RelatedArticles />

      {/* Comments Section */}
      <CommentSection />

      <Footer />
    </div>
  );
};

export default ReadClient;
