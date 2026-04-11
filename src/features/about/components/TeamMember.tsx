"use client";

import Image from "next/image";
import { FC } from "react";

type Props = {
  name: string;
  role: string;
  avatar: string;
  bio?: string;
};

const TeamMember: FC<Props> = ({ avatar, name, role, bio }) => {
  return (
    <div className="group">
      <div className="text-center bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 hover:shadow-lg dark:hover:shadow-indigo-500/10 hover:shadow-indigo-500/10">
        {/* Avatar */}
        <div className="mb-6 mx-auto w-24 h-24 rounded-full bg-linear-to-br from-blue-400 to-indigo-500 dark:from-blue-600 dark:to-indigo-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative">
          <Image
            width={96}
            height={96}
            alt={name}
            src={`/img_creator/${avatar}`}
            className="absolute size-full object-cover object-top rounded-full"
          />
        </div>

        {/* Name */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {name}
        </h3>

        {/* Role */}
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">
          {role}
        </p>

        {/* Bio */}
        {bio && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
            {bio}
          </p>
        )}
      </div>
    </div>
  );
};

export default TeamMember;
