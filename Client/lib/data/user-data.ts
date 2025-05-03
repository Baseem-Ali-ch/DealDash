// Mock user data for the dashboard
export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  avatar: string
  dateJoined: string
  completedProfile: number
  stats: {
    totalOrders: number
    wishlistItems: number
    rewardsPoints: number
  }
}

export interface Order {
  id: string
  orderNumber: string
  date: string
  total: number
  status: "processing" | "shipped" | "delivered" | "cancelled"
  items: {
    id: string
    name: string
    price: number
    quantity: number
    image: string
  }[]
  tracking?: {
    carrier: string
    trackingNumber: string
    estimatedDelivery: string
    progress: number
    timeline: {
      status: string
      date: string
      completed: boolean
    }[]
  }
}

export interface Address {
  id: string
  name: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone: string
  isDefault: boolean
}

export interface PaymentMethod {
  id: string
  type: "credit" | "paypal"
  name: string
  cardNumber?: string
  expiryDate?: string
  isDefault: boolean
}

export interface WalletTransaction {
  id: string
  date: string
  amount: number
  type: "credit" | "debit"
  description: string
  status: "completed" | "pending" | "failed"
}

export interface Notification {
  id: string
  title: string
  message: string
  date: string
  read: boolean
  type: "order" | "promotion" | "account" | "payment"
}

// Mock user data
export const userData: User = {
  id: "usr_123456",
  firstName: "Alex",
  lastName: "Johnson",
  email: "alex.johnson@example.com",
  phone: "+1 (555) 123-4567",
  avatar: "/placeholder.svg?height=200&width=200",
  dateJoined: "2023-01-15",
  completedProfile: 75,
  stats: {
    totalOrders: 12,
    wishlistItems: 8,
    rewardsPoints: 2450,
  },
}

// Mock orders data
export const ordersData: Order[] = [
  {
    id: "ord_1",
    orderNumber: "ORD-2023-0001",
    date: "2023-04-15",
    total: 129.99,
    status: "delivered",
    items: [
      {
        id: "item_1",
        name: "Premium Wireless Headphones",
        price: 79.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "item_2",
        name: "Smartphone Fast Charger",
        price: 24.99,
        quantity: 2,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    tracking: {
      carrier: "FedEx",
      trackingNumber: "FX123456789",
      estimatedDelivery: "2023-04-20",
      progress: 100,
      timeline: [
        {
          status: "Order Placed",
          date: "2023-04-15",
          completed: true,
        },
        {
          status: "Processing",
          date: "2023-04-16",
          completed: true,
        },
        {
          status: "Shipped",
          date: "2023-04-17",
          completed: true,
        },
        {
          status: "Out for Delivery",
          date: "2023-04-19",
          completed: true,
        },
        {
          status: "Delivered",
          date: "2023-04-20",
          completed: true,
        },
      ],
    },
  },
  {
    id: "ord_2",
    orderNumber: "ORD-2023-0002",
    date: "2023-05-02",
    total: 349.95,
    status: "shipped",
    items: [
      {
        id: "item_3",
        name: "Smart Watch Series 5",
        price: 349.95,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    tracking: {
      carrier: "UPS",
      trackingNumber: "UPS987654321",
      estimatedDelivery: "2023-05-08",
      progress: 60,
      timeline: [
        {
          status: "Order Placed",
          date: "2023-05-02",
          completed: true,
        },
        {
          status: "Processing",
          date: "2023-05-03",
          completed: true,
        },
        {
          status: "Shipped",
          date: "2023-05-05",
          completed: true,
        },
        {
          status: "Out for Delivery",
          date: "2023-05-08",
          completed: false,
        },
        {
          status: "Delivered",
          date: "",
          completed: false,
        },
      ],
    },
  },
  {
    id: "ord_3",
    orderNumber: "ORD-2023-0003",
    date: "2023-05-10",
    total: 59.97,
    status: "processing",
    items: [
      {
        id: "item_4",
        name: "Wireless Mouse",
        price: 29.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "item_5",
        name: "USB-C Cable (3-pack)",
        price: 14.99,
        quantity: 2,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    tracking: {
      carrier: "USPS",
      trackingNumber: "USPS123456789",
      estimatedDelivery: "2023-05-15",
      progress: 20,
      timeline: [
        {
          status: "Order Placed",
          date: "2023-05-10",
          completed: true,
        },
        {
          status: "Processing",
          date: "2023-05-11",
          completed: true,
        },
        {
          status: "Shipped",
          date: "",
          completed: false,
        },
        {
          status: "Out for Delivery",
          date: "",
          completed: false,
        },
        {
          status: "Delivered",
          date: "",
          completed: false,
        },
      ],
    },
  },
]

// Mock addresses data
export const addressesData: Address[] = [
  {
    id: "addr_1",
    name: "Home",
    addressLine1: "123 Main Street",
    addressLine2: "Apt 4B",
    city: "New York",
    state: "NY",
    postalCode: "10001",
    country: "United States",
    phone: "+1 (555) 123-4567",
    isDefault: true,
  },
  {
    id: "addr_2",
    name: "Work",
    addressLine1: "456 Business Ave",
    city: "New York",
    state: "NY",
    postalCode: "10002",
    country: "United States",
    phone: "+1 (555) 987-6543",
    isDefault: false,
  },
]

// Mock payment methods data
export const paymentMethodsData: PaymentMethod[] = [
  {
    id: "pm_1",
    type: "credit",
    name: "Visa ending in 4242",
    cardNumber: "•••• •••• •••• 4242",
    expiryDate: "05/25",
    isDefault: true,
  },
  {
    id: "pm_2",
    type: "paypal",
    name: "PayPal - alex.johnson@example.com",
    isDefault: false,
  },
]

// Mock wallet transactions data
export const walletTransactionsData: WalletTransaction[] = [
  {
    id: "wt_1",
    date: "2023-05-01",
    amount: 50.0,
    type: "credit",
    description: "Refund for Order #ORD-2023-0001",
    status: "completed",
  },
  {
    id: "wt_2",
    date: "2023-04-15",
    amount: 25.0,
    type: "credit",
    description: "Rewards Points Redemption",
    status: "completed",
  },
  {
    id: "wt_3",
    date: "2023-04-10",
    amount: 15.0,
    type: "debit",
    description: "Purchase - Express Shipping",
    status: "completed",
  },
  {
    id: "wt_4",
    date: "2023-03-22",
    amount: 100.0,
    type: "credit",
    description: "Gift Card Redemption",
    status: "completed",
  },
  {
    id: "wt_5",
    date: "2023-03-15",
    amount: 30.0,
    type: "debit",
    description: "Purchase - Digital Download",
    status: "completed",
  },
]

// Mock notifications data
export const notificationsData: Notification[] = [
  {
    id: "notif_1",
    title: "Order Shipped",
    message: "Your order #ORD-2023-0002 has been shipped and is on its way!",
    date: "2023-05-05",
    read: false,
    type: "order",
  },
  {
    id: "notif_2",
    title: "Flash Sale",
    message: "Don't miss our 24-hour flash sale! 30% off all electronics.",
    date: "2023-05-03",
    read: false,
    type: "promotion",
  },
  {
    id: "notif_3",
    title: "Password Changed",
    message: "Your account password was recently changed. If this wasn't you, please contact support.",
    date: "2023-04-28",
    read: true,
    type: "account",
  },
  {
    id: "notif_4",
    title: "Payment Method Expiring",
    message: "Your credit card ending in 4242 will expire next month. Please update your payment information.",
    date: "2023-04-20",
    read: true,
    type: "payment",
  },
  {
    id: "notif_5",
    title: "Order Delivered",
    message: "Your order #ORD-2023-0001 has been delivered. Enjoy your purchase!",
    date: "2023-04-20",
    read: true,
    type: "order",
  },
]
