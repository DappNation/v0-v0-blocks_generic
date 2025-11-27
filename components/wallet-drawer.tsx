"use client"

import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LogOut, ExternalLink, Boxes, FolderOpen, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getCreations } from "@/lib/actions/get-creations"
import type { SavedCreation } from "@/lib/types"

interface WalletDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  account: string | null
  onDisconnect: () => void
  onSwitchAccount?: () => void
}

export function WalletDrawer({ open, onOpenChange, account, onDisconnect, onSwitchAccount }: WalletDrawerProps) {
  const [userBuilds, setUserBuilds] = useState<SavedCreation[]>([])
  const [isLoadingBuilds, setIsLoadingBuilds] = useState(false)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onOpenChange(false)
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [open, onOpenChange])

  useEffect(() => {
    const fetchUserBuilds = async () => {
      if (!account || !open) return

      setIsLoadingBuilds(true)
      try {
        const result = await getCreations(3, 0, account)
        if (result.success) {
          setUserBuilds(result.creations || [])
        }
      } catch (error) {
        console.error("Error fetching user builds:", error)
      } finally {
        setIsLoadingBuilds(false)
      }
    }

    fetchUserBuilds()
  }, [account, open])

  if (!account) return null

  const displayAddress = `${account.slice(0, 6)}...${account.slice(-4)}`
  const displayName = "Builder 420" // Placeholder
  const bloxBalance = "0.00"
  const buildCount = userBuilds.length
  const pendingRewards = "0.00"
  const apr = "0.00"

  const handleDisconnect = () => {
    onDisconnect()
    onOpenChange(false)
  }

  const handleBuyBlox = () => {
    // Open Uniswap or DEX aggregator
    window.open("https://app.uniswap.org", "_blank")
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[400px] sm:w-[480px] bg-[hsl(var(--ethblox-bg))] border-l border-[hsl(var(--ethblox-accent-blue))]/20 p-0 overflow-hidden"
        style={{ zIndex: 100 }}
      >
        <div className="p-6 border-b border-[hsl(var(--ethblox-border))]">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-[hsl(var(--ethblox-text-primary))] mb-1">{displayName}</h2>
              <code className="text-sm text-[hsl(var(--ethblox-text-secondary))]">{displayAddress}</code>
            </div>

            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[hsl(var(--ethblox-accent-blue))] to-[hsl(var(--ethblox-accent-yellow))] p-0.5">
                <div className="w-full h-full rounded-full bg-[hsl(var(--ethblox-surface))] flex items-center justify-center text-2xl font-bold text-[hsl(var(--ethblox-accent-yellow))]">
                  {displayName.slice(0, 1)}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-[hsl(var(--ethblox-accent-green))]/10 border border-[hsl(var(--ethblox-accent-green))]/30 rounded-full">
            <div className="w-2 h-2 bg-[hsl(var(--ethblox-accent-green))] rounded-full animate-pulse" />
            <span className="text-xs font-medium text-[hsl(var(--ethblox-accent-green))]">Connected</span>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-[hsl(var(--ethblox-surface))] border border-[hsl(var(--ethblox-border))] rounded-lg hover:border-[hsl(var(--ethblox-accent-blue))]/40 transition-colors">
                <div className="text-xs text-[hsl(var(--ethblox-text-tertiary))] uppercase tracking-wider mb-1">
                  BLOX
                </div>
                <div className="text-2xl font-bold text-[hsl(var(--ethblox-accent-yellow))]">{bloxBalance}</div>
              </div>

              <div className="p-4 bg-[hsl(var(--ethblox-surface))] border border-[hsl(var(--ethblox-border))] rounded-lg hover:border-[hsl(var(--ethblox-accent-blue))]/40 transition-colors">
                <div className="text-xs text-[hsl(var(--ethblox-text-tertiary))] uppercase tracking-wider mb-1">
                  BUILDS
                </div>
                <div className="text-2xl font-bold text-[hsl(var(--ethblox-text-primary))]">{buildCount}</div>
              </div>

              <div className="p-4 bg-[hsl(var(--ethblox-surface))] border border-[hsl(var(--ethblox-border))] rounded-lg hover:border-[hsl(var(--ethblox-accent-blue))]/40 transition-colors">
                <div className="text-xs text-[hsl(var(--ethblox-text-tertiary))] uppercase tracking-wider mb-1">
                  Pending Rewards
                </div>
                <div className="text-xl font-bold text-[hsl(var(--ethblox-accent-green))]">{pendingRewards}</div>
                <div className="text-xs text-[hsl(var(--ethblox-text-tertiary))] mt-0.5">Unclaimed</div>
              </div>

              <div className="p-4 bg-[hsl(var(--ethblox-surface))] border border-[hsl(var(--ethblox-border))] rounded-lg hover:border-[hsl(var(--ethblox-accent-blue))]/40 transition-colors">
                <div className="text-xs text-[hsl(var(--ethblox-text-tertiary))] uppercase tracking-wider mb-1">
                  APR
                </div>
                <div className="text-2xl font-bold text-[hsl(var(--ethblox-accent-green))]">{apr}%</div>
              </div>
            </div>

            <Separator className="bg-[hsl(var(--ethblox-border))]" />

            <div className="space-y-2">
              <Button
                onClick={handleBuyBlox}
                className="w-full bg-[hsl(var(--ethblox-accent-green))] hover:bg-[hsl(var(--ethblox-accent-green))]/90 text-white font-semibold py-6 gap-2 group"
              >
                Buy $BLOX
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>
              <p className="text-xs text-[hsl(var(--ethblox-text-tertiary))] text-center">
                Acquire BLOX to mint, sculpt, and power your Builds.
              </p>
            </div>

            <Separator className="bg-[hsl(var(--ethblox-border))]" />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-[hsl(var(--ethblox-text-primary))] uppercase tracking-wider">
                  My Builds ({buildCount})
                </h3>
                <Link
                  href="/build"
                  className="text-xs text-[hsl(var(--ethblox-accent-blue))] hover:underline flex items-center gap-1"
                  onClick={() => onOpenChange(false)}
                >
                  <FolderOpen className="w-3.5 h-3.5" />
                  Open Builder
                </Link>
              </div>

              {isLoadingBuilds ? (
                <div className="min-h-[200px] flex items-center justify-center">
                  <div className="text-sm text-[hsl(var(--ethblox-text-tertiary))]">Loading builds...</div>
                </div>
              ) : userBuilds.length === 0 ? (
                <div className="min-h-[200px] flex items-center justify-center bg-[hsl(var(--ethblox-surface))] border border-[hsl(var(--ethblox-border))] rounded-lg">
                  <div className="text-center p-8">
                    <Boxes className="w-12 h-12 mx-auto mb-3 text-[hsl(var(--ethblox-text-tertiary))]" />
                    <p className="text-sm text-[hsl(var(--ethblox-text-tertiary))]">No builds yet.</p>
                    <Link
                      href="/build"
                      className="text-sm text-[hsl(var(--ethblox-accent-blue))] hover:underline mt-2 inline-block"
                      onClick={() => onOpenChange(false)}
                    >
                      Create your first build →
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {userBuilds.map((build) => (
                    <Link
                      key={build.id}
                      href={`/build?load=${build.id}`}
                      onClick={() => onOpenChange(false)}
                      className="block p-3 bg-[hsl(var(--ethblox-surface))] border border-[hsl(var(--ethblox-border))] rounded-lg hover:border-[hsl(var(--ethblox-accent-blue))]/40 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-[hsl(var(--ethblox-text-primary))]">{build.name}</h4>
                          <p className="text-xs text-[hsl(var(--ethblox-text-tertiary))] mt-0.5">
                            {build.bricks.length} blocks
                          </p>
                        </div>
                        <div className="text-xs text-[hsl(var(--ethblox-text-tertiary))]">
                          {new Date(build.updatedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </Link>
                  ))}
                  {buildCount > 3 && (
                    <Link
                      href="/build"
                      className="block text-center text-xs text-[hsl(var(--ethblox-accent-blue))] hover:underline pt-2"
                      onClick={() => onOpenChange(false)}
                    >
                      View all {buildCount} builds in builder →
                    </Link>
                  )}
                </div>
              )}
            </div>

            <Separator className="bg-[hsl(var(--ethblox-border))]" />

            <div className="flex gap-2">
              {onSwitchAccount && (
                <Button
                  onClick={onSwitchAccount}
                  variant="outline"
                  className="flex-1 border-[hsl(var(--ethblox-border))] text-[hsl(var(--ethblox-text-secondary))] hover:bg-[hsl(var(--ethblox-surface))] hover:text-[hsl(var(--ethblox-accent-blue))] bg-transparent gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Switch Account
                </Button>
              )}
              <Button
                onClick={handleDisconnect}
                variant="outline"
                className="flex-1 border-[hsl(var(--ethblox-border))] text-[hsl(var(--ethblox-text-secondary))] hover:bg-[hsl(var(--ethblox-surface))] hover:text-[hsl(var(--ethblox-text-primary))] bg-transparent gap-2"
              >
                <LogOut className="w-4 h-4" />
                Disconnect
              </Button>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
