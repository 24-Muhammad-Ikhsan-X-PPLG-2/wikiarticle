"use client";
import { motion } from "motion/react";
import FormSection from "./FormSection";
import EmailInput from "@/components/ui/EmailInput";
import { UserIcon } from "lucide-react";
import { FieldError, useFormContext, UseFormRegister } from "react-hook-form";
import { ProfileSettingsSchemaType } from "@/schemas/profileSettingsSchema";
import { FC } from "react";

type Props = {
  userEmail: string | undefined;
};

const PersonalInfoSection: FC<Props> = ({ userEmail }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileSettingsSchemaType>();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <FormSection
        title="Personal Information"
        description="Update your account details"
      >
        <div className="space-y-4">
          {/* Email */}
          <EmailInput
            value={userEmail}
            readOnly
            placeholder="you@example.com"
          />

          {/* Username */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Username
            </label>
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
              <input
                type="text"
                className={`w-full pl-12 pr-4 py-3 rounded-lg border transition-all duration-300 bg-white dark:bg-gray-900 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 ${
                  errors.username
                    ? "border-red-500 dark:border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-transparent"
                } text-gray-900 dark:text-white`}
                placeholder="johndoe"
                {...register("username")}
              />
            </div>
            {errors.username && (
              <p className="text-sm text-red-500 dark:text-red-400 mt-2">
                {errors.username.message}
              </p>
            )}
          </div>
        </div>
      </FormSection>
    </motion.div>
  );
};

export default PersonalInfoSection;
