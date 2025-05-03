"use client"
import { useDispatch, useSelector } from "react-redux"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { updatePreferences } from "@/lib/store/slices/notificationsSlice"
import type { RootState } from "@/lib/store/store"
import type { NotificationCategory } from "@/lib/types/notifications"
import { notificationService } from "@/lib/services/notification-socket"

export function NotificationPreferencesForm() {
  const dispatch = useDispatch()
  const preferences = useSelector((state: RootState) => state.notifications.preferences)

  const handleGlobalToggle = (key: "email" | "browser" | "mobile" | "sound", value: boolean) => {
    dispatch(
      updatePreferences({
        ...preferences,
        [key]: value,
      }),
    )
  }

  const handleCategoryToggle = (
    category: NotificationCategory,
    key: "enabled" | "email" | "browser" | "mobile",
    value: boolean,
  ) => {
    dispatch(
      updatePreferences({
        ...preferences,
        categories: {
          ...preferences.categories,
          [category]: {
            ...preferences.categories[category],
            [key]: value,
          },
        },
      }),
    )
  }

  const requestNotificationPermission = () => {
    // Now using instance method instead of static method
    notificationService.requestNotificationPermission()
  }

  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="general">General Settings</TabsTrigger>
        <TabsTrigger value="categories">Categories</TabsTrigger>
      </TabsList>

      <TabsContent value="general" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Notification Channels</CardTitle>
            <CardDescription>Choose how you want to receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch
                id="email-notifications"
                checked={preferences.email}
                onCheckedChange={(value) => handleGlobalToggle("email", value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="browser-notifications">Browser Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications in your browser</p>
              </div>
              <div className="flex items-center gap-2">
                {Notification.permission === "default" && (
                  <Button variant="outline" size="sm" onClick={requestNotificationPermission}>
                    Enable
                  </Button>
                )}
                <Switch
                  id="browser-notifications"
                  checked={preferences.browser}
                  disabled={Notification.permission === "denied"}
                  onCheckedChange={(value) => handleGlobalToggle("browser", value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="mobile-notifications">Mobile Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications on your mobile device</p>
              </div>
              <Switch
                id="mobile-notifications"
                checked={preferences.mobile}
                onCheckedChange={(value) => handleGlobalToggle("mobile", value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sound-alerts">Sound Alerts</Label>
                <p className="text-sm text-muted-foreground">Play sound for important notifications</p>
              </div>
              <Switch
                id="sound-alerts"
                checked={preferences.sound}
                onCheckedChange={(value) => handleGlobalToggle("sound", value)}
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="categories" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Notification Categories</CardTitle>
            <CardDescription>Customize which types of notifications you receive</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <CategoryPreference
              title="Orders"
              description="Notifications about new orders, fulfillment, and cancellations"
              category="order"
              preferences={preferences}
              onToggle={handleCategoryToggle}
            />

            <CategoryPreference
              title="Inventory"
              description="Alerts about low stock, out of stock, and restocking"
              category="inventory"
              preferences={preferences}
              onToggle={handleCategoryToggle}
            />

            <CategoryPreference
              title="System"
              description="System updates, maintenance, and technical notifications"
              category="system"
              preferences={preferences}
              onToggle={handleCategoryToggle}
            />

            <CategoryPreference
              title="Security"
              description="Security alerts, login attempts, and account changes"
              category="security"
              preferences={preferences}
              onToggle={handleCategoryToggle}
            />

            <CategoryPreference
              title="Payments"
              description="Payment confirmations, failures, and refunds"
              category="payment"
              preferences={preferences}
              onToggle={handleCategoryToggle}
            />

            <CategoryPreference
              title="Customers"
              description="New customer registrations and account updates"
              category="customer"
              preferences={preferences}
              onToggle={handleCategoryToggle}
            />

            <CategoryPreference
              title="Reviews"
              description="New product reviews and ratings"
              category="review"
              preferences={preferences}
              onToggle={handleCategoryToggle}
            />
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">Critical security notifications cannot be disabled</p>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

interface CategoryPreferenceProps {
  title: string
  description: string
  category: NotificationCategory
  preferences: any
  onToggle: (category: NotificationCategory, key: "enabled" | "email" | "browser" | "mobile", value: boolean) => void
}

function CategoryPreference({ title, description, category, preferences, onToggle }: CategoryPreferenceProps) {
  const categoryPrefs = preferences.categories[category]

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Switch
          id={`${category}-enabled`}
          checked={categoryPrefs.enabled}
          onCheckedChange={(value) => onToggle(category, "enabled", value)}
        />
      </div>

      {categoryPrefs.enabled && (
        <div className="grid grid-cols-3 gap-4 pl-6 pt-2">
          <div className="flex items-center space-x-2">
            <Switch
              id={`${category}-email`}
              checked={categoryPrefs.email}
              onCheckedChange={(value) => onToggle(category, "email", value)}
            />
            <Label htmlFor={`${category}-email`}>Email</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id={`${category}-browser`}
              checked={categoryPrefs.browser}
              disabled={Notification.permission === "denied"}
              onCheckedChange={(value) => onToggle(category, "browser", value)}
            />
            <Label htmlFor={`${category}-browser`}>Browser</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id={`${category}-mobile`}
              checked={categoryPrefs.mobile}
              onCheckedChange={(value) => onToggle(category, "mobile", value)}
            />
            <Label htmlFor={`${category}-mobile`}>Mobile</Label>
          </div>
        </div>
      )}
    </div>
  )
}
