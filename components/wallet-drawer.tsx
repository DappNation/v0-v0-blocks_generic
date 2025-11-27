"use client"

import { useState, useEffect } from "react"
import { useAccount, useDisconnect } from "wagmi"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Trash2, ExternalLink, LogOut } from "lucide-react"
import type { SavedCreation } from "@/lib/types"

export function WalletDrawer() {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const [open, setOpen] = useState(false)
  const [builds, setBuilds] = useState<SavedCreation[]>([])
  const [loading, setLoading] = useState(false)

  // Mock data - replace with actual contract calls
  const bloxBalance = "12,345.67"
  const buildCount = builds.length
  const pendingRewards = "2.4"
  const apr = "18.5"

  useEffect(() => {
    if (open && isConnected) {
      fetchMyBuilds()
    }
  }, [open, isConnected])

  async function fetchMyBuilds() {
    setLoading(true)
    try {
      const response = await fetch("/api/my-builds")
      if (response.ok) {
        const data = await response.json()
        setBuilds(data.creations || [])
      }
    } catch (error) {
      console.error("Failed to fetch builds:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLoadBuild = (creation: SavedCreation) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ethblox-load-creation", JSON.stringify(creation))
      window.location.href = "/build"
    }
  }

  const handleDeleteBuild = async (id: string) => {
    if (!confirm("Are you sure you want to delete this build?")) return

    try {
      const response = await fetch(`/api/my-builds?id=${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setBuilds((prev) => prev.filter((b) => b.id !== id))
      }
    } catch (error) {
      console.error("Failed to delete build:", error)
    }
  }

  if (!isConnected || !address) {
    return null
  }

  const displayName = "Builder 420" // Replace with ENS lookup or user profile
  const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative border border-[hsl(var(--ethblox-accent-cyan))] bg-[hsl(var(--ethblox-surface))] hover:bg-[hsl(var(--ethblox-surface-elevated))] rounded-full w-9 h-9 ethblox-border-glow"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[hsl(var(--ethblox-accent-cyan))] to-blue-400 flex items-center justify-center text-[hsl(var(--ethblox-bg))] text-xs font-semibold">
            {address.slice(2, 4).toUpperCase()}
          </div>
          <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-[hsl(var(--ethblox-bg))]" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[400px] bg-[hsl(var(--ethblox-bg))] border-l border-[hsl(var(--ethblox-border))] p-0 overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-[hsl(var(--ethblox-border))] space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-heading font-semibold text-[hsl(var(--ethblox-text-primary))] mb-1">
                {displayName}
              </h2>
              <p className="text-sm font-mono text-[hsl(var(--ethblox-text-secondary))]">{shortAddress}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[hsl(var(--ethblox-accent-cyan))] to-blue-400 border-2 border-[hsl(var(--ethblox-accent-cyan))] flex items-center justify-center text-[hsl(var(--ethblox-bg))] text-lg font-semibold shadow-lg">
              {address.slice(2, 4).toUpperCase()}
            </div>
          </div>

          {/* Connected Status */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 w-fit">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium text-green-400 uppercase tracking-wider">Connected</span>
          </div>
        </div>

        {/* Stats Block */}
        <div className="p-6 border-b border-[hsl(var(--ethblox-border))] bg-[hsl(var(--ethblox-surface))]/30">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wider text-[hsl(var(--ethblox-text-tertiary))]">BLOX</p>
              <p className="text-xl font-heading font-semibold text-[hsl(var(--ethblox-accent-cyan))]">{bloxBalance}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wider text-[hsl(var(--ethblox-text-tertiary))]">BUILDS</p>
              <p className="text-xl font-heading font-semibold text-[hsl(var(--ethblox-text-primary))]">{buildCount}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wider text-[hsl(var(--ethblox-text-tertiary))]">
                Pending Rewards
              </p>
              <p className="text-lg font-heading font-semibold text-[hsl(var(--ethblox-text-primary))]">
                {pendingRewards} <span className="text-sm text-[hsl(var(--ethblox-text-secondary))]">ETH</span>
              </p>
              <p className="text-xs text-[hsl(var(--ethblox-text-tertiary))]">Unclaimed</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wider text-[hsl(var(--ethblox-text-tertiary))]">APR</p>
              <p className="text-lg font-heading font-semibold text-green-400">{apr}%</p>
            </div>
          </div>
        </div>

        {/* Buy BLOX CTA */}
        <div className="p-6 border-b border-[hsl(var(--ethblox-border))]">
          <Button
            asChild
            className="w-full bg-[hsl(var(--ethblox-accent-cyan))] hover:bg-[hsl(var(--ethblox-accent-cyan))]/90 text-[hsl(var(--ethblox-bg))] font-medium gap-2 h-11 ethblox-glow"
          >
            <a href="https://app.uniswap.org" target="_blank" rel="noopener noreferrer">
              Buy $BLOX
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
          <p className="text-xs text-[hsl(var(--ethblox-text-tertiary))] mt-2 text-center">
            Acquire BLOX to mint, sculpt, and power your Builds.
          </p>
        </div>

        {/* My Builds Section */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-4">
            <h3 className="text-sm font-heading font-semibold text-[hsl(var(--ethblox-text-primary))] uppercase tracking-wider">
              My Builds
            </h3>
          </div>

          {loading ? (
            <div className="text-center py-8 text-[hsl(var(--ethblox-text-secondary))] text-sm">Loading...</div>
          ) : builds.length === 0 ? (
            <Card className="bg-[hsl(var(--ethblox-surface))]/50 border-[hsl(var(--ethblox-border))]">
              <CardContent className="pt-6 text-center">
                <p className="text-sm text-[hsl(var(--ethblox-text-secondary))]">No builds yet</p>
                <p className="text-xs text-[hsl(var(--ethblox-text-tertiary))] mt-2">Start creating in the Builder</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {builds.map((build) => (
                <Card
                  key={build.id}
                  className="bg-[hsl(var(--ethblox-surface))] border-[hsl(var(--ethblox-border))] hover:border-[hsl(var(--ethblox-accent-cyan))] transition-colors"
                >
                  <CardContent className="p-4 space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-[hsl(var(--ethblox-text-primary))] mb-1">{build.name}</h4>
                      <div className="flex items-center gap-3 text-xs text-[hsl(var(--ethblox-text-tertiary))]">
                        <span>{build.bricks.length} blocks</span>
                        <span>•</span>
                        <span>{new Date(build.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleLoadBuild(build)}
                        size="sm"
                        className="flex-1 bg-[hsl(var(--ethblox-accent-cyan))] hover:bg-[hsl(var(--ethblox-accent-cyan))]/90 text-[hsl(var(--ethblox-bg))] text-xs gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Load
                      </Button>
                      <Button
                        onClick={() => handleDeleteBuild(build.id)}
                        size="sm"
                        variant="outline"
                        className="border-[hsl(var(--ethblox-border))] hover:bg-red-500/10 hover:border-red-500 text-[hsl(var(--ethblox-text-primary))]"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Disconnect Button */}
        <div className="p-6 border-t border-[hsl(var(--ethblox-border))] bg-[hsl(var(--ethblox-surface))]/30">
          <Button
            onClick={() => {
              disconnect()
              setOpen(false)
            }}
            variant="outline"
            className="w-full border-[hsl(var(--ethblox-border))] hover:bg-[hsl(var(--ethblox-surface-elevated))] text-[hsl(var(--ethblox-text-secondary))] gap-2"
          >
            <LogOut className="w-4 h-4" />
            Disconnect Wallet
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
