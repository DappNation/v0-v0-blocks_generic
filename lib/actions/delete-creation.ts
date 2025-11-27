"use server"

import { kv } from "@vercel/kv"
import { revalidatePath } from "next/cache"

// Delete a creation
export async function deleteCreation(id: string, walletAddress?: string) {
  try {
    // Delete from Redis
    await kv.del(`creation:${id}`)

    if (walletAddress) {
      await kv.zrem(`user:${walletAddress}:creations`, id)
    }

    // Remove from global sorted set
    await kv.zrem("creations", id)

    revalidatePath("/")
    return { success: true, message: "Creation deleted successfully!" }
  } catch (error) {
    console.error("Error deleting creation:", error)
    return { success: false, message: "Failed to delete creation." }
  }
}
