"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/atoms/button";
import { IconButton } from "@/atoms/icon-button";
import { cn } from "@/lib/utils/utils";

interface Slide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

const slides: Slide[] = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2070&auto=format&fit=crop",
    title: "Summer Collection 2025",
    subtitle: "Discover the latest trends for the season",
    ctaText: "Shop Now",
    ctaLink: "/category/summer",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?q=80&w=2070&auto=format&fit=crop",
    title: "New Arrivals",
    subtitle: "Be the first to get our newest products",
    ctaText: "Explore",
    ctaLink: "/new-arrivals",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
    title: "Special Offers",
    subtitle: "Limited time deals on selected items",
    ctaText: "View Deals",
    ctaLink: "/offers",
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;

      setIsAnimating(true);
      setCurrentSlide(index);

      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    },
    [isAnimating]
  );

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, goToSlide, slides.length]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }, [currentSlide, goToSlide, slides.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative h-[60vh] md:h-[80vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-500",
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-lg text-white">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in-up">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-6 animate-fade-in-up animation-delay-200">
                  {slide.subtitle}
                </p>
                <Button
                  size="lg"
                  className="animate-fade-in-up animation-delay-400 bg-primary hover:bg-primary/90"
                  onClick={() => (window.location.href = slide.ctaLink)}
                >
                  {slide.ctaText}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20">
        <IconButton onClick={prevSlide} aria-label="Previous slide">
          <ChevronLeft className="h-6 w-6" />
        </IconButton>
      </div>
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20">
        <IconButton onClick={nextSlide} aria-label="Next slide">
          <ChevronRight className="h-6 w-6" />
        </IconButton>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all",
              index === currentSlide
                ? "bg-primary w-6"
                : "bg-white/50 hover:bg-white/80"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
