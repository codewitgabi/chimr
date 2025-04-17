"use client"

import { useRef, useState, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AudioPlayerProps {
  audioSrc: string
  audioTitle: string
}

function AudioPlayer({ audioSrc, audioTitle }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
      setIsLoaded(true)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      audio.currentTime = 0
    }

    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    //   audioRef.current.currentTime = 0 // Reset to beginning when stopped
    } else {
      audioRef.current.play()
    }

    setIsPlaying(!isPlaying)
  }

  const handleSeek = (value: number[]) => {
    if (!audioRef.current) return

    const newTime = value[0]
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const skipForward = () => {
    if (!audioRef.current) return

    const newTime = Math.min(currentTime + 10, duration)
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const skipBackward = () => {
    if (!audioRef.current) return

    const newTime = Math.max(currentTime - 10, 0)
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const toggleMute = () => {
    if (!audioRef.current) return

    audioRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (value: number[]) => {
    if (!audioRef.current) return

    const newVolume = value[0]
    audioRef.current.volume = newVolume
    setVolume(newVolume)

    if (newVolume === 0) {
      setIsMuted(true)
      audioRef.current.muted = true
    } else if (isMuted) {
      setIsMuted(false)
      audioRef.current.muted = false
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return (
    <div className="rounded-xl overflow-hidden backdrop-blur-lg bg-black/30 border border-gray-700 shadow-xl">
      <audio ref={audioRef} src={audioSrc} preload="metadata" />

      {/* Title Bar */}
      <div className="px-6 pt-5 pb-3">
        <h2 className="text-xl font-medium text-white truncate">{audioTitle}</h2>
      </div>

      {/* Waveform Visualization (Decorative) */}

      <div className="px-6 py-3">
        <div className="h-16 flex items-center justify-center gap-1">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-1 rounded-full bg-gradient-to-t from-purple-500 to-cyan-400",
                isPlaying ? "animate-pulse" : "opacity-40",
                i % 2 === 0 ? "h-12" : i % 3 === 0 ? "h-8" : "h-4",
              )}
              style={{
                animationDelay: `${i * 0.05}s`,
                opacity: isPlaying ? 0.7 + Math.random() * 0.3 : 0.4,
              }}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-6 py-3">
        <Slider
          disabled={!isLoaded}
          value={[currentTime]}
          min={0}
          max={duration || 100}
          step={0.1}
          onValueChange={handleSeek}
          className="cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="px-6 pb-5 pt-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            onClick={toggleMute}
            size="icon"
            variant="ghost"
            className="text-gray-300 hover:text-white hover:bg-gray-800/50"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </Button>
          <div className="w-20">
            <Slider
              value={[isMuted ? 0 : volume]}
              min={0}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              className="cursor-pointer"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={skipBackward}
            size="icon"
            variant="ghost"
            className="text-gray-300 hover:text-white hover:bg-gray-800/50"
          >
            <SkipBack size={22} />
          </Button>

          <Button
            onClick={togglePlay}
            size="icon"
            className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 hover:from-purple-600 hover:to-cyan-500 text-white shadow-lg"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
          </Button>

          <Button
            onClick={skipForward}
            size="icon"
            variant="ghost"
            className="text-gray-300 hover:text-white hover:bg-gray-800/50"
          >
            <SkipForward size={22} />
          </Button>
        </div>
        <div className="w-[88px]"></div> {/* Spacer to balance layout */}
      </div>
    </div>
  )
}

export default AudioPlayer;
