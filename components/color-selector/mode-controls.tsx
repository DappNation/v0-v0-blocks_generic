"use client"

import type React from "react"
import { Hammer, Move, Eraser } from "lucide-react"
import { SimpleTooltip } from "../simple-tooltip"

interface ModeControlsProps {
  currentMode: "build" | "move" | "erase"
  onModeChange: (mode: "build" | "move" | "erase") => void
  isMobile: boolean
}

export const ModeControls: React.FC<ModeControlsProps> = ({ currentMode, onModeChange, isMobile }) => {
  const MaybeTooltip = ({ text, children }: { text: string; children: React.ReactNode }) => {
    if (isMobile) {
      return <>{children}</>
    }
    return (
      <SimpleTooltip text={text} position="top">
        {children}
      </SimpleTooltip>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <MaybeTooltip text="Build (b)">
        <button
          onClick={() => onModeChange("build")}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
            currentMode === "build" ? "bg-black text-white" : "bg-black/30 text-white hover:bg-black/50"
          }`}
          aria-label="Build Mode (B)"
          aria-pressed={currentMode === "build"}
        >
          <Hammer className="w-4 h-4 stroke-[1.5]" />
        </button>
      </MaybeTooltip>

      <MaybeTooltip text="Move (m)">
        <button
          onClick={() => onModeChange("move")}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
            currentMode === "move" ? "bg-black text-white" : "bg-black/30 text-white hover:bg-black/50"
          }`}
          aria-label="Move Mode (M)"
          aria-pressed={currentMode === "move"}
        >
          <Move className="w-4 h-4 stroke-[1.5]" />
        </button>
      </MaybeTooltip>

      <MaybeTooltip text="Erase (e)">
        <button
          onClick={() => onModeChange("erase")}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
            currentMode === "erase" ? "bg-black text-white" : "bg-black/30 text-white hover:bg-black/50"
          }`}
          aria-label="Erase Mode (E)"
          aria-pressed={currentMode === "erase"}
        >
          <Eraser className="w-4 h-4 stroke-[1.5]" />
        </button>
      </MaybeTooltip>
    </div>
  )
}
