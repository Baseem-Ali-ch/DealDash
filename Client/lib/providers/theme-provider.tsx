"use client"

import type React from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "../store/store"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { mode } = useSelector((state: RootState) => state.theme)

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(mode)
  }, [mode])

  return <>{children}</>
}
