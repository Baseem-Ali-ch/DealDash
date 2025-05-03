"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Button } from "@/atoms/button";
import { cn } from "@/lib/utils";

interface ProductImageGalleryProps {
  images: string[];
  name: string;
}

export function ProductImageGallery({
  images,
  name,
}: ProductImageGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImage(index);
  };

  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;

    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomPosition({ x, y });
  };

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "relative aspect-square overflow-hidden rounded-lg bg-gray-100",
          isZoomed && "cursor-zoom-out",
          !isZoomed && "cursor-zoom-in"
        )}
        onClick={handleZoomToggle}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={images[currentImage] || "/placeholder.svg"}
          alt={`${name} - Image ${currentImage + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className={cn(
            "object-cover transition-transform duration-300",
            isZoomed && "scale-150"
          )}
          style={
            isZoomed
              ? {
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                }
              : undefined
          }
        />
        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 top-2 z-10 h-8 w-8 bg-white/80 dark:bg-gray-800/80"
          onClick={(e) => {
            e.stopPropagation();
            handleZoomToggle();
          }}
          aria-label={isZoomed ? "Zoom out" : "Zoom in"}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute left-2 top-1/2 z-10 h-8 w-8 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80"
          onClick={(e) => {
            e.stopPropagation();
            handlePrevImage();
          }}
          aria-label="Previous image"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 top-1/2 z-10 h-8 w-8 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80"
          onClick={(e) => {
            e.stopPropagation();
            handleNextImage();
          }}
          aria-label="Next image"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={cn(
              "relative aspect-square h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border-2",
              currentImage === index ? "border-primary" : "border-transparent"
            )}
            onClick={() => handleThumbnailClick(index)}
            aria-label={`View image ${index + 1}`}
            aria-current={currentImage === index}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${name} - Thumbnail ${index + 1}`}
              fill
              sizes="80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
