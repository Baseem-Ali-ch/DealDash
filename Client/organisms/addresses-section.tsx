"use client"

import type React from "react"
import { useState } from "react"
import type { Address } from "@/lib/data/user-data"
import { AddressItem } from "@/molecules/address-item"
import { Button } from "@/atoms/button"
import { Input } from "@/atoms/input"
import { Checkbox } from "@/atoms/checkbox"
import { Plus, X } from "lucide-react"

interface AddressesSectionProps {
  addresses: Address[]
}

export const AddressesSection = ({ addresses: initialAddresses }: AddressesSectionProps) => {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses)
  const [isAddingAddress, setIsAddingAddress] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)

  const [formData, setFormData] = useState<Omit<Address, "id">>({
    name: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
    isDefault: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleAddAddress = () => {
    setIsAddingAddress(true)
    setEditingAddress(null)
    setFormData({
      name: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      phone: "",
      isDefault: false,
    })
  }

  const handleEditAddress = (address: Address) => {
    setIsAddingAddress(true)
    setEditingAddress(address)
    setFormData({
      name: address.name,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2 || "",
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country,
      phone: address.phone,
      isDefault: address.isDefault,
    })
  }

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter((address) => address.id !== id))
  }

  const handleSetDefaultAddress = (id: string) => {
    setAddresses(
      addresses.map((address) => ({
        ...address,
        isDefault: address.id === id,
      })),
    )
  }

  const handleSaveAddress = () => {
    if (editingAddress) {
      // Update existing address
      setAddresses(
        addresses.map((address) =>
          address.id === editingAddress.id
            ? { ...formData, id: editingAddress.id }
            : formData.isDefault
              ? { ...address, isDefault: false }
              : address,
        ),
      )
    } else {
      // Add new address
      const newAddress: Address = {
        ...formData,
        id: `addr_${Date.now()}`,
      }

      if (newAddress.isDefault) {
        // If the new address is default, update all other addresses
        setAddresses(
          addresses
            .map((address) => ({
              ...address,
              isDefault: false,
            }))
            .concat(newAddress),
        )
      } else {
        setAddresses([...addresses, newAddress])
      }
    }

    setIsAddingAddress(false)
    setEditingAddress(null)
  }

  return (
    <div className="space-y-6 pt-24">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Addresses</h1>
          <Button onClick={handleAddAddress}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Address
          </Button>
        </div>

        {isAddingAddress ? (
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{editingAddress ? "Edit Address" : "Add New Address"}</h2>
              <button
                onClick={() => setIsAddingAddress(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Address Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Home, Work, etc."
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="addressLine1"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Address Line 1
                </label>
                <Input
                  id="addressLine1"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  placeholder="Street address"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="addressLine2"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Address Line 2 (Optional)
                </label>
                <Input
                  id="addressLine2"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleInputChange}
                  placeholder="Apartment, suite, unit, etc."
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  City
                </label>
                <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  State / Province
                </label>
                <Input id="state" name="state" value={formData.state} onChange={handleInputChange} required />
              </div>

              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Postal Code
                </label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Country
                </label>
                <Input id="country" name="country" value={formData.country} onChange={handleInputChange} required />
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center">
                  <Checkbox
                    id="isDefault"
                    name="isDefault"
                    checked={formData.isDefault}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isDefault: checked === true }))}
                  />
                  <label htmlFor="isDefault" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Set as default address
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4 gap-2">
              <Button variant="outline" onClick={() => setIsAddingAddress(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveAddress}>{editingAddress ? "Update Address" : "Save Address"}</Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.length > 0 ? (
              addresses.map((address) => (
                <AddressItem
                  key={address.id}
                  address={address}
                  onEdit={handleEditAddress}
                  onDelete={handleDeleteAddress}
                  onSetDefault={handleSetDefaultAddress}
                />
              ))
            ) : (
              <div className="md:col-span-2 text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">You haven't added any addresses yet.</p>
                <Button onClick={handleAddAddress} className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Address
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
