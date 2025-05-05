import { Star } from "lucide-react";
import { Button } from "@/atoms/button";
import { cn } from "@/lib/utils/utils";

interface ProductReviewCardProps {
  user: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpful: number;
}

export function ProductReviewCard({
  user,
  rating,
  title,
  comment,
  date,
  helpful,
}: ProductReviewCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="border-b pb-6">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-2 flex">
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
          </div>
          <h4 className="font-medium">{title}</h4>
        </div>
        <span className="text-xs text-muted-foreground">{formattedDate}</span>
      </div>
      <p className="mb-3 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">By {user}</span>
      </p>
      <p className="mb-4 text-sm">{comment}</p>
      <div className="flex items-center text-sm">
        <span className="mr-2 text-muted-foreground">
          {helpful} people found this helpful
        </span>
        <Button variant="outline" size="sm">
          Helpful
        </Button>
      </div>
    </div>
  );
}
