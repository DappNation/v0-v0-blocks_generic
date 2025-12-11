import { NextResponse } from "next/server"
import { kv } from "@vercel/kv"
import type { Space } from "@/lib/types/space"

// GET /api/space?wallet=0x...
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const wallet = searchParams.get("wallet")

    if (!wallet) {
      return NextResponse.json({ error: "Wallet address required" }, { status: 400 })
    }

    const space = await kv.get<Space>(`space:${wallet}`)

    // Return empty space if none exists
    if (!space) {
      const emptySpace: Space = {
        walletAddress: wallet,
        baseWidth: 40,
        baseDepth: 40,
        placedBuilds: [],
        updatedAt: Date.now(),
      }
      return NextResponse.json({ space: emptySpace })
    }

    return NextResponse.json({ space })
  } catch (error) {
    console.error("[v0] Error fetching space:", error)
    return NextResponse.json({ error: "Failed to fetch space" }, { status: 500 })
  }
}

// POST /api/space
export async function POST(request: Request) {
  try {
    const space: Space = await request.json()

    if (!space.walletAddress) {
      return NextResponse.json({ error: "Wallet address required" }, { status: 400 })
    }

    // Update timestamp
    space.updatedAt = Date.now()

    // Save space
    await kv.set(`space:${space.walletAddress}`, space)

    return NextResponse.json({ success: true, space })
  } catch (error) {
    console.error("[v0] Error saving space:", error)
    return NextResponse.json({ error: "Failed to save space" }, { status: 500 })
  }
}
