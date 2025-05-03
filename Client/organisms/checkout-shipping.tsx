"use client"

import { useState } from "react"
import { Button } from "@/atoms/button"
import { Spinner } from "@/atoms/spinner"
import { AddressCard, type Address } from "@/molecules/address-card"
import { ShippingAddressForm, type ShippingAddressFormValues } from "@/molecules/shipping-address-form"
import { ShippingMethodCard, type ShippingMethod } from "@/molecules/shipping-method-card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus } from "lucide-react"

interface CheckoutShippingProps {
  savedAddresses: Address[]
  shippingMethods: ShippingMethod[]
  onContinue: (data: {
    shippingAddress: Address
    shippingMethod: ShippingMethod
    billingAddressSameAsShipping: boolean
  }) => void
  onBack?: () => void
}

export function CheckoutShipping({ savedAddresses, shippingMethods, onContinue, onBack }: CheckoutShippingProps) {
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(
    savedAddresses.find((address) => address.isDefault) || savedAddresses[0] || null,
  )
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<ShippingMethod | null>(
    shippingMethods[0] || null,
  )
  const [billingAddressSameAsShipping, setBillingAddressSameAsShipping] = useState(true)
  const [isAddingAddress, setIsAddingAddress] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddNewAddress = (data: ShippingAddressFormValues) => {
    // In a real application, you would call an API to save the address
    const newAddress: Address = {
      id: `new-address-${Date.now()}`,
      ...data,
    }

    setSelectedAddress(newAddress)
    setIsAddingAddress(false)
  }

  const handleContinue = () => {
    if (!selectedAddress || !selectedShippingMethod) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call delay
    setTimeout(() => {
      onContinue({
        shippingAddress: selectedAddress,
        shippingMethod: selectedShippingMethod,
        billingAddressSameAsShipping,
      })
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold">Shipping Address</h2>
        <p className="text-sm text-muted-foreground mt-1">Select or add a shipping address</p>

        <div className="mt-4 space-y-4">
          {savedAddresses.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {savedAddresses.map((address) => (
                <AddressCard
                  key={address.id}
                  address={address}
                  isSelected={selectedAddress?.id === address.id}
                  onSelect={setSelectedAddress}
                />
              ))}
              <button
                onClick={() => setIsAddingAddress(true)}
                className="flex h-full min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center hover:bg-muted/50"
              >
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Plus className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-2 font-medium">Add new address</h3>
                <p className="mt-1 text-sm text-muted-foreground">Add a new shipping address</p>
              </button>
            </div>
          ) : (
            <div className="rounded-lg border p-6">
              <ShippingAddressForm onSubmit={handleAddNewAddress} />
            </div>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Shipping Method</h2>
        <p className="text-sm text-muted-foreground mt-1">Select a shipping method</p>

        <div className="mt-4 space-y-4">
          {shippingMethods.map((method) => (
            <ShippingMethodCard
              key={method.id}
              method={method}
              isSelected={selectedShippingMethod?.id === method.id}
              onSelect={setSelectedShippingMethod}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
        {onBack && (
          <Button variant="outline" onClick={onBack} disabled={isSubmitting}>
            Back
          </Button>
        )}
        <Button
          onClick={handleContinue}
          disabled={!selectedAddress || !selectedShippingMethod || isSubmitting}
          className="mt-4 sm:mt-0"
        >
          {isSubmitting ? <Spinner className="mr-2" size="sm" /> : null}
          Continue to Payment
        </Button>
      </div>

      <Dialog open={isAddingAddress} onOpenChange={setIsAddingAddress}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Add New Address</DialogTitle>
          </DialogHeader>
          <ShippingAddressForm onSubmit={handleAddNewAddress} submitText="Add Address" />
        </DialogContent>
      </Dialog>
    </div>
  )
}
