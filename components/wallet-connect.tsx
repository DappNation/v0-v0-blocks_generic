"use client"

import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"

interface WalletConnectProps {
  variant?: "default" | "compact"
}

export function WalletConnect({ variant = "default" }: WalletConnectProps) {
  if (variant === "compact") {
    return (
      <Button
        onClick={() => alert("Wallet connection coming soon!")}
        size="sm"
        className="bg-[hsl(var(--ethblox-accent-cyan))] hover:bg-[hsl(var(--ethblox-accent-cyan))]/90 text-[hsl(var(--ethblox-bg))] font-medium text-xs gap-2"
      >
        <Wallet className="w-3.5 h-3.5" />
        Connect
      </Button>
    )
  }

  return (
    <div className="space-y-3">
      <Button
        onClick={() => alert("Wallet connection coming soon!")}
        className="w-full bg-[hsl(var(--ethblox-accent-cyan))] hover:bg-[hsl(var(--ethblox-accent-cyan))]/90 text-[hsl(var(--ethblox-bg))] font-medium gap-2"
      >
        <Wallet className="w-4 h-4" />
        Connect Wallet
      </Button>
      <p className="text-xs text-[hsl(var(--ethblox-text-tertiary))] text-center">Wallet functionality coming soon!</p>
    </div>
  )
}
