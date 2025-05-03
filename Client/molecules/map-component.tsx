"use client"

import { useEffect, useRef } from "react"
import { GoogleMapIcon } from "@/lib/icons"

interface MapComponentProps {
  address: string
  zoom?: number
  height?: string
}

export function MapComponent({ address, zoom = 15, height = "400px" }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  // In a real application, you would use a library like @googlemaps/js-api-loader
  // or a React wrapper for Google Maps

  useEffect(() => {
    // This is a placeholder effect that would normally load the map
    // For demonstration purposes, we'll just show a UI representation
  }, [address, zoom])

  return (
    <div className="overflow-hidden rounded-lg border bg-muted">
      <div ref={mapRef} style={{ height }} className="relative flex items-center justify-center bg-muted">
        <div className="absolute inset-0 opacity-10">
          <svg
            viewBox="0 0 100 100"
            className="h-full w-full"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Simplified map grid pattern */}
            <path d="M0 0 H100 V100 H0 Z" stroke="currentColor" strokeWidth="0.5" />
            <path d="M25 0 V100" stroke="currentColor" strokeWidth="0.25" />
            <path d="M50 0 V100" stroke="currentColor" strokeWidth="0.25" />
            <path d="M75 0 V100" stroke="currentColor" strokeWidth="0.25" />
            <path d="M0 25 H100" stroke="currentColor" strokeWidth="0.25" />
            <path d="M0 50 H100" stroke="currentColor" strokeWidth="0.25" />
            <path d="M0 75 H100" stroke="currentColor" strokeWidth="0.25" />

            <circle cx="50" cy="50" r="8" fill="currentColor" />
          </svg>
        </div>
        <div className="z-10 flex flex-col items-center justify-center text-center">
          <GoogleMapIcon className="h-12 w-12 text-primary" />
          <p className="mt-4 max-w-md text-sm text-muted-foreground">{address}</p>
          <div className="mt-4">
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              View on Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
