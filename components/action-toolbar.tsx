"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Hammer, Move, Eraser } from "lucide-react"
import { SimpleTooltip } from "./simple-tooltip"

interface ActionToolbarProps {
  onModeChange: (mode: "build" | "move" | "erase") => void
  currentMode: "build" | "move" | "erase"
  baseSize: number
  onBaseSizeChange: (value: number) => void
}

export const ActionToolbar: React.FC<ActionToolbarProps> = ({
  onModeChange,
  currentMode,
  baseSize,
  onBaseSizeChange,
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

  return (
    <div className="fixed top-1/2 -translate-y-1/2 left-4 flex flex-col gap-3 z-20">
      <div className="bg-black/30 rounded-lg p-2 backdrop-blur-sm">
        <label className="text-xs text-white/80 block mb-1">Base Size</label>
        <input
          type="number"
          min={4}
          max={40}
          value={baseSize}
          onChange={(e) => onBaseSizeChange(Number(e.target.value) || 4)}
          className="w-16 rounded border border-white/20 bg-black/50 px-2 py-1 text-xs text-white text-center"
        />
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
