"use client"

import { Wifi, WifiOff } from "lucide-react"
import { useStatusIndicator } from "../hooks/use-status-indicator"
import { StatusLight } from "./status-light"
import { SparkleAnimation } from "./sparkle-animation"

interface StatusIndicatorProps {
  initialStatus?: boolean
  showToggle?: boolean
  showText?: boolean
  size?: "sm" | "md" | "lg"
  variant?: "full" | "minimal"
  className?: string
  onStatusChange?: (status: boolean) => void
}

export function StatusIndicator({
  initialStatus = true,
  showToggle = true,
  showText = true,
  size = "md",
  variant = "full",
  className = "",
  onStatusChange,
}: StatusIndicatorProps) {
  const { isOnline, sparkles, toggleStatus } = useStatusIndicator({
    initialStatus,
    sparkleCount: size === "sm" ? 6 : size === "lg" ? 10 : 8,
    sparkleRange: size === "sm" ? 120 : size === "lg" ? 280 : 200,
  })

  const handleToggle = () => {
    toggleStatus()
    onStatusChange?.(isOnline)
  }

  if (variant === "minimal") {
    return (
      <div className={`relative inline-flex items-center ${className}`}>
        <StatusLight isOnline={isOnline} size={size} />
        {showText && (
          <span className={`ml-2 font-medium ${isOnline ? "text-emerald-600" : "text-red-600"}`}>
            {isOnline ? "Online" : "Offline"}
          </span>
        )}
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <SparkleAnimation sparkles={sparkles} isOnline={isOnline} size={size} />

      {/* Main status container */}
      <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
        {/* Status light */}
        <div className="relative flex items-center justify-center mb-6">
          <StatusLight isOnline={isOnline} size={size} />
        </div>

        {showText && (
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              {isOnline ? <Wifi className="w-6 h-6 text-emerald-400" /> : <WifiOff className="w-6 h-6 text-red-400" />}
              <span
                className={`text-2xl font-bold transition-colors duration-500 ${
                  isOnline ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {isOnline ? "ONLINE" : "OFFLINE"}
              </span>
            </div>

            <p className="text-white/70 text-sm">{isOnline ? "All systems operational" : "Connection lost"}</p>
          </div>
        )}

        {showToggle && (
          <div className="text-center mt-6">
            <button
              onClick={handleToggle}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                isOnline ? "bg-emerald-500 hover:bg-emerald-600 text-white" : "bg-red-500 hover:bg-red-600 text-white"
              } shadow-lg hover:shadow-xl`}
            >
              Toggle Status
            </button>
          </div>
        )}

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${isOnline ? "bg-emerald-400" : "bg-red-400"} opacity-60`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Outer glow effect */}
      <div
        className={`absolute inset-0 rounded-3xl transition-all duration-500 -z-10 ${
          isOnline ? "bg-emerald-500/20 shadow-emerald-500/20" : "bg-red-500/20 shadow-red-500/20"
        } shadow-2xl blur-xl`}
      />

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
