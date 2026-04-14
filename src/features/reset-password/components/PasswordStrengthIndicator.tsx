"use client";

import { FC } from "react";

interface PasswordStrengthIndicatorProps {
  password: string;
}

const PasswordStrengthIndicator: FC<PasswordStrengthIndicatorProps> = ({
  password,
}) => {
  const calculateStrength = (pwd: string): number => {
    let strength = 0;
    if (pwd.length >= 6) strength++;
    if (pwd.length >= 10) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[!@#$%^&*]/.test(pwd)) strength++;
    return strength;
  };

  const getStrengthLabel = (strength: number): string => {
    if (strength <= 1) return "Weak";
    if (strength <= 2) return "Fair";
    if (strength <= 3) return "Good";
    if (strength <= 4) return "Strong";
    return "Very Strong";
  };

  const getStrengthColor = (strength: number): string => {
    if (strength <= 1) return "bg-red-500 dark:bg-red-600";
    if (strength <= 2) return "bg-orange-500 dark:bg-orange-600";
    if (strength <= 3) return "bg-yellow-500 dark:bg-yellow-600";
    if (strength <= 4) return "bg-green-500 dark:bg-green-600";
    return "bg-emerald-600 dark:bg-emerald-700";
  };

  const strength = calculateStrength(password);

  if (!password) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
          Strength
        </label>
        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
          {getStrengthLabel(strength)}
        </span>
      </div>
      <div className="flex gap-1">
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              index < strength
                ? getStrengthColor(strength)
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;
