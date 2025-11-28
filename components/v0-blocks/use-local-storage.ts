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
  baseWidth: number
  baseDepth: number
  setBricks: (bricks: Brick[]) => void
  setWidth: (width: number) => void
  setDepth: (depth: number) => void
  setSelectedColor: (color: string) => void
  handleThemeChange: (theme: ColorTheme) => void
  setCurrentCreationId: (id?: string) => void
  setCurrentCreationName: (name?: string) => void
  setHistory: (history: Brick[][]) => void
  setHistoryIndex: (index: number) => void
  setBaseWidth: (width: number) => void
  setBaseDepth: (depth: number) => void
}

export function useLocalStorage({
  bricks,
  width,
  depth,
  selectedColor,
  currentTheme,
  currentCreationId,
  currentCreationName,
  baseWidth,
  baseDepth,
  setBricks,
  setWidth,
  setDepth,
  setSelectedColor,
  handleThemeChange,
  setCurrentCreationId,
  setCurrentCreationName,
  setHistory,
  setHistoryIndex,
  setBaseWidth,
  setBaseDepth,
}: UseLocalStorageProps) {
  const hasLocalStorage = useRef<boolean>(false)
  const isInitialLoad = useRef<boolean>(true)
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    hasLocalStorage.current = isLocalStorageAvailable()
  }, [])

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
            if (creation.baseWidth) {
              setBaseWidth(creation.baseWidth)
            } else if (creation.baseSize) {
              setBaseWidth(creation.baseSize)
            }
            if (creation.baseDepth) {
              setBaseDepth(creation.baseDepth)
            } else if (creation.baseSize) {
              setBaseDepth(creation.baseSize)
            }

            localStorage.removeItem("ethblox-load-creation")
            isInitialLoad.current = false
            return
          }
        } catch (error) {
          console.error("[v0] Failed to load creation from My Builds:", error)
          localStorage.removeItem("ethblox-load-creation")
        }
      }

      const savedState = loadFromLocalStorage()

      if (savedState) {
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

          if (savedState.baseWidth) {
            setBaseWidth(savedState.baseWidth)
          } else if (savedState.baseSize) {
            setBaseWidth(savedState.baseSize)
          }
          if (savedState.baseDepth) {
            setBaseDepth(savedState.baseDepth)
          } else if (savedState.baseSize) {
            setBaseDepth(savedState.baseSize)
          }

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
    setBaseWidth,
    setBaseDepth,
  ])

  useEffect(() => {
    if (!hasLocalStorage.current || isInitialLoad.current) return

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }

    saveTimeoutRef.current = setTimeout(() => {
      saveToLocalStorage({
        bricks,
        width,
        height: depth,
        selectedColor,
        currentTheme,
        creationId: currentCreationId,
        creationName: currentCreationName,
        baseWidth,
        baseDepth,
        baseSize: baseWidth, // Keep for backward compatibility
      })
    }, 500)

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [bricks, width, depth, selectedColor, currentTheme, currentCreationId, currentCreationName, baseWidth, baseDepth])
}
