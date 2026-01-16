"use client"

import { cn } from "@/lib/utils"

interface LoadingCardProps {
  className?: string
  lines?: number
  showIcon?: boolean
}

export function LoadingCard({ className, lines = 3, showIcon = true }: LoadingCardProps) {
  return (
    <div className={cn("bg-card border border-border rounded-xl p-5 animate-pulse", className)}>
      {showIcon && <div className="h-8 w-8 bg-muted rounded-md mb-4" />}
      <div className="h-5 w-2/3 bg-muted rounded mb-3" />
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="h-3 bg-muted rounded" style={{ width: `${100 - i * 15}%` }} />
        ))}
      </div>
    </div>
  )
}
