"use client"

import React from "react"

import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface CheckoutProgressProps {
  steps: string[]
  currentStep: number
  onStepClick?: (step: number) => void
}

export function CheckoutProgress({ steps, currentStep, onStepClick }: CheckoutProgressProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <button
                onClick={() => {
                  if (onStepClick && index < currentStep) {
                    onStepClick(index)
                  }
                }}
                disabled={index > currentStep}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors",
                  {
                    "bg-primary text-white": index === currentStep,
                    "bg-primary/20 text-primary": index < currentStep,
                    "bg-muted text-muted-foreground cursor-not-allowed": index > currentStep,
                    "cursor-pointer hover:bg-primary/30": index < currentStep && onStepClick,
                  },
                )}
                aria-current={index === currentStep ? "step" : undefined}
              >
                {index < currentStep ? <Check className="h-5 w-5" /> : index + 1}
              </button>
              <span
                className={cn("mt-2 text-xs font-medium", {
                  "text-primary": index <= currentStep,
                  "text-muted-foreground": index > currentStep,
                })}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn("h-0.5 w-full max-w-[100px] flex-1", {
                  "bg-primary": index < currentStep,
                  "bg-muted": index >= currentStep,
                })}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
