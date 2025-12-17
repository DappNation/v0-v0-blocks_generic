"use client"

import type React from "react"
import { useRef, useMemo, useState, useEffect } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { Instances, Instance, useTexture, RoundedBox } from "@react-three/drei"
import {
  BRICK_HEIGHT,
  LAYER_GAP,
  STUD_HEIGHT,
  STUD_RADIUS,
  STUD_SEGMENTS,
  TEXTURES,
  USE_NEW_BRICK_STYLE,
  DOME_RADIUS,
  DOME_SEGMENTS,
  BRICK_CORNER_RADIUS,
} from "@/lib/constants"
import type { BlockProps } from "./types"

export const Block: React.FC<BlockProps> = ({
  color,
  position,
  width,
  height,
  isPlacing = false,
  opacity = 1,
  onClick,
}) => {
  const depth = height

  const blockGeometry = useMemo(() => new THREE.BoxGeometry(width, BRICK_HEIGHT - LAYER_GAP, depth), [width, depth])

  const studGeometry = useMemo(
    () =>
      USE_NEW_BRICK_STYLE
        ? new THREE.SphereGeometry(DOME_RADIUS, DOME_SEGMENTS, DOME_SEGMENTS / 2, 0, Math.PI * 2, 0, Math.PI / 2)
        : new THREE.CylinderGeometry(STUD_RADIUS, STUD_RADIUS, STUD_HEIGHT, STUD_SEGMENTS),
    [],
  )

  const studPositions = useMemo(() => {
    const positions = []
    const yOffset = USE_NEW_BRICK_STYLE
      ? (BRICK_HEIGHT - LAYER_GAP) / 2 // Position domes flush on the top surface
      : BRICK_HEIGHT / 2 - LAYER_GAP / 2 + STUD_HEIGHT / 2

    for (let x = -width / 2 + 0.5; x < width / 2; x++) {
      for (let z = -depth / 2 + 0.5; z < depth / 2; z++) {
        positions.push([x, yOffset, z])
      }
    }
    return positions
  }, [width, depth])

  const textures = useTexture(TEXTURES)

  const brickRef = useRef<THREE.Mesh>(null)
  const studRef = useRef<THREE.InstancedMesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const isEraseHighlight = isPlacing && onClick !== undefined

  useFrame((state) => {
    if (isPlacing && brickRef.current && studRef.current) {
      const glowColor = isEraseHighlight ? new THREE.Color(1, 0, 0) : new THREE.Color(1, 1, 0)
      const glowIntensity = Math.sin(state.clock.elapsedTime * 4) * 0.1 + 0.9

      brickRef.current.material.emissive.copy(glowColor)
      brickRef.current.material.emissiveIntensity = glowIntensity
      studRef.current.material.emissive.copy(glowColor)
      studRef.current.material.emissiveIntensity = glowIntensity
    }
  })

  const instanceLimit = useMemo(() => Math.max(width * depth, 100), [width, depth])

  const darkenedColor = useMemo(() => {
    if (isEraseHighlight) return "#ff0000"
    if (isPlacing) return "#ffff00"

    const hex = color.replace("#", "")
    const r = Number.parseInt(hex.substring(0, 2), 16)
    const g = Number.parseInt(hex.substring(2, 4), 16)
    const b = Number.parseInt(hex.substring(4, 6), 16)

    const darkenFactor = USE_NEW_BRICK_STYLE ? 0.95 : 0.9
    const newR = Math.floor(r * darkenFactor)
    const newG = Math.floor(g * darkenFactor)
    const newB = Math.floor(b * darkenFactor)

    return `#${newR.toString(16).padStart(2, "0")}${newG.toString(16).padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`
  }, [color, isPlacing, isEraseHighlight])

  const handleClick = (e: THREE.ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    if (onClick) onClick()
  }

  const isEraseMode = isEraseHighlight && isMobile

  const brickMaterial = USE_NEW_BRICK_STYLE
    ? {
        color: darkenedColor,
        roughness: 0.5,
        metalness: 0.05,
        normalMap: textures.normal,
        normalScale: new THREE.Vector2(0.3, 0.3), // Subtle normal variation
        emissive: isPlacing ? (isEraseHighlight ? "#ff0000" : "#ffff00") : "#000000",
        emissiveIntensity: isPlacing ? 1 : 0,
        transparent: opacity < 1,
        opacity: opacity,
        flatShading: false,
      }
    : {
        color: darkenedColor,
        roughnessMap: textures.roughness,
        normalMap: textures.normal,
        map: textures.color,
        roughness: 0.7,
        metalness: 0.1,
        emissive: isPlacing ? (isEraseHighlight ? "#ff0000" : "#ffff00") : "#000000",
        emissiveIntensity: isPlacing ? 1 : 0,
        transparent: opacity < 1,
        opacity: opacity,
      }

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={handleClick}
      onPointerDown={(e) => {
        if (isEraseMode && onClick) {
          e.stopPropagation()
          onClick()
        }
      }}
    >
      {USE_NEW_BRICK_STYLE ? (
        <RoundedBox
          ref={brickRef}
          args={[width, BRICK_HEIGHT - LAYER_GAP, depth]}
          radius={BRICK_CORNER_RADIUS}
          smoothness={4}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial {...brickMaterial} />
        </RoundedBox>
      ) : (
        <mesh ref={brickRef} geometry={blockGeometry} castShadow receiveShadow>
          <meshStandardMaterial {...brickMaterial} />
        </mesh>
      )}

      <Instances ref={studRef} geometry={studGeometry} limit={instanceLimit}>
        <meshStandardMaterial
          color={darkenedColor}
          roughness={USE_NEW_BRICK_STYLE ? 0.4 : 0.7}
          metalness={USE_NEW_BRICK_STYLE ? 0.05 : 0.1}
          normalMap={USE_NEW_BRICK_STYLE ? undefined : textures.normal}
          emissive={isPlacing ? (isEraseHighlight ? "#ff0000" : "#ffff00") : "#000000"}
          emissiveIntensity={isPlacing ? 1 : 0}
          transparent={opacity < 1}
          opacity={opacity}
        />
        {studPositions.map((pos, index) => (
          <Instance key={index} position={pos} castShadow receiveShadow />
        ))}
      </Instances>
    </group>
  )
}
