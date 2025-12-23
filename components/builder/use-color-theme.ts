"use client"

import { useState, useEffect, useCallback } from "react"
import { COLOR_THEMES } from "../color-selector/types"
import type { ColorTheme } from "../color-selector/types"

export function useColorTheme() {
  const [currentTheme, setCurrentTheme] = useState<ColorTheme>("default")
  const [currentColors, setCurrentColors] = useState(COLOR_THEMES[currentTheme])
  const [selectedColor, setSelectedColor] = useState(currentColors[0])

  useEffect(() => {
    const newColors = COLOR_THEMES[currentTheme]
    setCurrentColors(newColors)

    const oldColorIndex = COLOR_THEMES["default"].indexOf(selectedColor)
    const mutedColorIndex = COLOR_THEMES["muted"].indexOf(selectedColor)
    const monoColorIndex = COLOR_THEMES["monochrome"].indexOf(selectedColor)

    if (oldColorIndex !== -1) {
      setSelectedColor(newColors[oldColorIndex])
    } else if (mutedColorIndex !== -1) {
      setSelectedColor(newColors[mutedColorIndex])
    } else if (monoColorIndex !== -1) {
      setSelectedColor(newColors[monoColorIndex])
    } else {
      setSelectedColor(newColors[0])
    }
  }, [currentTheme, selectedColor])

  const handleSelectColor = useCallback((color: string) => {
    setSelectedColor(color)
  }, [])

  const handleThemeChange = useCallback((theme: ColorTheme) => {
    setCurrentTheme(theme)
  }, [])

  return {
    currentTheme,
    currentColors,
    selectedColor,
    setSelectedColor,
    handleSelectColor,
    handleThemeChange,
  }
}
