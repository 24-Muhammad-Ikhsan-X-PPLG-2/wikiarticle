"use client";

import { ProfileSettingsSchemaType } from "@/schemas/profileSettingsSchema";
import { Pen } from "lucide-react";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

const BioSection: FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileSettingsSchemaType>();
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
        Bio{" "}
        <span className="text-gray-500 text-xs font-normal">(Optional)</span>
      </label>
      <div className="relative">
        <Pen className="absolute left-4 top-3 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
        <textarea
          className={`w-full pl-12 pr-4 py-3 rounded-lg border transition-all duration-300 bg-white dark:bg-gray-900 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 resize-none ${
            errors.bio
              ? "border-red-500 dark:border-red-500 focus:ring-red-500"
              : "border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-transparent"
          } text-gray-900 dark:text-white`}
          placeholder="Tell us about yourself..."
          rows={4}
          {...register("bio")}
        />
      </div>
      {errors.bio && (
        <p className="text-sm text-red-500 dark:text-red-400 mt-2">
          {errors.bio.message}
        </p>
      )}
    </div>
  );
};

export default BioSection;
