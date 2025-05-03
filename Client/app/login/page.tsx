"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useDispatch } from "react-redux"

import AuthLayout from "@/templates/auth-layout"
import AuthInput from "@/atoms/auth-input"
import AuthButton from "@/atoms/auth-button"
import AuthDivider from "@/atoms/auth-divider"
import SocialAuthButton from "@/molecules/social-auth-button"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  })
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState("")

  const router = useRouter()
  const dispatch = useDispatch()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }

    // Clear general login error when user makes any change
    if (loginError) {
      setLoginError("")
    }
  }

  const validateForm = () => {
    let valid = true
    const newErrors = { ...errors }

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
    } else {
      newErrors.password = ""
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setLoginError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate successful login
      // In a real app, you would call your auth API here
      // const response = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: formData.email, password: formData.password, rememberMe })
      // })

      // if (!response.ok) throw new Error('Login failed')
      // const data = await response.json()

      // Store token in localStorage or cookies
      localStorage.setItem("authToken", "sample-token-12345")

      // Redirect to home page
      router.push("/")
    } catch (error) {
      console.error("Login error:", error)
      setLoginError("Invalid email or password")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = async (provider: "google" | "facebook") => {
    setIsLoading(true)
    setLoginError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would integrate with the social provider here

      // Store token in localStorage or cookies
      localStorage.setItem("authToken", `sample-token-${provider}-12345`)

      // Redirect to home page
      router.push("/")
    } catch (error) {
      console.error(`${provider} login error:`, error)
      setLoginError(`${provider} login failed`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your account to continue">
      {loginError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm"
        >
          {loginError}
        </motion.div>
      )}

      <form onSubmit={handleSubmit}>
        <AuthInput
          id="email"
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
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          placeholder="Enter your password"
          required
          autoComplete="current-password"
          showPasswordToggle
        />

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:checked:bg-primary"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Remember me
            </label>
          </div>

          <Link
            href="/forgot-password"
            className="text-sm font-medium text-primary hover:text-opacity-80 dark:hover:text-opacity-90 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <AuthButton type="submit" fullWidth isLoading={isLoading} disabled={isLoading}>
          Sign in
        </AuthButton>
      </form>

      <AuthDivider />

      <div className="grid grid-cols-1 gap-3">
        <SocialAuthButton provider="google" onClick={() => handleSocialLogin("google")} isLoading={isLoading} />
        <SocialAuthButton provider="facebook" onClick={() => handleSocialLogin("facebook")} isLoading={isLoading} />
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:text-opacity-80 dark:hover:text-opacity-90 transition-colors"
          >
            Sign up now
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
