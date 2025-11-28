"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MintPreviewCanvas } from "./mint-preview-canvas"
import { getNftRenderConfig } from "@/lib/nft-renderer-config"
import type { Brick } from "@/components/v0-blocks/events"
import { ChevronDown, ChevronUp } from "lucide-react"
import { bricksToBlox, calculateBW, type Build } from "@/lib/types"

export type MintBuildModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  buildId: string
  buildName: string
  totalBloxMass: number
  estimatedLicenseFeeEth: number
  estimatedBloxCost: number
  onConfirmMint?: () => void
  bricks: Brick[]
  gridWidth: number
  gridDepth: number
}

export function MintBuildModal({
  open,
  onOpenChange,
  buildId,
  buildName,
  totalBloxMass,
  estimatedLicenseFeeEth,
  estimatedBloxCost,
  onConfirmMint,
  bricks,
  gridWidth,
  gridDepth,
}: MintBuildModalProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [showJsonData, setShowJsonData] = useState(false)
  const [isMinting, setIsMinting] = useState(false)
  const [mintSuccess, setMintSuccess] = useState(false)
  const [mintError, setMintError] = useState<string | null>(null)

  const nftConfig = getNftRenderConfig(buildId, bricks)

  const estimatedApy = (totalBloxMass * 0.05).toFixed(2) // 5% per BLOX as example

  const handleScreenshotCaptured = (dataUrl: string) => {
    setScreenshot(dataUrl)
  }

  const handleConfirmMint = async () => {
    setIsMinting(true)
    setMintError(null)

    try {
      // Calculate unique colors
      const uniqueColors = new Set(bricks.map((b) => b.color)).size

      // Create Build object
      const build: Build = {
        metadata: {
          id: buildId,
          name: buildName,
          description: `A build with ${totalBloxMass} BLOX`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          mass: totalBloxMass,
          uniqueColors,
          bw: calculateBW(totalBloxMass, uniqueColors),
          isPublic: true,
        },
        blox: bricksToBlox(bricks),
      }

      // Publish to gallery
      const response = await fetch("/api/builds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(build),
      })

      if (!response.ok) {
        throw new Error("Failed to publish build")
      }

      console.log("[v0] Build successfully published to gallery:", buildId)
      setMintSuccess(true)

      // Close modal after 2 seconds
      setTimeout(() => {
        onConfirmMint?.()
        onOpenChange(false)
        // Reset state for next time
        setTimeout(() => {
          setMintSuccess(false)
        }, 500)
      }, 2000)
    } catch (error) {
      console.error("[v0] Error publishing build:", error)
      setMintError("Failed to publish build to gallery. Please try again.")
    } finally {
      setIsMinting(false)
    }
  }

  const totalCost = estimatedBloxCost + estimatedLicenseFeeEth

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-[28px]">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-white">Mint This Build</DialogTitle>
          <p className="text-sm text-gray-300">Review price and preview the final NFT before minting.</p>
        </DialogHeader>

        {mintSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-800 font-medium">✅ Build successfully published to the gallery!</p>
          </div>
        )}

        {mintError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800 font-medium">❌ {mintError}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Left column: Build details and pricing */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-white">Build Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Name:</span>
                  <span className="font-medium text-white">{buildName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Total BLOX Used:</span>
                  <span className="font-medium text-white">{totalBloxMass}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Estimated APY:</span>
                  <span className="font-medium text-green-400">{estimatedApy}%</span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <h3 className="text-lg font-semibold mb-2 text-white">Price Breakdown</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Estimated BLOX Locked:</span>
                  <span className="font-medium text-white">{estimatedBloxCost} BLOX</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Estimated License Fee:</span>
                  <span className="font-medium text-white">{estimatedLicenseFeeEth.toFixed(4)} ETH</span>
                </div>
                <div className="flex justify-between border-t border-gray-700 pt-2 font-bold">
                  <span className="text-white">Total Cost:</span>
                  <span className="text-white">
                    {estimatedBloxCost} BLOX + {estimatedLicenseFeeEth.toFixed(4)} ETH
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-xs text-yellow-800">
                💡 <strong>Note:</strong> These are estimated values. Actual costs will be determined at mint time based
                on current network conditions.
              </p>
            </div>
          </div>

          {/* Right column: Preview and tools */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-white">3D Preview</h3>
              <MintPreviewCanvas
                bricks={bricks}
                gridWidth={gridWidth}
                gridDepth={gridDepth}
                onScreenshotCaptured={handleScreenshotCaptured}
              />
              <p className="text-xs text-gray-400 mt-2">💡 Click and drag to rotate, scroll to zoom</p>
            </div>

            {screenshot && (
              <div>
                <h3 className="text-sm font-semibold mb-2 text-white">Captured Screenshot</h3>
                <div className="relative">
                  <img
                    src={screenshot || "/placeholder.svg"}
                    alt="Screenshot"
                    className="w-full h-32 object-cover rounded-lg border border-gray-700"
                  />
                  <a
                    href={screenshot}
                    download={`${buildName}-screenshot.png`}
                    className="absolute bottom-2 right-2 px-2 py-1 bg-black text-white text-xs rounded-full hover:bg-gray-800 transition-colors"
                  >
                    💾 Download
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 border-t border-gray-700 pt-4">
          <button
            onClick={() => setShowJsonData(!showJsonData)}
            className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            {showJsonData ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            Build JSON Data
          </button>

          {showJsonData && (
            <pre className="mt-2 p-3 bg-gray-100 rounded-lg text-xs text-black overflow-x-auto max-h-64 overflow-y-auto">
              {JSON.stringify(nftConfig, null, 2)}
            </pre>
          )}
        </div>

        <DialogFooter className="flex justify-end gap-3 mt-6">
          <Button onClick={() => onOpenChange(false)} variant="outline" className="rounded-full" disabled={isMinting}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirmMint}
            disabled={isMinting || mintSuccess}
            className="rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold disabled:opacity-50"
          >
            {isMinting ? "Publishing..." : mintSuccess ? "Published!" : "Confirm Mint"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
