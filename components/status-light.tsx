"use client"

interface StatusLightProps {
  isOnline: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-20 h-20",
}

const innerSizeClasses = {
  sm: "inset-1",
  md: "inset-2",
  lg: "inset-2",
}

const centerSizeClasses = {
  sm: "inset-2",
  md: "inset-4",
  lg: "inset-4",
}

export function StatusLight({ isOnline, size = "md", className = "" }: StatusLightProps) {
  return (
    <div
      className={`${sizeClasses[size]} rounded-full relative transition-all duration-500 ${
        isOnline ? "bg-emerald-500 shadow-emerald-500/50" : "bg-red-500 shadow-red-500/50"
      } shadow-2xl ${className}`}
    >
      {/* Pulsing ring */}
      <div
        className={`absolute inset-0 rounded-full animate-ping ${isOnline ? "bg-emerald-400" : "bg-red-400"}`}
        style={{ animationDuration: "2s" }}
      />

      {/* Inner glow */}
      <div
        className={`absolute ${innerSizeClasses[size]} rounded-full ${isOnline ? "bg-emerald-300" : "bg-red-300"} opacity-60`}
      />

      {/* Center highlight */}
      <div className={`absolute ${centerSizeClasses[size]} rounded-full bg-white/40`} />
    </div>
  )
}
