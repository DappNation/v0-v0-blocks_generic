"use client"

import { useAccount, useConnect, useDisconnect } from "wagmi"
import { Button } from "@/components/ui/button"
import { Wallet, LogOut } from "lucide-react"

interface WalletConnectProps {
  variant?: "default" | "compact"
}

export function WalletConnect({ variant = "default" }: WalletConnectProps) {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()

  if (variant === "compact") {
    if (isConnected && address) {
      return (
        <Button
          variant="outline"
          size="sm"
          className="border-[hsl(var(--ethblox-accent-cyan))] bg-[hsl(var(--ethblox-surface))] hover:bg-[hsl(var(--ethblox-surface-elevated))] text-[hsl(var(--ethblox-accent-cyan))] font-mono text-xs gap-2 ethblox-border-glow"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--ethblox-accent-cyan))] animate-pulse" />
          {address.slice(0, 4)}...{address.slice(-4)}
        </Button>
      )
    }

    return (
      <Button
        onClick={() => connectors[0] && connect({ connector: connectors[0] })}
        disabled={isPending}
        size="sm"
        className="bg-[hsl(var(--ethblox-accent-cyan))] hover:bg-[hsl(var(--ethblox-accent-cyan))]/90 text-[hsl(var(--ethblox-bg))] font-medium text-xs gap-2"
      >
        <Wallet className="w-3.5 h-3.5" />
        {isPending ? "Connecting..." : "Connect"}
      </Button>
    )
  }

  if (isConnected && address) {
    return (
      <div className="space-y-3">
        <div className="px-4 py-3 rounded border border-[hsl(var(--ethblox-accent-cyan))] bg-[hsl(var(--ethblox-surface-elevated))] ethblox-glow">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-[hsl(var(--ethblox-accent-cyan))] animate-pulse" />
            <span className="text-xs text-[hsl(var(--ethblox-text-secondary))] uppercase tracking-wider">
              Connected
            </span>
          </div>
          <div className="text-sm text-[hsl(var(--ethblox-accent-cyan))] font-mono">
            {address.slice(0, 6)}...{address.slice(-4)}
          </div>
        </div>
        <Button
          onClick={() => disconnect()}
          variant="outline"
          size="sm"
          className="w-full border-[hsl(var(--ethblox-border))] hover:bg-[hsl(var(--ethblox-surface-elevated))] text-[hsl(var(--ethblox-text-secondary))] gap-2"
        >
          <LogOut className="w-4 h-4" />
          Disconnect
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {connectors.map((connector) => (
        <Button
          key={connector.id}
          onClick={() => connect({ connector })}
          disabled={isPending}
          className="w-full bg-[hsl(var(--ethblox-accent-cyan))] hover:bg-[hsl(var(--ethblox-accent-cyan))]/90 text-[hsl(var(--ethblox-bg))] font-medium gap-2"
        >
          <Wallet className="w-4 h-4" />
          {isPending ? "Connecting..." : `Connect ${connector.name}`}
        </Button>
      ))}
      {connectors.length === 0 && (
        <p className="text-xs text-[hsl(var(--ethblox-text-tertiary))]">
          No wallet connectors available. Please configure NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID.
        </p>
      )}
    </div>
  )
}
