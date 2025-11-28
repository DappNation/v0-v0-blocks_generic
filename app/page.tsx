import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ArrowRight, Cable as Cube, Grid3x3, Package, Zap, TrendingUp, Bot, Code2 } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--ethblox-bg))] text-[hsl(var(--ethblox-text-primary))]">
      <SiteHeader />

      <main className="pt-14">
        <section className="container mx-auto px-6 max-w-[1800px] py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="space-y-6">
                <h1 className="text-8xl md:text-9xl font-heading font-bold tracking-tighter leading-none text-[hsl(var(--ethblox-yellow))]">
                  ETHBLOX
                </h1>
                <p className="text-xl md:text-2xl text-[hsl(var(--ethblox-text-primary))] font-light leading-relaxed">
                  Programmable matter for Ethereum&rsquo;s next cultural era.
                </p>
                <p className="text-base text-[hsl(var(--ethblox-text-secondary))] leading-relaxed max-w-xl">
                  3D on-chain art, programmable matter, AI-native agents & a circular economy for Ethereum&rsquo;s
                  evolving creative frontier.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/whitepaper">
                  <Button
                    size="lg"
                    className="bg-[hsl(var(--ethblox-green))] hover:bg-[hsl(var(--ethblox-green))]/90 text-[hsl(var(--ethblox-bg))] font-heading font-semibold px-6 gap-2 ethblox-glow"
                  >
                    READ THE PAPER
                  </Button>
                </Link>
                <Link href="/build">
                  <Button
                    size="lg"
                    className="bg-[hsl(var(--ethblox-yellow))] hover:bg-[hsl(var(--ethblox-yellow))]/90 text-[hsl(var(--ethblox-bg))] font-heading font-semibold px-6 gap-2 ethblox-glow"
                  >
                    BUILD NOW
                  </Button>
                </Link>
                <a href="https://discord.gg/ethblox" target="_blank" rel="noopener noreferrer">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-[hsl(var(--ethblox-border))] hover:border-[hsl(var(--ethblox-accent-cyan))] hover:bg-[hsl(var(--ethblox-surface))] text-[hsl(var(--ethblox-text-primary))] px-6 bg-transparent"
                  >
                    JOIN BUILDERS CIRCLE
                  </Button>
                </a>
              </div>

              <div className="text-sm text-[hsl(var(--ethblox-text-secondary))] leading-relaxed max-w-xl pt-4 border-t border-[hsl(var(--ethblox-border))]">
                ETHBLOX is a physics-driven creative substrate for Ethereum — a place where matter, shape, and
                reputation converge into a living cultural economy.
              </div>
            </div>

            <div className="relative aspect-square rounded border border-[hsl(var(--ethblox-border))] overflow-hidden ethblox-glow">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-80"
                style={{ filter: "contrast(1.1) brightness(0.9)" }}
              >
                <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screen%20Recording%202025-11-28%20at%202.57.04%20am-bljZ6a35yqhhTBMkK6IXjulErdgWRq.mp4#t=0.001" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ethblox-bg))] via-transparent to-transparent" />
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 max-w-[1800px] py-32 border-t border-[hsl(var(--ethblox-border))]">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-heading font-bold tracking-tight mb-6">
              A Universe Made of Three Primitives
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-6 p-8 rounded border border-[hsl(var(--ethblox-border))] bg-[hsl(var(--ethblox-surface))] hover:border-[hsl(var(--ethblox-accent-cyan))] transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded border border-[hsl(var(--ethblox-border))] bg-[hsl(var(--ethblox-bg))]">
                  <Cube className="w-6 h-6 text-[hsl(var(--ethblox-accent-cyan))]" />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-[hsl(var(--ethblox-text-primary))]">BLOX</h3>
                  <p className="text-xs text-[hsl(var(--ethblox-text-tertiary))] uppercase tracking-wider">
                    ERC20 · Digital Matter
                  </p>
                </div>
              </div>
              <p className="text-sm text-[hsl(var(--ethblox-text-secondary))] leading-relaxed">
                Scarce, conserved, valuable. Everything is built from BLOX. Lock BLOX into BUILDS → destroy → recover
                80%. Matter becomes a cultural resource shaped by human imagination.
              </p>
            </div>

            <div className="space-y-6 p-8 rounded border border-[hsl(var(--ethblox-border))] bg-[hsl(var(--ethblox-surface))] hover:border-[hsl(var(--ethblox-accent-cyan))] transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded border border-[hsl(var(--ethblox-border))] bg-[hsl(var(--ethblox-bg))]">
                  <Grid3x3 className="w-6 h-6 text-[hsl(var(--ethblox-accent-cyan))]" />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-[hsl(var(--ethblox-text-primary))]">BRICKS</h3>
                  <p className="text-xs text-[hsl(var(--ethblox-text-tertiary))] uppercase tracking-wider">
                    ERC721 Moulds · Geometry
                  </p>
                </div>
              </div>
              <p className="text-sm text-[hsl(var(--ethblox-text-secondary))] leading-relaxed">
                The canonical shape vocabulary. Each mould has a usage curve; higher demand → higher licence cost. ETH
                licence fees split: 50% creator / 30% protocol-owned liquidity / 20% treasury.
              </p>
            </div>

            <div className="space-y-6 p-8 rounded border border-[hsl(var(--ethblox-border))] bg-[hsl(var(--ethblox-surface))] hover:border-[hsl(var(--ethblox-accent-cyan))] transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded border border-[hsl(var(--ethblox-border))] bg-[hsl(var(--ethblox-bg))]">
                  <Package className="w-6 h-6 text-[hsl(var(--ethblox-accent-cyan))]" />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-[hsl(var(--ethblox-text-primary))]">BUILDS</h3>
                  <p className="text-xs text-[hsl(var(--ethblox-text-tertiary))] uppercase tracking-wider">
                    ERC721/1155 · Artifacts
                  </p>
                </div>
              </div>
              <p className="text-sm text-[hsl(var(--ethblox-text-secondary))] leading-relaxed">
                Voxel sculptures made of actual BLOX. Each BUILD stores mass, mould lineage, provenance & Builder
                Weight. The whole system is simply: BLOX + BRICKS → BUILDS.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 max-w-[1800px] py-32 border-t border-[hsl(var(--ethblox-border))]">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-5xl md:text-6xl font-heading font-bold tracking-tight">
              Not a Metaverse — A New On-Chain Art Primitive
            </h2>
            <p className="text-lg text-[hsl(var(--ethblox-text-secondary))] leading-relaxed max-w-2xl mx-auto">
              No land sales. No avatars. No VR. ETHBLOX is a cultural physics engine disguised as a toy — a way to
              sculpt 3D artifacts on-chain with real constraints, real economics, and real history.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-6 max-w-[1800px] py-32 border-t border-[hsl(var(--ethblox-border))]">
          <div className="space-y-12">
            <div className="max-w-3xl">
              <h2 className="text-5xl md:text-6xl font-heading font-bold tracking-tight mb-6">
                Genesis BRICKS: Ethereum&rsquo;s First Shapes
              </h2>
              <p className="text-lg text-[hsl(var(--ethblox-text-secondary))] leading-relaxed mb-4">
                210 foundational moulds form the base vocabulary of a new creative era.
              </p>
              <p className="text-sm text-[hsl(var(--ethblox-text-tertiary))] leading-relaxed">
                From these emerge the early monuments — fossils of a future medium
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "ETHBLOX DOGE",
                "ETHBLOX PEPE",
                "ETHBLOX PUNKS",
                "First 67-BLOX statue",
                "Tony Hawk skateboard",
                "Beeple x ETHBLOX installation",
                "The first BLOX David",
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 rounded border border-[hsl(var(--ethblox-border))] bg-[hsl(var(--ethblox-surface))] hover:border-[hsl(var(--ethblox-accent-cyan))] transition-all duration-300"
                >
                  <div className="text-sm font-heading font-semibold text-[hsl(var(--ethblox-text-primary))]">
                    {item}
                  </div>
                  <div className="text-xs text-[hsl(var(--ethblox-text-tertiary))] mt-1 font-mono">Coming Soon</div>
                </div>
              ))}
            </div>

            <div className="text-center pt-8">
              <Link href="/bricks">
                <Button
                  size="lg"
                  className="bg-[hsl(var(--ethblox-accent-cyan))] hover:bg-[hsl(var(--ethblox-accent-cyan))]/90 text-[hsl(var(--ethblox-bg))] font-heading font-semibold px-8 gap-2 ethblox-glow"
                >
                  EXPLORE GENESIS BRICKS
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 max-w-[1800px] py-32 border-t border-[hsl(var(--ethblox-border))]">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded border border-[hsl(var(--ethblox-border))] bg-[hsl(var(--ethblox-surface))]">
                    <TrendingUp className="w-6 h-6 text-[hsl(var(--ethblox-accent-cyan))]" />
                  </div>
                  <h2 className="text-5xl font-heading font-bold tracking-tight">Builder Weight</h2>
                </div>
                <p className="text-lg text-[hsl(var(--ethblox-text-secondary))] leading-relaxed">
                  Builder Weight measures creative complexity:
                </p>
              </div>

              <div className="p-6 rounded border border-[hsl(var(--ethblox-accent-cyan))]/30 bg-[hsl(var(--ethblox-surface))] font-mono text-center">
                <div className="text-xl text-[hsl(var(--ethblox-accent-cyan))]">
                  BW = log(1 + mass) × log(2 + mouldDiversity)
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--ethblox-accent-cyan))] mt-2" />
                  <p className="text-sm text-[hsl(var(--ethblox-text-secondary))] leading-relaxed">
                    Higher BW → larger share of ETH rewards
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--ethblox-accent-cyan))] mt-2" />
                  <p className="text-sm text-[hsl(var(--ethblox-text-secondary))] leading-relaxed">
                    Rewards come from mould licence revenue
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--ethblox-accent-cyan))] mt-2" />
                  <p className="text-sm text-[hsl(var(--ethblox-text-secondary))] leading-relaxed">
                    No token staking — only creativity is staked
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--ethblox-accent-cyan))] mt-2" />
                  <p className="text-sm text-[hsl(var(--ethblox-text-secondary))] leading-relaxed">
                    Artistic depth becomes economically meaningful
                  </p>
                </div>
              </div>
            </div>

            <div className="p-12 rounded border border-[hsl(var(--ethblox-border))] bg-[hsl(var(--ethblox-surface))]">
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="text-6xl font-heading font-bold text-[hsl(var(--ethblox-accent-cyan))]">42.7</div>
                  <div className="text-sm text-[hsl(var(--ethblox-text-tertiary))] uppercase tracking-wider">
                    Example Builder Weight
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[hsl(var(--ethblox-border))]">
                  <div className="text-center space-y-1">
                    <div className="text-2xl font-heading font-bold text-[hsl(var(--ethblox-text-primary))]">127</div>
                    <div className="text-xs text-[hsl(var(--ethblox-text-tertiary))] uppercase tracking-wider">
                      BLOX Mass
                    </div>
                  </div>
                  <div className="text-center space-y-1">
                    <div className="text-2xl font-heading font-bold text-[hsl(var(--ethblox-text-primary))]">8</div>
                    <div className="text-xs text-[hsl(var(--ethblox-text-tertiary))] uppercase tracking-wider">
                      Mould Types
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 max-w-[1800px] py-32 border-t border-[hsl(var(--ethblox-border))]">
          <div className="space-y-16">
            <div className="text-center space-y-6">
              <h2 className="text-5xl md:text-6xl font-heading font-bold tracking-tight">
                Circular Economy — Zero Emissions, Pure Usage
              </h2>
              <p className="text-lg text-[hsl(var(--ethblox-text-secondary))] leading-relaxed max-w-2xl mx-auto">
                Usage generates ETH fees → routed through the Liquidity Engine → deepens liquidity → drives more usage.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center space-y-4 p-8 rounded border border-[hsl(var(--ethblox-border))] bg-[hsl(var(--ethblox-surface))]">
                <div className="text-4xl font-heading font-bold text-[hsl(var(--ethblox-accent-cyan))]">50%</div>
                <div className="text-sm font-heading font-semibold text-[hsl(var(--ethblox-text-primary))]">
                  Mould Creator
                </div>
                <div className="text-xs text-[hsl(var(--ethblox-text-tertiary))]">Perpetual royalties</div>
              </div>

              <div className="text-center space-y-4 p-8 rounded border border-[hsl(var(--ethblox-border))] bg-[hsl(var(--ethblox-surface))]">
                <div className="text-4xl font-heading font-bold text-[hsl(var(--ethblox-accent-cyan))]">30%</div>
                <div className="text-sm font-heading font-semibold text-[hsl(var(--ethblox-text-primary))]">
                  Protocol Liquidity
                </div>
                <div className="text-xs text-[hsl(var(--ethblox-text-tertiary))]">Owned by protocol</div>
              </div>

              <div className="text-center space-y-4 p-8 rounded border border-[hsl(var(--ethblox-border))] bg-[hsl(var(--ethblox-surface))]">
                <div className="text-4xl font-heading font-bold text-[hsl(var(--ethblox-accent-cyan))]">20%</div>
                <div className="text-sm font-heading font-semibold text-[hsl(var(--ethblox-text-primary))]">
                  Treasury
                </div>
                <div className="text-xs text-[hsl(var(--ethblox-text-tertiary))]">Growth & grants</div>
              </div>
            </div>

            <div className="text-center space-y-4 pt-8">
              <div className="text-sm text-[hsl(var(--ethblox-text-tertiary))] uppercase tracking-wider font-medium">
                No inflation. No farming. Culture powers the economy.
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 max-w-[1800px] py-32 border-t border-[hsl(var(--ethblox-border))]">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 p-12 rounded border border-[hsl(var(--ethblox-border))] bg-[hsl(var(--ethblox-surface))]">
              <div className="flex items-center justify-center">
                <Bot className="w-32 h-32 text-[hsl(var(--ethblox-accent-cyan))]/30" />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded border border-[hsl(var(--ethblox-border))] bg-[hsl(var(--ethblox-surface))]">
                  <Bot className="w-6 h-6 text-[hsl(var(--ethblox-accent-cyan))]" />
                </div>
                <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">
                  AI-Native Builders: Legoman Agents Arrive
                </h2>
              </div>

              <p className="text-lg text-[hsl(var(--ethblox-text-secondary))] leading-relaxed">
                ETHBLOX becomes a collaborative sculpting field where intelligent agents:
              </p>

              <div className="space-y-3">
                {[
                  "Generate builds",
                  "Remix human creations",
                  "Optimize Builder Weight",
                  "Arbitrage mould curves",
                  "Execute creative jobs",
                  "Co-create with humans in real time",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--ethblox-accent-cyan))]" />
                    <p className="text-sm text-[hsl(var(--ethblox-text-secondary))]">{item}</p>
                  </div>
                ))}
              </div>

              <p className="text-sm text-[hsl(var(--ethblox-text-tertiary))] italic pt-4">
                A living ecology of human + AI creativity.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 max-w-[1800px] py-32 border-t border-[hsl(var(--ethblox-border))]">
          <div className="space-y-12">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded border border-[hsl(var(--ethblox-border))] bg-[hsl(var(--ethblox-surface))]">
                  <Code2 className="w-6 h-6 text-[hsl(var(--ethblox-accent-cyan))]" />
                </div>
                <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">
                  ETHBLOX API — A Playground for Quantitative Creativity
                </h2>
              </div>
              <p className="text-lg text-[hsl(var(--ethblox-text-secondary))] leading-relaxed">
                Where DeFi sensibilities meet digital craftsmanship.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Mould & licence arbitrage",
                "Discovering undervalued BUILDS",
                "Build-based trading strategies",
                "AI-driven creative jobs",
                "Simulation-based workflows",
                "Real-time market analysis",
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 rounded border border-[hsl(var(--ethblox-border))] bg-[hsl(var(--ethblox-surface))] hover:border-[hsl(var(--ethblox-accent-cyan))] transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <Zap className="w-4 h-4 text-[hsl(var(--ethblox-accent-cyan))]" />
                    <div className="text-sm font-heading font-semibold text-[hsl(var(--ethblox-text-primary))]">
                      {item}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 max-w-[1800px] py-32 border-t border-[hsl(var(--ethblox-border))]">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-5xl md:text-6xl font-heading font-bold tracking-tight">Why Now?</h2>
            <p className="text-xl text-[hsl(var(--ethblox-text-secondary))] leading-relaxed">
              Ethereum needs a new artistic language — simple, expressive, economically alive. A toy with gravitas. A
              protocol with delight. ETHBLOX becomes the creative furnace of Ethereum&rsquo;s next cultural cycle.
            </p>
            <div className="pt-8">
              <Link href="/build">
                <Button
                  size="lg"
                  className="bg-[hsl(var(--ethblox-accent-cyan))] hover:bg-[hsl(var(--ethblox-accent-cyan))]/90 text-[hsl(var(--ethblox-bg))] font-heading font-semibold px-12 gap-2 ethblox-glow"
                >
                  START BUILDING
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
