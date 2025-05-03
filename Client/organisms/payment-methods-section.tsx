"use client"

import type React from "react"
import { useState } from "react"
import type { PaymentMethod } from "@/lib/data/user-data"
import { PaymentMethodItem } from "@/molecules/payment-method-item"
import { Button } from "@/atoms/button"
import { Input } from "@/atoms/input"
import { Checkbox } from "@/atoms/checkbox"
import { CreditCard, Plus, X } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface PaymentMethodsSectionProps {
  paymentMethods: PaymentMethod[]
}

export const PaymentMethodsSection = ({ paymentMethods: initialPaymentMethods }: PaymentMethodsSectionProps) => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(initialPaymentMethods)
  const [isAddingPayment, setIsAddingPayment] = useState(false)
  const [editingPayment, setEditingPayment] = useState<PaymentMethod | null>(null)
  const [paymentType, setPaymentType] = useState<"credit" | "paypal">("credit")

  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    email: "",
    isDefault: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleAddPayment = () => {
    setIsAddingPayment(true)
    setEditingPayment(null)
    setPaymentType("credit")
    setFormData({
      name: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      email: "",
      isDefault: false,
    })
  }

  const handleEditPayment = (paymentMethod: PaymentMethod) => {
    setIsAddingPayment(true)
    setEditingPayment(paymentMethod)
    setPaymentType(paymentMethod.type)

    if (paymentMethod.type === "credit") {
      setFormData({
        name: paymentMethod.name,
        cardNumber: paymentMethod.cardNumber?.replace(/[•\s]/g, "") || "",
        expiryDate: paymentMethod.expiryDate || "",
        cvv: "",
        email: "",
        isDefault: paymentMethod.isDefault,
      })
    } else {
      setFormData({
        name: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        email: paymentMethod.name.split(" - ")[1],
        isDefault: paymentMethod.isDefault,
      })
    }
  }

  const handleDeletePayment = (id: string) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id))
  }

  const handleSetDefaultPayment = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    )
  }

  const handleSavePayment = () => {
    let newPaymentMethod: PaymentMethod

    if (paymentType === "credit") {
      // Format card number for display
      const last4 = formData.cardNumber.slice(-4)
      const displayCardNumber = `•••• •••• •••• ${last4}`

      newPaymentMethod = {
        id: editingPayment ? editingPayment.id : `pm_${Date.now()}`,
        type: "credit",
        name: formData.name || `Card ending in ${last4}`,
        cardNumber: displayCardNumber,
        expiryDate: formData.expiryDate,
        isDefault: formData.isDefault,
      }
    } else {
      newPaymentMethod = {
        id: editingPayment ? editingPayment.id : `pm_${Date.now()}`,
        type: "paypal",
        name: `PayPal - ${formData.email}`,
        isDefault: formData.isDefault,
      }
    }

    if (editingPayment) {
      // Update existing payment method
      setPaymentMethods(
        paymentMethods.map((method) =>
          method.id === editingPayment.id
            ? newPaymentMethod
            : newPaymentMethod.isDefault
              ? { ...method, isDefault: false }
              : method,
        ),
      )
    } else {
      // Add new payment method
      if (newPaymentMethod.isDefault) {
        // If the new method is default, update all other methods
        setPaymentMethods(
          paymentMethods
            .map((method) => ({
              ...method,
              isDefault: false,
            }))
            .concat(newPaymentMethod),
        )
      } else {
        setPaymentMethods([...paymentMethods, newPaymentMethod])
      }
    }

    setIsAddingPayment(false)
    setEditingPayment(null)
  }

  return (
    <div className="space-y-6 pt-24">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Payment Methods</h1>
          <Button onClick={handleAddPayment}>
            <Plus className="h-4 w-4 mr-2" />
            Add Payment Method
          </Button>
        </div>

        {isAddingPayment ? (
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{editingPayment ? "Edit Payment Method" : "Add Payment Method"}</h2>
              <button
                onClick={() => setIsAddingPayment(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-4">
              <RadioGroup
                value={paymentType}
                onValueChange={(value) => setPaymentType(value as "credit" | "paypal")}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="credit" id="credit" />
                  <Label htmlFor="credit" className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Credit Card
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal">PayPal</Label>
                </div>
              </RadioGroup>
            </div>

            {paymentType === "credit" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name on Card
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="cardNumber"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Card Number
                  </label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="expiryDate"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Expiry Date
                  </label>
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    CVV
                  </label>
                  <Input
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    required
                  />
                </div>
              </div>
            ) : (
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  PayPal Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            )}

            <div className="mt-4">
              <div className="flex items-center">
                <Checkbox
                  id="isDefault"
                  name="isDefault"
                  checked={formData.isDefault}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isDefault: checked === true }))}
                />
                <label htmlFor="isDefault" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Set as default payment method
                </label>
              </div>
            </div>

            <div className="flex justify-end mt-4 gap-2">
              <Button variant="outline" onClick={() => setIsAddingPayment(false)}>
                Cancel
              </Button>
              <Button onClick={handleSavePayment}>
                {editingPayment ? "Update Payment Method" : "Save Payment Method"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paymentMethods.length > 0 ? (
              paymentMethods.map((method) => (
                <PaymentMethodItem
                  key={method.id}
                  paymentMethod={method}
                  onEdit={handleEditPayment}
                  onDelete={handleDeletePayment}
                  onSetDefault={handleSetDefaultPayment}
                />
              ))
            ) : (
              <div className="md:col-span-2 text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">You haven't added any payment methods yet.</p>
                <Button onClick={handleAddPayment} className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Payment Method
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
