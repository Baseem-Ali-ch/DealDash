"use client";

import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/utils";

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
}

export const SidebarItem = ({ href, icon, label, badge }: SidebarItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
        "hover:bg-gray-100 dark:hover:bg-gray-800",
        isActive
          ? "bg-primary/10 text-primary dark:bg-primary/20"
          : "text-gray-700 dark:text-gray-300"
      )}
    >
      <span
        className={cn(
          "text-xl",
          isActive ? "text-primary" : "text-gray-500 dark:text-gray-400"
        )}
      >
        {icon}
      </span>
      <span className="font-medium">{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className="ml-auto bg-primary text-white text-xs font-medium px-2 py-0.5 rounded-full">
          {badge > 99 ? "99+" : badge}
        </span>
      )}
    </Link>
  );
};
