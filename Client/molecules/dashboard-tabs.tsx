"use client";

import type React from "react";

import { useState } from "react";
import { cn } from "@/lib/utils/utils";

interface DashboardTabsProps {
  tabs: {
    id: string;
    label: string;
    content: React.ReactNode;
  }[];
}

export function DashboardTabs({ tabs }: DashboardTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div>
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "py-4 px-1 text-sm font-medium border-b-2 whitespace-nowrap",
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600"
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-6">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={cn(activeTab === tab.id ? "block" : "hidden")}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}
