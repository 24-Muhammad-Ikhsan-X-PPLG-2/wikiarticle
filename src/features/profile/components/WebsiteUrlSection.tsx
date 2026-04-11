"use client";

import { ProfileSettingsSchemaType } from "@/schemas/profileSettingsSchema";
import { Globe } from "lucide-react";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

const WebsiteUrlSection: FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileSettingsSchemaType>();
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
        Website URL{" "}
        <span className="text-gray-500 text-xs font-normal">(Optional)</span>
      </label>
      <div className="relative">
        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
        <input
          type="url"
          className={`w-full pl-12 pr-4 py-3 rounded-lg border transition-all duration-300 bg-white dark:bg-gray-900 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 ${
            errors.website_url
              ? "border-red-500 dark:border-red-500 focus:ring-red-500"
              : "border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-transparent"
          } text-gray-900 dark:text-white`}
          placeholder="https://yourwebsite.com"
          {...register("website_url")}
        />
      </div>
      {errors.website_url && (
        <p className="text-sm text-red-500 dark:text-red-400 mt-2">
          {errors.website_url.message}
        </p>
      )}
    </div>
  );
};

export default WebsiteUrlSection;
