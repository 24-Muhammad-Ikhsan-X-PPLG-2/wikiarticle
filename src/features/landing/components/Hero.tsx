"use client";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Gradient Background Elements */}
        <div className="absolute top-32 -right-48 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl z-1"></div>
        <div className="absolute top-64 -left-48 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl z-1"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-2">
          {/* Left Content */}
          <div className="space-y-8 z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-950/30 rounded-full border border-blue-100 dark:border-blue-900/50">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                Welcome to the Future of Knowledge
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Explore Knowledge
                <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {" "}
                  Without Limits
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed">
                Join millions discovering, reading, and contributing to the
                world's collaborative encyclopedia of knowledge.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="px-8 py-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-300">
                Explore Articles
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8 border-t border-gray-200 dark:border-gray-800">
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  10K+
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Articles
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  50K+
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Contributors
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  100K+
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Daily Readers
                </p>
              </div>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative h-96 sm:h-full min-h-96 flex items-center justify-center">
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 to-indigo-500/20 dark:from-blue-500/10 dark:to-indigo-500/10 rounded-2xl"></div>
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              {/* Illustration placeholder with gradient */}
              <div className="w-full h-full bg-linear-to-br from-blue-400 via-indigo-400 to-purple-500 dark:from-blue-600 dark:via-indigo-600 dark:to-purple-700 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-6xl">📚</div>
                  <p className="text-white font-semibold text-lg">
                    Knowledge Hub
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
