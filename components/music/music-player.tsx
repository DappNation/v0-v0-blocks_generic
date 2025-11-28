"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { PLAYLIST } from "@/lib/music-playlist"

export function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const currentTrack = PLAYLIST[currentTrackIndex]

  // Handle track end - advance to next track
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTrackEnd = () => {
      setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length)
    }

    audio.addEventListener("ended", handleTrackEnd)
    return () => audio.removeEventListener("ended", handleTrackEnd)
  }, [])

  // Update audio source when track changes
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.src = currentTrack.src
    if (isPlaying) {
      audio.play().catch((error) => {
        console.log("Autoplay blocked:", error)
        setIsPlaying(false)
      })
    }
  }, [currentTrackIndex, currentTrack.src, isPlaying])

  // Try autoplay on mount
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.play().catch((error) => {
      console.log("Autoplay blocked on mount:", error)
    })
    setIsPlaying(true)
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().catch((error) => {
        console.error("Play failed:", error)
      })
      setIsPlaying(true)
    }
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    audio.muted = !isMuted
    setIsMuted(!isMuted)
  }

  return (
    <div className="flex items-center gap-2">
      <audio ref={audioRef} preload="auto" />

      {/* Track info - compact */}
      <div className="flex flex-col min-w-0">
        <div className="text-[10px] font-medium text-[hsl(var(--ethblox-text-primary))] truncate max-w-[120px]">
          {currentTrack.title}
        </div>
        <div className="text-[9px] text-[hsl(var(--ethblox-text-secondary))] truncate max-w-[120px]">
          {currentTrack.artist}
        </div>
      </div>

      {/* Controls - compact */}
      <div className="flex items-center gap-1">
        <button
          onClick={togglePlay}
          className="w-7 h-7 rounded-full flex items-center justify-center transition-colors bg-black/30 text-white hover:bg-black/50"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause className="w-3 h-3 stroke-[1.5]" /> : <Play className="w-3 h-3 stroke-[1.5] ml-0.5" />}
        </button>

        <button
          onClick={toggleMute}
          className="w-7 h-7 rounded-full flex items-center justify-center transition-colors bg-black/30 text-white hover:bg-black/50"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="w-3 h-3 stroke-[1.5]" /> : <Volume2 className="w-3 h-3 stroke-[1.5]" />}
        </button>
      </div>
    </div>
  )
}
