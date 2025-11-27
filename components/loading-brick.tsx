"use client"

import { useEffect, useState } from "react"

export function LoadingBrick() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const duration = 2000 // 2 seconds
    const interval = 16 // ~60fps
    const increment = (100 / duration) * interval

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + increment
      })
    }, interval)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed inset-0 w-full h-full bg-[hsl(var(--ethblox-bg-darker))] flex items-center justify-center">
      <div className="relative w-32 h-32 animate-spin" style={{ animationDuration: "3s" }}>
        {/* 2x2 brick structure */}
        <div className="absolute inset-0">
          {/* Base block */}
          <div className="absolute inset-0 border-2 border-[hsl(var(--ethblox-accent-cyan))] rounded-sm backdrop-blur-sm bg-gradient-to-br from-transparent to-[hsl(var(--ethblox-accent-cyan)/0.1)]">
            {/* Fill animation */}
            <div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[hsl(var(--ethblox-accent-cyan)/0.6)] to-[hsl(var(--ethblox-accent-cyan)/0.2)] transition-all duration-100 ease-linear rounded-sm"
              style={{ height: `${progress}%` }}
            />
          </div>

          {/* Top studs - 2x2 grid */}
          {[...Array(4)].map((_, i) => {
            const row = Math.floor(i / 2)
            const col = i % 2
            const x = col * 48 + 16
            const y = row * 48 + 16
            const studProgress = Math.max(0, Math.min(100, (progress - 50) * 2))

            return (
              <div
                key={i}
                className="absolute w-8 h-8 border-2 border-[hsl(var(--ethblox-accent-cyan))] rounded-full"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  backgroundColor: `hsl(var(--ethblox-accent-cyan)/${studProgress / 200})`,
                }}
              />
            )
          })}
        </div>

        {/* Progress percentage */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[hsl(var(--ethblox-accent-cyan))] text-sm font-mono font-bold z-10">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </div>
  )
}
