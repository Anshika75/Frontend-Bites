"use client"

import { useState, useCallback, useEffect, useRef } from "react"

interface UseInfiniteScrollOptions<T> {
  fetchMore: () => Promise<T[]>
  threshold?: number
}

export function useInfiniteScroll<T>({ fetchMore, threshold = 100 }: UseInfiniteScrollOptions<T>) {
  const [items, setItems] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const observerTarget = useRef<HTMLDivElement>(null)

  const handleFetchMore = useCallback(async () => {
    if (isLoading || !hasMore) return

    setIsLoading(true)
    try {
      const newItems = await fetchMore()
      setItems((prev) => [...prev, ...newItems])
      if (newItems.length === 0) {
        setHasMore(false)
      }
    } finally {
      setIsLoading(false)
    }
  }, [fetchMore, isLoading, hasMore])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isLoading) {
          handleFetchMore()
        }
      },
      { rootMargin: `${threshold}px` },
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => observer.disconnect()
  }, [handleFetchMore, hasMore, isLoading, threshold])

  return {
    items,
    isLoading,
    hasMore,
    observerTarget,
  }
}
