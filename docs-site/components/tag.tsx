import type React from "react"
type TagProps = {
  children: React.ReactNode
  variant?: "default" | "experimental" | "mvp"
}

export function Tag({ children, variant = "default" }: TagProps) {
  const styles = {
    default: "bg-muted text-muted-foreground",
    experimental: "bg-amber-100 text-amber-800",
    mvp: "bg-blue-100 text-blue-800",
  }

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${styles[variant]}`}>
      {children}
    </span>
  )
}
