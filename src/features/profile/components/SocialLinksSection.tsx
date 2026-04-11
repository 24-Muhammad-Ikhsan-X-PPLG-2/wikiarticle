"use client";

import { ProfileSettingsSchemaType } from "@/schemas/profileSettingsSchema";
import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { FC } from "react";
import { FieldErrors, useFormContext, UseFormRegister } from "react-hook-form";

const SocialLinksSection: FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileSettingsSchemaType>();
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
        Social Links{" "}
        <span className="text-gray-500 text-xs font-normal">(Optional)</span>
      </label>
      <div className="space-y-3">
        {/* Twitter */}
        <div className="relative">
          <Twitter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1DA1F2] pointer-events-none" />
          <input
            type="url"
            className={`w-full pl-12 pr-4 py-3 rounded-lg border transition-all duration-300 bg-white dark:bg-gray-900 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 ${
              errors.twitter_url
                ? "border-red-500 dark:border-red-500 focus:ring-red-500"
                : "border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-transparent"
            } text-gray-900 dark:text-white`}
            placeholder="https://twitter.com/yourhandle"
            {...register("twitter_url")}
          />
        </div>

        {/* GitHub */}
        <div className="relative">
          <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-800 dark:text-gray-300 pointer-events-none" />
          <input
            type="url"
            className={`w-full pl-12 pr-4 py-3 rounded-lg border transition-all duration-300 bg-white dark:bg-gray-900 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 ${
              errors.github_url
                ? "border-red-500 dark:border-red-500 focus:ring-red-500"
                : "border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-transparent"
            } text-gray-900 dark:text-white`}
            placeholder="https://github.com/yourhandle"
            {...register("github_url")}
          />
        </div>

        {/* LinkedIn */}
        <div className="relative">
          <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0A66C2] pointer-events-none" />
          <input
            type="url"
            className={`w-full pl-12 pr-4 py-3 rounded-lg border transition-all duration-300 bg-white dark:bg-gray-900 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 ${
              errors.linkedin_url
                ? "border-red-500 dark:border-red-500 focus:ring-red-500"
                : "border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-transparent"
            } text-gray-900 dark:text-white`}
            placeholder="https://linkedin.com/in/yourprofile"
            {...register("linkedin_url")}
          />
        </div>

        {/* Facebook */}
        <div className="relative">
          <Facebook className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1877F2] pointer-events-none" />
          <input
            type="url"
            className={`w-full pl-12 pr-4 py-3 rounded-lg border transition-all duration-300 bg-white dark:bg-gray-900 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 ${
              errors.facebook_url
                ? "border-red-500 dark:border-red-500 focus:ring-red-500"
                : "border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-transparent"
            } text-gray-900 dark:text-white`}
            placeholder="https://facebook.com/yourprofile"
            {...register("facebook_url")}
          />
        </div>

        {/* Instagram */}
        <div className="relative">
          <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#E4405F] pointer-events-none" />
          <input
            type="url"
            className={`w-full pl-12 pr-4 py-3 rounded-lg border transition-all duration-300 bg-white dark:bg-gray-900 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 ${
              errors.instagram_url
                ? "border-red-500 dark:border-red-500 focus:ring-red-500"
                : "border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-transparent"
            } text-gray-900 dark:text-white`}
            placeholder="https://instagram.com/yourprofile"
            {...register("instagram_url")}
          />
        </div>
      </div>
    </div>
  );
};

export default SocialLinksSection;
