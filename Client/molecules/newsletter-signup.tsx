"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/atoms/button"
import { Input } from "@/atoms/input"
import { Spinner } from "@/atoms/spinner"
import { Check } from "lucide-react"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setEmail("")
  }

  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center rounded-md bg-green-50 p-4 dark:bg-green-900/20">
        <Check className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
        <p className="text-green-800 dark:text-green-300">Thank you for subscribing to our newsletter!</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3 sm:flex-row">
      <div className="flex-1">
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full"
          aria-label="Email address"
        />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Spinner className="mr-2" size="sm" />
            Subscribing...
          </>
        ) : (
          "Subscribe"
        )}
      </Button>
    </form>
  )
}
