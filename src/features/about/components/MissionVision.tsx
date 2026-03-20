import { Lightbulb, Target } from "lucide-react";
import React from "react";

const MissionVision = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Mission */}
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 mb-4">
              <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              To democratize knowledge by creating an open, community-driven
              platform where anyone can learn, share, and contribute to
              humanity's collective understanding. We empower people worldwide
              to access, create, and refine knowledge collaboratively.
            </p>
            <ul className="space-y-3 pt-4">
              <li className="flex gap-3 text-gray-600 dark:text-gray-400">
                <span className="text-blue-600 dark:text-blue-400 font-bold">
                  →
                </span>
                Open access to knowledge for everyone
              </li>
              <li className="flex gap-3 text-gray-600 dark:text-gray-400">
                <span className="text-blue-600 dark:text-blue-400 font-bold">
                  →
                </span>
                Empower community contributors
              </li>
              <li className="flex gap-3 text-gray-600 dark:text-gray-400">
                <span className="text-blue-600 dark:text-blue-400 font-bold">
                  →
                </span>
                Ensure information quality and accuracy
              </li>
            </ul>
          </div>

          {/* Vision */}
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 mb-4">
              <Lightbulb className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Our Vision
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              To build the world's most trusted, comprehensive, and accessible
              knowledge platform. A place where artificial intelligence and
              human expertise converge to create an ever-improving repository of
              verified, multi-perspective knowledge accessible to every person
              globally.
            </p>
            <ul className="space-y-3 pt-4">
              <li className="flex gap-3 text-gray-600 dark:text-gray-400">
                <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                  →
                </span>
                Bridge language and cultural barriers
              </li>
              <li className="flex gap-3 text-gray-600 dark:text-gray-400">
                <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                  →
                </span>
                Advance collective human intelligence
              </li>
              <li className="flex gap-3 text-gray-600 dark:text-gray-400">
                <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                  →
                </span>
                Enable informed decision making
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
