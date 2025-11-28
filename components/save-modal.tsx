"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { saveCreation } from "@/lib/actions/save-creation"
import { updateCreation } from "@/lib/actions/update-creation"
import type { Brick } from "@/components/v0-blocks/events"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface SaveModalProps {
  isOpen: boolean
  onClose: () => void
  bricks: Brick[]
  currentId?: string
  currentName?: string
  baseWidth: number
  baseDepth: number
  walletAccount: string | null
  isWalletConnected: boolean
}

export const SaveModal: React.FC<SaveModalProps> = ({
  isOpen,
  onClose,
  bricks,
  currentId,
  currentName = "",
  baseWidth,
  baseDepth,
  walletAccount,
  isWalletConnected,
}) => {
  useEffect(() => {
    console.log("[v0] SaveModal wallet props:", { walletAccount, isWalletConnected })
  }, [walletAccount, isWalletConnected])

  const [name, setName] = useState(currentName)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    setName(currentName || "")
  }, [currentName])

  const handleSave = async () => {
    if (!isWalletConnected || !walletAccount) {
      setMessage("Please connect your wallet to save this build")
      setIsSuccess(false)
      return
    }

    if (!name.trim()) {
      setMessage("Please enter a name for your creation")
      setIsSuccess(false)
      return
    }

    setIsSaving(true)
    setMessage("")

    try {
      const result = currentId
        ? await updateCreation(currentId, name, bricks, baseWidth, baseDepth, walletAccount)
        : await saveCreation(name, bricks, baseWidth, baseDepth, walletAccount)

      setIsSuccess(result.success)
      setMessage(result.message || "")

      if (result.success) {
        setTimeout(() => {
          onClose()
        }, 1500)
      }
    } catch (error) {
      setIsSuccess(false)
      setMessage("An error occurred while saving")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md rounded-[28px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{currentId ? "Update Creation" : "Save Creation"}</DialogTitle>
        </DialogHeader>

        {!isWalletConnected && (
          <div className="mb-4 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
            <p className="text-sm text-yellow-800">⚠️ Connect your wallet to save this build</p>
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="creation-name" className="block text-sm font-medium text-black mb-1">
            Name
          </label>
          <input
            id="creation-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="My awesome creation"
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black text-black"
            disabled={isSaving}
          />
        </div>

        {message && (
          <div className={`mb-4 p-2 rounded ${isSuccess ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {message}
          </div>
        )}

        <DialogFooter className="flex justify-end gap-3">
          <Button onClick={onClose} variant="outline" className="rounded-full bg-transparent" disabled={isSaving}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="default"
            className="rounded-full bg-black hover:bg-gray-800"
            disabled={isSaving || !isWalletConnected || !walletAccount}
          >
            {isSaving ? "Saving..." : currentId ? "Update" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
