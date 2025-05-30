"use client"

import { useState, useEffect } from "react"
import { Sparkles, Wifi, WifiOff } from "lucide-react"

export default function Component() {
  const [isOnline, setIsOnline] = useState(true)
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  // Generate random sparkles
  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 200 - 100, // Random position around center
        y: Math.random() * 200 - 100,
        delay: Math.random() * 2, // Random animation delay
      }))
      setSparkles(newSparkles)
    }

    generateSparkles()
    const interval = setInterval(generateSparkles, 3000) // Regenerate sparkles every 3 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="relative">
        {/* Sparkle animations */}
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
              className={`w-4 h-4 animate-ping ${isOnline ? "text-emerald-400" : "text-red-400"}`}
              style={{
                animationDuration: "2s",
                animationIterationCount: "infinite",
              }}
            />
          </div>
        ))}

        {/* Main status container */}
        <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
          {/* Status light with glow effect */}
          <div className="relative flex items-center justify-center mb-6">
            <div
              className={`w-12 h-12 rounded-full relative transition-all duration-500 ${
                isOnline ? "bg-emerald-500 shadow-emerald-500/50" : "bg-red-500 shadow-red-500/50"
              } shadow-2xl`}
            >
              {/* Pulsing ring */}
              <div
                className={`absolute inset-0 rounded-full animate-ping ${isOnline ? "bg-emerald-400" : "bg-red-400"}`}
                style={{ animationDuration: "2s" }}
              />

              {/* Inner glow */}
              <div
                className={`absolute inset-2 rounded-full ${isOnline ? "bg-emerald-300" : "bg-red-300"} opacity-60`}
              />

              {/* Center highlight */}
              <div className="absolute inset-4 rounded-full bg-white/40" />
            </div>
          </div>

          {/* Status text and icon */}
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

            {/* Toggle button */}
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                isOnline ? "bg-emerald-500 hover:bg-emerald-600 text-white" : "bg-red-500 hover:bg-red-600 text-white"
              } shadow-lg hover:shadow-xl`}
            >
              Toggle Status
            </button>
          </div>

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
      </div>

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
