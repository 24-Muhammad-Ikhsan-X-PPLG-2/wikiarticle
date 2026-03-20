"use client";

import { FC, ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title: string;
  description: string;
};

const FeatureCard: FC<Props> = ({ description, icon, title }) => {
  return (
    <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-indigo-500/10 hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1 group">
      <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
