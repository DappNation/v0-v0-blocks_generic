"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Package, Download, Trash2, Wallet } from "lucide-react"
import type { SavedCreation } from "@/lib/types"

export default function MyBuildsPage() {
  const [builds, setBuilds] = useState<SavedCreation[]>([])
  const [loading, setLoading] = useState(true)
  const isConnected = false

  useEffect(() => {
    if (!isConnected) {
      setLoading(false)
      return
    }

    async function fetchMyBuilds() {
      try {
        const response = await fetch("/api/my-builds")
        if (response.ok) {
          const data = await response.json()
          setBuilds(data.creations || [])
        }
      } catch (error) {
        console.error("Failed to fetch my builds:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchMyBuilds()
  }, [isConnected])

  const handleLoadBuild = (creation: SavedCreation) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ethblox-load-creation", JSON.stringify(creation))
      window.location.href = "/build"
    }
  }

  const handleDeleteBuild = async (id: string) => {
    if (!confirm("Are you sure you want to delete this build?")) return

    try {
      const response = await fetch(`/api/my-builds?id=${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setBuilds((prev) => prev.filter((b) => b.id !== id))
      }
    } catch (error) {
      console.error("Failed to delete build:", error)
    }
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--ethblox-bg))] text-[hsl(var(--ethblox-text-primary))] flex flex-col">
      <SiteHeader />

      <main className="flex-1 container mx-auto px-6 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-heading tracking-tight mb-2">My Builds</h1>
          <p className="text-[hsl(var(--ethblox-text-secondary))]">Your saved creations and drafts</p>
        </div>

        {!isConnected ? (
          <div className="max-w-3xl mx-auto py-12">
            <Card className="bg-[hsl(var(--ethblox-surface))] border-[hsl(var(--ethblox-border))]">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-[hsl(var(--ethblox-surface-elevated))] border border-[hsl(var(--ethblox-accent-cyan))] flex items-center justify-center">
                    <Wallet className="w-8 h-8 text-[hsl(var(--ethblox-accent-cyan))]" />
                  </div>
                </div>
                <CardTitle className="text-[hsl(var(--ethblox-text-primary))] font-heading text-2xl">
                  Wallet Connection Coming Soon
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <p className="text-[hsl(var(--ethblox-text-secondary))]">
                  Wallet connectivity is being added. Soon you'll be able to connect your wallet to view and manage your
                  saved BUILDS with on-chain provenance.
                </p>
                <p className="text-sm text-[hsl(var(--ethblox-text-tertiary))]">
                  In the meantime, you can still build and save creations locally in the Builder.
                </p>
                <Link href="/build">
                  <Button className="bg-[hsl(var(--ethblox-accent-cyan))] hover:bg-[hsl(var(--ethblox-accent-cyan))]/90 text-[hsl(var(--ethblox-bg))] font-medium">
                    Enter Builder
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        ) : loading ? (
          <div className="text-center text-[hsl(var(--ethblox-text-secondary))]">Loading your builds...</div>
        ) : builds.length === 0 ? (
          <div className="max-w-3xl mx-auto py-12">
            <Card className="bg-[hsl(var(--ethblox-surface))] border-[hsl(var(--ethblox-border))]">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-[hsl(var(--ethblox-surface-elevated))] border border-[hsl(var(--ethblox-border))] flex items-center justify-center">
                    <Package className="w-8 h-8 text-[hsl(var(--ethblox-accent-cyan))]" />
                  </div>
                </div>
                <CardTitle className="text-[hsl(var(--ethblox-text-primary))] font-heading text-2xl">
                  No Builds Yet
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <p className="text-[hsl(var(--ethblox-text-secondary))]">
                  You haven't saved any builds yet. Start creating and save your first BUILD.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/build">
                    <Button className="bg-[hsl(var(--ethblox-accent-cyan))] hover:bg-[hsl(var(--ethblox-accent-cyan))]/90 text-[hsl(var(--ethblox-bg))] font-medium">
                      Enter Builder
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {builds.map((build) => (
              <Card
                key={build.id}
                className="bg-[hsl(var(--ethblox-surface))] border-[hsl(var(--ethblox-border))] hover:border-[hsl(var(--ethblox-accent-cyan))] transition-colors"
              >
                <CardHeader>
                  <CardTitle className="text-[hsl(var(--ethblox-text-primary))]">{build.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-[hsl(var(--ethblox-text-tertiary))] text-xs uppercase tracking-wider">
                        Blocks
                      </p>
                      <p className="text-[hsl(var(--ethblox-text-primary))] font-medium">{build.bricks.length}</p>
                    </div>
                    <div>
                      <p className="text-[hsl(var(--ethblox-text-tertiary))] text-xs uppercase tracking-wider">
                        Updated
                      </p>
                      <p className="text-[hsl(var(--ethblox-text-primary))] font-medium">
                        {new Date(build.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleLoadBuild(build)}
                      className="flex-1 bg-[hsl(var(--ethblox-accent-cyan))] hover:bg-[hsl(var(--ethblox-accent-cyan))]/90 text-[hsl(var(--ethblox-bg))] font-medium gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Load
                    </Button>
                    <Button
                      onClick={() => handleDeleteBuild(build.id)}
                      variant="outline"
                      className="border-[hsl(var(--ethblox-border))] hover:bg-red-500/10 hover:border-red-500 text-[hsl(var(--ethblox-text-primary))]"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
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
