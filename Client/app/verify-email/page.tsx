"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Mail, CheckCircle, AlertCircle } from "lucide-react"

import AuthLayout from "@/templates/auth-layout"
import AuthButton from "@/atoms/auth-button"
import AuthInput from "@/atoms/auth-input"

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const email = searchParams.get("email") || ""
  const token = searchParams.get("token")

  const [countdown, setCountdown] = useState(30)
  const [isResending, setIsResending] = useState(false)
  const [resendError, setResendError] = useState("")
  const [resendSuccess, setResendSuccess] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState<"pending" | "success" | "error">(
    token ? "pending" : "pending",
  )
  const [showChangeEmail, setShowChangeEmail] = useState(false)
  const [newEmail, setNewEmail] = useState("")
  const [emailError, setEmailError] = useState("")

  // Handle token verification
  useEffect(() => {
    if (token) {
      verifyToken(token)
    }
  }, [token])

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  // Verify the token
  const verifyToken = async (token: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would call your API to verify the token
      // const response = await fetch(`/api/verify-email?token=${token}`)
      // if (!response.ok) throw new Error('Verification failed')

      setVerificationStatus("success")

      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    } catch (error) {
      console.error("Verification error:", error)
      setVerificationStatus("error")
    }
  }

  // Resend verification email
  const handleResend = async () => {
    setIsResending(true)
    setResendError("")
    setResendSuccess(false)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would call your API to resend the email
      // const response = await fetch('/api/resend-verification', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // })
      // if (!response.ok) throw new Error('Failed to resend verification email')

      setResendSuccess(true)
      setCountdown(30)
    } catch (error) {
      console.error("Resend error:", error)
      setResendError("Failed to resend verification email. Please try again.")
    } finally {
      setIsResending(false)
    }
  }

  // Change email address
  const handleChangeEmail = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newEmail) {
      setEmailError("Please enter your email")
      return
    }

    if (!/\S+@\S+\.\S+/.test(newEmail)) {
      setEmailError("Please enter a valid email")
      return
    }

    setIsResending(true)
    setResendError("")
    setEmailError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would call your API to update the email
      // const response = await fetch('/api/update-email', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ oldEmail: email, newEmail })
      // })
      // if (!response.ok) throw new Error('Failed to update email')

      // Update URL with new email
      router.push(`/verify-email?email=${encodeURIComponent(newEmail)}`)

      setResendSuccess(true)
      setShowChangeEmail(false)
      setCountdown(30)
    } catch (error) {
      console.error("Change email error:", error)
      setResendError("Failed to update email. Please try again.")
    } finally {
      setIsResending(false)
    }
  }

  // Show pending verification screen
  if (verificationStatus === "pending" && !token) {
    return (
      <AuthLayout title="Check your email" subtitle={`We've sent a verification link to ${email}`}>
        <div className="flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mb-6">
            <Mail className="h-10 w-10 text-primary" />
          </div>

          <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
            Please check your inbox and click on the verification link to activate your account. If you don't see the
            email, check your spam folder.
          </p>

          {resendSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 w-full rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 text-sm text-center"
            >
              Verification email has been resent successfully!
            </motion.div>
          )}

          {resendError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 w-full rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm text-center"
            >
              {resendError}
            </motion.div>
          )}

          <div className="space-y-4 w-full">
            {!showChangeEmail ? (
              <>
                <div className="flex justify-center">
                  <AuthButton
                    onClick={handleResend}
                    isLoading={isResending}
                    disabled={isResending || countdown > 0}
                    variant="outline"
                  >
                    {countdown > 0 ? `Resend email (${countdown}s)` : "Resend verification email"}
                  </AuthButton>
                </div>

                <button
                  onClick={() => setShowChangeEmail(true)}
                  className="w-full text-sm text-primary hover:text-opacity-80 dark:hover:text-opacity-90 transition-colors"
                >
                  Change email address
                </button>
              </>
            ) : (
              <form onSubmit={handleChangeEmail} className="space-y-4">
                <AuthInput
                  id="new-email"
                  label="New Email Address"
                  type="email"
                  value={newEmail}
                  onChange={(e) => {
                    setNewEmail(e.target.value)
                    if (emailError) setEmailError("")
                  }}
                  error={emailError}
                  placeholder="Enter your new email"
                  required
                />

                <div className="flex space-x-3">
                  <AuthButton type="submit" isLoading={isResending} disabled={isResending}>
                    Update Email
                  </AuthButton>

                  <AuthButton onClick={() => setShowChangeEmail(false)} variant="outline" disabled={isResending}>
                    Cancel
                  </AuthButton>
                </div>
              </form>
            )}

            <div className="pt-2 text-center">
              <Link
                href="/login"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 transition-colors"
              >
                Back to login
              </Link>
            </div>

            <div className="pt-4 text-center">
              <Link
                href="/contact"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 transition-colors"
              >
                Need help? Contact support
              </Link>
            </div>
          </div>
        </div>
      </AuthLayout>
    )
  }

  // Show verification success screen
  if (verificationStatus === "success") {
    return (
      <AuthLayout title="Email Verified!" subtitle="Your account has been successfully activated">
        <div className="flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>

          <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
            Thank you for verifying your email address. You will be redirected to the login page shortly.
          </p>

          <AuthButton onClick={() => router.push("/login")}>Go to Login</AuthButton>
        </div>
      </AuthLayout>
    )
  }

  // Show verification error screen
  if (verificationStatus === "error") {
    return (
      <AuthLayout title="Verification Failed" subtitle="We couldn't verify your email address">
        <div className="flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
            <AlertCircle className="h-10 w-10 text-red-500" />
          </div>

          <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
            The verification link is invalid or has expired. Please try resending the verification email.
          </p>

          <div className="space-y-4 w-full">
            <AuthButton onClick={() => router.push(`/verify-email?email=${encodeURIComponent(email)}`)} fullWidth>
              Try Again
            </AuthButton>

            <div className="pt-4 text-center">
              <Link
                href="/login"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 transition-colors"
              >
                Back to login
              </Link>
            </div>
          </div>
        </div>
      </AuthLayout>
    )
  }

  return null
}
