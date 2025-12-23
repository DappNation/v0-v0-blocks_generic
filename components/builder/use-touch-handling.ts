"use client"

import { useEffect } from "react"

export function useTouchHandling() {
  useEffect(() => {
    if (typeof window === "undefined") return

    const preventDefaultTouchAction = (e: TouchEvent) => {
      const target = e.target as HTMLElement
      const isInteractive =
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.closest('[role="button"]') ||
        target.closest(".bg-white") ||
        target.closest("[data-radix-popper-content-wrapper]")

      if (!isInteractive) {
        e.preventDefault()
      }
    }

    document.body.style.overflow = "hidden"
    document.documentElement.style.overflow = "hidden"

    document.addEventListener("gesturestart", preventDefaultTouchAction, { passive: false })
    document.addEventListener("gesturechange", preventDefaultTouchAction, { passive: false })
    document.addEventListener("gestureend", preventDefaultTouchAction, { passive: false })

    document.addEventListener("touchstart", preventDefaultTouchAction, { passive: false })
    document.addEventListener("touchmove", preventDefaultTouchAction, { passive: false })
    document.addEventListener("touchend", preventDefaultTouchAction, { passive: false })

    return () => {
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""

      document.removeEventListener("gesturestart", preventDefaultTouchAction)
      document.removeEventListener("gesturechange", preventDefaultTouchAction)
      document.removeEventListener("gestureend", preventDefaultTouchAction)

      document.removeEventListener("touchstart", preventDefaultTouchAction)
      document.removeEventListener("touchmove", preventDefaultTouchAction)
      document.removeEventListener("touchend", preventDefaultTouchAction)
    }
  }, [])
}
