"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/organisms/header"
import { Footer } from "@/organisms/footer"
import { CheckoutProgress } from "@/molecules/checkout-progress"
import { CheckoutShipping } from "@/organisms/checkout-shipping"
import { CheckoutPayment } from "@/organisms/checkout-payment"
import { CheckoutReview } from "@/organisms/checkout-review"
import { CheckoutSuccess } from "@/organisms/checkout-success"
import { CheckoutSummary } from "@/molecules/checkout-summary"
import { useAppSelector } from "@/lib/hooks/use-redux"
import type { Address } from "@/molecules/address-card"
import type { ShippingMethod } from "@/molecules/shipping-method-card"

// Mock data
const MOCK_ADDRESSES: Address[] = [
  {
    id: "address1",
    fullName: "John Doe",
    addressLine1: "123 Main St",
    city: "New York",
    state: "NY",
    postalCode: "10001",
    country: "United States",
    phone: "+1 (555) 555-5555",
    isDefault: true,
  },
  {
    id: "address2",
    fullName: "John Doe",
    addressLine1: "456 Park Ave",
    addressLine2: "Apt 7B",
    city: "Boston",
    state: "MA",
    postalCode: "02108",
    country: "United States",
    phone: "+1 (555) 123-4567",
  },
]

const MOCK_SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: "standard",
    name: "Standard Shipping",
    description: "Delivery in 3-5 business days",
    price: 5.99,
    estimatedDelivery: "3-5 business days",
  },
  {
    id: "express",
    name: "Express Shipping",
    description: "Delivery in 1-2 business days",
    price: 14.99,
    estimatedDelivery: "1-2 business days",
  },
  {
    id: "free",
    name: "Free Shipping",
    description: "Delivery in 5-7 business days",
    price: 0,
    estimatedDelivery: "5-7 business days",
  },
]

interface CheckoutState {
  step: number
  shippingAddress: Address | null
  billingAddress: Address | null
  shippingMethod: ShippingMethod | null
  paymentMethod: string | null
  billingAddressSameAsShipping: boolean
  orderNumber: string | null
}

export function CheckoutTemplate() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { items } = useAppSelector((state) => state.cart)

  const initialStep = Number.parseInt(searchParams.get("step") || "0")

  const [state, setState] = useState<CheckoutState>({
    step: isNaN(initialStep) ? 0 : initialStep,
    shippingAddress: null,
    billingAddress: null,
    shippingMethod: null,
    paymentMethod: null,
    billingAddressSameAsShipping: true,
    orderNumber: null,
  })

  // Calculate order summary values
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = state.shippingMethod?.price || 0
  const tax = subtotal * 0.08 // 8% tax
  const discount = searchParams.get("discount") === "applied" ? subtotal * 0.1 : 0 // 10% discount
  const total = subtotal + shipping + tax - discount

  // Update URL when step changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    params.set("step", state.step.toString())
    router.push(`/checkout?${params.toString()}`, { scroll: false })
  }, [state.step, router, searchParams])

  // Steps labels
  const steps = ["Shipping", "Payment", "Review"]

  // Handle continuing to next step after shipping info is provided
  const handleShippingContinue = (data: {
    shippingAddress: Address
    shippingMethod: ShippingMethod
    billingAddressSameAsShipping: boolean
  }) => {
    setState({
      ...state,
      shippingAddress: data.shippingAddress,
      shippingMethod: data.shippingMethod,
      billingAddressSameAsShipping: data.billingAddressSameAsShipping,
      billingAddress: data.billingAddressSameAsShipping ? data.shippingAddress : state.billingAddress,
      step: 1, // Move to payment step
    })
  }

  // Handle continuing to next step after payment info is provided
  const handlePaymentContinue = (data: {
    paymentMethod: string
    billingAddress: Address
    billingAddressSameAsShipping: boolean
  }) => {
    setState({
      ...state,
      paymentMethod: data.paymentMethod,
      billingAddress: data.billingAddress,
      billingAddressSameAsShipping: data.billingAddressSameAsShipping,
      step: 2, // Move to review step
    })
  }

  // Handle placing the order
  const handlePlaceOrder = () => {
    // Generate a random order number
    const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`

    setState({
      ...state,
      orderNumber,
      step: 3, // Move to success step
    })
  }

  // Handle going back to previous step
  const handleBack = () => {
    setState({
      ...state,
      step: Math.max(0, state.step - 1),
    })
  }

  // Handle step selection from progress indicator
  const handleStepClick = (step: number) => {
    if (step < state.step) {
      setState({
        ...state,
        step,
      })
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 pt-24">
        {state.step < 3 && (
          <div className="mb-8">
            <CheckoutProgress steps={steps} currentStep={state.step} onStepClick={handleStepClick} />
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {state.step === 0 && (
              <CheckoutShipping
                savedAddresses={MOCK_ADDRESSES}
                shippingMethods={MOCK_SHIPPING_METHODS}
                onContinue={handleShippingContinue}
              />
            )}

            {state.step === 1 && state.shippingAddress && (
              <CheckoutPayment
                shippingAddress={state.shippingAddress}
                billingAddressSameAsShipping={state.billingAddressSameAsShipping}
                onContinue={handlePaymentContinue}
                onBack={handleBack}
              />
            )}

            {state.step === 2 &&
              state.shippingAddress &&
              state.billingAddress &&
              state.shippingMethod &&
              state.paymentMethod && (
                <CheckoutReview
                  items={items}
                  shippingAddress={state.shippingAddress}
                  billingAddress={state.billingAddress}
                  shippingMethod={state.shippingMethod}
                  paymentMethod={state.paymentMethod}
                  subtotal={subtotal}
                  shipping={shipping}
                  tax={tax}
                  discount={discount}
                  total={total}
                  onPlaceOrder={handlePlaceOrder}
                  onBack={handleBack}
                />
              )}

            {state.step === 3 && state.orderNumber && state.shippingAddress && (
              <CheckoutSuccess
                orderNumber={state.orderNumber}
                orderDate={new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                items={items}
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                discount={discount}
                total={total}
                estimatedDelivery={state.shippingMethod?.estimatedDelivery || "5-7 business days"}
                shippingAddress={state.shippingAddress}
              />
            )}
          </div>

          {state.step < 3 && (
            <div className="lg:sticky lg:top-24 lg:self-start">
              <CheckoutSummary
                items={items}
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                discount={discount}
                total={total}
                isMobile
              />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
