"use client";
import { Bookmark, BookMarked, Users, Zap } from "lucide-react";
import FeatureCard from "../../../components/ui/FeatureCard";

const features = [
  {
    icon: <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    title: "Lightning Fast Search",
    description:
      "Find exactly what you need in milliseconds with our powerful search engine optimized for knowledge discovery.",
  },
  {
    icon: <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    title: "Community Contributions",
    description:
      "Join thousands of contributors worldwide. Edit, improve, and create articles collaboratively.",
  },
  {
    icon: <BookMarked className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    title: "Rich, Detailed Articles",
    description:
      "Access comprehensive articles with images, citations, and multimedia content for deeper understanding.",
  },
  {
    icon: <Bookmark className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    title: "Smart Bookmarks",
    description:
      "Save and organize your favorite articles for easy access. Never lose important information again.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            Why Choose Us
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
            Powerful Features
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to search, read, and contribute to the world's
            knowledge.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
