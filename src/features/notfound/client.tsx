"use client";
import appName from "@/constants/appName";
import { ChevronLeft, Home, Search } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

const NotFoundClient = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300 overflow-hidden flex flex-col">
      {/* Background Gradient */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-20 -right-48 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/3 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/3 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10 pt-10 pb-10">
        <div className="text-center max-w-2xl w-full">
          {/* 404 Text with Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <h1 className="text-8xl sm:text-9xl font-black bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
                  404
                </h1>
              </motion.div>
              <motion.div
                className="absolute inset-0 text-8xl sm:text-9xl font-black bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent blur-xl opacity-30"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.1,
                }}
                aria-hidden="true"
              >
                404
              </motion.div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Page Not Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </motion.div>

          {/* Illustration / Decorative Element */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="my-12"
          >
            <div className="relative h-32 sm:h-40 flex items-center justify-center">
              {/* Floating papers animation */}
              <motion.div
                className="absolute w-20 h-28 bg-gradient-to-br from-blue-300 to-blue-400 dark:from-blue-600 dark:to-indigo-600 rounded-lg shadow-lg"
                animate={{
                  y: [0, -20, 0],
                  rotate: [-5, 5, -5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute w-20 h-28 bg-gradient-to-br from-indigo-300 to-purple-300 dark:from-indigo-600 dark:to-purple-600 rounded-lg shadow-lg"
                animate={{
                  y: [0, 20, 0],
                  rotate: [5, -5, 5],
                  x: [20, -20, 20],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />
              <motion.div
                className="absolute w-20 h-28 bg-gradient-to-br from-purple-300 to-pink-300 dark:from-purple-600 dark:to-pink-600 rounded-lg shadow-lg"
                animate={{
                  y: [0, -15, 0],
                  rotate: [-3, 3, -3],
                  x: [-25, 25, -25],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          >
            {/* Primary Button - Go Home */}
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-1 active:scale-90 cursor-pointer"
            >
              <Home className="w-5 h-5" />
              Go Home
            </button>

            {/* Secondary Button - Go Back */}
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 hover:-translate-y-1 active:scale-90 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
              Go Back
            </button>
          </motion.div>

          {/* Optional Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 border-t border-gray-200 dark:border-gray-800"
          >
            <motion.a
              href="/explore"
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
            >
              <Search className="w-4 h-4" />
              Explore Articles
            </motion.a>
            <span className="hidden sm:inline text-gray-300 dark:text-gray-600">
              •
            </span>
            <motion.a
              href="/about"
              whileHover={{ x: 5 }}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
            >
              Learn More
            </motion.a>
            <span className="hidden sm:inline text-gray-300 dark:text-gray-600">
              •
            </span>
            <motion.a
              href="mailto:support@wikiarticle.com"
              whileHover={{ x: 5 }}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
            >
              Support
            </motion.a>
          </motion.div>

          {/* Footer Message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 text-sm text-gray-500 dark:text-gray-500"
          >
            Having trouble? Contact us at support@{appName.toLowerCase()}.com
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundClient;
