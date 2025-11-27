"use client"

import type React from "react"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { WagmiProvider, createConfig, http } from "wagmi"
import { mainnet, base } from "wagmi/chains"
import { injected, walletConnect } from "wagmi/connectors"
import { useState } from "react"

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

if (!projectId) {
  console.warn("[v0] NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID not set. WalletConnect will not function properly.")
}

const config = createConfig({
  chains: [mainnet, base],
  connectors: [
    injected(),
    ...(projectId
      ? [
          walletConnect({
            projectId,
            metadata: {
              name: "ETHBLOX",
              description: "An On-Chain Creative Protocol for Builders, Degens & Dreamers",
              url: typeof window !== "undefined" ? window.location.origin : "https://ethblox.xyz",
              icons: ["https://ethblox.xyz/icon.png"],
            },
            showQrModal: true,
          }),
        ]
      : []),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
