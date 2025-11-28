"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const docsNav = [
  {
    title: "Getting Started",
    items: [
      { title: "Overview", href: "/docs/overview" },
      { title: "Protocol", href: "/docs/protocol" },
    ],
  },
  {
    title: "Guides",
    items: [
      { title: "Building", href: "/docs/building" },
      { title: "Tokenomics", href: "/docs/tokenomics" },
      { title: "Gameplay", href: "/docs/gameplay" },
    ],
  },
  {
    title: "Reference",
    items: [
      { title: "Smart Contracts", href: "/docs/smart-contracts" },
      { title: "API", href: "/docs/api" },
      { title: "FAQ", href: "/docs/faq" },
      { title: "Changelog", href: "/docs/changelog" },
    ],
  },
]

export function DocsNav() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto">
      <div className="space-y-8">
        {docsNav.map((section) => (
          <div key={section.title}>
            <h4 className="text-sm font-semibold text-[hsl(var(--ethblox-text-primary))] mb-3">{section.title}</h4>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block text-sm py-1.5 px-3 rounded transition-colors",
                      pathname === item.href
                        ? "bg-[hsl(var(--ethblox-accent-green))] text-[hsl(var(--ethblox-bg))] font-medium"
                        : "text-[hsl(var(--ethblox-text-secondary))] hover:text-[hsl(var(--ethblox-accent-cyan))] hover:bg-[hsl(var(--ethblox-surface))]",
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  )
}
