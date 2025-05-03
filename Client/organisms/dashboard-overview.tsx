"use client";
import type { User, Order } from "@/lib/data/user-data";
import { StatCard } from "@/atoms/stat-card";
import { ProgressBar } from "@/atoms/progress-bar";
import { ActivityItem } from "@/molecules/activity-item";
import { OrderItem } from "@/molecules/order-item";
import { Button } from "@/atoms/button";
import {
  CreditCard,
  Heart,
  Package,
  ShoppingBag,
  Star,
  Truck,
  UserIcon,
} from "lucide-react";

interface DashboardOverviewProps {
  user: User;
  recentOrders: Order[];
}

export const DashboardOverview = ({
  user,
  recentOrders,
}: DashboardOverviewProps) => {
  return (
    <div className="space-y-6 pt-24">
      {/* Welcome Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">
              Welcome back, {user.firstName}!
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Here's what's happening with your account today.
            </p>
          </div>
          <Button>
            <ShoppingBag className="h-4 w-4 mr-2" />
            Continue Shopping
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Orders"
          value={user.stats.totalOrders}
          icon={<Package className="h-5 w-5 text-primary" />}
          change={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Wishlist Items"
          value={user.stats.wishlistItems}
          icon={<Heart className="h-5 w-5 text-red-500" />}
        />
        <StatCard
          title="Rewards Points"
          value={user.stats.rewardsPoints}
          icon={<Star className="h-5 w-5 text-yellow-500" />}
          change={{ value: 5, isPositive: true }}
        />
      </div>

      {/* Profile Completion */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg font-semibold">Complete Your Profile</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Complete your profile to unlock all features and personalized
              recommendations.
            </p>
          </div>
          <span className="text-2xl font-bold">{user.completedProfile}%</span>
        </div>
        <ProgressBar progress={user.completedProfile} size="lg" showLabel />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <Button variant="outline" className="justify-start">
            <UserIcon className="h-4 w-4 mr-2" />
            Update Profile
          </Button>
          <Button variant="outline" className="justify-start">
            <CreditCard className="h-4 w-4 mr-2" />
            Add Payment
          </Button>
          <Button variant="outline" className="justify-start">
            <Star className="h-4 w-4 mr-2" />
            Write a Review
          </Button>
          <Button variant="outline" className="justify-start">
            <Heart className="h-4 w-4 mr-2" />
            Create Wishlist
          </Button>
        </div>
      </div>

      {/* Recent Orders and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <Button variant="link" className="text-sm p-0 h-auto">
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <OrderItem key={order.id} order={order} />
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-6">
                You haven't placed any orders yet.
              </p>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>

          <div className="space-y-2">
            <ActivityItem
              title="Order Shipped"
              description="Your order #ORD-2023-0002 has been shipped"
              time="2 days ago"
              icon={<Truck className="h-4 w-4" />}
              iconColor="bg-blue-500"
            />
            <ActivityItem
              title="Reward Points Added"
              description="You earned 250 points from your last purchase"
              time="5 days ago"
              icon={<Star className="h-4 w-4" />}
              iconColor="bg-yellow-500"
            />
            <ActivityItem
              title="Profile Updated"
              description="You updated your profile information"
              time="1 week ago"
              icon={<UserIcon className="h-4 w-4" />}
              iconColor="bg-green-500"
            />
            <ActivityItem
              title="Order Delivered"
              description="Your order #ORD-2023-0001 has been delivered"
              time="2 weeks ago"
              icon={<Package className="h-4 w-4" />}
              iconColor="bg-purple-500"
              isLast
            />
          </div>
        </div>
      </div>
    </div>
  );
};
