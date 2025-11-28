"use client"

import type React from "react"
import { MetaMaskProvider } from "@/contexts/metamask-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return <MetaMaskProvider>{children}</MetaMaskProvider>
}
