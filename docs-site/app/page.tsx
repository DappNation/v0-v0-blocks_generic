import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { siteConfig } from "@/config/site"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center px-4">
          <h1 className="font-serif text-2xl font-bold">{siteConfig.name}</h1>
        </div>
      </header>

      <main className="flex-1">
        <div className="container mx-auto px-4 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-5xl font-bold tracking-tight sm:text-6xl">{siteConfig.name}</h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {siteConfig.description}. Build, compose, and own your creations on Ethereum with provably scarce building
              blocks.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/docs/overview"
                className="inline-flex items-center gap-2 rounded-md bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
              >
                Read the Docs
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={siteConfig.links.mainApp}
                className="text-sm font-medium leading-6 text-foreground hover:text-muted-foreground"
              >
                Launch App <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
