import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { DocsNav } from "@/components/docs-nav"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Documentation - ETHBLOX",
  description: "Complete documentation for the ETHBLOX protocol, builder interface, and smart contracts.",
}

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--ethblox-bg))]">
      <SiteHeader />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
            {/* Sidebar */}
            <DocsNav />

            {/* Main Content */}
            <div className="max-w-3xl">
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-heading font-bold text-[hsl(var(--ethblox-accent-yellow))] mb-4">
                    ETHBLOX Documentation
                  </h1>
                  <p className="text-lg text-[hsl(var(--ethblox-text-secondary))] leading-relaxed">
                    Welcome to the complete guide for building, creating, and understanding the ETHBLOX protocol.
                  </p>
                </div>

                {/* Quick Start Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Link
                    href="/docs/overview"
                    className="p-6 bg-[hsl(var(--ethblox-surface))] border border-[hsl(var(--ethblox-border))] rounded-lg hover:border-[hsl(var(--ethblox-accent-green))] transition-colors group"
                  >
                    <h3 className="text-xl font-heading font-semibold text-[hsl(var(--ethblox-accent-yellow))] mb-2 group-hover:text-[hsl(var(--ethblox-accent-green))]">
                      Getting Started
                    </h3>
                    <p className="text-[hsl(var(--ethblox-text-secondary))] text-sm">
                      Learn the basics, install MetaMask, and create your first build.
                    </p>
                  </Link>

                  <Link
                    href="/docs/building"
                    className="p-6 bg-[hsl(var(--ethblox-surface))] border border-[hsl(var(--ethblox-border))] rounded-lg hover:border-[hsl(var(--ethblox-accent-green))] transition-colors group"
                  >
                    <h3 className="text-xl font-heading font-semibold text-[hsl(var(--ethblox-accent-yellow))] mb-2 group-hover:text-[hsl(var(--ethblox-accent-green))]">
                      Builder Guide
                    </h3>
                    <p className="text-[hsl(var(--ethblox-text-secondary))] text-sm">
                      Master the 3D interface, keyboard shortcuts, and advanced techniques.
                    </p>
                  </Link>

                  <Link
                    href="/docs/protocol"
                    className="p-6 bg-[hsl(var(--ethblox-surface))] border border-[hsl(var(--ethblox-border))] rounded-lg hover:border-[hsl(var(--ethblox-accent-green))] transition-colors group"
                  >
                    <h3 className="text-xl font-heading font-semibold text-[hsl(var(--ethblox-accent-yellow))] mb-2 group-hover:text-[hsl(var(--ethblox-accent-green))]">
                      Protocol Docs
                    </h3>
                    <p className="text-[hsl(var(--ethblox-text-secondary))] text-sm">
                      Understand BLOX economics, Builder Weight, and matter physics.
                    </p>
                  </Link>

                  <Link
                    href="/docs/api"
                    className="p-6 bg-[hsl(var(--ethblox-surface))] border border-[hsl(var(--ethblox-border))] rounded-lg hover:border-[hsl(var(--ethblox-accent-green))] transition-colors group"
                  >
                    <h3 className="text-xl font-heading font-semibold text-[hsl(var(--ethblox-accent-yellow))] mb-2 group-hover:text-[hsl(var(--ethblox-accent-green))]">
                      API Reference
                    </h3>
                    <p className="text-[hsl(var(--ethblox-text-secondary))] text-sm">
                      Complete API documentation for developers and integrations.
                    </p>
                  </Link>
                </div>

                {/* Sections Overview */}
                <div className="space-y-6 pt-8 border-t border-[hsl(var(--ethblox-border))]">
                  <h2 className="text-2xl font-heading font-bold text-[hsl(var(--ethblox-accent-yellow))]">
                    Documentation Sections
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-[hsl(var(--ethblox-text-primary))] mb-2">Overview</h3>
                      <p className="text-[hsl(var(--ethblox-text-secondary))] text-sm">
                        Introduction to ETHBLOX, installation guide, and quick start tutorial.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-[hsl(var(--ethblox-text-primary))] mb-2">Building</h3>
                      <p className="text-[hsl(var(--ethblox-text-secondary))] text-sm">
                        Complete guide to the 3D builder interface, controls, and workflows.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-[hsl(var(--ethblox-text-primary))] mb-2">Protocol</h3>
                      <p className="text-[hsl(var(--ethblox-text-secondary))] text-sm">
                        Deep dive into BLOX economics, Builder Weight formula, and protocol mechanics.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-[hsl(var(--ethblox-text-primary))] mb-2">
                        Smart Contracts
                      </h3>
                      <p className="text-[hsl(var(--ethblox-text-secondary))] text-sm">
                        Contract interfaces, deployment addresses, and blockchain integration.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-[hsl(var(--ethblox-text-primary))] mb-2">Tokenomics</h3>
                      <p className="text-[hsl(var(--ethblox-text-secondary))] text-sm">
                        Token distribution, emissions schedule, and economic models.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-[hsl(var(--ethblox-text-primary))] mb-2">Gameplay</h3>
                      <p className="text-[hsl(var(--ethblox-text-secondary))] text-sm">
                        Quests, challenges, leaderboards, and community features.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
