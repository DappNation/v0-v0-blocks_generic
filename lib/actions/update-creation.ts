"use server"

import { kv } from "@vercel/kv"
import { revalidatePath } from "next/cache"
import type { Brick } from "@/components/v0-blocks/events"
import type { SavedCreation } from "../types"

export async function updateCreation(
  id: string,
  name: string,
  bricks: Brick[],
  baseWidth: number,
  baseDepth: number,
  walletAddress: string,
) {
  try {
    if (!walletAddress || walletAddress.trim() === "") {
      return { success: false, message: "Wallet not connected. Please connect your wallet to update." }
    }

    const existingCreationStr = await kv.get(`creation:${id}`)

    if (!existingCreationStr) {
      return { success: false, message: "Creation not found." }
    }

    const existingCreation =
      typeof existingCreationStr === "string" ? JSON.parse(existingCreationStr) : (existingCreationStr as SavedCreation)

    const timestamp = Date.now()

    const updatedCreation: SavedCreation = {
      ...existingCreation,
      name,
      bricks,
      updatedAt: timestamp,
      baseWidth,
      baseDepth,
      baseSize: baseWidth, // Keep for backward compatibility
    }

    await kv.set(`creation:${id}`, JSON.stringify(updatedCreation))

    await kv.zadd(`user:${walletAddress}:creations`, { score: timestamp, member: id })

    await kv.zadd("creations", { score: timestamp, member: id })

    revalidatePath("/")
    return { success: true, id, message: "Creation updated successfully!" }
  } catch (error) {
    console.error("Error updating creation:", error)
    return { success: false, message: "Failed to update creation." }
  }
}
