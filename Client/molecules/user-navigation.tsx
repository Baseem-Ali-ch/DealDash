"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  LogOut,
  Settings,
  ShoppingBag,
  Heart,
  CreditCard,
} from "lucide-react";

export function UserNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className=" hover:bg-accent hover:text-accent-foreground p-2 rounded-full transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="sr-only">Open user menu</span>
        <User className="h-6 w-6" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <div
            className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
          >
            <div className="py-1" role="none">
              <Link
                href="/account"
                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
                role="menuitem"
              >
                <User className="mr-2 h-4 w-4" />
                My Account
              </Link>

              <Link
                href="/account/orders"
                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
                role="menuitem"
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Orders
              </Link>

              <Link
                href="/account/payment"
                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
                role="menuitem"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Payment Methods
              </Link>

              <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>

              <button
                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
                role="menuitem"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
