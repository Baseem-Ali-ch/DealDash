"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { KeyRound, Check, ArrowLeft } from "lucide-react"

import AuthLayout from "@/templates/auth-layout"
import AuthInput from "@/atoms/auth-input"
import AuthButton from "@/atoms/auth-button"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  // State for email request form
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [requestSuccess, setRequestSuccess] = useState(false)

  // State for password reset form
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  })
  const [passwordErrors, setPasswordErrors] = useState({
    password: "",
    confirmPassword: "",
  })
  const [resetSuccess, setResetSuccess] = useState(false)
  const [resetError, setResetError] = useState("")

  // Password strength criteria
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  })

  // Request password reset
  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setEmailError("Please enter your email")
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email")
      return
    }

    setIsSubmitting(true)
    setEmailError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would call your API to request password reset
      // const response = await fetch('/api/forgot-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // })
      // if (!response.ok) throw new Error('Failed to send reset email')

      setRequestSuccess(true)
    } catch (error) {
      console.error("Request reset error:", error)
      setEmailError("Failed to send reset email. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle password input change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswords((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (passwordErrors[name as keyof typeof passwordErrors]) {
      setPasswordErrors((prev) => ({ ...prev, [name]: "" }))
    }

    // Update password criteria
    if (name === "password") {
      setPasswordCriteria({
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /[0-9]/.test(value),
        special: /[^A-Za-z0-9]/.test(value),
      })
    }

    // Clear general reset error when user makes any change
    if (resetError) {
      setResetError("")
    }
  }

  // Calculate password strength
  const passwordStrength = Object.values(passwordCriteria).filter(Boolean).length

  const getPasswordStrengthLabel = () => {
    if (passwordStrength === 0) return ""
    if (passwordStrength < 3) return "Weak"
    if (passwordStrength < 5) return "Medium"
    return "Strong"
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return "bg-gray-200 dark:bg-gray-700"
    if (passwordStrength < 3) return "bg-red-500"
    if (passwordStrength < 5) return "bg-yellow-500"
    return "bg-green-500"
  }

  // Reset password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    let valid = true
    const newErrors = { ...passwordErrors }

    // Password validation
    if (!passwords.password) {
      newErrors.password = "Password is required"
      valid = false
    } else if (passwordStrength < 3) {
      newErrors.password = "Password is too weak"
      valid = false
    } else {
      newErrors.password = ""
    }

    // Confirm password validation
    if (!passwords.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
      valid = false
    } else if (passwords.confirmPassword !== passwords.password) {
      newErrors.confirmPassword = "Passwords do not match"
      valid = false
    } else {
      newErrors.confirmPassword = ""
    }

    setPasswordErrors(newErrors)
    if (!valid) return

    setIsSubmitting(true)
    setResetError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would call your API to reset the password
      // const response = await fetch('/api/reset-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     token,
      //     password: passwords.password
      //   })
      // })
      // if (!response.ok) throw new Error('Password reset failed')

      setResetSuccess(true)

      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    } catch (error) {
      console.error("Reset password error:", error)
      setResetError("Password reset failed. Please try again or request a new reset link.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const CriteriaItem = ({ met, label }: { met: boolean; label: string }) => (
    <div className="flex items-center space-x-2">
      {met ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <div className="h-4 w-4 rounded-full border border-gray-300 dark:border-gray-600"></div>
      )}
      <span className={`text-sm ${met ? "text-green-500" : "text-gray-500 dark:text-gray-400"}`}>{label}</span>
    </div>
  )

  // Password reset request form
  if (!token && !requestSuccess) {
    return (
      <AuthLayout title="Forgot Password" subtitle="Enter your email to receive a password reset link">
        <form onSubmit={handleRequestReset} className="space-y-6">
          <AuthInput
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (emailError) setEmailError("")
            }}
            error={emailError}
            placeholder="Enter your email"
            required
            autoComplete="email"
          />

          <AuthButton type="submit" fullWidth isLoading={isSubmitting} disabled={isSubmitting}>
            Send Reset Link
          </AuthButton>

          <div className="text-center">
            <Link
              href="/login"
              className="inline-flex items-center text-sm text-primary hover:text-opacity-80 dark:hover:text-opacity-90 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </Link>
          </div>
        </form>
      </AuthLayout>
    )
  }

  // Email sent confirmation
  if (!token && requestSuccess) {
    return (
      <AuthLayout title="Check Your Email" subtitle="We've sent you a password reset link">
        <div className="flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mb-6">
            <KeyRound className="h-10 w-10 text-primary" />
          </div>

          <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
            We've sent an email to <span className="font-medium text-gray-900 dark:text-white">{email}</span> with a
            link to reset your password. Please check your inbox and spam folder.
          </p>

          <div className="space-y-4 w-full">
            <AuthButton
              onClick={handleRequestReset}
              isLoading={isSubmitting}
              disabled={isSubmitting}
              variant="outline"
              fullWidth
            >
              Resend Email
            </AuthButton>

            <div className="text-center">
              <Link
                href="/login"
                className="inline-flex items-center text-sm text-primary hover:text-opacity-80 dark:hover:text-opacity-90 transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </AuthLayout>
    )
  }

  // Reset password form
  if (token && !resetSuccess) {
    return (
      <AuthLayout title="Reset Password" subtitle="Create a new password for your account">
        {resetError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm"
          >
            {resetError}
          </motion.div>
        )}

        <form onSubmit={handleResetPassword} className="space-y-6">
          <AuthInput
            id="password"
            name="password"
            label="New Password"
            type="password"
            value={passwords.password}
            onChange={handlePasswordChange}
            error={passwordErrors.password}
            placeholder="Create a new password"
            required
            showPasswordToggle
          />

          {/* Password strength indicator */}
          {passwords.password && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <div className="h-2 flex-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getPasswordStrengthColor()} transition-all duration-300 ease-in-out`}
                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-xs font-medium text-gray-500 dark:text-gray-400 min-w-[60px] text-right">
                  {getPasswordStrengthLabel()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
                <CriteriaItem met={passwordCriteria.length} label="At least 8 characters" />
                <CriteriaItem met={passwordCriteria.uppercase} label="Uppercase letter" />
                <CriteriaItem met={passwordCriteria.lowercase} label="Lowercase letter" />
                <CriteriaItem met={passwordCriteria.number} label="Number" />
                <CriteriaItem met={passwordCriteria.special} label="Special character" />
              </div>
            </div>
          )}

          <AuthInput
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={passwords.confirmPassword}
            onChange={handlePasswordChange}
            error={passwordErrors.confirmPassword}
            placeholder="Confirm your new password"
            required
            showPasswordToggle
          />

          <AuthButton type="submit" fullWidth isLoading={isSubmitting} disabled={isSubmitting}>
            Reset Password
          </AuthButton>
        </form>
      </AuthLayout>
    )
  }

  // Reset password success
  if (token && resetSuccess) {
    return (
      <AuthLayout title="Password Reset Successfully" subtitle="Your password has been updated">
        <div className="flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-6">
            <Check className="h-10 w-10 text-green-500" />
          </div>

          <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
            Your password has been successfully reset. You will be redirected to the login page shortly.
          </p>

          <AuthButton onClick={() => router.push("/login")} fullWidth>
            Back to Login
          </AuthButton>
        </div>
      </AuthLayout>
    )
  }

  return null
}
