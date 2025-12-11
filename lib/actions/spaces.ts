import { kv } from "@vercel/kv"
import type { BuildPrefab, Brick } from "@/lib/types/space"
import type { Build } from "@/lib/types"

export async function loadBuildPrefab(buildId: string): Promise<BuildPrefab | null> {
  try {
    // Try loading from the build:{id} key used by gallery
    const build = await kv.get<Build>(`build:${buildId}`)

    if (!build || !build.blox) {
      console.error("[v0] Build not found or has no geometry:", buildId)
      return null
    }

    // Convert BloxUnit[] to Brick[] for rendering
    const bricks: Brick[] = build.blox.map((unit) => ({
      color: unit.color,
      position: [unit.x, unit.y, unit.z] as [number, number, number],
      width: 1, // Default to 1×1 for now, can be extended
      height: 1,
    }))

    return {
      id: build.metadata.id,
      name: build.metadata.name,
      bricks,
    }
  } catch (error) {
    console.error("[v0] Error loading build prefab:", error)
    return null
  }
}
