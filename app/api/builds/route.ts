import { NextResponse } from "next/server"
import { kv } from "@vercel/kv"
import type { Build } from "@/lib/types"

// GET - Fetch recent public builds
export async function GET() {
  try {
    // Get list of public build IDs (sorted by timestamp)
    const buildIds = await kv.zrange("builds:public", 0, 49, { rev: true })

    if (!buildIds || buildIds.length === 0) {
      return NextResponse.json({ builds: [] })
    }

    // Fetch all builds
    const builds: Build[] = []
    for (const id of buildIds) {
      const build = await kv.get<Build>(`build:${id}`)
      if (build) {
        builds.push(build)
      }
    }

    return NextResponse.json({ builds })
  } catch (error) {
    console.error("[v0] Error fetching builds:", error)
    return NextResponse.json({ error: "Failed to fetch builds", builds: [] }, { status: 500 })
  }
}

// POST - Publish a new build to the gallery
export async function POST(request: Request) {
  try {
    const build: Build = await request.json()

    // Validate build data
    if (!build.metadata?.id || !build.blox || !Array.isArray(build.blox)) {
      return NextResponse.json({ error: "Invalid build data" }, { status: 400 })
    }

    // Store the build
    await kv.set(`build:${build.metadata.id}`, build)

    // Add to public index with timestamp as score
    const timestamp = new Date(build.metadata.createdAt).getTime()
    await kv.zadd("builds:public", { score: timestamp, member: build.metadata.id })

    return NextResponse.json({ success: true, buildId: build.metadata.id })
  } catch (error) {
    console.error("[v0] Error saving build:", error)
    return NextResponse.json({ error: "Failed to save build" }, { status: 500 })
  }
}
