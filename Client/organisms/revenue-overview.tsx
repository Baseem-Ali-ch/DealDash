"use client";

import type React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils/utils";

interface RevenueMetric {
  title: string;
  value: string;
  change: {
    value: number;
    trend: "up" | "down" | "neutral";
  };
  icon: React.ReactNode;
}

interface RevenueOverviewProps {
  metrics: {
    daily: RevenueMetric[];
    weekly: RevenueMetric[];
    monthly: RevenueMetric[];
    yearly: RevenueMetric[];
  };
}

export function RevenueOverview({ metrics }: RevenueOverviewProps) {
  return (
    <Tabs defaultValue="daily" className="space-y-4">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="yearly">Yearly</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="daily" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.daily.map((metric, index) => (
            <MetricCard key={index} metric={metric} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="weekly" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.weekly.map((metric, index) => (
            <MetricCard key={index} metric={metric} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="monthly" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.monthly.map((metric, index) => (
            <MetricCard key={index} metric={metric} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="yearly" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.yearly.map((metric, index) => (
            <MetricCard key={index} metric={metric} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}

function MetricCard({ metric }: { metric: RevenueMetric }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{metric.icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{metric.value}</div>
        <p className="text-xs text-muted-foreground">
          <span
            className={cn(
              "inline-flex items-center font-medium",
              metric.change.trend === "up" && "text-green-500",
              metric.change.trend === "down" && "text-red-500"
            )}
          >
            {metric.change.trend === "up" && (
              <ArrowUp className="mr-1 h-3 w-3" />
            )}
            {metric.change.trend === "down" && (
              <ArrowDown className="mr-1 h-3 w-3" />
            )}
            {metric.change.value}%
          </span>{" "}
          from previous period
        </p>
      </CardContent>
    </Card>
  );
}
