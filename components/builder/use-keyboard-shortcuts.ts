"use client"

import { useEffect } from "react"

function isInputElement(): boolean {
  if (typeof document === "undefined") return false

  const activeElement = document.activeElement
  if (!activeElement) return false

  const tagName = activeElement.tagName.toLowerCase()
  const isEditable =
    activeElement.hasAttribute("contenteditable") && activeElement.getAttribute("contenteditable") !== "false"

  return tagName === "input" || tagName === "textarea" || tagName === "select" || isEditable
}

interface KeyboardShortcutsProps {
  isPlaying: boolean
  width: number
  depth: number
  currentColors: string[]
  setWidth: (width: number | ((prev: number) => number)) => void
  setDepth: (depth: number | ((prev: number) => number)) => void
  setSelectedColor: (color: string) => void
  setInteractionMode: (mode: "build" | "move" | "erase") => void
  onUndo: () => void
  onRedo: () => void
  onPlayToggle: () => void
  handleClearWithConfirmation: () => void
  handleSave: () => void
  handleLoad: () => void
  currentTheme: string
  handleThemeChange: (theme: string) => void
  baseWidth: number
  baseDepth: number
  setBaseWidth: (width: number | ((prev: number) => number)) => void
  setBaseDepth: (depth: number | ((prev: number) => number)) => void
}

export function useKeyboardShortcuts({
  isPlaying,
  width,
  depth,
  currentColors,
  setWidth,
  setDepth,
  setSelectedColor,
  setInteractionMode,
  onUndo,
  onRedo,
  onPlayToggle,
  handleClearWithConfirmation,
  handleSave,
  handleLoad,
  currentTheme,
  handleThemeChange,
  baseWidth,
  baseDepth,
  setBaseWidth,
  setBaseDepth,
}: KeyboardShortcutsProps) {
  useEffect(() => {
    if (typeof window === "undefined") return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isPlaying) return
      if (isInputElement()) return
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [
    isPlaying,
    width,
    depth,
    currentColors,
    setWidth,
    setDepth,
    setSelectedColor,
    setInteractionMode,
    onUndo,
    onRedo,
    onPlayToggle,
    handleClearWithConfirmation,
    handleSave,
    handleLoad,
    currentTheme,
    handleThemeChange,
    baseWidth,
    baseDepth,
    setBaseWidth,
    setBaseDepth,
  ])
}
