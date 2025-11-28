"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

export function SpaceBackground() {
  const starsRef = useRef<THREE.Points>(null)

  // Create star field
  const starCount = 2000
  const positions = new Float32Array(starCount * 3)
  const colors = new Float32Array(starCount * 3)

  for (let i = 0; i < starCount; i++) {
    // Randomly position stars in a large sphere
    const radius = 150 + Math.random() * 100
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(Math.random() * 2 - 1)

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = radius * Math.cos(phi)

    // Vary star colors (white to light blue/yellow)
    const colorVariation = Math.random()
    if (colorVariation > 0.95) {
      // Blue stars (rare)
      colors[i * 3] = 0.7 + Math.random() * 0.3
      colors[i * 3 + 1] = 0.8 + Math.random() * 0.2
      colors[i * 3 + 2] = 1.0
    } else if (colorVariation > 0.9) {
      // Yellow/orange stars (rare)
      colors[i * 3] = 1.0
      colors[i * 3 + 1] = 0.8 + Math.random() * 0.2
      colors[i * 3 + 2] = 0.6 + Math.random() * 0.2
    } else {
      // White stars (common)
      colors[i * 3] = 0.9 + Math.random() * 0.1
      colors[i * 3 + 1] = 0.9 + Math.random() * 0.1
      colors[i * 3 + 2] = 0.9 + Math.random() * 0.1
    }
  }

  // Slow rotation for subtle movement
  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0001
    }
  })

  return (
    <>
      {/* Deep space gradient background */}
      <color attach="background" args={["#000408"]} />

      {/* Stars */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={starCount} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={starCount} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.8} vertexColors transparent opacity={0.9} sizeAttenuation depthWrite={false} />
      </points>

      {/* Distant nebula glow */}
      <mesh position={[50, 30, -100]}>
        <sphereGeometry args={[40, 32, 32]} />
        <meshBasicMaterial color="#1a0d2e" transparent opacity={0.15} depthWrite={false} />
      </mesh>

      <mesh position={[-60, 20, -120]}>
        <sphereGeometry args={[35, 32, 32]} />
        <meshBasicMaterial color="#0f1e3a" transparent opacity={0.12} depthWrite={false} />
      </mesh>
    </>
  )
}
