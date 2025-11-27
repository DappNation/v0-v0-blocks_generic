"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Download } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import type { Build } from "@/lib/types"

export default function GalleryPage() {
  const [builds, setBuilds] = useState<Build[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBuilds() {
      try {
        const response = await fetch("/api/builds")
        if (response.ok) {
          const data = await response.json()
          setBuilds(data.builds || [])
        }
      } catch (error) {
        console.error("[v0] Failed to fetch builds:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchBuilds()
  }, [])

  const handleLoadBuild = async (build: Build) => {
    // Store in localStorage to be loaded by builder
    if (typeof window !== "undefined") {
      localStorage.setItem("ethblox-load-build", JSON.stringify(build))
      window.location.href = "/build"
    }
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--ethblox-bg))] text-[hsl(var(--ethblox-text-primary))] flex flex-col">
      <SiteHeader />

      {/* Gallery Grid */}
      <main className="flex-1 container mx-auto px-6 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-heading tracking-tight mb-2">Gallery</h1>
          <p className="text-[hsl(var(--ethblox-text-secondary))]">Explore public BUILDS from the ETHBLOX community</p>
        </div>

        {loading ? (
          <div className="text-center text-[hsl(var(--ethblox-text-secondary))]">Loading builds...</div>
        ) : builds.length === 0 ? (
          <div className="text-center text-[hsl(var(--ethblox-text-secondary))] space-y-4 py-12">
            <p>No public builds yet. Be the first to publish!</p>
            <Link href="/build">
              <Button className="bg-[hsl(var(--ethblox-accent-cyan))] hover:bg-[hsl(var(--ethblox-accent-cyan))]/90 text-[hsl(var(--ethblox-bg))] font-medium">
                Create Build
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {builds.map((build) => (
              <Card
                key={build.metadata.id}
                className="bg-[hsl(var(--ethblox-surface))] border-[hsl(var(--ethblox-border))] hover:border-[hsl(var(--ethblox-accent-cyan))] transition-colors"
              >
                <CardHeader>
                  <CardTitle className="text-[hsl(var(--ethblox-text-primary))]">{build.metadata.name}</CardTitle>
                  {build.metadata.description && (
                    <CardDescription className="text-[hsl(var(--ethblox-text-secondary))]">
                      {build.metadata.description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-[hsl(var(--ethblox-text-tertiary))] text-xs uppercase tracking-wider">Mass</p>
                      <p className="text-[hsl(var(--ethblox-text-primary))] font-medium">{build.metadata.mass} BLOX</p>
                    </div>
                    <div>
                      <p className="text-[hsl(var(--ethblox-text-tertiary))] text-xs uppercase tracking-wider">
                        BW Score
                      </p>
                      <p className="text-[hsl(var(--ethblox-accent-cyan))] font-medium">
                        {build.metadata.bw.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[hsl(var(--ethblox-text-tertiary))] text-xs uppercase tracking-wider">
                        Colors
                      </p>
                      <p className="text-[hsl(var(--ethblox-text-primary))] font-medium">
                        {build.metadata.uniqueColors}
                      </p>
                    </div>
                    <div>
                      <p className="text-[hsl(var(--ethblox-text-tertiary))] text-xs uppercase tracking-wider">
                        Created
                      </p>
                      <p className="text-[hsl(var(--ethblox-text-primary))] font-medium">
                        {new Date(build.metadata.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleLoadBuild(build)}
                    className="w-full bg-[hsl(var(--ethblox-accent-cyan))] hover:bg-[hsl(var(--ethblox-accent-cyan))]/90 text-[hsl(var(--ethblox-bg))] font-medium gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Load into Builder
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
