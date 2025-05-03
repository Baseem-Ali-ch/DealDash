"use client"

import type React from "react"
import { useState } from "react"
import type { User } from "@/lib/data/user-data"
import { Button } from "@/atoms/button"
import { Input } from "@/atoms/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProfileSectionProps {
  user: User
}

export const ProfileSection = ({ user }: ProfileSectionProps) => {
  const [activeTab, setActiveTab] = useState("personal")
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [isEditing, setIsEditing] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = () => {
    // Here you would typically save the data to your backend
    console.log("Saving profile data:", formData)
    setIsEditing(false)
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically save the password to your backend
    console.log("Changing password:", passwordData)
    // Reset form
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  return (
    <div className="space-y-6 pt-24">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>

        <Tabs defaultValue="personal" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="password">Change Password</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Personal Information</h2>
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveProfile}>Save Changes</Button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    First Name
                  </label>
                  {isEditing ? (
                    <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                  ) : (
                    <p className="text-gray-900 dark:text-gray-100">{formData.firstName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Last Name
                  </label>
                  {isEditing ? (
                    <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                  ) : (
                    <p className="text-gray-900 dark:text-gray-100">{formData.lastName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  {isEditing ? (
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
                  ) : (
                    <p className="text-gray-900 dark:text-gray-100">{formData.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                  ) : (
                    <p className="text-gray-900 dark:text-gray-100">{formData.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Member Since</label>
                <p className="text-gray-900 dark:text-gray-100">{user.dateJoined}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="password">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold mb-4">Change Password</h2>

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Current Password
                  </label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    New Password
                  </label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Confirm New Password
                  </label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>

                <Button type="submit">Change Password</Button>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
