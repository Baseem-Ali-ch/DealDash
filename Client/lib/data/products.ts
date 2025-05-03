export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  brand: string
  rating: number
  reviewCount: number
  inStock: boolean
  sku: string
  tags: string[]
  features: string[]
  specifications: Record<string, string>
  variants: {
    colors?: Array<{
      name: string
      value: string
    }>
    sizes?: string[]
  }
  relatedProducts: string[]
  createdAt: string
}

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    slug: "premium-wireless-headphones",
    description:
      "Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design for extended listening sessions.",
    price: 249.99,
    originalPrice: 299.99,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Electronics",
    brand: "SoundMaster",
    rating: 4.8,
    reviewCount: 245,
    inStock: true,
    sku: "SM-WH-100",
    tags: ["headphones", "wireless", "audio", "noise-cancellation"],
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Bluetooth 5.0",
      "Built-in microphone",
      "Touch controls",
    ],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      Impedance: "32 Ohm",
      "Battery Life": "30 hours",
      "Charging Time": "2 hours",
      Weight: "250g",
      Connectivity: "Bluetooth 5.0, 3.5mm jack",
    },
    variants: {
      colors: [
        { name: "Black", value: "#000000" },
        { name: "White", value: "#FFFFFF" },
        { name: "Blue", value: "#0000FF" },
      ],
    },
    relatedProducts: ["2", "5", "8"],
    createdAt: "2023-01-15T00:00:00Z",
  },
  {
    id: "2",
    name: "Ultra-Slim Laptop",
    slug: "ultra-slim-laptop",
    description:
      "Powerful and portable, our Ultra-Slim Laptop is perfect for professionals on the go. Featuring a stunning 4K display, all-day battery life, and the latest processor for smooth multitasking.",
    price: 1299.99,
    originalPrice: 1499.99,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Electronics",
    brand: "TechPro",
    rating: 4.7,
    reviewCount: 189,
    inStock: true,
    sku: "TP-LT-200",
    tags: ["laptop", "ultrabook", "portable", "4K display"],
    features: [
      "13.3-inch 4K Display",
      "Latest Gen Processor",
      "16GB RAM",
      "512GB SSD",
      "Backlit Keyboard",
      "Fingerprint Reader",
    ],
    specifications: {
      Processor: "Intel Core i7-1165G7",
      RAM: "16GB DDR4",
      Storage: "512GB NVMe SSD",
      Display: "13.3-inch 4K (3840 x 2160)",
      Graphics: "Intel Iris Xe Graphics",
      "Battery Life": "Up to 12 hours",
      Weight: "1.2kg",
      "Operating System": "Windows 11 Pro",
    },
    variants: {
      colors: [
        { name: "Silver", value: "#C0C0C0" },
        { name: "Space Gray", value: "#808080" },
      ],
    },
    relatedProducts: ["1", "3", "7"],
    createdAt: "2023-02-10T00:00:00Z",
  },
  {
    id: "3",
    name: "Smart Fitness Watch",
    slug: "smart-fitness-watch",
    description:
      "Track your fitness goals with our advanced Smart Fitness Watch. Monitor heart rate, sleep patterns, and various workout metrics. Water-resistant and with a battery that lasts for days.",
    price: 179.99,
    originalPrice: 199.99,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Wearables",
    brand: "FitTech",
    rating: 4.6,
    reviewCount: 312,
    inStock: true,
    sku: "FT-SW-300",
    tags: ["fitness", "smartwatch", "health", "wearable"],
    features: [
      "Heart Rate Monitoring",
      "Sleep Tracking",
      "GPS",
      "Water Resistant (50m)",
      "7-day Battery Life",
      "Customizable Watch Faces",
    ],
    specifications: {
      Display: "1.4-inch AMOLED",
      Resolution: "454 x 454 pixels",
      Sensors: "Heart rate, Accelerometer, Gyroscope, GPS",
      "Water Resistance": "5 ATM (50m)",
      "Battery Life": "Up to 7 days",
      Connectivity: "Bluetooth 5.0, Wi-Fi",
      Compatibility: "iOS 12.0+, Android 7.0+",
    },
    variants: {
      colors: [
        { name: "Black", value: "#000000" },
        { name: "Silver", value: "#C0C0C0" },
        { name: "Rose Gold", value: "#B76E79" },
      ],
      sizes: ["Small", "Regular"],
    },
    relatedProducts: ["6", "9", "12"],
    createdAt: "2023-03-05T00:00:00Z",
  },
  {
    id: "4",
    name: "Professional DSLR Camera",
    slug: "professional-dslr-camera",
    description:
      "Capture stunning photos and videos with our Professional DSLR Camera. Featuring a high-resolution sensor, 4K video recording, and advanced autofocus system for professional-quality results.",
    price: 1499.99,
    originalPrice: 1699.99,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Photography",
    brand: "OptiMax",
    rating: 4.9,
    reviewCount: 156,
    inStock: true,
    sku: "OM-DC-400",
    tags: ["camera", "dslr", "photography", "4K video"],
    features: [
      "24.2MP Full-Frame Sensor",
      "4K Video Recording",
      "Advanced Autofocus System",
      "5-Axis Image Stabilization",
      "Weather-Sealed Body",
      "Dual SD Card Slots",
    ],
    specifications: {
      Sensor: "24.2MP Full-Frame CMOS",
      Processor: "EXPEED 6",
      Autofocus: "153-point Phase-Detection AF",
      "ISO Range": "100-51,200 (expandable to 204,800)",
      "Shutter Speed": "1/8000 to 30 sec",
      Video: "4K UHD at 60fps",
      "Battery Life": "Approx. 1,840 shots",
      Weight: "765g (body only)",
    },
    variants: {
      colors: [{ name: "Black", value: "#000000" }],
    },
    relatedProducts: ["8", "11", "15"],
    createdAt: "2023-01-25T00:00:00Z",
  },
  {
    id: "5",
    name: "Wireless Earbuds",
    slug: "wireless-earbuds",
    description:
      "Enjoy immersive sound with our Wireless Earbuds. Featuring active noise cancellation, water resistance, and a compact charging case for all-day listening on the go.",
    price: 129.99,
    originalPrice: 149.99,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Electronics",
    brand: "SoundMaster",
    rating: 4.5,
    reviewCount: 278,
    inStock: true,
    sku: "SM-WE-500",
    tags: ["earbuds", "wireless", "audio", "noise-cancellation"],
    features: [
      "Active Noise Cancellation",
      "Water Resistant (IPX4)",
      "8-hour Battery Life (28 hours with case)",
      "Touch Controls",
      "Voice Assistant Support",
    ],
    specifications: {
      "Driver Size": "10mm",
      "Frequency Response": "20Hz - 20kHz",
      "Battery Life": "8 hours (earbuds), 20 hours (case)",
      "Charging Time": "1.5 hours",
      Connectivity: "Bluetooth 5.2",
      "Water Resistance": "IPX4",
      Weight: "5.4g (per earbud)",
    },
    variants: {
      colors: [
        { name: "Black", value: "#000000" },
        { name: "White", value: "#FFFFFF" },
        { name: "Navy Blue", value: "#000080" },
      ],
    },
    relatedProducts: ["1", "9", "14"],
    createdAt: "2023-04-12T00:00:00Z",
  },
  {
    id: "6",
    name: "Smart Home Speaker",
    slug: "smart-home-speaker",
    description:
      "Transform your home with our Smart Home Speaker. Control your smart devices, play music, get answers to questions, and more with just your voice. Features premium sound quality and elegant design.",
    price: 199.99,
    originalPrice: 229.99,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Smart Home",
    brand: "HomeTech",
    rating: 4.7,
    reviewCount: 203,
    inStock: true,
    sku: "HT-HS-600",
    tags: ["speaker", "smart home", "voice assistant", "audio"],
    features: [
      "Voice Assistant Integration",
      "Multi-room Audio Support",
      "Premium Sound Quality",
      "Smart Home Device Control",
      "Bluetooth and Wi-Fi Connectivity",
    ],
    specifications: {
      Speaker: "3-inch woofer, dual 0.8-inch tweeters",
      Audio: "360° omnidirectional sound",
      Microphones: "6-mic array for far-field voice recognition",
      Connectivity: "Dual-band Wi-Fi, Bluetooth 5.0",
      Power: "24V DC power supply",
      Dimensions: '5.8" x 5.8" x 6.9"',
      Weight: "1.8kg",
    },
    variants: {
      colors: [
        { name: "Charcoal", value: "#36454F" },
        { name: "Sandstone", value: "#F5DEB3" },
        { name: "Heather Gray", value: "#B6B6B4" },
      ],
    },
    relatedProducts: ["3", "10", "13"],
    createdAt: "2023-02-28T00:00:00Z",
  },
  {
    id: "7",
    name: "4K Smart TV",
    slug: "4k-smart-tv",
    description:
      "Experience stunning visuals with our 4K Smart TV. Featuring HDR technology, a sleek design, and smart functionality for streaming your favorite content from popular apps.",
    price: 799.99,
    originalPrice: 899.99,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Electronics",
    brand: "VisionPlus",
    rating: 4.6,
    reviewCount: 167,
    inStock: true,
    sku: "VP-TV-700",
    tags: ["tv", "4k", "smart tv", "hdr"],
    features: [
      "4K Ultra HD Resolution",
      "HDR Technology",
      "Smart TV Functionality",
      "Voice Control",
      "Multiple HDMI and USB Ports",
      "Built-in Wi-Fi",
    ],
    specifications: {
      "Screen Size": "55 inches",
      Resolution: "3840 x 2160 (4K UHD)",
      HDR: "HDR10, Dolby Vision",
      "Refresh Rate": "120Hz",
      "Smart Platform": "WebOS",
      Connectivity: "Wi-Fi, Bluetooth, 4 HDMI, 3 USB",
      Audio: "20W (2.0 Channel)",
      "VESA Mount": "300 x 300mm",
    },
    variants: {
      sizes: ['43"', '50"', '55"', '65"', '75"'],
    },
    relatedProducts: ["2", "6", "11"],
    createdAt: "2023-03-20T00:00:00Z",
  },
  {
    id: "8",
    name: "Portable Bluetooth Speaker",
    slug: "portable-bluetooth-speaker",
    description:
      "Take your music anywhere with our Portable Bluetooth Speaker. Featuring powerful sound, waterproof design, and long battery life for outdoor adventures or indoor gatherings.",
    price: 89.99,
    originalPrice: 109.99,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Electronics",
    brand: "SoundMaster",
    rating: 4.4,
    reviewCount: 321,
    inStock: true,
    sku: "SM-BS-800",
    tags: ["speaker", "bluetooth", "portable", "waterproof"],
    features: [
      "Powerful 360° Sound",
      "Waterproof (IPX7)",
      "20-hour Battery Life",
      "Built-in Microphone",
      "Bluetooth 5.1",
      "Compact Design",
    ],
    specifications: {
      Speaker: "Dual 40mm drivers",
      "Frequency Response": "80Hz - 20kHz",
      "Battery Life": "Up to 20 hours",
      "Charging Time": "3 hours",
      "Water Resistance": "IPX7 (waterproof)",
      Connectivity: "Bluetooth 5.1",
      Dimensions: '7.2" x 3.0" x 3.0"',
      Weight: "540g",
    },
    variants: {
      colors: [
        { name: "Black", value: "#000000" },
        { name: "Blue", value: "#0000FF" },
        { name: "Red", value: "#FF0000" },
        { name: "Green", value: "#008000" },
      ],
    },
    relatedProducts: ["1", "5", "14"],
    createdAt: "2023-05-05T00:00:00Z",
  },
  {
    id: "9",
    name: "Smartwatch with GPS",
    slug: "smartwatch-with-gps",
    description:
      "Stay connected and track your fitness with our Smartwatch with GPS. Featuring heart rate monitoring, built-in GPS, and a variety of health tracking features in a stylish design.",
    price: 249.99,
    originalPrice: 279.99,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Wearables",
    brand: "FitTech",
    rating: 4.7,
    reviewCount: 198,
    inStock: true,
    sku: "FT-SW-900",
    tags: ["smartwatch", "gps", "fitness", "health"],
    features: [
      "Built-in GPS",
      "Heart Rate Monitoring",
      "Sleep Tracking",
      "Water Resistant (50m)",
      "14-day Battery Life",
      "Customizable Watch Faces",
    ],
    specifications: {
      Display: "1.3-inch AMOLED",
      Resolution: "416 x 416 pixels",
      Sensors: "Heart rate, GPS, Accelerometer, Gyroscope, Barometer",
      "Water Resistance": "5 ATM (50m)",
      "Battery Life": "Up to 14 days (normal use), 20 hours (GPS mode)",
      Connectivity: "Bluetooth 5.0, Wi-Fi",
      Compatibility: "iOS 12.0+, Android 7.0+",
    },
    variants: {
      colors: [
        { name: "Black", value: "#000000" },
        { name: "Silver", value: "#C0C0C0" },
        { name: "Gold", value: "#FFD700" },
      ],
      sizes: ["42mm", "46mm"],
    },
    relatedProducts: ["3", "5", "12"],
    createdAt: "2023-04-02T00:00:00Z",
  },
  {
    id: "10",
    name: "Gaming Console",
    slug: "gaming-console",
    description:
      "Experience next-generation gaming with our Gaming Console. Featuring powerful hardware, stunning graphics, and a vast library of games for endless entertainment.",
    price: 499.99,
    originalPrice: 549.99,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Gaming",
    brand: "GameTech",
    rating: 4.9,
    reviewCount: 256,
    inStock: false,
    sku: "GT-GC-1000",
    tags: ["gaming", "console", "entertainment"],
    features: [
      "4K Gaming",
      "High-Performance CPU and GPU",
      "1TB SSD Storage",
      "Ray Tracing Support",
      "Backward Compatibility",
      "Online Multiplayer",
    ],
    specifications: {
      CPU: "Custom 8-core Zen 2",
      GPU: "Custom RDNA 2, 10.28 TFLOPS",
      Memory: "16GB GDDR6",
      Storage: "1TB Custom SSD",
      Resolution: "Up to 4K at 120fps",
      Audio: "3D Audio Technology",
      Connectivity: "Wi-Fi 6, Bluetooth 5.1, 3 USB ports, HDMI 2.1",
      "Power Consumption": "350W",
    },
    variants: {
      colors: [
        { name: "Black", value: "#000000" },
        { name: "White", value: "#FFFFFF" },
      ],
    },
    relatedProducts: ["2", "7", "15"],
    createdAt: "2023-01-10T00:00:00Z",
  },
  {
    id: "11",
    name: "Wireless Gaming Mouse",
    slug: "wireless-gaming-mouse",
    description:
      "Gain a competitive edge with our Wireless Gaming Mouse. Featuring high-precision tracking, customizable buttons, and ergonomic design for comfortable gaming sessions.",
    price: 79.99,
    originalPrice: 99.99,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Gaming",
    brand: "GameTech",
    rating: 4.6,
    reviewCount: 187,
    inStock: true,
    sku: "GT-GM-1100",
    tags: ["gaming", "mouse", "wireless", "peripherals"],
    features: [
      "25,000 DPI Optical Sensor",
      "Wireless with 70-hour Battery Life",
      "8 Programmable Buttons",
      "RGB Lighting",
      "Ergonomic Design",
      "On-board Memory Profiles",
    ],
    specifications: {
      Sensor: "25,000 DPI optical sensor",
      Buttons: "8 programmable buttons",
      Connection: "Wireless (2.4GHz), Bluetooth, USB-C",
      "Battery Life": "Up to 70 hours",
      Weight: "85g",
      "Polling Rate": "1000Hz",
      RGB: "16.8 million colors",
      Compatibility: "Windows, macOS, Linux",
    },
    variants: {
      colors: [
        { name: "Black", value: "#000000" },
        { name: "White", value: "#FFFFFF" },
      ],
    },
    relatedProducts: ["10", "15", "16"],
    createdAt: "2023-03-15T00:00:00Z",
  },
  {
    id: "12",
    name: "Fitness Tracker Band",
    slug: "fitness-tracker-band",
    description:
      "Monitor your health and fitness goals with our Fitness Tracker Band. Track steps, heart rate, sleep, and more with this comfortable and affordable wearable device.",
    price: 49.99,
    originalPrice: 59.99,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Wearables",
    brand: "FitTech",
    rating: 4.3,
    reviewCount: 412,
    inStock: true,
    sku: "FT-FB-1200",
    tags: ["fitness", "tracker", "health", "wearable"],
    features: [
      "Step Counting",
      "Heart Rate Monitoring",
      "Sleep Tracking",
      "Water Resistant (30m)",
      "7-day Battery Life",
      "Smartphone Notifications",
    ],
    specifications: {
      Display: "0.96-inch OLED",
      Resolution: "128 x 64 pixels",
      Sensors: "Heart rate, Accelerometer",
      "Water Resistance": "3 ATM (30m)",
      "Battery Life": "Up to 7 days",
      Connectivity: "Bluetooth 5.0",
      Compatibility: "iOS 10.0+, Android 5.0+",
    },
    variants: {
      colors: [
        { name: "Black", value: "#000000" },
        { name: "Blue", value: "#0000FF" },
        { name: "Red", value: "#FF0000" },
        { name: "Green", value: "#008000" },
        { name: "Pink", value: "#FFC0CB" },
      ],
      sizes: ["Small", "Large"],
    },
    relatedProducts: ["3", "9", "14"],
    createdAt: "2023-05-20T00:00:00Z",
  },
  {
    id: "13",
    name: "Smart Doorbell Camera",
    slug: "smart-doorbell-camera",
    description:
      "Enhance your home security with our Smart Doorbell Camera. See and speak with visitors from anywhere using your smartphone, with HD video, motion detection, and night vision.",
    price: 149.99,
    originalPrice: 179.99,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Smart Home",
    brand: "HomeTech",
    rating: 4.5,
    reviewCount: 176,
    inStock: true,
    sku: "HT-DB-1300",
    tags: ["doorbell", "camera", "security", "smart home"],
    features: [
      "1080p HD Video",
      "Two-way Audio",
      "Motion Detection",
      "Night Vision",
      "Cloud Storage",
      "Weather Resistant",
    ],
    specifications: {
      Video: "1080p HD",
      "Field of View": "160° diagonal",
      Audio: "Two-way with noise cancellation",
      Power: "Hardwired or battery-powered",
      Connectivity: "Wi-Fi (2.4GHz)",
      "Weather Resistance": "IP65",
      "Operating Temperature": "-20°C to 50°C",
    },
    variants: {
      colors: [
        { name: "Black", value: "#000000" },
        { name: "Silver", value: "#C0C0C0" },
      ],
    },
    relatedProducts: ["6", "17", "18"],
    createdAt: "2023-02-05T00:00:00Z",
  },
  {
    id: "14",
    name: "Wireless Charging Pad",
    slug: "wireless-charging-pad",
    description:
      "Simplify your charging experience with our Wireless Charging Pad. Compatible with all Qi-enabled devices, featuring fast charging technology and sleek design.",
    price: 29.99,
    originalPrice: 39.99,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Electronics",
    brand: "TechPro",
    rating: 4.4,
    reviewCount: 298,
    inStock: true,
    sku: "TP-WC-1400",
    tags: ["charger", "wireless", "accessories"],
    features: [
      "Qi Wireless Charging",
      "Fast Charging Support",
      "LED Indicator",
      "Anti-Slip Surface",
      "Compact Design",
      "Foreign Object Detection",
    ],
    specifications: {
      Input: "QC 2.0/3.0 adapter",
      Output: "10W, 7.5W, 5W",
      "Charging Protocol": "Qi",
      Compatibility: "All Qi-enabled devices",
      Dimensions: "100mm x 100mm x 10mm",
      "Cable Length": "1.2m",
    },
    variants: {
      colors: [
        { name: "Black", value: "#000000" },
        { name: "White", value: "#FFFFFF" },
      ],
    },
    relatedProducts: ["5", "8", "12"],
    createdAt: "2023-04-25T00:00:00Z",
  },
  {
    id: "15",
    name: "Gaming Keyboard",
    slug: "gaming-keyboard",
    description:
      "Dominate your games with our Gaming Keyboard. Featuring mechanical switches, customizable RGB lighting, and programmable macro keys for a competitive edge.",
    price: 129.99,
    originalPrice: 149.99,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Gaming",
    brand: "GameTech",
    rating: 4.7,
    reviewCount: 215,
    inStock: true,
    sku: "GT-GK-1500",
    tags: ["gaming", "keyboard", "mechanical", "peripherals"],
    features: [
      "Mechanical Switches",
      "Per-key RGB Lighting",
      "Programmable Macro Keys",
      "Anti-ghosting",
      "Dedicated Media Controls",
      "Detachable Wrist Rest",
    ],
    specifications: {
      "Switch Type": "Mechanical (Blue)",
      "Polling Rate": "1000Hz",
      "Key Rollover": "N-key rollover",
      Backlight: "Per-key RGB (16.8 million colors)",
      "Onboard Memory": "3 profiles",
      Cable: "1.8m braided USB",
      Dimensions: "445mm x 140mm x 40mm",
      Weight: "1.1kg",
    },
    variants: {
      colors: [
        { name: "Black", value: "#000000" },
        { name: "White", value: "#FFFFFF" },
      ],
    },
    relatedProducts: ["10", "11", "16"],
    createdAt: "2023-03-10T00:00:00Z",
  },
  {
    id: "16",
    name: "Gaming Headset",
    slug: "gaming-headset",
    description:
      "Immerse yourself in your games with our Gaming Headset. Featuring surround sound, noise-cancelling microphone, and comfortable design for extended gaming sessions.",
    price: 99.99,
    originalPrice: 119.99,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Gaming",
    brand: "GameTech",
    rating: 4.5,
    reviewCount: 267,
    inStock: true,
    sku: "GT-GH-1600",
    tags: ["gaming", "headset", "audio", "peripherals"],
    features: [
      "7.1 Surround Sound",
      "Noise-cancelling Microphone",
      "Memory Foam Ear Cushions",
      "RGB Lighting",
      "Volume and Mic Controls",
      "Cross-platform Compatibility",
    ],
    specifications: {
      Driver: "50mm neodymium",
      "Frequency Response": "20Hz - 20kHz",
      Impedance: "32 Ohm",
      Microphone: "Unidirectional, noise-cancelling",
      Connection: "USB, 3.5mm",
      "Cable Length": "2.1m",
      Weight: "350g",
    },
    variants: {
      colors: [
        { name: "Black", value: "#000000" },
        { name: "Black/Red", value: "#FF0000" },
      ],
    },
    relatedProducts: ["10", "11", "15"],
    createdAt: "2023-05-15T00:00:00Z",
  },
  {
    id: "17",
    name: "Smart Light Bulbs (4-pack)",
    slug: "smart-light-bulbs-4-pack",
    description:
      "Transform your home lighting with our Smart Light Bulbs. Control brightness, color, and schedules from your smartphone or voice assistant for the perfect ambiance.",
    price: 59.99,
    originalPrice: 79.99,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Smart Home",
    brand: "HomeTech",
    rating: 4.6,
    reviewCount: 342,
    inStock: true,
    sku: "HT-SL-1700",
    tags: ["smart home", "lighting", "bulbs"],
    features: [
      "16 Million Colors",
      "Dimmable",
      "Voice Control Compatible",
      "Scheduling",
      "No Hub Required",
      "Energy Efficient",
    ],
    specifications: {
      Wattage: "9W (60W equivalent)",
      Lumens: "800lm",
      "Color Temperature": "2700K-6500K",
      Lifespan: "25,000 hours",
      Connectivity: "Wi-Fi (2.4GHz)",
      Compatibility: "Alexa, Google Assistant, HomeKit",
      Dimensions: "Standard A19/E26",
    },
    variants: {},
    relatedProducts: ["6", "13", "18"],
    createdAt: "2023-04-05T00:00:00Z",
  },
  {
    id: "18",
    name: "Smart Thermostat",
    slug: "smart-thermostat",
    description:
      "Save energy and enhance comfort with our Smart Thermostat. Learn your preferences, adjust temperature remotely, and integrate with your smart home ecosystem.",
    price: 179.99,
    originalPrice: 199.99,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Smart Home",
    brand: "HomeTech",
    rating: 4.8,
    reviewCount: 189,
    inStock: true,
    sku: "HT-ST-1800",
    tags: ["smart home", "thermostat", "energy saving"],
    features: [
      "Learning Capability",
      "Remote Control via App",
      "Energy Usage Reports",
      "Geofencing",
      "Voice Control Compatible",
      "Easy Installation",
    ],
    specifications: {
      Display: "2.8-inch color LCD",
      Sensors: "Temperature, Humidity, Occupancy, Proximity",
      Power: "24V or Battery",
      Connectivity: "Wi-Fi (2.4GHz/5GHz), Bluetooth",
      Compatibility: "Most HVAC systems",
      Dimensions: '3.3" x 3.3" x 1.2"',
    },
    variants: {
      colors: [
        { name: "White", value: "#FFFFFF" },
        { name: "Black", value: "#000000" },
        { name: "Silver", value: "#C0C0C0" },
      ],
    },
    relatedProducts: ["6", "13", "17"],
    createdAt: "2023-02-20T00:00:00Z",
  },
]

export const categories = [
  { id: "1", name: "Electronics", count: 8 },
  { id: "2", name: "Wearables", count: 3 },
  { id: "3", name: "Photography", count: 1 },
  { id: "4", name: "Smart Home", count: 3 },
  { id: "5", name: "Gaming", count: 3 },
]

export const brands = [
  { id: "1", name: "SoundMaster", count: 3 },
  { id: "2", name: "TechPro", count: 2 },
  { id: "3", name: "FitTech", count: 3 },
  { id: "4", name: "OptiMax", count: 1 },
  { id: "5", name: "HomeTech", count: 3 },
  { id: "6", name: "VisionPlus", count: 1 },
  { id: "7", name: "GameTech", count: 4 },
]

export const reviews = [
  {
    id: "1",
    productId: "1",
    user: "John D.",
    rating: 5,
    title: "Best headphones I've ever owned",
    comment: "The sound quality is amazing and the noise cancellation works perfectly. Battery life is impressive too!",
    date: "2023-05-15T00:00:00Z",
    helpful: 24,
  },
  {
    id: "2",
    productId: "1",
    user: "Sarah M.",
    rating: 4,
    title: "Great sound, slightly uncomfortable",
    comment:
      "Sound quality is excellent and battery life is great. My only complaint is that they get a bit uncomfortable after a few hours of use.",
    date: "2023-04-20T00:00:00Z",
    helpful: 18,
  },
  {
    id: "3",
    productId: "1",
    user: "Michael T.",
    rating: 5,
    title: "Worth every penny",
    comment:
      "These headphones have transformed my listening experience. The noise cancellation is perfect for my commute and the sound is crystal clear.",
    date: "2023-03-10T00:00:00Z",
    helpful: 32,
  },
  {
    id: "4",
    productId: "1",
    user: "Emily R.",
    rating: 5,
    title: "Amazing quality",
    comment:
      "I've tried many headphones and these are by far the best. The sound quality is exceptional and they're very comfortable for long periods.",
    date: "2023-02-28T00:00:00Z",
    helpful: 15,
  },
  {
    id: "5",
    productId: "1",
    user: "David K.",
    rating: 4,
    title: "Great but pricey",
    comment:
      "These are excellent headphones with fantastic sound and noise cancellation. My only hesitation is the price, but you get what you pay for.",
    date: "2023-01-15T00:00:00Z",
    helpful: 9,
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}

export function getRelatedProducts(productIds: string[]): Product[] {
  return products.filter((product) => productIds.includes(product.id))
}

export function getProductReviews(productId: string) {
  return reviews.filter((review) => review.productId === productId)
}

export function getFilteredProducts(filters: any) {
  let filteredProducts = [...products]

  // Filter by categories
  if (filters.categories && filters.categories.length > 0) {
    filteredProducts = filteredProducts.filter((product) => filters.categories.includes(product.category))
  }

  // Filter by brands
  if (filters.brands && filters.brands.length > 0) {
    filteredProducts = filteredProducts.filter((product) => filters.brands.includes(product.brand))
  }

  // Filter by price range
  if (filters.priceRange) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= filters.priceRange.min && product.price <= filters.priceRange.max,
    )
  }

  // Filter by ratings
  if (filters.ratings && filters.ratings.length > 0) {
    filteredProducts = filteredProducts.filter((product) => {
      const productRating = Math.floor(product.rating)
      return filters.ratings.includes(productRating)
    })
  }

  // Filter by search query
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase()
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query),
    )
  }

  // Sort products
  switch (filters.sortBy) {
    case "newest":
      filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      break
    case "price-low-to-high":
      filteredProducts.sort((a, b) => a.price - b.price)
      break
    case "price-high-to-low":
      filteredProducts.sort((a, b) => b.price - a.price)
      break
    case "top-rated":
      filteredProducts.sort((a, b) => b.rating - a.rating)
      break
    case "best-selling":
      // In a real app, this would sort by sales data
      // For now, we'll use review count as a proxy
      filteredProducts.sort((a, b) => b.reviewCount - a.reviewCount)
      break
    default:
      // "featured" - no specific sorting
      break
  }

  return filteredProducts
}
