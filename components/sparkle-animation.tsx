"use client"

import { Sparkles } from "lucide-react"

interface SparkleAnimationProps {
  sparkles: Array<{ id: number; x: number; y: number; delay: number }>
  isOnline: boolean
  size?: "sm" | "md" | "lg"
}

const sparkleSize = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-5 h-5",
}

export function SparkleAnimation({ sparkles, isOnline, size = "md" }: SparkleAnimationProps) {
  return (
    <>
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute pointer-events-none"
          style={{
            left: `${sparkle.x}px`,
            top: `${sparkle.y}px`,
            animationDelay: `${sparkle.delay}s`,
          }}
        >
          <Sparkles
            className={`${sparkleSize[size]} animate-ping ${isOnline ? "text-emerald-400" : "text-red-400"}`}
            style={{
              animationDuration: "2s",
              animationIterationCount: "infinite",
            }}
          />
        </div>
      ))}
    </>
  )
}
