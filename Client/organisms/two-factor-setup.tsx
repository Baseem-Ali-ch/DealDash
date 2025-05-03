"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, Smartphone } from "lucide-react"

interface TwoFactorSetupProps {
  isEnabled: boolean
  onToggle: (enabled: boolean) => Promise<void>
}

export function TwoFactorSetup({ isEnabled, onToggle }: TwoFactorSetupProps) {
  const [enabled, setEnabled] = useState(isEnabled)
  const [showSetup, setShowSetup] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleToggle = async (checked: boolean) => {
    if (checked && !enabled) {
      setShowSetup(true)
      return
    }

    if (!checked && enabled) {
      setIsLoading(true)
      try {
        await onToggle(false)
        setEnabled(false)
        setSuccess("Two-factor authentication disabled")
      } catch (error) {
        setError("Failed to disable two-factor authentication")
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setIsLoading(true)

    // Simulate verification
    try {
      // In a real app, this would verify the code with the server
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (verificationCode === "123456") {
        await onToggle(true)
        setEnabled(true)
        setShowSetup(false)
        setSuccess("Two-factor authentication enabled successfully")
      } else {
        setError("Invalid verification code")
      }
    } catch (error) {
      setError("Failed to verify code")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Two-Factor Authentication</CardTitle>
            <CardDescription>Add an extra layer of security to your account</CardDescription>
          </div>
          <Switch checked={enabled} onCheckedChange={handleToggle} disabled={isLoading} />
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-4 bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {!showSetup && (
          <div className="text-sm text-muted-foreground">
            {enabled ? (
              <p>
                Two-factor authentication is currently enabled. This adds an extra layer of security to your account by
                requiring a verification code from your mobile device when you sign in.
              </p>
            ) : (
              <p>
                Two-factor authentication adds an extra layer of security to your account by requiring a verification
                code from your mobile device when you sign in. Enable this feature for enhanced account protection.
              </p>
            )}
          </div>
        )}

        {showSetup && (
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-muted/50">
              <Smartphone className="h-16 w-16 mb-4 text-primary" />
              <p className="text-sm text-center mb-4">
                Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
              </p>
              <div className="bg-white p-2 rounded">
                <img
                  src="/placeholder.svg?height=150&width=150"
                  alt="QR Code for 2FA setup"
                  className="h-[150px] w-[150px]"
                />
              </div>
              <p className="text-xs mt-4 text-muted-foreground">
                Or enter this code manually: <span className="font-mono">ABCD EFGH IJKL MNOP</span>
              </p>
            </div>

            <form onSubmit={handleVerify} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="verification-code">Verification Code</Label>
                <Input
                  id="verification-code"
                  placeholder="Enter 6-digit code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  maxLength={6}
                  required
                />
                <p className="text-xs text-muted-foreground">Enter the 6-digit code from your authenticator app</p>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowSetup(false)} disabled={isLoading}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Verifying..." : "Verify & Enable"}
                </Button>
              </div>
            </form>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
