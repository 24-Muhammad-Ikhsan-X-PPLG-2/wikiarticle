"use client";
import { motion } from "motion/react";

const PageHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12"
    >
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        Profile Settings
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        Manage your account and preferences
      </p>
    </motion.div>
  );
};

export default PageHeader;
