import appName from "@/app/constants/appName";
import { Lightbulb } from "lucide-react";
import React from "react";

const Hero = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        {/* Background Gradients */}
        <div className="absolute top-32 -right-48 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute top-64 -left-48 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl -z-10"></div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-950/30 rounded-full border border-blue-100 dark:border-blue-900/50 mb-8">
          <Lightbulb className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
            Our Story
          </span>
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          About{" "}
          <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {appName}
          </span>
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          We believe knowledge should be accessible to everyone. {appName} is a
          modern platform for collaborative knowledge sharing, where millions of
          people contribute to create a comprehensive, evergreen encyclopedia.
        </p>
      </div>
    </section>
  );
};

export default Hero;
