"use client"

import { useAppDispatch, useAppSelector } from "@/lib/hooks/use-redux"
import { setTheme, toggleTheme } from "@/lib/store/slices/themeSlice"
import { Button } from "@/atoms/button"
import { Moon, Sun } from "lucide-react"
import { useEffect } from "react"

export function ThemeToggle() {
  const dispatch = useAppDispatch()
  const { mode } = useAppSelector((state) => state.theme)

  // Load theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      dispatch(setTheme(savedTheme as "light" | "dark"))
    }
  }, [dispatch])

  const handleThemeToggle = () => {
    const newTheme = mode === "light" ? "dark" : "light"
    localStorage.setItem("theme", newTheme)
    dispatch(toggleTheme())
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleThemeToggle}
      aria-label={mode === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      {mode === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </Button>
  )
}
