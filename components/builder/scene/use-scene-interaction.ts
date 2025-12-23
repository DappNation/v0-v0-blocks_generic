"use client"

import { useState, useRef, useEffect } from "react"
import type * as THREE from "three"
import { useThree } from "@react-three/fiber"
import { BRICK_HEIGHT, GROUND_HEIGHT } from "@/lib/constants"
import type { Brick } from "../events"

interface UseSceneInteractionProps {
  bricks: Brick[]
  width: number
  depth: number
  selectedColor: string
  onAddBrick: (brick: Brick) => void
  onDeleteBrick?: (index: number) => void
  isPlaying: boolean
  interactionMode: "build" | "move" | "erase"
  gridWidth: number
  gridDepth: number
}

export function useSceneInteraction({
  bricks,
  width,
  depth,
  selectedColor,
  onAddBrick,
  onDeleteBrick,
  isPlaying,
  interactionMode,
  gridWidth,
  gridDepth,
}: UseSceneInteractionProps) {
  const [currentBrickPosition, setCurrentBrickPosition] = useState<[number, number, number]>([
    0,
    GROUND_HEIGHT / 2 + BRICK_HEIGHT / 2,
    0,
  ])
  const [isPlacing, setIsPlacing] = useState(true)
  const [isValid, setIsValid] = useState(true)
  const [showNewBrick, setShowNewBrick] = useState(true)
  const [hoveredBrickIndex, setHoveredBrickIndex] = useState<number | null>(null)
  const [touchedBrickIndex, setTouchedBrickIndex] = useState<number | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const [touchStartPosition, setTouchStartPosition] = useState<{ x: number; y: number } | null>(null)
  const [hasMoved, setHasMoved] = useState(false)
  const touchMoveThreshold = 10

  const { camera, raycaster, mouse } = useThree()
  const planeRef = useRef<THREE.Mesh>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isPlaying) return

      if (event.key === "h" || event.key === "H") {
        setShowNewBrick((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isPlaying])

  return {
    currentBrickPosition,
    isValid,
    showNewBrick,
    hoveredBrickIndex: isMobile ? null : hoveredBrickIndex,
    touchedBrickIndex,
    handleClick: () => {},
    handleTouchStart: () => {},
    handleTouchMove: () => {},
    handleTouchEnd: () => {},
    handleBrickClick: () => {},
    planeRef,
  }
}
