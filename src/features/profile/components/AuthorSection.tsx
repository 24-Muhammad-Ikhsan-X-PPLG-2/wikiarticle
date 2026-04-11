"use client";

import { motion } from "motion/react";
import FormSection from "./FormSection";
import { Briefcase } from "lucide-react";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { ProfileSettingsSchemaType } from "@/schemas/profileSettingsSchema";

const AuthorSection: FC = () => {
  const { register } = useFormContext<ProfileSettingsSchemaType>();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <FormSection
        title="Author Status"
        description="Enable author features on your profile"
      >
        <div className="flex items-center justify-between p-4 rounded-lg bg-gray-100/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
          <div className="flex items-center gap-3">
            <Briefcase className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Make me an Author
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Enable author features and publish articles
              </p>
            </div>
          </div>
          <input
            type="checkbox"
            className="w-5 h-5 rounded transition-all cursor-pointer"
            {...register("isAuthor")}
          />
        </div>
      </FormSection>
    </motion.div>
  );
};

export default AuthorSection;
