"use client"

import { useEffect } from "react"

export function ErrorCaptureScript() {
  useEffect(() => {
    // This runs as early as possible on the client
    console.log("[v0] Error capture script initialized")

    // Create a global error log array
    if (typeof window !== "undefined" && !window.__ETHBLOX_ERRORS__) {
      window.__ETHBLOX_ERRORS__ = []

      // Capture ALL errors
      window.addEventListener("error", (event) => {
        const error = {
          type: "error",
          timestamp: new Date().toISOString(),
          message: event.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          stack: event.error?.stack,
        }
        window.__ETHBLOX_ERRORS__.push(error)
        console.error("[v0 ERROR CAPTURE]", error)
      })

      // Capture unhandled rejections
      window.addEventListener("unhandledrejection", (event) => {
        const error = {
          type: "rejection",
          timestamp: new Date().toISOString(),
          message: String(event.reason),
          stack: event.reason?.stack,
        }
        window.__ETHBLOX_ERRORS__.push(error)
        console.error("[v0 REJECTION CAPTURE]", error)
      })

      // Capture CSP violations
      window.addEventListener("securitypolicyviolation", (event) => {
        const violation = {
          type: "csp",
          timestamp: new Date().toISOString(),
          violatedDirective: event.violatedDirective,
          blockedURI: event.blockedURI,
          documentURI: event.documentURI,
          effectiveDirective: event.effectiveDirective,
          originalPolicy: event.originalPolicy,
          sourceFile: event.sourceFile,
          lineNumber: event.lineNumber,
        }
        window.__ETHBLOX_ERRORS__.push(violation)
        console.error("[v0 CSP VIOLATION]", violation)
      })

      console.log("[v0] Global error handlers attached")
    }
  }, [])

  return null
}

// TypeScript declaration
declare global {
  interface Window {
    __ETHBLOX_ERRORS__?: any[]
  }
}
