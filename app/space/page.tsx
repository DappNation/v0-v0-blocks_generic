"use client"

import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import { useMetaMaskContext } from "@/contexts/metamask-context"
import { SpaceToolbar } from "@/components/space/space-toolbar"
import { BuildBrowser } from "@/components/space/build-browser"
import { SpaceScene } from "@/components/space/space-scene"
import { loadBuildPrefab } from "@/lib/actions/spaces"
import type { Space, SpaceBuildInstance } from "@/lib/types/space"
import { Loader2 } from "lucide-react"

export default function SpacePage() {
  const { account } = useMetaMaskContext()
  const [space, setSpace] = useState<Space | null>(null)
  const [instances, setInstances] = useState<SpaceBuildInstance[]>([])
  const [mode, setMode] = useState<"select" | "move" | "erase">("move")
  const [browserOpen, setBrowserOpen] = useState(false)
  const [selectedBuildId, setSelectedBuildId] = useState<string>()
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (account) {
      loadSpace()
    }
  }, [account])

  const loadSpace = async () => {
    if (!account) return

    try {
      setIsLoading(true)
      const response = await fetch(`/api/space?wallet=${account}`)
      const data = await response.json()
      setSpace(data.space)

      if (data.space?.placedBuilds) {
        const loadedInstances: SpaceBuildInstance[] = []
        for (const placed of data.space.placedBuilds) {
          const prefab = await loadBuildPrefab(placed.buildId)
          if (prefab) {
            loadedInstances.push({
              instanceId: nanoid(10),
              buildId: prefab.id,
              name: prefab.name,
              bricks: prefab.bricks,
              position: placed.position,
              rotationY: placed.rotation || 0,
              createdAt: Date.now(),
            })
          }
        }
        setInstances(loadedInstances)
      }
    } catch (error) {
      console.error("[v0] Error loading space:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    if (!space || !account) return

    try {
      setIsSaving(true)

      const placedBuilds = instances.map((instance) => ({
        buildId: instance.buildId,
        position: instance.position,
        rotation: instance.rotationY,
      }))

      const updatedSpace = {
        ...space,
        placedBuilds,
        updatedAt: Date.now(),
      }

      await fetch("/api/space", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedSpace),
      })

      setSpace(updatedSpace)
    } catch (error) {
      console.error("[v0] Error saving space:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleSelectBuild = (buildId: string) => {
    setSelectedBuildId(buildId)
    setMode("select")
    setBrowserOpen(false)
  }

  const handlePlaceBuild = async (position: [number, number, number]) => {
    if (!selectedBuildId || !space) return

    const prefab = await loadBuildPrefab(selectedBuildId)
    if (!prefab) {
      console.error("[v0] Failed to load build prefab")
      return
    }

    const newInstance: SpaceBuildInstance = {
      instanceId: nanoid(10),
      buildId: prefab.id,
      name: prefab.name,
      bricks: prefab.bricks,
      position,
      rotationY: 0,
      createdAt: Date.now(),
    }

    setInstances((prev) => [...prev, newInstance])
    setSelectedBuildId(undefined)
    setMode("move")
  }

  const handleRemoveBuild = (instanceId: string) => {
    setInstances((prev) => prev.filter((inst) => inst.instanceId !== instanceId))
  }

  if (!account) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Connect Wallet</h1>
          <p className="text-gray-400">Please connect your wallet to access your Space</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Loader2 className="w-8 h-8 animate-spin text-[hsl(var(--ethblox-accent-cyan))]" />
      </div>
    )
  }

  if (!space) return null

  return (
    <div className="relative w-full h-screen bg-black">
      <SpaceToolbar
        mode={mode}
        onModeChange={setMode}
        onSave={handleSave}
        onOpenBrowser={() => setBrowserOpen(true)}
        isSaving={isSaving}
      />

      <BuildBrowser
        isOpen={browserOpen}
        onClose={() => setBrowserOpen(false)}
        onSelectBuild={handleSelectBuild}
        selectedBuildId={selectedBuildId}
      />

      <SpaceScene
        baseWidth={space.baseWidth}
        baseDepth={space.baseDepth}
        instances={instances}
        selectedBuildId={selectedBuildId}
        onPlaceBuild={handlePlaceBuild}
        onRemoveBuild={handleRemoveBuild}
        mode={mode}
      />

      {/* Status bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[hsl(var(--ethblox-surface))]/90 backdrop-blur px-4 py-2 rounded-full border border-[hsl(var(--ethblox-border))] text-xs text-[hsl(var(--ethblox-text-secondary))]">
        {instances.length} builds placed · {space.baseWidth}×{space.baseDepth} base
      </div>
    </div>
  )
}
