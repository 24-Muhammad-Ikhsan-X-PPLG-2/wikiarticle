"use client";

import Link from "next/link";
import React from "react";

const FooterLink = () => {
  return (
    <div className="space-y-3">
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
        >
          Sign up
        </Link>
      </p>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        <Link
          href="/forgot"
          className="font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
        >
          Need help?
        </Link>
      </p>
    </div>
  );
};

export default FooterLink;
