"use client";

import React from "react";

const Divider = () => {
  return (
    <div className="relative my-8">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-3 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 font-medium">
          or continue with
        </span>
      </div>
    </div>
  );
};

export default Divider;
