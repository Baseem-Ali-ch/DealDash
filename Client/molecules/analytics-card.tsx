import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils/utils";
import { ArrowDown, ArrowUp } from "lucide-react";

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  className?: string;
}

export function AnalyticsCard({
  title,
  value,
  change,
  icon,
  className,
}: AnalyticsCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="h-4 w-4 text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className="text-xs text-muted-foreground mt-1 flex items-center">
            {change.isPositive ? (
              <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
            ) : (
              <ArrowDown className="mr-1 h-3 w-3 text-red-500" />
            )}
            <span
              className={change.isPositive ? "text-green-500" : "text-red-500"}
            >
              {change.value}%
            </span>
            <span className="ml-1">from last month</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
