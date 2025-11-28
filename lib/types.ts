import type { Brick } from "@/components/v0-blocks/events"

// BLOX - individual unit of digital matter
export type BloxUnit = {
  id: string
  x: number
  y: number
  z: number
  color: string // hex or palette key
}

// BUILD metadata with Builder Weight
export type BuildMetadata = {
  id: string
  name: string
  description?: string
  createdAt: string
  updatedAt: string
  mass: number // total BLOX count
  uniqueColors: number // diversity metric (proxy for mould diversity)
  bw: number // Builder Weight score
  isPublic?: boolean
}

// Complete BUILD structure
export type Build = {
  metadata: BuildMetadata
  blox: BloxUnit[]
}

// Legacy saved creation type (keeping for backwards compatibility)
export type SavedCreation = {
  id: string
  name: string
  bricks: Brick[]
  createdAt: number
  updatedAt: number
  baseSize?: number // Grid size for this build (optional for backwards compatibility)
  baseWidth?: number // New: separate width for rectangular bases
  baseDepth?: number // New: separate depth for rectangular bases
}

// Helper to convert Brick[] to BloxUnit[]
export function bricksToBlox(bricks: Brick[]): BloxUnit[] {
  return bricks.map((brick, index) => ({
    id: `blox-${index}-${Date.now()}`,
    x: brick.position[0],
    y: brick.position[1],
    z: brick.position[2],
    color: brick.color,
  }))
}

// Helper to convert BloxUnit[] back to Brick[]
export function bloxToBricks(blox: BloxUnit[]): Brick[] {
  return blox.map((unit) => ({
    position: [unit.x, unit.y, unit.z] as [number, number, number],
    color: unit.color,
  }))
}

// Calculate Builder Weight (BW)
export function calculateBW(mass: number, uniqueColors: number): number {
  return Math.log(1 + mass) * Math.log(2 + uniqueColors)
}

// ShapeUsage type and helper for on-chain rewards tracking
export type ShapeUsage = {
  shapeId: string
  width: number
  height: number // depth (Z)
  count: number
}

export function computeShapeUsage(bricks: Brick[]): ShapeUsage[] {
  const map = new Map<string, { width: number; height: number; count: number }>()

  for (const brick of bricks) {
    const width = brick.width
    const height = brick.height
    const shapeId = brick.shapeId ?? `rect-${width}x${height}`

    const existing = map.get(shapeId)
    if (existing) {
      existing.count += 1
    } else {
      map.set(shapeId, { width, height, count: 1 })
    }
  }

  return Array.from(map.entries()).map(([shapeId, { width, height, count }]) => ({
    shapeId,
    width,
    height,
    count,
  }))
}
