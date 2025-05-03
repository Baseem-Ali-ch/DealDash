"use client"

import { useEffect } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useAppDispatch, useAppSelector } from "./use-redux"
import {
  setCategories,
  setBrands,
  setPriceRange,
  setRatings,
  setSortBy,
  setSearchQuery,
  setPage,
  type SortOption,
} from "../store/slices/filterSlice"

export function useUrlFilters() {
  const dispatch = useAppDispatch()
  const filters = useAppSelector((state) => state.filter)
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // Sync URL params to Redux state
  useEffect(() => {
    // Categories
    const categories = searchParams.get("categories")
    if (categories) {
      dispatch(setCategories(categories.split(",")))
    }

    // Brands
    const brands = searchParams.get("brands")
    if (brands) {
      dispatch(setBrands(brands.split(",")))
    }

    // Price range
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    if (minPrice && maxPrice) {
      dispatch(
        setPriceRange({
          min: Number.parseInt(minPrice),
          max: Number.parseInt(maxPrice),
        }),
      )
    }

    // Ratings
    const ratings = searchParams.get("ratings")
    if (ratings) {
      dispatch(setRatings(ratings.split(",").map(Number)))
    }

    // Sort by
    const sortBy = searchParams.get("sortBy")
    if (sortBy) {
      dispatch(setSortBy(sortBy as SortOption))
    }

    // Search query
    const q = searchParams.get("q")
    if (q) {
      dispatch(setSearchQuery(q))
    }

    // Page
    const page = searchParams.get("page")
    if (page) {
      dispatch(setPage(Number.parseInt(page)))
    }
  }, [searchParams, dispatch])

  // Sync Redux state to URL params
  const updateUrl = () => {
    const params = new URLSearchParams()

    // Categories
    if (filters.categories.length > 0) {
      params.set("categories", filters.categories.join(","))
    }

    // Brands
    if (filters.brands.length > 0) {
      params.set("brands", filters.brands.join(","))
    }

    // Price range
    if (filters.priceRange.min > 0) {
      params.set("minPrice", filters.priceRange.min.toString())
    }
    if (filters.priceRange.max < 1000) {
      params.set("maxPrice", filters.priceRange.max.toString())
    }

    // Ratings
    if (filters.ratings.length > 0) {
      params.set("ratings", filters.ratings.join(","))
    }

    // Sort by
    if (filters.sortBy !== "featured") {
      params.set("sortBy", filters.sortBy)
    }

    // Search query
    if (filters.searchQuery) {
      params.set("q", filters.searchQuery)
    }

    // Page
    if (filters.page > 1) {
      params.set("page", filters.page.toString())
    }

    const queryString = params.toString()
    router.push(`${pathname}${queryString ? `?${queryString}` : ""}`, { scroll: false })
  }

  return { updateUrl }
}
