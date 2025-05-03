"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

interface AdminInputProps {
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
  icon?: React.ReactNode;
  maxLength?: number;
}

export default function AdminInput({
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
  icon,
  maxLength,
}: AdminInputProps) {
  const [inputType, setInputType] = useState(type);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const togglePasswordVisibility = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  // Auto-focus the first input with an error
  useEffect(() => {
    if (error && inputRef.current) {
      inputRef.current.focus();
    }
  }, [error]);

  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
            {icon}
          </div>
        )}
        <input
          ref={inputRef}
          id={id}
          type={inputType}
          className={`w-full px-4 py-2 ${
            icon ? "pl-10" : "pl-4"
          } py-3 rounded-lg border ${
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
          maxLength={maxLength}
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
              <Eye size={20} />
            ) : (
              <EyeOff size={20} />
            )}
          </button>
        )}
        {error && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
            <AlertCircle size={20} />
          </div>
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-1.5 text-sm text-red-500 flex items-start"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
