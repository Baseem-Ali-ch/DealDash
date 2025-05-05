"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Slider } from "@/atoms/slider";
import { formatPrice } from "@/lib/utils/utils";

interface PriceRangeSliderProps {
  min: number;
  max: number;
  value: { min: number; max: number };
  onChange: (value: { min: number; max: number }) => void;
}

export function PriceRangeSlider({
  min,
  max,
  value,
  onChange,
}: PriceRangeSliderProps) {
  const [localMin, setLocalMin] = useState(value.min);
  const [localMax, setLocalMax] = useState(value.max);

  useEffect(() => {
    setLocalMin(value.min);
    setLocalMax(value.max);
  }, [value.min, value.max]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number.parseInt(e.target.value);
    if (newMin <= localMax) {
      setLocalMin(newMin);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number.parseInt(e.target.value);
    if (newMax >= localMin) {
      setLocalMax(newMax);
    }
  };

  const handleMinBlur = () => {
    onChange({ min: localMin, max: localMax });
  };

  const handleMaxBlur = () => {
    onChange({ min: localMin, max: localMax });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <span className="text-sm font-medium">{formatPrice(localMin)}</span>
        <span className="text-sm font-medium">{formatPrice(localMax)}</span>
      </div>
      <div className="relative pt-1">
        <div className="relative">
          <Slider
            type="range"
            min={min}
            max={max}
            value={localMin}
            onChange={handleMinChange}
            onBlur={handleMinBlur}
            className="absolute z-10 h-1 w-full"
          />
          <Slider
            type="range"
            min={min}
            max={max}
            value={localMax}
            onChange={handleMaxChange}
            onBlur={handleMaxBlur}
            className="absolute z-20 h-1 w-full"
          />
        </div>
      </div>
    </div>
  );
}
