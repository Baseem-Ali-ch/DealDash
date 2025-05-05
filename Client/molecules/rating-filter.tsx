"use client";

import { Star } from "lucide-react";
import { Checkbox } from "@/atoms/checkbox";
import { cn } from "@/lib/utils/utils";

interface RatingFilterProps {
  ratings: number[];
  onChange: (rating: number) => void;
}

export function RatingFilter({ ratings, onChange }: RatingFilterProps) {
  return (
    <div className="space-y-2">
      {[5, 4, 3, 2, 1].map((rating) => (
        <div key={rating} className="flex items-center">
          <Checkbox
            id={`rating-${rating}`}
            checked={ratings.includes(rating)}
            onChange={() => onChange(rating)}
          />
          <label
            htmlFor={`rating-${rating}`}
            className="ml-2 flex cursor-pointer items-center text-sm text-gray-700 dark:text-gray-300"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-200"
                )}
              />
            ))}
            <span className="ml-2">& Up</span>
          </label>
        </div>
      ))}
    </div>
  );
}
