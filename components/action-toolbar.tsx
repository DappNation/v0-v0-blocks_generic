"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Hammer, Move, Eraser } from "lucide-react"
import { SimpleTooltip } from "./simple-tooltip"

interface ActionToolbarProps {
  onModeChange: (mode: "build" | "move" | "erase") => void
  currentMode: "build" | "move" | "erase"
  baseWidth: number
  baseDepth: number
  onBaseWidthChange: (value: number) => void
  onBaseDepthChange: (value: number) => void
}

export const ActionToolbar: React.FC<ActionToolbarProps> = ({
  onModeChange,
  currentMode,
  baseWidth,
  baseDepth,
  onBaseWidthChange,
  onBaseDepthChange,
}) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const MaybeTooltip = ({ text, children }) => {
    if (isMobile) {
      return children
    }
    return (
      <SimpleTooltip text={text} position="right">
        {children}
      </SimpleTooltip>
    )
  }

  const handleWidthChange = (value: number) => {
    const clamped = Math.max(1, Math.min(20, value))
    onBaseWidthChange(clamped)
  }

  const handleDepthChange = (value: number) => {
    const clamped = Math.max(1, Math.min(20, value))
    onBaseDepthChange(clamped)
  }

  return (
    <div className="fixed top-1/2 -translate-y-1/2 left-4 flex flex-col gap-3 z-20">
      <div className="bg-black/30 rounded-lg p-2 backdrop-blur-sm">
        <label className="text-xs text-white/80 block mb-2 text-center">Base Size</label>
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <label className="text-[10px] text-white/60 mb-1">W</label>
            <input
              type="number"
              min={1}
              max={20}
              value={baseWidth}
              onChange={(e) => handleWidthChange(Number(e.target.value) || 1)}
              className="w-12 rounded border border-white/20 bg-black/50 px-2 py-1 text-xs text-white text-center"
            />
          </div>
          <span className="text-white/40 text-xs">×</span>
          <div className="flex flex-col items-center">
            <label className="text-[10px] text-white/60 mb-1">D</label>
            <input
              type="number"
              min={1}
              max={20}
              value={baseDepth}
              onChange={(e) => handleDepthChange(Number(e.target.value) || 1)}
              className="w-12 rounded border border-white/20 bg-black/50 px-2 py-1 text-xs text-white text-center"
            />
          </div>
        </div>
      </div>

      <MaybeTooltip text="Build (b)">
        <button
          onClick={() => onModeChange("build")}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
            currentMode === "build" ? "bg-black text-white" : "bg-black/30 text-white hover:bg-black/50"
          }`}
          aria-label="Build Mode (B)"
          aria-pressed={currentMode === "build"}
        >
          <Hammer className="w-5 h-5 stroke-[1.5]" />
        </button>
      </MaybeTooltip>

      <MaybeTooltip text="Move (m)">
        <button
          onClick={() => onModeChange("move")}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
            currentMode === "move" ? "bg-black text-white" : "bg-black/30 text-white hover:bg-black/50"
          }`}
          aria-label="Move Mode (M)"
          aria-pressed={currentMode === "move"}
        >
          <Move className="w-5 h-5 stroke-[1.5]" />
        </button>
      </MaybeTooltip>

      <MaybeTooltip text="Erase (e)">
        <button
          onClick={() => onModeChange("erase")}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
            currentMode === "erase" ? "bg-black text-white" : "bg-black/30 text-white hover:bg-black/50"
          }`}
          aria-label="Erase Mode (E)"
          aria-pressed={currentMode === "erase"}
        >
          <Eraser className="w-5 h-5 stroke-[1.5]" />
        </button>
      </MaybeTooltip>
    </div>
  )
}
