"use client"

import { Button } from "@/components/ui/button"
import { MousePointer2, Trash2, Save, Package } from "lucide-react"

type SpaceMode = "select" | "move" | "erase"

interface SpaceToolbarProps {
  mode: SpaceMode
  onModeChange: (mode: SpaceMode) => void
  onSave: () => void
  onOpenBrowser: () => void
  isSaving?: boolean
}

export function SpaceToolbar({ mode, onModeChange, onSave, onOpenBrowser, isSaving }: SpaceToolbarProps) {
  return (
    <div className="absolute left-4 top-20 z-10 flex flex-col gap-2 bg-[hsl(var(--ethblox-surface))] p-3 rounded-lg border border-[hsl(var(--ethblox-border))] shadow-lg">
      <Button
        variant={mode === "select" ? "default" : "ghost"}
        size="icon"
        onClick={onOpenBrowser}
        className="w-12 h-12"
        title="Select Build"
      >
        <Package className="w-5 h-5" />
      </Button>

      <Button
        variant={mode === "move" ? "default" : "ghost"}
        size="icon"
        onClick={() => onModeChange("move")}
        className="w-12 h-12"
        title="Move Camera"
      >
        <MousePointer2 className="w-5 h-5" />
      </Button>

      <Button
        variant={mode === "erase" ? "default" : "ghost"}
        size="icon"
        onClick={() => onModeChange("erase")}
        className="w-12 h-12"
        title="Erase Build"
      >
        <Trash2 className="w-5 h-5" />
      </Button>

      <div className="h-px bg-[hsl(var(--ethblox-border))] my-1" />

      <Button
        variant="default"
        size="icon"
        onClick={onSave}
        disabled={isSaving}
        className="w-12 h-12 bg-[hsl(var(--ethblox-accent-green))] hover:bg-[hsl(var(--ethblox-accent-green))]/80"
        title="Save Space"
      >
        <Save className="w-5 h-5" />
      </Button>
    </div>
  )
}
