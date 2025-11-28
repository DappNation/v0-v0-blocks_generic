import type { Brick } from "@/components/v0-blocks/events"

export type NftRenderConfig = {
  version: string
  sceneType: "ethblox-v0"
  buildId: string
  bricks: Brick[]
}

export function getNftRenderConfig(buildId: string, bricks: Brick[]): NftRenderConfig {
  return {
    version: "0.1",
    sceneType: "ethblox-v0",
    buildId,
    bricks,
  }
}
