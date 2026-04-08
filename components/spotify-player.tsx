"use client"

import { useState, useEffect } from "react"
import { Play, Pause, SkipForward, SkipBack } from "lucide-react"

const tracks = [
  { title: "Blinding Lights", artist: "The Weeknd", color: "#e63946" },
  { title: "Bohemian Rhapsody", artist: "Queen", color: "#9b59b6" },
  { title: "Shape of You", artist: "Ed Sheeran", color: "#27ae60" },
  { title: "Starboy", artist: "The Weeknd", color: "#f39c12" },
]

export function SpotifyPlayer() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [progress, setProgress] = useState(35)

  const track = tracks[currentTrack]

  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5))
    }, 100)
    return () => clearInterval(interval)
  }, [isPlaying])

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length)
    setProgress(0)
  }

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length)
    setProgress(0)
  }

  return (
    <div className="flex h-full flex-col">
      <span className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
        Currently Listening
      </span>
      <div className="flex flex-1 items-center gap-4">
        {/* Spinning Vinyl */}
        <div className="relative h-16 w-16 shrink-0">
          {/* Vinyl disc */}
          <div
            className={`absolute inset-0 rounded-full bg-[#1a1a1a] shadow-lg ${isPlaying ? "animate-spin-slow" : ""}`}
            style={{ animationDuration: "3s" }}
          >
            {/* Grooves */}
            <div className="absolute inset-[6px] rounded-full border border-zinc-800" />
            <div className="absolute inset-[10px] rounded-full border border-zinc-800" />
            <div className="absolute inset-[14px] rounded-full border border-zinc-800" />
            {/* Label */}
            <div
              className="absolute inset-[18px] rounded-full"
              style={{ backgroundColor: track.color }}
            />
            {/* Center hole */}
            <div className="absolute inset-[26px] rounded-full bg-[#0a0a0a]" />
          </div>
          {/* Reflection */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 to-transparent" />
        </div>

        {/* Track Info */}
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-foreground">{track.title}</p>
          <p className="truncate text-sm text-muted-foreground">{track.artist}</p>
          {/* Progress bar */}
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-3 flex items-center justify-center gap-4">
        <button
          onClick={prevTrack}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          <SkipBack className="h-4 w-4" />
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 pl-0.5" />}
        </button>
        <button
          onClick={nextTrack}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          <SkipForward className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
