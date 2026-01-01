"use client"

import Link from "next/link"
import { useState, useCallback } from "react"
import { useInfiniteScroll } from "@/bites/infinite-scroll/useInfiniteScroll"

interface Item {
  id: number
  title: string
  description: string
}

const generateItems = (startId: number, count: number): Item[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: startId + i,
    title: `Item ${startId + i + 1}`,
    description: `This is a sample item demonstrating infinite scroll. Item number ${startId + i + 1}. Scroll down to load more items automatically.`,
  }))
}

export default function InfiniteScrollPage() {
  const [nextId, setNextId] = useState(9)

  const fetchMore = useCallback(async () => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 600))
    const newItems = generateItems(nextId, 9)
    setNextId((prev) => prev + 9)
    return newItems
  }, [nextId])

  const { items, isLoading, hasMore, observerTarget } = useInfiniteScroll<Item>({
    fetchMore,
  })

  // Initial items
  const allItems = [...generateItems(0, 9), ...items]

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
          <h1 className="text-2xl font-bold text-foreground">Infinite Scroll</h1>
          <div className="w-10"></div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Infinite Scroll Demo</h2>
          <p className="text-muted-foreground text-lg">
            Scroll down to automatically load more items. The hook uses the Intersection Observer API for optimal
            performance.
          </p>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {allItems.map((item) => (
            <div
              key={item.id}
              className="p-6 border border-border rounded-lg bg-card hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-lg font-semibold text-card-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
              <div className="mt-4 pt-4 border-t border-border">
                <span className="text-xs text-muted-foreground">ID: {item.id}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Observer target for infinite scroll */}
        <div ref={observerTarget} className="py-12">
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin"></div>
                <p className="text-muted-foreground text-sm">Loading more items...</p>
              </div>
            </div>
          )}

          {!hasMore && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No more items to load</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
