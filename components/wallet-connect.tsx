"use client"

import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"
import { useMetaMask } from "@/hooks/use-metamask"
import { useState } from "react"
import { WalletDrawer } from "./wallet-drawer"

interface WalletConnectProps {
  variant?: "default" | "compact"
}

export function WalletConnect({ variant = "default" }: WalletConnectProps) {
  const { isConnected, connect, account, disconnect, switchAccount } = useMetaMask()
  const [drawerOpen, setDrawerOpen] = useState(false)

  console.log("[v0] WalletConnect state:", { isConnected, account, drawerOpen })

  if (isConnected && account) {
    if (variant === "compact") {
      return (
        <>
          <Button
            onClick={() => {
              console.log("[v0] Opening wallet drawer")
              setDrawerOpen(true)
            }}
            size="sm"
            className="bg-white/90 hover:bg-white text-gray-900 font-medium text-xs gap-2 border border-gray-200"
          >
            <div className="w-2 h-2 bg-[hsl(var(--ethblox-accent-green))] rounded-full" />
            {account.slice(0, 6)}...{account.slice(-4)}
          </Button>
          <WalletDrawer
            open={drawerOpen}
            onOpenChange={setDrawerOpen}
            account={account}
            onDisconnect={disconnect}
            onSwitchAccount={switchAccount}
          />
        </>
      )
    }

    return (
      <>
        <Button
          onClick={() => {
            console.log("[v0] Opening wallet drawer (default variant)")
            setDrawerOpen(true)
          }}
          className="w-full bg-[hsl(var(--ethblox-accent-green))] hover:bg-[hsl(var(--ethblox-accent-green))]/90 text-[hsl(var(--ethblox-bg))] font-medium gap-2"
        >
          <div className="w-2 h-2 bg-white rounded-full" />
          {account.slice(0, 6)}...{account.slice(-4)}
        </Button>
        <WalletDrawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          account={account}
          onDisconnect={disconnect}
          onSwitchAccount={switchAccount}
        />
      </>
    )
  }

  if (variant === "compact") {
    return (
      <Button
        onClick={connect}
        size="sm"
        className="bg-[hsl(var(--ethblox-accent-green))] hover:bg-[hsl(var(--ethblox-accent-green))]/90 text-white font-medium text-xs gap-2"
      >
        <Wallet className="w-3.5 h-3.5" />
        Connect
      </Button>
    )
  }

  return (
    <div className="space-y-3">
      <Button
        onClick={connect}
        className="w-full bg-[hsl(var(--ethblox-accent-green))] hover:bg-[hsl(var(--ethblox-accent-green))]/90 text-white font-medium gap-2"
      >
        <Wallet className="w-4 h-4" />
        Connect Wallet
      </Button>
      <p className="text-xs text-[hsl(var(--ethblox-text-tertiary))] text-center">MetaMask only. Install if needed.</p>
    </div>
  )
}
