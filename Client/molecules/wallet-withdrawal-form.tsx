"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/atoms/button"
import { Input } from "@/atoms/input"
import { cn } from "@/lib/utils"
import { Check, X } from "lucide-react"

interface WithdrawalFormProps {
  currentBalance: number
  onClose: () => void
  onWithdraw: (amount: number, method: string, accountDetails: string) => void
}

export const WithdrawalForm = ({ currentBalance, onClose, onWithdraw }: WithdrawalFormProps) => {
  const [amount, setAmount] = useState("")
  const [method, setMethod] = useState("bank")
  const [accountDetails, setAccountDetails] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Validate amount
    const amountValue = Number.parseFloat(amount)
    if (!amount) {
      newErrors.amount = "Amount is required"
    } else if (isNaN(amountValue) || amountValue <= 0) {
      newErrors.amount = "Please enter a valid amount"
    } else if (amountValue > currentBalance) {
      newErrors.amount = "Amount exceeds your current balance"
    }

    // Validate account details
    if (!accountDetails) {
      newErrors.accountDetails = "Account details are required"
    } else if (method === "bank" && accountDetails.length < 10) {
      newErrors.accountDetails = "Please enter valid bank account details"
    } else if (method === "paypal" && !accountDetails.includes("@")) {
      newErrors.accountDetails = "Please enter a valid PayPal email"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      // Simulate API call
      setTimeout(() => {
        onWithdraw(Number.parseFloat(amount), method, accountDetails)
        setIsSubmitting(false)
        setIsSuccess(true)

        // Close the form after showing success message
        setTimeout(() => {
          onClose()
        }, 2000)
      }, 1500)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      {isSuccess ? (
        <div className="text-center py-8">
          <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
            <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-bold mb-2">Withdrawal Successful</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Your withdrawal of ${Number.parseFloat(amount).toFixed(2)} has been initiated.
          </p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Withdraw Funds</h3>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Available Balance</label>
              <div className="text-2xl font-bold text-primary">${currentBalance.toFixed(2)}</div>
            </div>

            <div className="mb-4">
              <label htmlFor="amount" className="block text-sm font-medium mb-1">
                Withdrawal Amount
              </label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={cn(errors.amount && "border-red-500")}
              />
              {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Withdrawal Method</label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant={method === "bank" ? "default" : "outline"}
                  onClick={() => setMethod("bank")}
                  className="justify-center"
                >
                  Bank Transfer
                </Button>
                <Button
                  type="button"
                  variant={method === "paypal" ? "default" : "outline"}
                  onClick={() => setMethod("paypal")}
                  className="justify-center"
                >
                  PayPal
                </Button>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="accountDetails" className="block text-sm font-medium mb-1">
                {method === "bank" ? "Bank Account Details" : "PayPal Email"}
              </label>
              <Input
                id="accountDetails"
                placeholder={method === "bank" ? "Account number" : "email@example.com"}
                value={accountDetails}
                onChange={(e) => setAccountDetails(e.target.value)}
                className={cn(errors.accountDetails && "border-red-500")}
              />
              {errors.accountDetails && <p className="text-red-500 text-xs mt-1">{errors.accountDetails}</p>}
            </div>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Withdraw Funds"}
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  )
}
