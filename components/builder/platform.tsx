"use client"

import type React from "react"
import { useMemo } from "react"
import * as THREE from "three"
import { Instances, Instance } from "@react-three/drei"
import {
  GROUND_HEIGHT,
  STUD_HEIGHT,
  STUD_RADIUS,
  USE_NEW_BRICK_STYLE,
  BASE_PLATE_THICKNESS,
  BASE_DOME_RADIUS,
  BASE_DOME_HEIGHT,
  DOME_SEGMENTS,
} from "@/lib/constants"

interface PlatformProps {
  gridWidth: number
  gridDepth: number
}

export const Platform: React.FC<PlatformProps> = ({ gridWidth, gridDepth }) => {
  const studGeometry = useMemo(
    () =>
      USE_NEW_BRICK_STYLE
        ? new THREE.SphereGeometry(BASE_DOME_RADIUS, DOME_SEGMENTS, DOME_SEGMENTS / 2, 0, Math.PI * 2, 0, Math.PI / 2)
        : new THREE.CylinderGeometry(STUD_RADIUS, STUD_RADIUS, STUD_HEIGHT, 12),
    [],
  )

  const studPositions = useMemo(() => {
    const positions = []
    const plateHeight = USE_NEW_BRICK_STYLE ? BASE_PLATE_THICKNESS : GROUND_HEIGHT
    const yOffset = USE_NEW_BRICK_STYLE ? plateHeight / 2 + BASE_DOME_HEIGHT / 2 : plateHeight / 2 + STUD_HEIGHT / 2

    for (let x = -gridWidth / 2 + 0.5; x < gridWidth / 2; x++) {
      for (let z = -gridDepth / 2 + 0.5; z < gridDepth / 2; z++) {
        positions.push([x, yOffset, z])
      }
    }
    return positions
  }, [gridWidth, gridDepth])

  const plateHeight = USE_NEW_BRICK_STYLE ? BASE_PLATE_THICKNESS : GROUND_HEIGHT

  return (
    <group>
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[gridWidth, plateHeight, gridDepth]} />
        <meshPhysicalMaterial
          color={USE_NEW_BRICK_STYLE ? "#e8f4f8" : "#ffffff"}
          roughness={USE_NEW_BRICK_STYLE ? 0.4 : 0.1}
          metalness={0}
          transmission={USE_NEW_BRICK_STYLE ? 0.6 : 0.9}
          transparent={true}
          opacity={USE_NEW_BRICK_STYLE ? 0.5 : 0.3}
          thickness={USE_NEW_BRICK_STYLE ? 0.3 : 0.5}
          ior={1.5}
        />
      </mesh>

      <Instances geometry={studGeometry} limit={gridWidth * gridDepth}>
        <meshPhysicalMaterial
          color={USE_NEW_BRICK_STYLE ? "#d0e8f0" : "#ffffff"}
          roughness={USE_NEW_BRICK_STYLE ? 0.5 : 0.2}
          metalness={0}
          transmission={USE_NEW_BRICK_STYLE ? 0.4 : 0.7}
          transparent={true}
          opacity={USE_NEW_BRICK_STYLE ? 0.6 : 0.4}
          ior={1.5}
        />
        {studPositions.map((pos, index) => (
          <Instance key={index} position={pos} castShadow receiveShadow />
        ))}
      </Instances>
    </group>
  )
}
