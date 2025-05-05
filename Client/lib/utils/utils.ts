import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price)
}

export function calculateDiscountPercentage(originalPrice: number, discountedPrice: number) {
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
}

export function creditCardType(number: string): string {
  // Remove non-digit characters
  const cardNumber = number.replace(/\D/g, "")

  // Basic regex patterns for card type detection
  const patterns = {
    visa: /^4/,
    mastercard: /^5[1-5]/,
    amex: /^3[47]/,
    discover: /^6(?:011|5)/,
    dinersclub: /^3(?:0[0-5]|[68])/,
    jcb: /^(?:2131|1800|35)/,
  }

  if (patterns.visa.test(cardNumber)) {
    return "Visa"
  } else if (patterns.mastercard.test(cardNumber)) {
    return "MasterCard"
  } else if (patterns.amex.test(cardNumber)) {
    return "American Express"
  } else if (patterns.discover.test(cardNumber)) {
    return "Discover"
  } else if (patterns.dinersclub.test(cardNumber)) {
    return "Diners Club"
  } else if (patterns.jcb.test(cardNumber)) {
    return "JCB"
  } else {
    return cardNumber.length >= 6 ? "Credit Card" : ""
  }
}
