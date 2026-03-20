import React from "react";

const ValuesSection = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            Our Values
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
            What We Stand For
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="text-4xl mb-4">🌍</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Accessibility
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Knowledge should never be behind paywalls. Free access to
              information for everyone, everywhere.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Collaboration
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              We believe the best knowledge comes from diverse perspectives
              working together.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Quality
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Accuracy and credibility are paramount. We maintain rigorous
              standards for all content.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
