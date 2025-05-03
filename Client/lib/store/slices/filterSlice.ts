import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type SortOption =
  | "featured"
  | "newest"
  | "price-low-to-high"
  | "price-high-to-low"
  | "best-selling"
  | "top-rated"

export interface PriceRange {
  min: number
  max: number
}

export interface FilterState {
  categories: string[]
  brands: string[]
  priceRange: PriceRange
  ratings: number[]
  sortBy: SortOption
  view: "grid" | "list"
  searchQuery: string
  page: number
  perPage: number
}

const initialState: FilterState = {
  categories: [],
  brands: [],
  priceRange: { min: 0, max: 1000 },
  ratings: [],
  sortBy: "featured",
  view: "grid",
  searchQuery: "",
  page: 1,
  perPage: 12,
}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload
    },
    toggleCategory: (state, action: PayloadAction<string>) => {
      const index = state.categories.indexOf(action.payload)
      if (index >= 0) {
        state.categories.splice(index, 1)
      } else {
        state.categories.push(action.payload)
      }
    },
    setBrands: (state, action: PayloadAction<string[]>) => {
      state.brands = action.payload
    },
    toggleBrand: (state, action: PayloadAction<string>) => {
      const index = state.brands.indexOf(action.payload)
      if (index >= 0) {
        state.brands.splice(index, 1)
      } else {
        state.brands.push(action.payload)
      }
    },
    setPriceRange: (state, action: PayloadAction<PriceRange>) => {
      state.priceRange = action.payload
    },
    setRatings: (state, action: PayloadAction<number[]>) => {
      state.ratings = action.payload
    },
    toggleRating: (state, action: PayloadAction<number>) => {
      const index = state.ratings.indexOf(action.payload)
      if (index >= 0) {
        state.ratings.splice(index, 1)
      } else {
        state.ratings.push(action.payload)
      }
    },
    setSortBy: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload
    },
    setView: (state, action: PayloadAction<"grid" | "list">) => {
      state.view = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setPerPage: (state, action: PayloadAction<number>) => {
      state.perPage = action.payload
    },
    resetFilters: (state) => {
      return {
        ...initialState,
        view: state.view,
        sortBy: state.sortBy,
        perPage: state.perPage,
      }
    },
  },
})

export const {
  setCategories,
  toggleCategory,
  setBrands,
  toggleBrand,
  setPriceRange,
  setRatings,
  toggleRating,
  setSortBy,
  setView,
  setSearchQuery,
  setPage,
  setPerPage,
  resetFilters,
} = filterSlice.actions

export default filterSlice.reducer
