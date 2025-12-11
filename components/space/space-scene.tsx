"use client"

import { useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib"
import { Platform } from "@/components/platform"
import { LightingSetup } from "@/components/scene/lighting-setup"
import { SpaceBackground } from "@/components/scene/space-background"
import { BuildPrefab3D } from "./build-prefab-3d"
import type { SpaceBuildInstance } from "@/lib/types/space"

interface SpaceSceneProps {
  baseWidth: number
  baseDepth: number
  instances: SpaceBuildInstance[]
  selectedBuildId?: string
  onPlaceBuild?: (position: [number, number, number]) => void
  onRemoveBuild?: (instanceId: string) => void
  mode: "select" | "move" | "erase"
}

export function SpaceScene({
  baseWidth,
  baseDepth,
  instances,
  selectedBuildId,
  onPlaceBuild,
  onRemoveBuild,
  mode,
}: SpaceSceneProps) {
  const controlsRef = useRef<OrbitControlsImpl>(null)
  const [hoveredInstanceId, setHoveredInstanceId] = useState<string | null>(null)

  return (
    <Canvas
      camera={{
        position: [baseWidth * 0.6, baseWidth * 0.5, baseWidth * 0.6],
        fov: 50,
      }}
      shadows
      className="w-full h-full"
    >
      <SpaceBackground />
      <LightingSetup />

      <Platform gridWidth={baseWidth} gridDepth={baseDepth} />

      {instances.map((instance) => (
        <BuildPrefab3D
          key={instance.instanceId}
          instance={instance}
          isHovered={hoveredInstanceId === instance.instanceId}
          isEraseMode={mode === "erase" && hoveredInstanceId === instance.instanceId}
          onClick={() => {
            if (mode === "erase" && onRemoveBuild) {
              onRemoveBuild(instance.instanceId)
            }
          }}
        />
      ))}

      {/* Ghost build when selecting - simple placeholder */}
      {mode === "select" && selectedBuildId && (
        <mesh position={[0, 1, 0]} castShadow>
          <boxGeometry args={[2, 2, 2]} />
          <meshPhysicalMaterial color="#44ff88" transparent opacity={0.3} />
        </mesh>
      )}

      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.05}
        enabled={mode === "move"}
        minDistance={10}
        maxDistance={baseWidth * 2}
        maxPolarAngle={Math.PI / 2.1}
      />

      {/* Invisible plane for click detection */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        onClick={(e) => {
          if (mode === "select" && selectedBuildId && onPlaceBuild) {
            const [x, , z] = e.point.toArray()
            onPlaceBuild([Math.round(x), 1, Math.round(z)])
          }
        }}
      >
        <planeGeometry args={[baseWidth, baseDepth]} />
        <meshBasicMaterial visible={false} />
      </mesh>
    </Canvas>
  )
}
