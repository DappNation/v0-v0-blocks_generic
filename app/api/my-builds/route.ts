import { NextResponse } from "next/server"
import { kv } from "@vercel/kv"
import type { SavedCreation } from "@/lib/types"

// GET - Fetch user's saved creations
export async function GET() {
  try {
    // Get list of creation IDs (sorted by timestamp, newest first)
    const creationIds = await kv.zrange("creations", 0, 49, { rev: true })

    if (!creationIds || creationIds.length === 0) {
      return NextResponse.json({ creations: [] })
    }

    // Fetch all creations
    const creations: SavedCreation[] = []
    for (const id of creationIds) {
      const creationData = await kv.get(`creation:${id}`)
      if (creationData) {
        // Handle both string and object formats
        const creation =
          typeof creationData === "string"
            ? (JSON.parse(creationData) as SavedCreation)
            : (creationData as SavedCreation)
        creations.push(creation)
      }
    }

    return NextResponse.json({ creations })
  } catch (error) {
    console.error("[v0] Error fetching creations:", error)
    return NextResponse.json({ error: "Failed to fetch creations", creations: [] }, { status: 500 })
  }
}

// DELETE - Remove a saved creation
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Missing creation ID" }, { status: 400 })
    }

    // Remove from Redis
    await kv.del(`creation:${id}`)
    await kv.zrem("creations", id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error deleting creation:", error)
    return NextResponse.json({ error: "Failed to delete creation" }, { status: 500 })
  }
}
