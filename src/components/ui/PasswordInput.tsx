"use client";

import { Eye, EyeOff, Lock } from "lucide-react";
import { FC, InputHTMLAttributes, Ref, useState } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  ref?: Ref<HTMLInputElement>;
}

const PasswordInput: FC<Props> = ({ error, ref, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
        Password
      </label>
      <div className="relative">
        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
        <input
          type={showPassword ? "text" : "password"}
          className={`w-full pl-12 pr-12 py-3 rounded-lg border transition-all duration-300 bg-white dark:bg-gray-900 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 ${
            error
              ? "border-red-500 dark:border-red-500 focus:ring-red-500"
              : "border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-transparent"
          } text-gray-900 dark:text-white`}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>
      {error && (
        <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default PasswordInput;
