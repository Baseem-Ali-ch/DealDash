"use client";

import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/utils";

interface MobileNavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
}

export const MobileNavItem = ({
  href,
  icon,
  label,
  badge,
}: MobileNavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center justify-center gap-1 p-2",
        isActive ? "text-primary" : "text-gray-500 dark:text-gray-400"
      )}
    >
      <div className="relative">
        <span className="text-xl">{icon}</span>
        {badge !== undefined && badge > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            {badge > 9 ? "9+" : badge}
          </span>
        )}
      </div>
      <span className="text-xs font-medium">{label}</span>
    </Link>
  );
};
