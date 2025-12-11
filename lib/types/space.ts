// Space types - isolated from Build types

export type PlacedBuild = {
  buildId: string
  position: [number, number, number]
  rotation?: number // rotation in radians around Y axis
}

export type Space = {
  walletAddress: string
  baseWidth: number
  baseDepth: number
  placedBuilds: PlacedBuild[]
  updatedAt: number
}

export type SpaceWithDetails = Space & {
  buildDetails?: Array<{
    id: string
    name: string
    mass: number
  }>
}

import type { Brick } from "@/components/v0-blocks/events"

export type BuildPrefab = {
  id: string // build id from KV (build:{id})
  name: string
  bricks: Brick[]
}

export type SpaceBuildInstance = {
  instanceId: string // unique per instance (nanoid)
  buildId: string // foreign key → BuildPrefab.id
  name: string
  bricks: Brick[] // full geometry for rendering
  position: [number, number, number]
  rotationY: number
  createdAt: number
}
