"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface MetaMaskState {
  account: string | null
  chainId: string | null
  isConnected: boolean
  isInstalled: boolean
}

interface MetaMaskContextType extends MetaMaskState {
  connect: () => Promise<void>
  disconnect: () => void
  switchAccount: () => Promise<void>
}

const MetaMaskContext = createContext<MetaMaskContextType | undefined>(undefined)

export function MetaMaskProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<MetaMaskState>({
    account: null,
    chainId: null,
    isConnected: false,
    isInstalled: false,
  })

  useEffect(() => {
    if (typeof window === "undefined") return

    const ethereum = (window as any).ethereum
    const isInstalled = Boolean(ethereum && ethereum.isMetaMask)

    setState((prev) => ({ ...prev, isInstalled }))

    // Check if already connected
    if (ethereum && ethereum.isMetaMask) {
      ethereum
        .request({ method: "eth_accounts" })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            ethereum.request({ method: "eth_chainId" }).then((chainId: string) => {
              setState({
                account: accounts[0],
                chainId,
                isConnected: true,
                isInstalled: true,
              })
            })
          }
        })
        .catch(console.error)
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return

    const ethereum = (window as any).ethereum
    if (!ethereum) return

    const handleAccountsChanged = (accounts: string[]) => {
      console.log("[v0] MetaMask accounts changed:", accounts)
      if (accounts.length === 0) {
        setState((prev) => ({
          ...prev,
          account: null,
          isConnected: false,
        }))
      } else {
        setState((prev) => ({
          ...prev,
          account: accounts[0],
          isConnected: true,
        }))
      }
    }

    const handleChainChanged = (chainId: string) => {
      console.log("[v0] MetaMask chain changed:", chainId)
      setState((prev) => ({ ...prev, chainId }))
    }

    ethereum.on("accountsChanged", handleAccountsChanged)
    ethereum.on("chainChanged", handleChainChanged)

    return () => {
      ethereum.removeListener("accountsChanged", handleAccountsChanged)
      ethereum.removeListener("chainChanged", handleChainChanged)
    }
  }, [])

  const connect = async () => {
    if (typeof window === "undefined") return

    const ethereum = (window as any).ethereum

    if (!ethereum || !ethereum.isMetaMask) {
      alert("MetaMask is not installed. Please install MetaMask to continue.")
      window.open("https://metamask.io/download/", "_blank")
      return
    }

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      })
      const chainId = await ethereum.request({ method: "eth_chainId" })

      console.log("[v0] MetaMask connected:", accounts[0])

      setState({
        account: accounts[0],
        chainId,
        isConnected: true,
        isInstalled: true,
      })
    } catch (error: any) {
      console.error("Failed to connect:", error)
      alert(error.message || "Failed to connect to MetaMask")
    }
  }

  const disconnect = () => {
    console.log("[v0] MetaMask disconnected")
    setState({
      account: null,
      chainId: null,
      isConnected: false,
      isInstalled: state.isInstalled,
    })
  }

  const switchAccount = async () => {
    if (typeof window === "undefined") return

    const ethereum = (window as any).ethereum

    if (!ethereum || !ethereum.isMetaMask) {
      alert("MetaMask is not installed. Please install MetaMask to continue.")
      window.open("https://metamask.io/download/", "_blank")
      return
    }

    try {
      await ethereum.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      })

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      })
      const chainId = await ethereum.request({ method: "eth_chainId" })

      console.log("[v0] MetaMask account switched:", accounts[0])

      setState({
        account: accounts[0],
        chainId,
        isConnected: true,
        isInstalled: true,
      })
    } catch (error: any) {
      console.error("Failed to switch account:", error)
      if (error.code !== 4001) {
        alert(error.message || "Failed to switch account")
      }
    }
  }

  return (
    <MetaMaskContext.Provider
      value={{
        ...state,
        connect,
        disconnect,
        switchAccount,
      }}
    >
      {children}
    </MetaMaskContext.Provider>
  )
}

export function useMetaMaskContext() {
  const context = useContext(MetaMaskContext)
  if (context === undefined) {
    throw new Error("useMetaMaskContext must be used within a MetaMaskProvider")
  }
  return context
}
