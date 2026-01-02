"use client"

import type React from "react"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useDebounce } from "@/bites/debounce-search/useDebounce"
import { SEARCH_DATA, DEBOUNCE_DELAY } from "@/bites/debounce-search/constants"

export default function DebounceSearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY)

  const filteredResults = useMemo(() => {
    if (!debouncedSearchTerm.trim()) return []
    return SEARCH_DATA.filter(
      (item) =>
        item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
    )
  }, [debouncedSearchTerm])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    setIsSearching(true)

    const timer = setTimeout(() => {
      setIsSearching(false)
    }, DEBOUNCE_DELAY + 100)

    return () => clearTimeout(timer)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
        <nav className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium text-muted-foreground">Back</span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Debounce Search</h1>
          <div className="w-10"></div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
               <h1 className="text-4xl font-bold mb-2 text-foreground dark:text-white">Debounce Search</h1>
        <p className="text-muted-foreground dark:text-slate-400 mb-8">
          Type to search through the data. Results are debounced with a {DEBOUNCE_DELAY}ms delay.
        </p>

        {/* Search Input */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Search by name or category..."
              className="w-full px-4 py-3 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {isSearching && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div
                  className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"
                  style={{ animation: "spin 0.6s linear infinite" }}
                ></div>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-4">
            {searchTerm.trim() === ""
              ? "Start typing to search"
              : `Found ${filteredResults.length} result${filteredResults.length !== 1 ? "s" : ""}`}
          </p>

          {filteredResults.length > 0 ? (
            <div className="space-y-2">
              {filteredResults.map((item) => (
                <div
                  key={item.id}
                  className="p-4 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                    </div>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : searchTerm.trim() !== "" ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No results found for "{searchTerm}"</p>
            </div>
          ) : null}
        </div>
      </main>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
