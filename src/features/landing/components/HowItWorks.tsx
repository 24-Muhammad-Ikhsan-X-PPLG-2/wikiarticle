"use client";

import { BookOpen, Edit2, Search } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: <Search className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
    title: "Search",
    description:
      "Browse or search through our vast collection of articles on any topic imaginable.",
  },
  {
    number: "02",
    icon: <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
    title: "Read",
    description:
      "Discover in-depth articles crafted and verified by our community of experts.",
  },
  {
    number: "03",
    icon: <Edit2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
    title: "Contribute",
    description:
      "Share your knowledge and help grow WikiArticle with your contributions.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            Simple Process
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get started in three simple steps. It's that easy.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Line - Hidden on Mobile */}
          <div className="hidden md:block absolute top-20 left-0 right-0 h-1 bg-linear-to-r from-blue-200 via-indigo-200 to-purple-200 dark:from-blue-900/30 dark:via-indigo-900/30 dark:to-purple-900/30 -z-10"></div>

          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step Card */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 h-full">
                {/* Number Badge */}
                <div className="mb-6 flex items-start">
                  <div className="text-5xl font-bold text-transparent bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text">
                    {step.number}
                  </div>
                </div>

                {/* Icon Container */}
                <div className="w-16 h-16 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Arrow on desktop - between steps */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                  <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-950 border-2 border-blue-200 dark:border-blue-900/50 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-blue-600 dark:text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
