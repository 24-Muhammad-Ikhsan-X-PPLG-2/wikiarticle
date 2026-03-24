"use client";

import { FC } from "react";

type Props = {
  name: string;
  avatar: string;
  bio: string;
  articles?: number;
};

const AuthorBio: FC<Props> = ({ avatar, bio, name, articles }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 border-t border-gray-200 dark:border-gray-800">
      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-800">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          {/* Avatar */}
          <div className="w-24 h-24 shrink-0 rounded-full bg-linear-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-4xl font-bold text-white">
            {avatar}
          </div>

          {/* Content */}
          <div className="grow">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              {bio}
            </p>

            {/* Stats */}
            <div className="flex gap-6 text-sm">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {articles}
                </p>
                <p className="text-gray-600 dark:text-gray-400">Articles</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Expert
                </p>
                <p className="text-gray-600 dark:text-gray-400">Contributor</p>
              </div>
            </div>

            {/* Follow Button */}
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Follow Author
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorBio;
