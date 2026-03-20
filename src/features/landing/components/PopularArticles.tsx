"use client";

import ArticleCard from "./ArticleCard";

const articles = [
  {
    id: 1,
    title: "The History of Artificial Intelligence",
    category: "Technology",
    excerpt:
      "Explore the fascinating journey of AI from early concepts to modern machine learning.",
    views: 45200,
    gradient: "from-blue-400 to-cyan-500",
  },
  {
    id: 2,
    title: "Climate Change: Causes and Solutions",
    category: "Environment",
    excerpt:
      "A comprehensive guide to understanding climate change and sustainable practices.",
    views: 38900,
    gradient: "from-green-400 to-emerald-500",
  },
  {
    id: 3,
    title: "Quantum Computing Explained",
    category: "Science",
    excerpt:
      "Demystifying quantum mechanics and its applications in computing technology.",
    views: 52100,
    gradient: "from-purple-400 to-pink-500",
  },
  {
    id: 4,
    title: "The Renaissance: A Cultural Rebirth",
    category: "History",
    excerpt:
      "Discover the pivotal era that transformed European art, philosophy, and science.",
    views: 33400,
    gradient: "from-orange-400 to-rose-500",
  },
  {
    id: 5,
    title: "Blockchain and Cryptocurrency",
    category: "Finance",
    excerpt:
      "Understanding distributed ledger technology and its impact on modern finance.",
    views: 41800,
    gradient: "from-indigo-400 to-blue-500",
  },
  {
    id: 6,
    title: "The Human Brain: Neuroscience 101",
    category: "Biology",
    excerpt:
      "Exploring the mysteries of the most complex organ in the human body.",
    views: 48500,
    gradient: "from-red-400 to-pink-500",
  },
];

const PopularArticles = () => {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-12">
          <button className="px-8 py-4 border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 rounded-xl font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300">
            View All Articles
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularArticles;
