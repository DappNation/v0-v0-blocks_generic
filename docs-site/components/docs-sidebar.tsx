"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { docsNav } from "@/config/docs-nav"

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <nav className="space-y-1">
      {docsNav.map((item) => {
        const isActive = pathname === `/docs/${item.slug}`

        return (
          <Link
            key={item.slug}
            href={`/docs/${item.slug}`}
            className={`block rounded-md px-3 py-2 text-sm transition-colors ${
              isActive
                ? "bg-muted font-medium text-foreground"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            }`}
          >
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}
