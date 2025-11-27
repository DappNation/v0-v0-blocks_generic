import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Palette, Lock } from "lucide-react"

export default function BricksPage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--ethblox-bg))] text-[hsl(var(--ethblox-text-primary))] flex flex-col">
      <SiteHeader />

      <main className="flex-1 container mx-auto px-6 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-heading tracking-tight mb-2">BRICKS</h1>
          <p className="text-[hsl(var(--ethblox-text-secondary))] leading-relaxed max-w-2xl">
            BRICKS are the visual DNA of ETHBLOX. License them, remix them, or build on top of designs others made
            famous. The more a mould is used, the more expensive it becomes.
          </p>
        </div>

        {/* Coming Soon Section */}
        <div className="max-w-3xl mx-auto py-12">
          <Card className="bg-[hsl(var(--ethblox-surface))] border-[hsl(var(--ethblox-border))]">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-[hsl(var(--ethblox-surface-elevated))] border border-[hsl(var(--ethblox-border))] flex items-center justify-center">
                  <Palette className="w-8 h-8 text-[hsl(var(--ethblox-accent-cyan))]" />
                </div>
              </div>
              <CardTitle className="text-[hsl(var(--ethblox-text-primary))] font-heading text-2xl">
                BRICKS Coming Soon
              </CardTitle>
              <CardDescription className="text-[hsl(var(--ethblox-text-secondary))] mt-4">
                The BRICKS marketplace is currently under development. Soon you'll be able to:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-[hsl(var(--ethblox-text-secondary))]">
                <li className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-[hsl(var(--ethblox-accent-cyan))] mt-0.5 flex-shrink-0" />
                  <span>License unique visual moulds created by other builders</span>
                </li>
                <li className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-[hsl(var(--ethblox-accent-cyan))] mt-0.5 flex-shrink-0" />
                  <span>Earn royalties when others use your BRICK designs</span>
                </li>
                <li className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-[hsl(var(--ethblox-accent-cyan))] mt-0.5 flex-shrink-0" />
                  <span>Track mould lineage and see how designs evolve</span>
                </li>
                <li className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-[hsl(var(--ethblox-accent-cyan))] mt-0.5 flex-shrink-0" />
                  <span>Watch prices rise as popular moulds gain cultural significance</span>
                </li>
              </ul>

              <div className="pt-6 text-center">
                <Link href="/build">
                  <Button className="bg-[hsl(var(--ethblox-accent-cyan))] hover:bg-[hsl(var(--ethblox-accent-cyan))]/90 text-[hsl(var(--ethblox-bg))] font-medium">
                    Start Building
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
