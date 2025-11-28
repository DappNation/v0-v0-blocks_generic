"use server"

import { kv } from "@vercel/kv"
import { revalidatePath } from "next/cache"
import type { Brick } from "@/components/v0-blocks/events"
import type { SavedCreation } from "../types"

export async function updateCreation(
  id: string,
  name: string,
  bricks: Brick[],
  baseSize: number,
  walletAddress?: string,
) {
  try {
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
      baseSize, // Update baseSize when saving over existing creation
    }

    await kv.set(`creation:${id}`, JSON.stringify(updatedCreation))

    if (walletAddress) {
      await kv.zadd(`user:${walletAddress}:creations`, { score: timestamp, member: id })
    }

    await kv.zadd("creations", { score: timestamp, member: id })

    revalidatePath("/")
    return { success: true, id, message: "Creation updated successfully!" }
  } catch (error) {
    console.error("Error updating creation:", error)
    return { success: false, message: "Failed to update creation." }
  }
}
