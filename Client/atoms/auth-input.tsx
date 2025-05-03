"use client";

import type React from "react";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

interface AuthInputProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  showPasswordToggle?: boolean;
}

export default function AuthInput({
  id,
  label,
  type,
  value,
  onChange,
  error,
  placeholder,
  required = false,
  autoComplete,
  showPasswordToggle = false,
}: AuthInputProps) {
  const [inputType, setInputType] = useState(type);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={inputType}
          className={`w-full px-4 py-2 rounded-lg border ${
            error
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 dark:border-gray-600 focus:ring-primary focus:border-primary dark:focus:ring-highlight dark:focus:border-highlight"
          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoComplete={autoComplete}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none"
            aria-label={
              inputType === "password" ? "Show password" : "Hide password"
            }
          >
            {inputType === "password" ? (
              <Eye size={18} />
            ) : (
              <EyeOff size={18} />
            )}
          </button>
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-1 text-sm text-red-500"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}