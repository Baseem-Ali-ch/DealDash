import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { PromotionType } from "@/atoms/promotion-type-icon"

export interface Promotion {
  id: string
  name: string
  code: string
  type: PromotionType
  value: number
  status: "active" | "scheduled" | "expired" | "draft" | "paused"
  startDate: string
  endDate: string
  usageCount: number
  usageLimit: number | null
  minOrderValue: number | null
  customerGroups: string[]
  productCategories: string[]
  firstTimeOnly: boolean
}

interface PromotionsState {
  promotions: Promotion[]
  loading: boolean
  error: string | null
}

const initialState: PromotionsState = {
  promotions: [],
  loading: false,
  error: null,
}

// Async thunks for API calls
export const fetchPromotions = createAsyncThunk("promotions/fetchPromotions", async (_, { rejectWithValue }) => {
  try {
    // In a real app, this would be an API call
    // const response = await fetch('/api/promotions')
    // const data = await response.json()
    // return data

    // Mock data for now
    return mockPromotions
  } catch (error) {
    return rejectWithValue("Failed to fetch promotions")
  }
})

export const addPromotion = createAsyncThunk(
  "promotions/addPromotion",
  async (promotion: Omit<Promotion, "id" | "usageCount">, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      // const response = await fetch('/api/promotions', {
      //   method: 'POST',
      //   body: JSON.stringify(promotion),
      //   headers: { 'Content-Type': 'application/json' }
      // })
      // const data = await response.json()
      // return data

      // Mock response for now
      return {
        ...promotion,
        id: `promo${Date.now()}`,
        usageCount: 0,
      } as Promotion
    } catch (error) {
      return rejectWithValue("Failed to add promotion")
    }
  },
)

export const updatePromotion = createAsyncThunk(
  "promotions/updatePromotion",
  async (promotion: Promotion, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/promotions/${promotion.id}`, {
      //   method: 'PUT',
      //   body: JSON.stringify(promotion),
      //   headers: { 'Content-Type': 'application/json' }
      // })
      // const data = await response.json()
      // return data

      // Mock response for now
      return promotion
    } catch (error) {
      return rejectWithValue("Failed to update promotion")
    }
  },
)

export const deletePromotion = createAsyncThunk(
  "promotions/deletePromotion",
  async (id: string, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      // await fetch(`/api/promotions/${id}`, { method: 'DELETE' })

      // Mock response for now
      return id
    } catch (error) {
      return rejectWithValue("Failed to delete promotion")
    }
  },
)

// Mock data
const mockPromotions: Promotion[] = [
  {
    id: "promo1",
    name: "Summer Sale 2023",
    code: "SUMMER20",
    type: "percentage",
    value: 20,
    status: "active",
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    usageCount: 145,
    usageLimit: 500,
    minOrderValue: 50,
    customerGroups: ["all"],
    productCategories: ["all"],
    firstTimeOnly: false,
  },
  // Add more mock promotions as needed
]

const promotionsSlice = createSlice({
  name: "promotions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch promotions
      .addCase(fetchPromotions.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPromotions.fulfilled, (state, action: PayloadAction<Promotion[]>) => {
        state.loading = false
        state.promotions = action.payload
      })
      .addCase(fetchPromotions.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // Add promotion
      .addCase(addPromotion.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addPromotion.fulfilled, (state, action: PayloadAction<Promotion>) => {
        state.loading = false
        state.promotions.push(action.payload)
      })
      .addCase(addPromotion.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // Update promotion
      .addCase(updatePromotion.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updatePromotion.fulfilled, (state, action: PayloadAction<Promotion>) => {
        state.loading = false
        const index = state.promotions.findIndex((p) => p.id === action.payload.id)
        if (index !== -1) {
          state.promotions[index] = action.payload
        }
      })
      .addCase(updatePromotion.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // Delete promotion
      .addCase(deletePromotion.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deletePromotion.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false
        state.promotions = state.promotions.filter((p) => p.id !== action.payload)
      })
      .addCase(deletePromotion.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default promotionsSlice.reducer
