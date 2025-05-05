"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import AdminInput from "@/atoms/admin-input";
import AdminButton from "@/atoms/admin-button";
import AdminCheckbox from "@/atoms/admin-checkbox";
import TwoFactorAuth from "@/molecules/two-factor-auth";
import SecurityNotice from "@/molecules/security-notice";
import LastLoginInfo from "@/molecules/last-login-info";
import AuthInput from "@/atoms/auth-input";
import AuthButton from "@/atoms/auth-button";
import { login } from "@/lib/api/admin/auth.api";

// Mock function for JWT token handling
const storeAuthToken = (token: string, rememberMe: boolean) => {
  if (rememberMe) {
    localStorage.setItem("adminAuthToken", token);
  } else {
    sessionStorage.setItem("adminAuthToken", token);
  }
};

interface LoginCredentials {
  email: string;
  password: string;
}

export default function AdminLoginForm() {
  const router = useRouter();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [twoFactorError, setTwoFactorError] = useState("");
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(0);
  const [lastLogin, setLastLogin] = useState<{
    timestamp: string;
    ipAddress: string;
    location?: string;
  } | null>(null);
  const [showLastLogin, setShowLastLogin] = useState(false);

  // Check for lockout
  useEffect(() => {
    const storedLockoutTime = localStorage.getItem("adminLockoutUntil");
    if (storedLockoutTime) {
      const lockoutUntil = Number.parseInt(storedLockoutTime, 10);
      if (lockoutUntil > Date.now()) {
        setIsLocked(true);
        setLockoutTime(Math.ceil((lockoutUntil - Date.now()) / 1000));
      } else {
        localStorage.removeItem("adminLockoutUntil");
      }
    }

    // Check for last login info
    const lastLoginInfo = localStorage.getItem("adminLastLogin");
    if (lastLoginInfo) {
      setLastLogin(JSON.parse(lastLoginInfo));
    }
  }, []);

  // Countdown timer for lockout
  useEffect(() => {
    if (isLocked && lockoutTime > 0) {
      const timer = setTimeout(() => {
        setLockoutTime(lockoutTime - 1);
        if (lockoutTime <= 1) {
          setIsLocked(false);
          localStorage.removeItem("adminLockoutUntil");
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isLocked, lockoutTime]);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!credentials.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!credentials.password) {
      newErrors.password = "Password is required";
    } else if (credentials.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });

    // Clear error when typing
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  // login function
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const response = await login(credentials.email, credentials.password);
      console.log("response", response);
      if (response.success) {
        localStorage.removeItem("adminFailedAttempts");

        router.push("/admin/dashboard");
      } else {
        const newFailedAttempts = failedAttempts + 1;
        setFailedAttempts(newFailedAttempts);
        localStorage.setItem(
          "adminFailedAttempts",
          newFailedAttempts.toString()
        );

        if (newFailedAttempts >= 5) {
          const lockoutUntil = Date.now() + 5 * 60 * 1000;
          localStorage.setItem("adminLockoutUntil", lockoutUntil.toString());
          setIsLocked(true);
          setLockoutTime(5 * 60);
          setErrors({
            general: "Too many failed attempts. Account locked for 5 minutes.",
          });
        } else {
          setErrors({ general: "Invalid email or password" });
        }
      }
    } catch (error) {
      setErrors({ general: "An error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    router.push("/admin/forgot-password");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {isLocked && (
        <SecurityNotice
          type="warning"
          message="Account temporarily locked"
          details={`Too many failed login attempts. Please try again in ${Math.floor(
            lockoutTime / 60
          )}:${(lockoutTime % 60).toString().padStart(2, "0")} minutes.`}
        />
      )}

      {failedAttempts > 0 && failedAttempts < 5 && (
        <SecurityNotice
          type="warning"
          message={`Failed login attempts: ${failedAttempts}/5`}
          details="Your account will be temporarily locked after 5 failed attempts."
        />
      )}

      {showLastLogin && lastLogin && (
        <div className="mb-6">
          <LastLoginInfo
            timestamp={lastLogin.timestamp}
            ipAddress={lastLogin.ipAddress}
            location={lastLogin.location}
          />
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-6">
        <AuthInput
          id="email"
          name="email"
          label="Email Address"
          type="email"
          value={credentials.email}
          onChange={handleInputChange}
          error={errors.email}
          placeholder="admin@company.com"
          required
          autoComplete="email"
          icon={<Mail size={18} />}
        />

        <AuthInput
          id="password"
          name="password"
          label="Password"
          type="password"
          value={credentials.password}
          onChange={handleInputChange}
          error={errors.password}
          placeholder="••••••••"
          required
          autoComplete="current-password"
          showPasswordToggle
          icon={<Lock size={18} />}
        />

        <div className="flex items-center justify-between">
          <AdminCheckbox
            id="remember-me"
            label="Remember me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />

          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm font-medium text-primary hover:text-opacity-80 dark:text-highlight dark:hover:text-opacity-80"
          >
            Forgot password?
          </button>
        </div>

        {errors.general && (
          <div className="flex items-center text-red-500 text-sm">
            <AlertCircle className="h-4 w-4 mr-2" />
            {errors.general}
          </div>
        )}

        <AuthButton
          type="submit"
          fullWidth
          isLoading={isLoading}
          disabled={isLocked}
          size="lg"
        >
          Sign in to Admin Panel
        </AuthButton>
      </form>
    </motion.div>
  );
}
