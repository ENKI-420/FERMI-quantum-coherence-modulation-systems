"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"

export interface AccessibleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  description?: string
  error?: string
  success?: string
  loading?: boolean
}

const AccessibleInput = React.forwardRef<HTMLInputElement, AccessibleInputProps>(
  ({ className, label, description, error, success, loading, id, ...props }, ref) => {
    const inputId = id || "unique-id" // Use a static value or another method to ensure consistent hook usage
    const descriptionId = `${inputId}-description`
    const errorId = `${inputId}-error`

    const hasError = Boolean(error)
    const hasSuccess = Boolean(success) && !hasError

    return (
      <div className="space-y-2">
        <label
          htmlFor={inputId}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
          {props.required && (
            <span className="text-destructive ml-1" aria-hidden="true">
              *
            </span>
          )}
        </label>

        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            aria-describedby={description ? descriptionId : undefined}
            aria-invalid={hasError}
            aria-errormessage={hasError ? errorId : undefined}
            className={cn(
              "flex h-10 w-full rounded-md border bg-input px-3 py-2 text-sm transition-colors",
              "file:border-0 file:bg-transparent file:text-sm file:font-medium",
              "placeholder:text-muted-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              "disabled:cursor-not-allowed disabled:opacity-50",
              hasError && "border-destructive focus-visible:ring-destructive",
              hasSuccess && "border-secondary focus-visible:ring-secondary",
              loading && "pr-10",
              className,
            )}
            {...props}
          />

          {/* Status Icons */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
            {hasError && !loading && <AlertCircle className="h-4 w-4 text-destructive" />}
            {hasSuccess && !loading && <CheckCircle2 className="h-4 w-4 text-secondary" />}
          </div>
        </div>

        {/* Description */}
        {description && !hasError && (
          <p id={descriptionId} className="text-xs text-muted-foreground">
            {description}
          </p>
        )}

        {/* Error Message */}
        {hasError && (
          <p id={errorId} className="text-xs text-destructive flex items-center gap-1" role="alert">
            <AlertCircle className="h-3 w-3" />
            {error}
          </p>
        )}

        {/* Success Message */}
        {hasSuccess && (
          <p className="text-xs text-secondary flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            {success}
          </p>
        )}
      </div>
    )
  },
)
AccessibleInput.displayName = "AccessibleInput"

export { AccessibleInput }
