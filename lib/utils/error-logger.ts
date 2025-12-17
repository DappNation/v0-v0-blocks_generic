"use client"

interface ErrorLog {
  timestamp: string
  message: string
  stack?: string
  userAgent: string
  url: string
  type: "error" | "csp" | "three" | "general"
}

class ErrorLogger {
  private logs: ErrorLog[] = []
  private maxLogs = 100

  constructor() {
    if (typeof window !== "undefined") {
      this.setupErrorHandlers()
    }
  }

  private setupErrorHandlers() {
    // Catch all JavaScript errors
    window.addEventListener("error", (event) => {
      this.log({
        type: "error",
        message: event.message,
        stack: event.error?.stack,
      })
    })

    // Catch all unhandled promise rejections
    window.addEventListener("unhandledrejection", (event) => {
      this.log({
        type: "error",
        message: `Unhandled Promise Rejection: ${event.reason}`,
        stack: event.reason?.stack,
      })
    })

    // Catch CSP violations
    window.addEventListener("securitypolicyviolation", (event) => {
      this.log({
        type: "csp",
        message: `CSP Violation: ${event.violatedDirective} - ${event.blockedURI}`,
      })
    })

    // Log on page visibility change (useful for debugging)
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        console.log("[v0] Page hidden, current error count:", this.logs.length)
      }
    })
  }

  log(error: Partial<ErrorLog>) {
    const errorLog: ErrorLog = {
      timestamp: new Date().toISOString(),
      message: error.message || "Unknown error",
      stack: error.stack,
      userAgent: navigator.userAgent,
      url: window.location.href,
      type: error.type || "general",
    }

    this.logs.push(errorLog)

    // Keep only the last maxLogs entries
    if (this.logs.length > this.maxLogs) {
      this.logs.shift()
    }

    // Log to console with visual indicator
    console.error(
      `%c[v0 ERROR LOGGER] ${errorLog.type.toUpperCase()}`,
      "background: #ff0000; color: #ffffff; padding: 2px 4px; border-radius: 2px;",
      errorLog,
    )

    // Store in localStorage for debugging
    try {
      localStorage.setItem("ethblox_error_logs", JSON.stringify(this.logs))
    } catch (e) {
      // Ignore localStorage errors
    }
  }

  getLogs(): ErrorLog[] {
    return [...this.logs]
  }

  clearLogs() {
    this.logs = []
    try {
      localStorage.removeItem("ethblox_error_logs")
    } catch (e) {
      // Ignore localStorage errors
    }
  }

  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2)
  }
}

export const errorLogger = typeof window !== "undefined" ? new ErrorLogger() : null

// Helper function to manually log errors
export function logError(message: string, type: ErrorLog["type"] = "general") {
  if (errorLogger) {
    errorLogger.log({ message, type })
  }
}

// Helper to check if there are critical errors
export function hasCriticalErrors(): boolean {
  if (!errorLogger) return false
  const logs = errorLogger.getLogs()
  return logs.some((log) => log.type === "csp" || log.type === "three")
}
