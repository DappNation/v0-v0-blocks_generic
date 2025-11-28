import type React from "react"
import { AlertCircle, Info, CheckCircle } from "lucide-react"

type CalloutProps = {
  variant?: "info" | "warning" | "success"
  children: React.ReactNode
}

export function Callout({ variant = "info", children }: CalloutProps) {
  const styles = {
    info: "border-blue-200 bg-blue-50 text-blue-900",
    warning: "border-amber-200 bg-amber-50 text-amber-900",
    success: "border-green-200 bg-green-50 text-green-900",
  }

  const icons = {
    info: Info,
    warning: AlertCircle,
    success: CheckCircle,
  }

  const Icon = icons[variant]

  return (
    <div className={`my-6 flex gap-3 rounded-lg border p-4 ${styles[variant]}`}>
      <Icon className="h-5 w-5 shrink-0 mt-0.5" />
      <div className="flex-1 text-sm leading-relaxed">{children}</div>
    </div>
  )
}
