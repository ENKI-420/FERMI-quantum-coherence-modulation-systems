"use client"

import type React from "react"

import { useState, forwardRef, type InputHTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import { Check, AlertCircle } from "lucide-react"

interface CoherenceInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  success?: boolean
  coherenceLevel?: number
}

export const CoherenceInput = forwardRef<HTMLInputElement, CoherenceInputProps>(
  ({ className, label, error, success, coherenceLevel = 0, id, ...props }, ref) => {
    const [focused, setFocused] = useState(false)
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-")

    return (
      <div className="space-y-1.5">
        <label
          htmlFor={inputId}
          className={cn(
            "text-sm font-medium transition-colors",
            focused ? "text-primary" : "text-muted-foreground",
            error && "text-destructive",
          )}
        >
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full h-10 px-3 rounded-md border bg-input text-foreground",
              "transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
              error && "border-destructive focus:ring-destructive",
              success && "border-secondary focus:ring-secondary",
              !error && !success && "border-border hover:border-muted-foreground",
              className,
            )}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />
          {success && (
            <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary" aria-hidden="true" />
          )}
          {error && (
            <AlertCircle
              className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-destructive"
              aria-hidden="true"
            />
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-destructive" role="alert">
            {error}
          </p>
        )}
        {coherenceLevel > 0 && (
          <div
            className="energy-progress"
            role="progressbar"
            aria-valuenow={coherenceLevel * 100}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className="energy-progress-bar" style={{ width: `${coherenceLevel * 100}%` }} />
          </div>
        )}
      </div>
    )
  },
)

CoherenceInput.displayName = "CoherenceInput"

interface CoherenceBlockProps {
  label: string
  children: React.ReactNode
  progress?: number
  className?: string
}

export function CoherenceBlock({ label, children, progress = 0, className }: CoherenceBlockProps) {
  return (
    <fieldset className={cn("coherence-block", className)} data-label={label}>
      <div className="space-y-4">{children}</div>
      {progress > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-muted-foreground">Block Coherence</span>
            <span className="font-mono text-primary">{(progress * 100).toFixed(0)}%</span>
          </div>
          <div
            className="energy-progress"
            role="progressbar"
            aria-valuenow={progress * 100}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className="energy-progress-bar" style={{ width: `${progress * 100}%` }} />
          </div>
        </div>
      )}
    </fieldset>
  )
}
