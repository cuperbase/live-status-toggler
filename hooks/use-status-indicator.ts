"use client"

import { useState, useEffect, useCallback } from "react"

interface Sparkle {
  id: number
  x: number
  y: number
  delay: number
}

interface UseStatusIndicatorOptions {
  initialStatus?: boolean
  sparkleCount?: number
  sparkleRange?: number
  regenerateInterval?: number
}

export function useStatusIndicator(options: UseStatusIndicatorOptions = {}) {
  const { initialStatus = true, sparkleCount = 8, sparkleRange = 200, regenerateInterval = 3000 } = options

  const [isOnline, setIsOnline] = useState(initialStatus)
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  const generateSparkles = useCallback(() => {
    const newSparkles = Array.from({ length: sparkleCount }, (_, i) => ({
      id: i,
      x: Math.random() * sparkleRange - sparkleRange / 2,
      y: Math.random() * sparkleRange - sparkleRange / 2,
      delay: Math.random() * 2,
    }))
    setSparkles(newSparkles)
  }, [sparkleCount, sparkleRange])

  const toggleStatus = useCallback(() => {
    setIsOnline((prev) => !prev)
  }, [])

  const setStatus = useCallback((status: boolean) => {
    setIsOnline(status)
  }, [])

  useEffect(() => {
    generateSparkles()
    const interval = setInterval(generateSparkles, regenerateInterval)
    return () => clearInterval(interval)
  }, [generateSparkles, regenerateInterval])

  return {
    isOnline,
    sparkles,
    toggleStatus,
    setStatus,
    generateSparkles,
  }
}
