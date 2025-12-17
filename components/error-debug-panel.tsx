"use client"

import { useState, useEffect } from "react"
import { errorLogger } from "@/lib/utils/error-logger"
import { Button } from "@/components/ui/button"
import { X, Download, Trash2 } from "lucide-react"

export function ErrorDebugPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [logs, setLogs] = useState<any[]>([])
  const [errorCount, setErrorCount] = useState(0)

  useEffect(() => {
    if (!errorLogger) return

    const interval = setInterval(() => {
      const currentLogs = errorLogger.getLogs()
      setLogs(currentLogs)
      setErrorCount(currentLogs.length)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleDownload = () => {
    if (!errorLogger) return
    const data = errorLogger.exportLogs()
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ethblox-errors-${new Date().toISOString()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleClear = () => {
    if (!errorLogger) return
    errorLogger.clearLogs()
    setLogs([])
    setErrorCount(0)
  }

  if (!errorLogger) return null

  return (
    <>
      {/* Error count badge - only show if there are errors */}
      {errorCount > 0 && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors z-50"
          aria-label={`${errorCount} errors logged`}
        >
          {errorCount}
        </button>
      )}

      {/* Debug panel */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-xl font-bold">Error Debug Panel ({errorCount})</h2>
              <div className="flex gap-2">
                <Button onClick={handleDownload} variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button onClick={handleClear} variant="outline" size="sm">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear
                </Button>
                <Button onClick={() => setIsOpen(false)} variant="ghost" size="sm">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Logs */}
            <div className="flex-1 overflow-auto p-4 space-y-2">
              {logs.length === 0 ? (
                <div className="text-center text-gray-500 py-8">No errors logged</div>
              ) : (
                logs.map((log, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded border ${
                      log.type === "csp"
                        ? "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
                        : log.type === "three"
                          ? "bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800"
                          : "bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-mono bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                        {log.type.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <div className="text-sm font-semibold mb-1">{log.message}</div>
                    {log.stack && (
                      <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto mt-2">
                        {log.stack}
                      </pre>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
