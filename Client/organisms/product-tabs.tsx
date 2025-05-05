"use client";

import type React from "react";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/atoms/button";
import { ProductReviewCard } from "@/molecules/product-review-card";
import { cn } from "@/lib/utils/utils";

interface ProductTabsProps {
  product: {
    description: string;
    features: string[];
    specifications: Record<string, string>;
  };
  reviews: Array<{
    id: string;
    user: string;
    rating: number;
    title: string;
    comment: string;
    date: string;
    helpful: number;
  }>;
}

interface ReviewFormState {
  rating: number;
  title: string;
  comment: string;
  name: string;
  email: string;
}

export function ProductTabs({ product, reviews }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("description");
  const [reviewSort, setReviewSort] = useState("newest");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewFormState, setReviewFormState] = useState<ReviewFormState>({
    rating: 5,
    title: "",
    comment: "",
    name: "",
    email: "",
  });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (reviewSort) {
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      case "most-helpful":
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  const averageRating =
    reviews.reduce((total, review) => total + review.rating, 0) /
    reviews.length;

  const ratingCounts = reviews.reduce(
    (counts, review) => {
      counts[review.rating - 1]++;
      return counts;
    },
    [0, 0, 0, 0, 0]
  );

  const handleReviewFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setReviewFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (rating: number) => {
    setReviewFormState((prev) => ({
      ...prev,
      rating,
    }));
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to an API
    console.log("Review submitted:", reviewFormState);
    setReviewSubmitted(true);
    setShowReviewForm(false);

    // Reset form after submission
    setTimeout(() => {
      setReviewSubmitted(false);
      setReviewFormState({
        rating: 5,
        title: "",
        comment: "",
        name: "",
        email: "",
      });
    }, 3000);
  };

  return (
    <div>
      <div className="mb-6 border-b">
        <div className="flex space-x-8">
          <button
            className={cn(
              "border-b-2 px-1 pb-4 text-sm font-medium",
              activeTab === "description"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={cn(
              "border-b-2 px-1 pb-4 text-sm font-medium",
              activeTab === "specifications"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setActiveTab("specifications")}
          >
            Specifications
          </button>
          <button
            className={cn(
              "border-b-2 px-1 pb-4 text-sm font-medium",
              activeTab === "reviews"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews ({reviews.length})
          </button>
        </div>
      </div>

      <div className="min-h-[300px]">
        {activeTab === "description" && (
          <div className="space-y-4">
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <p>{product.description}</p>
            </div>
            <h3 className="text-lg font-medium">Key Features</h3>
            <ul className="list-inside list-disc space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="text-sm">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "specifications" && (
          <div className="overflow-hidden rounded-lg border">
            <table className="min-w-full divide-y">
              <tbody className="divide-y">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <tr key={key}>
                    <td className="whitespace-nowrap px-4 py-3 text-sm font-medium">
                      {key}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "reviews" && (
          <div>
            <div className="mb-8 grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-lg font-medium">Customer Reviews</h3>
                <div className="mb-4 flex items-center">
                  <div className="mr-4 flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-5 w-5",
                          i < Math.floor(averageRating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-200 text-gray-200"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-medium">
                    {averageRating.toFixed(1)} out of 5
                  </span>
                </div>
                <p className="mb-4 text-sm text-muted-foreground">
                  Based on {reviews.length} reviews
                </p>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center">
                      <span className="mr-2 w-2 text-sm">{rating}</span>
                      <Star className="mr-2 h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                          className="h-full rounded-full bg-yellow-400"
                          style={{
                            width: `${
                              (ratingCounts[rating - 1] / reviews.length) * 100
                            }%`,
                          }}
                        />
                      </div>
                      <span className="ml-2 text-xs text-muted-foreground">
                        {ratingCounts[rating - 1]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-medium">Review this product</h3>
                  <Button onClick={() => setShowReviewForm(!showReviewForm)}>
                    {showReviewForm ? "Cancel" : "Write a Review"}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Share your thoughts with other customers
                </p>

                {reviewSubmitted && (
                  <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-md">
                    Thank you for your review! It has been submitted
                    successfully.
                  </div>
                )}

                {showReviewForm && (
                  <form
                    onSubmit={handleReviewSubmit}
                    className="mt-6 space-y-4 border rounded-md p-4"
                  >
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Your Rating
                      </label>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => handleRatingChange(star)}
                            className="p-1"
                          >
                            <Star
                              className={cn(
                                "h-6 w-6",
                                star <= reviewFormState.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "fill-gray-200 text-gray-200"
                              )}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="review-title"
                        className="block text-sm font-medium mb-1"
                      >
                        Review Title
                      </label>
                      <input
                        id="review-title"
                        name="title"
                        type="text"
                        required
                        value={reviewFormState.title}
                        onChange={handleReviewFormChange}
                        className="w-full rounded-md border border-input px-3 py-2 text-sm"
                        placeholder="Summarize your experience"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="review-comment"
                        className="block text-sm font-medium mb-1"
                      >
                        Review
                      </label>
                      <textarea
                        id="review-comment"
                        name="comment"
                        required
                        value={reviewFormState.comment}
                        onChange={handleReviewFormChange}
                        rows={4}
                        className="w-full rounded-md border border-input px-3 py-2 text-sm"
                        placeholder="What did you like or dislike about this product?"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="review-name"
                          className="block text-sm font-medium mb-1"
                        >
                          Your Name
                        </label>
                        <input
                          id="review-name"
                          name="name"
                          type="text"
                          required
                          value={reviewFormState.name}
                          onChange={handleReviewFormChange}
                          className="w-full rounded-md border border-input px-3 py-2 text-sm"
                          placeholder="Your display name"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="review-email"
                          className="block text-sm font-medium mb-1"
                        >
                          Email Address
                        </label>
                        <input
                          id="review-email"
                          name="email"
                          type="email"
                          required
                          value={reviewFormState.email}
                          onChange={handleReviewFormChange}
                          className="w-full rounded-md border border-input px-3 py-2 text-sm"
                          placeholder="Your email (not displayed)"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button type="submit">Submit Review</Button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium">
                {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
              </h3>
              <select
                value={reviewSort}
                onChange={(e) => setReviewSort(e.target.value)}
                className="rounded-md border border-input bg-background px-3 py-1 text-sm"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
                <option value="most-helpful">Most Helpful</option>
              </select>
            </div>

            <div className="space-y-6">
              {sortedReviews.map((review) => (
                <ProductReviewCard
                  key={review.id}
                  user={review.user}
                  rating={review.rating}
                  title={review.title}
                  comment={review.comment}
                  date={review.date}
                  helpful={review.helpful}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
