"use client";

import { FC, ReactNode } from "react";

interface SectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  isDanger?: boolean;
}

const FormSection: FC<SectionProps> = ({
  title,
  description,
  children,
  isDanger = false,
}) => {
  return (
    <div
      className={`p-6 rounded-2xl border transition-all duration-300 ${
        isDanger
          ? "bg-red-50/50 dark:bg-red-500/5 border-red-200 dark:border-red-500/20"
          : "bg-gray-50/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
      }`}
    >
      <div className="mb-6">
        <h3
          className={`text-lg font-semibold mb-2 ${
            isDanger
              ? "text-red-900 dark:text-red-400"
              : "text-gray-900 dark:text-white"
          }`}
        >
          {title}
        </h3>
        {description && (
          <p
            className={`text-sm ${
              isDanger
                ? "text-red-700 dark:text-red-300/80"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            {description}
          </p>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
};

export default FormSection;
