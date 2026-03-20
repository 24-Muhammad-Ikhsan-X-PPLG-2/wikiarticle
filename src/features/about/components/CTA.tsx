import React from "react";

const CTA = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-linear-to-br from-blue-600 to-indigo-600 dark:from-blue-900/40 dark:to-indigo-900/40 rounded-3xl p-12 sm:p-20 border border-blue-500/20 dark:border-blue-500/10 relative overflow-hidden text-center">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 dark:bg-white/5 rounded-full blur-2xl -translate-y-12 translate-x-12"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 dark:bg-white/5 rounded-full blur-2xl translate-y-8 -translate-x-8"></div>

          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              Join Our Community
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Whether you're looking to learn, contribute, or build the future
              of knowledge sharing, there's a place for you in WikiArticle.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:-translate-y-1">
                Start Exploring
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
