"use client"

import { useState, useEffect } from "react"

interface MetaMaskState {
  account: string | null
  chainId: string | null
  isConnected: boolean
  isInstalled: boolean
}

export function useMetaMask() {
  const [state, setState] = useState<MetaMaskState>({
    account: null,
    chainId: null,
    isConnected: false,
    isInstalled: false,
  })

  useEffect(() => {
    if (typeof window === "undefined") return

    const checkMetaMask = () => {
      const ethereum = (window as any).ethereum
      setState((prev) => ({
        ...prev,
        isInstalled: Boolean(ethereum && ethereum.isMetaMask),
      }))
    }

    checkMetaMask()
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
    setState({
      account: null,
      chainId: null,
      isConnected: false,
      isInstalled: state.isInstalled,
    })
  }

  useEffect(() => {
    if (typeof window === "undefined") return

    const ethereum = (window as any).ethereum
    if (!ethereum) return

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnect()
      } else {
        setState((prev) => ({ ...prev, account: accounts[0], isConnected: true }))
      }
    }

    const handleChainChanged = (chainId: string) => {
      setState((prev) => ({ ...prev, chainId }))
    }

    ethereum.on("accountsChanged", handleAccountsChanged)
    ethereum.on("chainChanged", handleChainChanged)

    return () => {
      ethereum.removeListener("accountsChanged", handleAccountsChanged)
      ethereum.removeListener("chainChanged", handleChainChanged)
    }
  }, [])

  return {
    ...state,
    connect,
    disconnect,
  }
}
