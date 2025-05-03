"use client"

import { useState } from "react"
import { Button } from "@/atoms/button"
import { Spinner } from "@/atoms/spinner"
import { Checkbox } from "@/atoms/checkbox"
import { AddressCard, type Address } from "@/molecules/address-card"
import { PaymentMethodCard, type PaymentMethod } from "@/molecules/payment-method-card"
import { CreditCardForm } from "@/molecules/credit-card-form"
import { CreditCard } from "lucide-react"
import { Label } from "@/components/ui/label"

interface CheckoutPaymentProps {
  shippingAddress: Address
  billingAddressSameAsShipping: boolean
  savedPaymentMethods?: PaymentMethod[]
  onContinue: (data: {
    paymentMethod: string
    billingAddress: Address
    billingAddressSameAsShipping: boolean
  }) => void
  onBack: () => void
}

export function CheckoutPayment({
  shippingAddress,
  billingAddressSameAsShipping: initialBillingAddressSameAsShipping,
  savedPaymentMethods = [],
  onContinue,
  onBack,
}: CheckoutPaymentProps) {
  // Payment method selection state
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>(
    savedPaymentMethods.length > 0 ? savedPaymentMethods[0].id : "credit-card",
  )

  // Billing address state
  const [billingAddressSameAsShipping, setBillingAddressSameAsShipping] = useState(initialBillingAddressSameAsShipping)

  // Terms acceptance state
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  // Loading state for continue button
  const [isSubmitting, setIsSubmitting] = useState(false)

  // PayPal icon component
  const PaypalIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.566 6.082-8.558 6.082h-2.185c-1.145 0-2.116.829-2.296 1.973l-1.12 7.11c-.068.43.158.797.587.797h4.604c.485 0 .898-.343.973-.822l.407-2.59.077-.35.845-5.383c.077-.483.485-.822.973-.822h.613c3.922 0 6.989-1.593 7.89-6.208.38-1.95.183-3.57-.162-4.5z" />
    </svg>
  )

  // Available payment methods
  const paymentMethods: PaymentMethod[] = [
    ...savedPaymentMethods,
    {
      id: "credit-card",
      name: "Credit or Debit Card",
      icon: <CreditCard className="h-6 w-6" />,
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: <PaypalIcon />,
      description: "You will be redirected to PayPal to complete your purchase",
    },
  ]

  const handleContinue = () => {
    setIsSubmitting(true)

    // Simulate API call delay
    setTimeout(() => {
      onContinue({
        paymentMethod: selectedPaymentMethod,
        billingAddress: billingAddressSameAsShipping ? shippingAddress : shippingAddress, // In a real app, you'd use the actual billing address
        billingAddressSameAsShipping,
      })
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold">Payment Method</h2>
        <p className="text-sm text-muted-foreground mt-1">Select a payment method</p>

        <div className="mt-4 space-y-4">
          {paymentMethods.map((method) => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              isSelected={selectedPaymentMethod === method.id}
              onSelect={(method) => setSelectedPaymentMethod(method.id)}
            />
          ))}
        </div>

        {selectedPaymentMethod === "credit-card" && (
          <div className="mt-6 rounded-lg border p-4">
            <CreditCardForm />
          </div>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold">Billing Address</h2>
        <p className="text-sm text-muted-foreground mt-1">Select your billing address</p>

        <div className="mt-4 space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="billing-same-as-shipping"
              checked={billingAddressSameAsShipping}
              onCheckedChange={(checked) => setBillingAddressSameAsShipping(checked as boolean)}
            />
            <div>
              <Label htmlFor="billing-same-as-shipping">Billing address is the same as shipping address</Label>
            </div>
          </div>

          {!billingAddressSameAsShipping && (
            <div className="mt-4">
              <AddressCard address={shippingAddress} isSelected selectable={false} />
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-start space-x-3">
          <Checkbox
            id="accept-terms"
            checked={acceptedTerms}
            onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
          />
          <div>
            <Label htmlFor="accept-terms">
              I accept the{" "}
              <a href="/terms" className="text-primary hover:underline">
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </Label>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
        <Button variant="outline" onClick={onBack} disabled={isSubmitting}>
          Back
        </Button>
        <Button onClick={handleContinue} disabled={!acceptedTerms || isSubmitting} className="mt-4 sm:mt-0">
          {isSubmitting ? <Spinner className="mr-2" size="sm" /> : null}
          Review Order
        </Button>
      </div>
    </div>
  )
}
