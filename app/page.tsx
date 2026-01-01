"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

interface Bite {
  id: string
  title: string
  description: string
  category: string
  difficulty: "beginner" | "intermediate" | "advanced"
  path: string
}

const BITES: Bite[] = [
  {
    id: "infinite-scroll",
    title: "Infinite Scroll",
    description:
      "Load more items automatically as user scrolls to the bottom. Perfect for feeds, product listings, and galleries.",
    category: "Performance",
    difficulty: "intermediate",
    path: "/bites/infinite-scroll",
  },
  {
    id: "debounce-search",
    title: "Debounce Search",
    description:
      "Optimize search input with debouncing to reduce API calls and improve performance. Essential for real-time search.",
    category: "UX",
    difficulty: "beginner",
    path: "/bites/debounce-search",
  },
]

export default function Home() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null)
  const [hoveredBite, setHoveredBite] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredBites = selectedDifficulty ? BITES.filter((bite) => bite.difficulty === selectedDifficulty) : BITES

  const difficultyColors: Record<string, string> = {
    beginner: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    intermediate: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
    advanced: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  }

  const categoryColors: Record<string, string> = {
    Performance: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    UX: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
    "Data Handling": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300",
  }

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">⚡</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">Frontend Bites</h1>
          </div>
          <p className="text-sm text-muted-foreground hidden sm:block">Real-world UI features for production apps</p>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block mb-4 px-3 py-1 bg-primary/10 border border-primary/30 rounded-full">
            <span className="text-sm font-medium text-primary">Building blocks for modern UIs</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
            Small, Focused
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Frontend Features
            </span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Each "bite" is a self-contained, production-ready UI component built with Next.js, TypeScript, and Tailwind
            CSS. Copy, customize, and ship faster.
          </p>
        </div>

        {/* Difficulty Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-12 sm:mb-16">
          <button
            onClick={() => setSelectedDifficulty(null)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              selectedDifficulty === null
                ? "bg-primary text-primary-foreground shadow-lg scale-105"
                : "bg-secondary text-secondary-foreground hover:bg-muted"
            }`}
          >
            All Bites
          </button>
          {["beginner", "intermediate", "advanced"].map((difficulty) => (
            <button
              key={difficulty}
              onClick={() => setSelectedDifficulty(difficulty)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 capitalize ${
                selectedDifficulty === difficulty
                  ? "bg-primary text-primary-foreground shadow-lg scale-105"
                  : "bg-secondary text-secondary-foreground hover:bg-muted"
              }`}
            >
              {difficulty}
            </button>
          ))}
        </div>

        {/* Bites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBites.map((bite) => (
            <Link
              key={bite.id}
              href={bite.path}
              className="group h-full"
              onMouseEnter={() => setHoveredBite(bite.id)}
              onMouseLeave={() => setHoveredBite(null)}
            >
              <div
                className={`h-full p-6 border border-border rounded-xl bg-card text-card-foreground transition-all duration-300 ${
                  hoveredBite === bite.id
                    ? "border-primary shadow-xl -translate-y-2 bg-card"
                    : "hover:border-border/50 shadow-sm"
                }`}
                style={
                  hoveredBite === bite.id
                    ? {
                        transform: "translateY(-8px)",
                      }
                    : {}
                }
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-card-foreground group-hover:text-primary transition-colors">
                      {bite.title}
                    </h3>
                  </div>
                  <div
                    className="ml-2 text-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={hoveredBite === bite.id ? { opacity: 1 } : { opacity: 0 }}
                  >
                    →
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-6 line-clamp-3">{bite.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span
                    className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[bite.category] || "bg-muted text-muted-foreground"}`}
                  >
                    {bite.category}
                  </span>
                  <span
                    className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full capitalize ${
                      difficultyColors[bite.difficulty]
                    }`}
                  >
                    {bite.difficulty}
                  </span>
                </div>

                {/* Footer */}
                <div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all duration-300">
                  <span>Explore</span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-all duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredBites.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No bites found for this difficulty level.</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div>
              <p className="text-sm text-muted-foreground">© 2026 Frontend Bites. Built with Next.js + TypeScript.</p>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                GitHub
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Docs
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
