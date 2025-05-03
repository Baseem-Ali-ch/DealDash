"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Check, X } from "lucide-react"

import AuthLayout from "@/templates/auth-layout"
import AuthInput from "@/atoms/auth-input"
import AuthButton from "@/atoms/auth-button"
import AuthDivider from "@/atoms/auth-divider"
import SocialAuthButton from "@/molecules/social-auth-button"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [agreeTerms, setAgreeTerms] = useState(false)
  const [agreePrivacy, setAgreePrivacy] = useState(false)
  const [termsError, setTermsError] = useState("")
  const [privacyError, setPrivacyError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [registerError, setRegisterError] = useState("")

  const router = useRouter()

  // Password strength criteria
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  })

  // Update password criteria when password changes
  useEffect(() => {
    const { password } = formData
    setPasswordCriteria({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    })
  }, [formData])

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }

    // Clear general register error when user makes any change
    if (registerError) {
      setRegisterError("")
    }
  }

  const validateForm = () => {
    let valid = true
    const newErrors = { ...errors }

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
      valid = false
    } else {
      newErrors.fullName = ""
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required"
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
      valid = false
    } else {
      newErrors.email = ""
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
      valid = false
    } else if (passwordStrength < 3) {
      newErrors.password = "Password is too weak"
      valid = false
    } else {
      newErrors.password = ""
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
      valid = false
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match"
      valid = false
    } else {
      newErrors.confirmPassword = ""
    }

    // Terms and privacy validation
    if (!agreeTerms) {
      setTermsError("You must agree to the Terms of Service")
      valid = false
    } else {
      setTermsError("")
    }

    if (!agreePrivacy) {
      setPrivacyError("You must agree to the Privacy Policy")
      valid = false
    } else {
      setPrivacyError("")
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setRegisterError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate successful registration
      // In a real app, you would call your auth API here
      // const response = await fetch('/api/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     fullName: formData.fullName,
      //     email: formData.email,
      //     password: formData.password
      //   })
      // })

      // if (!response.ok) throw new Error('Registration failed')
      // const data = await response.json()

      // Redirect to verification page
      router.push("/verify-email?email=" + encodeURIComponent(formData.email))
    } catch (error) {
      console.error("Registration error:", error)
      setRegisterError("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialRegister = async (provider: "google" | "facebook") => {
    setIsLoading(true)
    setRegisterError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would integrate with the social provider here

      // Redirect to home page (social logins typically don't require email verification)
      router.push("/")
    } catch (error) {
      console.error(`${provider} registration error:`, error)
      setRegisterError(`${provider} registration failed`)
    } finally {
      setIsLoading(false)
    }
  }

  const CriteriaItem = ({ met, label }: { met: boolean; label: string }) => (
    <div className="flex items-center space-x-2">
      {met ? <Check className="h-4 w-4 text-green-500" /> : <X className="h-4 w-4 text-gray-400 dark:text-gray-600" />}
      <span className={`text-sm ${met ? "text-green-500" : "text-gray-500 dark:text-gray-400"}`}>{label}</span>
    </div>
  )

  return (
    <AuthLayout title="Create an account" subtitle="Sign up to get started with DealDash">
      {registerError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm"
        >
          {registerError}
        </motion.div>
      )}

      <form onSubmit={handleSubmit}>
        <AuthInput
          id="fullName"
          name="fullName"
          label="Full Name"
          type="text"
          value={formData.fullName}
          onChange={handleInputChange}
          error={errors.fullName}
          placeholder="Enter your full name"
          required
          autoComplete="name"
        />

        <AuthInput
          id="email"
          name="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          placeholder="Enter your email"
          required
          autoComplete="email"
        />

        <AuthInput
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          placeholder="Create a password"
          required
          showPasswordToggle
        />

        {/* Password strength indicator */}
        {formData.password && (
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
          value={formData.confirmPassword}
          onChange={handleInputChange}
          error={errors.confirmPassword}
          placeholder="Confirm your password"
          required
          showPasswordToggle
        />

        {/* Terms and Privacy checkboxes */}
        <div className="mt-6 space-y-4">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={agreeTerms}
                onChange={() => {
                  setAgreeTerms(!agreeTerms)
                  if (termsError) setTermsError("")
                }}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
              />
            </div>
            <div className="ml-3">
              <label htmlFor="terms" className="text-sm text-gray-700 dark:text-gray-300">
                I agree to the{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>
              </label>
              {termsError && <p className="mt-1 text-sm text-red-500">{termsError}</p>}
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="privacy"
                name="privacy"
                type="checkbox"
                checked={agreePrivacy}
                onChange={() => {
                  setAgreePrivacy(!agreePrivacy)
                  if (privacyError) setPrivacyError("")
                }}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
              />
            </div>
            <div className="ml-3">
              <label htmlFor="privacy" className="text-sm text-gray-700 dark:text-gray-300">
                I agree to the{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </label>
              {privacyError && <p className="mt-1 text-sm text-red-500">{privacyError}</p>}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <AuthButton type="submit" fullWidth isLoading={isLoading} disabled={isLoading}>
            Create Account
          </AuthButton>
        </div>
      </form>

      <AuthDivider />

      <div className="grid grid-cols-1 gap-3">
        <SocialAuthButton provider="google" onClick={() => handleSocialRegister("google")} isLoading={isLoading} />
        <SocialAuthButton provider="facebook" onClick={() => handleSocialRegister("facebook")} isLoading={isLoading} />
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:text-opacity-80 dark:hover:text-opacity-90 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
