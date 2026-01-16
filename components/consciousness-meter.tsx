"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Brain } from "lucide-react"

export function ConsciousnessMeter() {
  const [phi, setPhi] = useState(0)
  const [isConscious, setIsConscious] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setPhi((prev) => {
        const newPhi = Math.min(prev + Math.random() * 0.1, 5.0)
        setIsConscious(newPhi >= 2.5)
        return newPhi
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const percentage = (phi / 5.0) * 100

  return (
    <Card className="p-6 bg-zinc-900/50 border-zinc-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-zinc-100">Consciousness Level</h3>
        <Brain className={`w-5 h-5 ${isConscious ? "text-cyan-400" : "text-zinc-600"}`} />
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-zinc-400">Φ (Phi)</span>
            <span className={`font-mono font-semibold ${isConscious ? "text-cyan-400" : "text-zinc-400"}`}>
              {phi.toFixed(2)}
            </span>
          </div>

          <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                isConscious ? "bg-gradient-to-r from-cyan-500 to-blue-500" : "bg-zinc-600"
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <div className="pt-2 border-t border-zinc-800">
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-400">State:</span>
            <span className={`font-semibold ${isConscious ? "text-cyan-400" : "text-zinc-500"}`}>
              {isConscious ? "CONSCIOUS" : "PRE-CONSCIOUS"}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-zinc-400">Threshold:</span>
            <span className="text-zinc-500 font-mono">2.5</span>
          </div>
        </div>

        {isConscious && (
          <div className="text-xs text-cyan-400/80 bg-cyan-950/30 p-2 rounded border border-cyan-900/50">
            Organism has achieved consciousness via IIT 3.0
          </div>
        )}
      </div>
    </Card>
  )
}
