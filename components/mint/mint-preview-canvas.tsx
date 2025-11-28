"use client"

import { useRef, useEffect } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Block } from "@/components/block"
import type { Brick } from "@/components/v0-blocks/events"
import { Platform } from "@/components/platform"

type MintPreviewCanvasProps = {
  bricks: Brick[]
  gridWidth: number
  gridDepth: number
  onScreenshotCaptured?: (dataUrl: string) => void
}

function PreviewScene({ bricks, gridWidth, gridDepth }: { bricks: Brick[]; gridWidth: number; gridDepth: number }) {
  const { camera } = useThree()

  useEffect(() => {
    // Auto-fit camera to show all bricks
    if (bricks.length > 0) {
      const maxDim = Math.max(
        ...bricks.flatMap((b) => [Math.abs(b.position[0]) + b.width / 2, Math.abs(b.position[2]) + b.height / 2]),
      )
      const distance = Math.max(15, maxDim * 2)
      camera.position.set(distance * 0.6, distance * 0.6, distance * 0.6)
      camera.lookAt(0, 0, 0)
    }
  }, [bricks, camera])

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} castShadow />
      <pointLight position={[-10, -10, -5]} intensity={0.3} />

      <Platform gridWidth={gridWidth} gridDepth={gridDepth} />

      {/* Render all bricks */}
      {bricks.map((brick, index) => (
        <Block
          key={index}
          color={brick.color}
          position={brick.position}
          width={brick.width}
          height={brick.height}
          isPlacing={false}
          opacity={1}
        />
      ))}
    </>
  )
}

export function MintPreviewCanvas({ bricks, gridWidth, gridDepth, onScreenshotCaptured }: MintPreviewCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleCaptureScreenshot = () => {
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL("image/png")
      onScreenshotCaptured?.(dataUrl)
    }
  }

  return (
    <div className="relative">
      <Canvas
        ref={canvasRef}
        shadows
        camera={{ position: [15, 15, 15], fov: 50 }}
        className="w-full aspect-square rounded-lg bg-gradient-to-br from-gray-100 to-gray-200"
        gl={{ preserveDrawingBuffer: true }}
      >
        <PreviewScene bricks={bricks} gridWidth={gridWidth} gridDepth={gridDepth} />
        <OrbitControls enableZoom={true} enablePan={false} />
      </Canvas>

      <button
        onClick={handleCaptureScreenshot}
        className="absolute bottom-2 right-2 px-3 py-1 bg-black text-white text-xs rounded-full hover:bg-gray-800 transition-colors"
      >
        📸 Capture Screenshot
      </button>
    </div>
  )
}
