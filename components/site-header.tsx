"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { WalletConnect } from "@/components/wallet-connect"
import Image from "next/image"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[hsl(var(--ethblox-border))] bg-[hsl(var(--ethblox-bg))]/95 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-6 max-w-[1800px] mx-auto">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity group">
          <div className="relative w-6 h-6 group-hover:scale-105 transition-transform">
            <Image src="/images/ethblox-logo.png" alt="ETHBLOX" width={24} height={24} className="object-contain" />
          </div>
          <span className="text-sm font-heading font-semibold tracking-wider text-[hsl(var(--ethblox-yellow))]">
            ETHBLOX
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <Link href="/build">
            <Button
              variant="ghost"
              size="sm"
              className={`text-xs font-medium tracking-wide ${
                pathname === "/build"
                  ? "text-[hsl(var(--ethblox-accent-cyan))] bg-[hsl(var(--ethblox-surface))]"
                  : "text-[hsl(var(--ethblox-text-secondary))] hover:text-[hsl(var(--ethblox-text-primary))] hover:bg-[hsl(var(--ethblox-surface))]"
              }`}
            >
              BUILDER
            </Button>
          </Link>
          <Link href="/gallery">
            <Button
              variant="ghost"
              size="sm"
              className={`text-xs font-medium tracking-wide ${
                pathname === "/gallery"
                  ? "text-[hsl(var(--ethblox-accent-cyan))] bg-[hsl(var(--ethblox-surface))]"
                  : "text-[hsl(var(--ethblox-text-secondary))] hover:text-[hsl(var(--ethblox-text-primary))] hover:bg-[hsl(var(--ethblox-surface))]"
              }`}
            >
              GALLERY
            </Button>
          </Link>
          <Link href="/bricks">
            <Button
              variant="ghost"
              size="sm"
              className={`text-xs font-medium tracking-wide ${
                pathname === "/bricks"
                  ? "text-[hsl(var(--ethblox-accent-cyan))] bg-[hsl(var(--ethblox-surface))]"
                  : "text-[hsl(var(--ethblox-text-secondary))] hover:text-[hsl(var(--ethblox-text-primary))] hover:bg-[hsl(var(--ethblox-surface))]"
              }`}
            >
              BRICKS
            </Button>
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-xs font-medium tracking-wide h-9 px-3 bg-transparent text-[hsl(var(--ethblox-text-secondary))] hover:text-[hsl(var(--ethblox-text-primary))] hover:bg-[hsl(var(--ethblox-surface))] data-[state=open]:text-[hsl(var(--ethblox-accent-cyan))] data-[state=open]:bg-[hsl(var(--ethblox-surface))]">
                  CURVE GUIDES
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-48 p-2 bg-[hsl(var(--ethblox-surface-elevated))] border border-[hsl(var(--ethblox-border))]">
                    <Link href="/curve-guides?tab=left" legacyBehavior passHref>
                      <NavigationMenuLink className="block px-3 py-2 text-sm text-[hsl(var(--ethblox-text-primary))] hover:text-[hsl(var(--ethblox-accent-cyan))] hover:bg-[hsl(var(--ethblox-surface))] rounded transition-colors">
                        Left Curve
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/curve-guides?tab=mid" legacyBehavior passHref>
                      <NavigationMenuLink className="block px-3 py-2 text-sm text-[hsl(var(--ethblox-text-primary))] hover:text-[hsl(var(--ethblox-accent-cyan))] hover:bg-[hsl(var(--ethblox-surface))] rounded transition-colors">
                        Mid Curve
                      </NavigationMenuLink>
                    </Link>
                    <Link href="/curve-guides?tab=right" legacyBehavior passHref>
                      <NavigationMenuLink className="block px-3 py-2 text-sm text-[hsl(var(--ethblox-text-primary))] hover:text-[hsl(var(--ethblox-accent-cyan))] hover:bg-[hsl(var(--ethblox-surface))] rounded transition-colors">
                        Right Curve
                      </NavigationMenuLink>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <WalletConnect variant="compact" />
          </div>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-[hsl(var(--ethblox-text-primary))] hover:bg-[hsl(var(--ethblox-surface))] md:hidden"
              >
                <Menu className="w-5 h-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-80 bg-[hsl(var(--ethblox-surface))] border-l border-[hsl(var(--ethblox-border))]">
              <div className="flex flex-col gap-6 mt-8">
                {/* Mobile wallet */}
                <div className="space-y-3 pb-6 border-b border-[hsl(var(--ethblox-border))]">
                  <h3 className="text-xs uppercase tracking-wider text-[hsl(var(--ethblox-text-tertiary))] font-medium">
                    Wallet
                  </h3>
                  <WalletConnect />
                </div>

                {/* Mobile navigation */}
                <div className="space-y-3">
                  <h3 className="text-xs uppercase tracking-wider text-[hsl(var(--ethblox-text-tertiary))] font-medium">
                    Navigate
                  </h3>
                  <nav className="flex flex-col gap-1">
                    <Link
                      href="/"
                      className="text-sm text-[hsl(var(--ethblox-text-primary))] hover:text-[hsl(var(--ethblox-accent-cyan))] transition-colors py-2 px-3 rounded hover:bg-[hsl(var(--ethblox-surface-elevated))]"
                    >
                      Home
                    </Link>
                    <Link
                      href="/build"
                      className="text-sm text-[hsl(var(--ethblox-text-primary))] hover:text-[hsl(var(--ethblox-accent-cyan))] transition-colors py-2 px-3 rounded hover:bg-[hsl(var(--ethblox-surface-elevated))]"
                    >
                      Builder
                    </Link>
                    <Link
                      href="/gallery"
                      className="text-sm text-[hsl(var(--ethblox-text-primary))] hover:text-[hsl(var(--ethblox-accent-cyan))] transition-colors py-2 px-3 rounded hover:bg-[hsl(var(--ethblox-surface-elevated))]"
                    >
                      Gallery
                    </Link>
                    <Link
                      href="/bricks"
                      className="text-sm text-[hsl(var(--ethblox-text-primary))] hover:text-[hsl(var(--ethblox-accent-cyan))] transition-colors py-2 px-3 rounded hover:bg-[hsl(var(--ethblox-surface-elevated))]"
                    >
                      Bricks
                    </Link>
                    <div className="space-y-1">
                      <div className="text-xs uppercase tracking-wider text-[hsl(var(--ethblox-text-tertiary))] font-medium py-2 px-3">
                        Curve Guides
                      </div>
                      <Link
                        href="/curve-guides?tab=left"
                        className="text-sm text-[hsl(var(--ethblox-text-primary))] hover:text-[hsl(var(--ethblox-accent-cyan))] transition-colors py-2 px-6 rounded hover:bg-[hsl(var(--ethblox-surface-elevated))] block"
                      >
                        Left Curve
                      </Link>
                      <Link
                        href="/curve-guides?tab=mid"
                        className="text-sm text-[hsl(var(--ethblox-text-primary))] hover:text-[hsl(var(--ethblox-accent-cyan))] transition-colors py-2 px-6 rounded hover:bg-[hsl(var(--ethblox-surface-elevated))] block"
                      >
                        Mid Curve
                      </Link>
                      <Link
                        href="/curve-guides?tab=right"
                        className="text-sm text-[hsl(var(--ethblox-text-primary))] hover:text-[hsl(var(--ethblox-accent-cyan))] transition-colors py-2 px-6 rounded hover:bg-[hsl(var(--ethblox-surface-elevated))] block"
                      >
                        Right Curve
                      </Link>
                    </div>
                  </nav>
                </div>

                {/* Resources */}
                <div className="space-y-3">
                  <h3 className="text-xs uppercase tracking-wider text-[hsl(var(--ethblox-text-tertiary))] font-medium">
                    Resources
                  </h3>
                  <nav className="flex flex-col gap-1">
                    <a
                      href="https://ethblox.art/lightpaper"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[hsl(var(--ethblox-text-primary))] hover:text-[hsl(var(--ethblox-accent-cyan))] transition-colors py-2 px-3 rounded hover:bg-[hsl(var(--ethblox-surface-elevated))]"
                    >
                      Lightpaper
                    </a>
                    <a
                      href="https://docs.ethblox.art"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[hsl(var(--ethblox-text-primary))] hover:text-[hsl(var(--ethblox-accent-cyan))] transition-colors py-2 px-3 rounded hover:bg-[hsl(var(--ethblox-surface-elevated))]"
                    >
                      Docs
                    </a>
                  </nav>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
