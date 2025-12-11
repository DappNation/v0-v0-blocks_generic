"use client"

import { useState, useEffect } from "react"
import { X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Build } from "@/lib/types"

interface BuildBrowserProps {
  isOpen: boolean
  onClose: () => void
  onSelectBuild: (buildId: string) => void
  selectedBuildId?: string
}

export function BuildBrowser({ isOpen, onClose, onSelectBuild, selectedBuildId }: BuildBrowserProps) {
  const [builds, setBuilds] = useState<Build[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isOpen) {
      fetchBuilds()
    }
  }, [isOpen])

  const fetchBuilds = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/builds")
      const data = await response.json()
      setBuilds(data.builds || [])
    } catch (error) {
      console.error("[v0] Error fetching builds:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="absolute right-4 top-20 bottom-4 z-10 w-80 bg-[hsl(var(--ethblox-surface))] rounded-lg border border-[hsl(var(--ethblox-border))] shadow-lg flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-[hsl(var(--ethblox-border))]">
        <h2 className="text-sm font-semibold text-[hsl(var(--ethblox-text-primary))]">Gallery Builds</h2>
        <Button variant="ghost" size="icon" onClick={onClose} className="w-8 h-8">
          <X className="w-4 h-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-[hsl(var(--ethblox-text-tertiary))]" />
          </div>
        ) : builds.length === 0 ? (
          <div className="text-center py-12 text-sm text-[hsl(var(--ethblox-text-tertiary))]">
            No builds available in gallery
          </div>
        ) : (
          <div className="space-y-2">
            {builds.map((build) => (
              <button
                key={build.metadata.id}
                onClick={() => onSelectBuild(build.metadata.id)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedBuildId === build.metadata.id
                    ? "border-[hsl(var(--ethblox-accent-cyan))] bg-[hsl(var(--ethblox-accent-cyan))]/10"
                    : "border-[hsl(var(--ethblox-border))] hover:border-[hsl(var(--ethblox-accent-cyan))]/50 hover:bg-[hsl(var(--ethblox-surface-elevated))]"
                }`}
              >
                <div className="font-medium text-sm text-[hsl(var(--ethblox-text-primary))]">{build.metadata.name}</div>
                <div className="text-xs text-[hsl(var(--ethblox-text-tertiary))] mt-1">
                  {build.metadata.mass} BLOX · BW {build.metadata.bw.toFixed(1)}
                </div>
              </button>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
