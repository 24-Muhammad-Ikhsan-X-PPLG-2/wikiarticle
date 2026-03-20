import appName from "@/app/constants/appName";
import React from "react";

const AboutWeb = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            What is {appName}?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            A modern platform built on principles of openness and collaboration
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 hover:shadow-lg dark:hover:shadow-indigo-500/10 hover:shadow-indigo-500/10">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Open Knowledge for Everyone
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Unlike traditional websites, {appName} is built on the principle
              that knowledge belongs to everyone. Every article is free,
              editable, and continuously improved by our global community of
              contributors. We believe that diverse perspectives lead to better
              understanding.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 hover:shadow-lg dark:hover:shadow-indigo-500/10 hover:shadow-indigo-500/10">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Community-Driven Excellence
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Our strength comes from our community. Every article is written,
              reviewed, and improved by volunteers passionate about knowledge
              sharing. This collective intelligence ensures content quality and
              credibility that grows stronger every day.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 hover:shadow-lg dark:hover:shadow-indigo-500/10 hover:shadow-indigo-500/10">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Easy to Use & Contribute
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Anyone can read, edit, or create articles. Our intuitive interface
              makes it simple for newcomers to start contributing. Whether
              you're correcting a typo or writing comprehensive articles, your
              contributions make a real difference.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutWeb;
