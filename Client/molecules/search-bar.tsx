"use client"

import { useState, useRef, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/atoms/input"
import { IconButton } from "@/atoms/icon-button"
import { cn } from "@/lib/utils"

interface SearchResult {
  id: string
  name: string
  image: string
}

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (!query) {
      setResults([])
      return
    }

    const fetchResults = async () => {
      setIsLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Mock results
      const mockResults = [
        { id: "1", name: "Product matching " + query, image: "/placeholder.svg?height=50&width=50" },
        { id: "2", name: "Another product with " + query, image: "/placeholder.svg?height=50&width=50" },
        { id: "3", name: "Third item related to " + query, image: "/placeholder.svg?height=50&width=50" },
      ]

      setResults(mockResults)
      setIsLoading(false)
    }

    const debounce = setTimeout(() => {
      fetchResults()
    }, 300)

    return () => clearTimeout(debounce)
  }, [query])

  const handleToggleSearch = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setQuery("")
      setResults([])
    }
  }

  return (
    <div className="relative">
      <div className="flex items-center">
        <IconButton variant="ghost" onClick={handleToggleSearch} aria-label={isOpen ? "Close search" : "Open search"}>
          {isOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
        </IconButton>

        <div
          className={cn(
            "overflow-hidden transition-all duration-300 absolute right-0 top-0 z-10",
            isOpen ? "w-[300px] opacity-100" : "w-0 opacity-0",
          )}
        >
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pr-8"
          />
        </div>
      </div>

      {isOpen && (results.length > 0 || isLoading) && (
        <div className="absolute right-0 mt-2 w-[300px] bg-background border rounded-md shadow-lg z-20 max-h-[400px] overflow-auto">
          {isLoading ? (
            <div className="p-4 text-center">Loading...</div>
          ) : (
            <ul>
              {results.map((result) => (
                <li key={result.id} className="border-b last:border-b-0">
                  <button
                    className="flex items-center gap-3 p-3 w-full text-left hover:bg-accent transition-colors"
                    onClick={() => {
                      // Handle selection
                      setIsOpen(false)
                    }}
                  >
                    <img
                      src={result.image || "/placeholder.svg"}
                      alt={result.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <span>{result.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
