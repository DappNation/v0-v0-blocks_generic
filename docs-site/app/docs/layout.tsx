import type React from "react"
import Link from "next/link"
import { Github, ExternalLink } from "lucide-react"
import { DocsSidebar } from "@/components/docs-sidebar"
import { siteConfig } from "@/config/site"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Top Nav */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif text-xl font-bold">{siteConfig.name}</span>
          </Link>

          <nav className="flex items-center gap-4">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href={siteConfig.links.mainApp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              Main App
              <ExternalLink className="h-3 w-3" />
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto flex-1 px-4">
        <div className="flex gap-8 py-8">
          {/* Sidebar */}
          <aside className="w-64 shrink-0">
            <div className="sticky top-20">
              <DocsSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="mx-auto max-w-3xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  )
}
