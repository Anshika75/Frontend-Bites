"use client"

import type React from "react"

import { useState, useEffect } from "react"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const shouldBeDark = saved ? saved === "dark" : prefersDark
    setIsDark(shouldBeDark)
    applyTheme(shouldBeDark)
  }, [])

  const applyTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  const toggleTheme = () => {
    const newDark = !isDark
    setIsDark(newDark)
    applyTheme(newDark)
    localStorage.setItem("theme", newDark ? "dark" : "light")
  }

  if (!mounted) return <>{children}</>

  return (
    <>
      <div
        className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-background border border-border rounded-lg p-2 shadow-sm"
        role="region"
        aria-label="Theme toggle"
      >
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-secondary transition-colors"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? (
            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l-2.83-2.83a1 1 0 00-1.414 1.414l2.83 2.83a1 1 0 001.414-1.414zM2.05 6.464l2.83 2.83a1 1 0 101.414-1.414L3.464 5.05A1 1 0 102.05 6.464zm9.9-1.414a1 1 0 00-1.414 1.414l2.83 2.83a1 1 0 001.414-1.414l-2.83-2.83zM3.464 14.95l2.83-2.83a1 1 0 001.414 1.414l-2.83 2.83a1 1 0 01-1.414-1.414z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>
      {children}
    </>
  )
}
