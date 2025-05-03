"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { Moon, Sun } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
}: AuthLayoutProps) {
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  // Check for dark mode preference on mount
  useEffect(() => {
    setMounted(true);
    setIsDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 transition-colors duration-300">
      {/* Logo and theme toggle */}
      <div className="w-full max-w-md flex justify-between items-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <div
            className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-highlight dark:from-primary dark:to-highlight cursor-pointer"
            onClick={() => router.push("/")}
          >
            DealDash
          </div>
        </motion.div>

        {/* <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300"
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {mounted &&
            (isDarkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-primary" />)}
        </button> */}
      </div>

      {/* Auth card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {title}
              </h1>
              {subtitle && (
                <p className="text-gray-500 dark:text-gray-400">{subtitle}</p>
              )}
            </div>
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
