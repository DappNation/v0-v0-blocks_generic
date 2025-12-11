"use client"

import { Block } from "@/components/block"
import type { SpaceBuildInstance } from "@/lib/types/space"

type BuildPrefab3DProps = {
  instance: SpaceBuildInstance
  isHovered?: boolean
  isEraseMode?: boolean
  onClick?: () => void
}

export function BuildPrefab3D({ instance, isHovered, isEraseMode, onClick }: BuildPrefab3DProps) {
  const { bricks, position, rotationY } = instance

  return (
    <group
      position={position}
      rotation={[0, rotationY, 0]}
      onClick={(e) => {
        e.stopPropagation()
        if (onClick) onClick()
      }}
    >
      {bricks.map((brick, index) => (
        <Block
          key={index}
          color={brick.color}
          position={brick.position}
          width={brick.width}
          height={brick.height}
          isPlacing={isHovered || isEraseMode}
          opacity={isEraseMode ? 0.7 : 1}
        />
      ))}
    </group>
  )
}
