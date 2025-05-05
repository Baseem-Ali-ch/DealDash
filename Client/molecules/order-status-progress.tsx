import { cn } from "@/lib/utils/utils";
import { Check, Clock, Package, Truck, Home } from "lucide-react";

type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

interface OrderStatusProgressProps {
  status: OrderStatus;
  className?: string;
}

export const OrderStatusProgress = ({
  status,
  className,
}: OrderStatusProgressProps) => {
  const steps = [
    { id: "pending", label: "Pending", icon: Clock },
    { id: "processing", label: "Processing", icon: Package },
    { id: "shipped", label: "Shipped", icon: Truck },
    { id: "out_for_delivery", label: "Out for Delivery", icon: Truck },
    { id: "delivered", label: "Delivered", icon: Home },
  ];

  // Map the status to a numeric value for progress calculation
  const statusValues: Record<OrderStatus, number> = {
    pending: 0,
    processing: 1,
    shipped: 2,
    out_for_delivery: 3,
    delivered: 4,
    cancelled: -1,
  };

  const currentStep = statusValues[status];

  // Don't show progress for cancelled orders
  if (status === "cancelled") {
    return (
      <div className={cn("flex items-center justify-center py-4", className)}>
        <div className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 px-4 py-2 rounded-md">
          This order has been cancelled
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full py-4", className)}>
      <div className="relative">
        {/* Progress Bar */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 -translate-y-1/2"></div>
        <div
          className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 transition-all duration-300"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        ></div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = index <= currentStep;
            const isCurrent = index === currentStep;

            return (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all",
                    isCompleted
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400",
                    isCurrent && "ring-4 ring-primary/20"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs mt-2 font-medium",
                    isCompleted
                      ? "text-primary"
                      : "text-gray-500 dark:text-gray-400"
                  )}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
