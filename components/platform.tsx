"use client"

import type React from "react"
import { useMemo } from "react"
import * as THREE from "three"
import { Instances, Instance } from "@react-three/drei"
import { GROUND_HEIGHT, STUD_HEIGHT, STUD_RADIUS } from "@/lib/constants"

interface PlatformProps {
  gridSize: number
}

export const Platform: React.FC<PlatformProps> = ({ gridSize }) => {
  const studGeometry = useMemo(() => new THREE.CylinderGeometry(STUD_RADIUS, STUD_RADIUS, STUD_HEIGHT, 12), [])

  const studPositions = useMemo(() => {
    const positions = []
    for (let x = -gridSize / 2 + 0.5; x < gridSize / 2; x++) {
      for (let z = -gridSize / 2 + 0.5; z < gridSize / 2; z++) {
        positions.push([x, GROUND_HEIGHT / 2 + STUD_HEIGHT / 2, z])
      }
    }
    return positions
  }, [gridSize])

  return (
    <group>
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[gridSize, GROUND_HEIGHT, gridSize]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.1}
          metalness={0}
          transmission={0.9}
          transparent={true}
          opacity={0.3}
          thickness={0.5}
          ior={1.5}
        />
      </mesh>
      <Instances geometry={studGeometry} limit={gridSize * gridSize}>
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.2}
          metalness={0}
          transmission={0.7}
          transparent={true}
          opacity={0.4}
          ior={1.5}
        />
        {studPositions.map((pos, index) => (
          <Instance key={index} position={pos} castShadow receiveShadow />
        ))}
      </Instances>
    </group>
  )
}
