"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileInformation } from "@/organisms/profile-information"
import { ChangePassword } from "@/organisms/change-password"
import { TwoFactorSetup } from "@/organisms/two-factor-setup"
import { ActivityLog } from "@/organisms/activity-log"
import { User, Lock, Shield, Clock } from "lucide-react"

// Sample admin profile data
const adminProfile = {
  id: "admin_001",
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  position: "Store Manager",
  department: "Operations",
  avatar: "/placeholder.svg?height=100&width=100",
}

export function AdminProfileTemplate() {
  // Handle profile update
  const handleProfileUpdate = async (profile: any) => {
    // In a real app, this would be an API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("Profile updated:", profile)
        resolve()
      }, 1000)
    })
  }

  // Handle password change
  const handlePasswordChange = async (currentPassword: string, newPassword: string) => {
    // In a real app, this would be an API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Simulate validation
        if (currentPassword === "password") {
          console.log("Password changed")
          resolve()
        } else {
          reject(new Error("Current password is incorrect"))
        }
      }, 1000)
    })
  }

  // Handle 2FA toggle
  const handleTwoFactorToggle = async (enabled: boolean) => {
    // In a real app, this would be an API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("2FA toggled:", enabled)
        resolve()
      }, 1000)
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and security preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="2fa" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">2FA</span>
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Activity</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <ProfileInformation profile={adminProfile} onUpdate={handleProfileUpdate} />
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <ChangePassword onChangePassword={handlePasswordChange} />
        </TabsContent>

        <TabsContent value="2fa" className="space-y-6">
          <TwoFactorSetup isEnabled={false} onToggle={handleTwoFactorToggle} />
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <ActivityLog />
        </TabsContent>
      </Tabs>
    </div>
  )
}
