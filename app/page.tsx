"use client"

import { StatusIndicator } from "../components/status-indicator"
import { useStatusIndicator } from "../hooks/use-status-indicator"
import { StatusLight } from "../components/status-light"

export default function Page() {
  // Example 1: Using the complete component
  const handleStatusChange = (status: boolean) => {
    console.log("Status changed to:", status ? "online" : "offline")
  }

  // Example 2: Using just the hook for custom implementation
  const { isOnline, toggleStatus } = useStatusIndicator({
    initialStatus: false,
    sparkleCount: 6,
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <h1 className="text-4xl font-bold text-white text-center mb-12">Status Indicator Examples</h1>

        {/* Full component */}
        <div className="flex justify-center">
          <StatusIndicator onStatusChange={handleStatusChange} size="md" />
        </div>

        {/* Different variants */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-white mb-4">Minimal Variant</h3>
            <StatusIndicator variant="minimal" size="sm" className="justify-center" />
          </div>

          <div className="text-center">
            <h3 className="text-white mb-4">Medium Size</h3>
            <StatusIndicator variant="minimal" size="md" className="justify-center" />
          </div>

          <div className="text-center">
            <h3 className="text-white mb-4">Large Size</h3>
            <StatusIndicator variant="minimal" size="lg" className="justify-center" />
          </div>
        </div>

        {/* Custom implementation using hook */}
        <div className="text-center">
          <h3 className="text-white mb-4">Custom Implementation with Hook</h3>
          <div className="flex items-center justify-center space-x-4">
            <StatusLight isOnline={isOnline} size="sm" />
            <span className={`text-lg font-medium ${isOnline ? "text-emerald-400" : "text-red-400"}`}>
              Custom Status: {isOnline ? "Active" : "Inactive"}
            </span>
            <button
              onClick={toggleStatus}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Toggle
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
