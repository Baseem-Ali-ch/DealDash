"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/atoms/input"
import { Button } from "@/atoms/button"
import { Check } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email) {
      setError("Please enter your email address")
      return
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    setIsSubmitted(true)
    setEmail("")

    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false)
    }, 5000)
  }

  return (
    <section className="py-12 md:py-16 bg-primary/5 dark:bg-primary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-muted-foreground mb-6">
            Stay updated with the latest products, exclusive offers, and fashion tips.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              aria-label="Email address"
              disabled={isLoading || isSubmitted}
            />
            <Button type="submit" disabled={isLoading || isSubmitted} className="min-w-[120px]">
              {isLoading ? (
                "Subscribing..."
              ) : isSubmitted ? (
                <span className="flex items-center">
                  <Check className="mr-2 h-4 w-4" />
                  Subscribed
                </span>
              ) : (
                "Subscribe"
              )}
            </Button>
          </form>

          {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}

          {isSubmitted && (
            <p className="mt-4 text-green-600 dark:text-green-400">
              Thank you for subscribing! You'll receive our latest updates soon.
            </p>
          )}

          <p className="mt-4 text-xs text-muted-foreground">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </p>
        </div>
      </div>
    </section>
  )
}
