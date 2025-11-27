"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { LogOut, Wallet, TrendingUp, Package } from "lucide-react"

interface WalletDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  account: string | null
  onDisconnect: () => void
}

export function WalletDrawer({ open, onOpenChange, account, onDisconnect }: WalletDrawerProps) {
  console.log("[v0] WalletDrawer render:", { open, account })

  if (!account) return null

  const handleDisconnect = () => {
    onDisconnect()
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[400px] sm:w-[540px] bg-[hsl(var(--ethblox-bg))] border-[hsl(var(--ethblox-border))] z-[100]"
      >
        <SheetHeader>
          <SheetTitle className="text-[hsl(var(--ethblox-text-primary))]">Wallet</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Wallet Address */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-[hsl(var(--ethblox-text-secondary))]">
              <Wallet className="w-4 h-4" />
              Connected Address
            </div>
            <div className="flex items-center justify-between p-3 bg-[hsl(var(--ethblox-surface))] rounded-lg border border-[hsl(var(--ethblox-border))]">
              <code className="text-sm text-[hsl(var(--ethblox-text-primary))]">
                {account.slice(0, 10)}...{account.slice(-8)}
              </code>
              <div className="w-2 h-2 bg-[hsl(var(--ethblox-accent-green))] rounded-full" />
            </div>
          </div>

          <Separator className="bg-[hsl(var(--ethblox-border))]" />

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 bg-[hsl(var(--ethblox-surface))] border-[hsl(var(--ethblox-border))]">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-[hsl(var(--ethblox-text-secondary))]">
                  <Package className="w-3.5 h-3.5" />
                  BLOX Balance
                </div>
                <div className="text-2xl font-bold text-[hsl(var(--ethblox-accent-yellow))]">0</div>
              </div>
            </Card>

            <Card className="p-4 bg-[hsl(var(--ethblox-surface))] border-[hsl(var(--ethblox-border))]">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-[hsl(var(--ethblox-text-secondary))]">
                  <TrendingUp className="w-3.5 h-3.5" />
                  My Builds
                </div>
                <div className="text-2xl font-bold text-[hsl(var(--ethblox-text-primary))]">0</div>
              </div>
            </Card>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              className="w-full bg-[hsl(var(--ethblox-accent-green))] hover:bg-[hsl(var(--ethblox-accent-green))]/90 text-white"
              disabled
            >
              Buy $BLOX (Coming Soon)
            </Button>

            <Button
              onClick={handleDisconnect}
              variant="outline"
              className="w-full border-[hsl(var(--ethblox-border))] text-[hsl(var(--ethblox-text-primary))] hover:bg-[hsl(var(--ethblox-surface))] bg-transparent"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Disconnect
            </Button>
          </div>

          <Separator className="bg-[hsl(var(--ethblox-border))]" />

          {/* My Builds Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-[hsl(var(--ethblox-text-primary))]">My Builds</h3>
            <ScrollArea className="h-[200px]">
              <div className="text-sm text-center py-8 text-[hsl(var(--ethblox-text-tertiary))]">
                No builds yet. Create your first build!
              </div>
            </ScrollArea>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
