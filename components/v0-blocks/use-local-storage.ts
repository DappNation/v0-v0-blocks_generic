"use client"

import { useEffect, useRef } from "react"
import type { Brick } from "./events"
import type { ColorTheme } from "../color-selector/types"
import { saveToLocalStorage, loadFromLocalStorage, isLocalStorageAvailable } from "@/lib/utils/local-storage"

interface UseLocalStorageProps {
  bricks: Brick[]
  width: number
  depth: number
  selectedColor: string
  currentTheme: ColorTheme
  currentCreationId?: string
  currentCreationName?: string
  setBricks: (bricks: Brick[]) => void
  setWidth: (width: number) => void
  setDepth: (depth: number) => void
  setSelectedColor: (color: string) => void
  handleThemeChange: (theme: ColorTheme) => void
  setCurrentCreationId: (id?: string) => void
  setCurrentCreationName: (name?: string) => void
  setHistory: (history: Brick[][]) => void
  setHistoryIndex: (index: number) => void
}

export function useLocalStorage({
  bricks,
  width,
  depth,
  selectedColor,
  currentTheme,
  currentCreationId,
  currentCreationName,
  setBricks,
  setWidth,
  setDepth,
  setSelectedColor,
  handleThemeChange,
  setCurrentCreationId,
  setCurrentCreationName,
  setHistory,
  setHistoryIndex,
}: UseLocalStorageProps) {
  const hasLocalStorage = useRef<boolean>(false)
  const isInitialLoad = useRef<boolean>(true)
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Check if localStorage is available
  useEffect(() => {
    hasLocalStorage.current = isLocalStorageAvailable()
  }, [])

  // Load data from localStorage on initial mount
  useEffect(() => {
    if (!hasLocalStorage.current) return

    if (isInitialLoad.current) {
      const loadCreationData = typeof window !== "undefined" ? localStorage.getItem("ethblox-load-creation") : null

      if (loadCreationData) {
        try {
          const creation = JSON.parse(loadCreationData) as any
          if (creation.bricks && creation.bricks.length > 0) {
            setBricks(creation.bricks)
            setHistory([[...creation.bricks]])
            setHistoryIndex(0)
            setCurrentCreationId(creation.id)
            setCurrentCreationName(creation.name)

            // Clear the load flag
            localStorage.removeItem("ethblox-load-creation")
            isInitialLoad.current = false
            return
          }
        } catch (error) {
          console.error("[v0] Failed to load creation from My Builds:", error)
          localStorage.removeItem("ethblox-load-creation")
        }
      }

      // Otherwise, load the normal saved state
      const savedState = loadFromLocalStorage()

      if (savedState) {
        // Only restore if there are bricks to restore
        if (savedState.bricks && savedState.bricks.length > 0) {
          setBricks(savedState.bricks)
          setWidth(savedState.width || 2)
          setDepth(savedState.height || 2)
          setSelectedColor(savedState.selectedColor || "#FF3333")

          if (savedState.currentTheme) {
            handleThemeChange(savedState.currentTheme as ColorTheme)
          }

          if (savedState.creationId) {
            setCurrentCreationId(savedState.creationId)
          }

          if (savedState.creationName) {
            setCurrentCreationName(savedState.creationName)
          }

          // Initialize history with the loaded bricks
          setHistory([[...savedState.bricks]])
          setHistoryIndex(0)
        }
      }

      isInitialLoad.current = false
    }
  }, [
    setBricks,
    setWidth,
    setDepth,
    setSelectedColor,
    handleThemeChange,
    setCurrentCreationId,
    setCurrentCreationName,
    setHistory,
    setHistoryIndex,
  ])

  // Save data to localStorage whenever state changes (debounced)
  useEffect(() => {
    if (!hasLocalStorage.current || isInitialLoad.current) return

    // Clear any existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }

    // Set a new timeout to save after 500ms of inactivity
    saveTimeoutRef.current = setTimeout(() => {
      saveToLocalStorage({
        bricks,
        width,
        height: depth,
        selectedColor,
        currentTheme,
        creationId: currentCreationId,
        creationName: currentCreationName,
      })
    }, 500)

    // Cleanup timeout on unmount
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [bricks, width, depth, selectedColor, currentTheme, currentCreationId, currentCreationName])
}
