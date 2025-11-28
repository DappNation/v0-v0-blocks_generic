"use server"

import { kv } from "@vercel/kv"
import { nanoid } from "nanoid"
import { revalidatePath } from "next/cache"
import type { Brick } from "@/components/v0-blocks/events"
import type { SavedCreation } from "../types"

export async function saveCreation(
  name: string,
  bricks: Brick[],
  baseWidth: number,
  baseDepth: number,
  walletAddress: string,
) {
  try {
    if (!walletAddress || walletAddress.trim() === "") {
      return { success: false, message: "Wallet not connected. Please connect your wallet to save." }
    }

    const id = nanoid(10)
    const timestamp = Date.now()

    const creation: SavedCreation = {
      id,
      name,
      bricks,
      createdAt: timestamp,
      updatedAt: timestamp,
      baseWidth,
      baseDepth,
      baseSize: baseWidth, // Keep for backward compatibility
    }

    await kv.set(`creation:${id}`, JSON.stringify(creation))

    await kv.zadd(`user:${walletAddress}:creations`, { score: timestamp, member: id })

    await kv.zadd("creations", { score: timestamp, member: id })

    revalidatePath("/")
    return { success: true, id, message: "Creation saved successfully!" }
  } catch (error) {
    console.error("Error saving creation:", error)
    return { success: false, message: "Failed to save creation." }
  }
}
