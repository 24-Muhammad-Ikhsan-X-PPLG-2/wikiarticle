import FeatureCard from "@/components/ui/FeatureCard";
import { Bookmark, BookMarked, Users, Zap } from "lucide-react";

const features = [
  {
    icon: <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    title: "Lightning Fast Search",
    description:
      "Find exactly what you need in milliseconds with our powerful search engine.",
  },
  {
    icon: <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    title: "Community Contributions",
    description:
      "Join thousands of contributors worldwide improving knowledge together.",
  },
  {
    icon: <BookMarked className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    title: "Rich Articles",
    description:
      "Comprehensive articles with images, citations, and multimedia content.",
  },
  {
    icon: <Bookmark className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    title: "Smart Bookmarks",
    description:
      "Save and organize your favorite articles for easy access anytime.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            Core Features
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
            Powerful Capabilities
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Tools and features designed to make knowledge sharing effortless and
            effective.
          </p>
        </div>

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
