import * as React from "react"
import { cn } from "@/lib/utils"

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string
  helperText?: string
  errorText?: string
}

export function Select({
  label,
  helperText,
  errorText,
  id,
  className,
  children,
  ...props
}: SelectProps) {
  const fieldId = id ?? `select-${label?.replace(/\s+/g, "-").toLowerCase() ?? "field"}`
  const descriptionId = errorText ? `${fieldId}-error` : helperText ? `${fieldId}-helper` : undefined

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={fieldId} className="text-sm font-semibold text-foreground">
          {label}
        </label>
      )}
      <select
        id={fieldId}
        aria-invalid={Boolean(errorText)}
        aria-describedby={descriptionId}
        aria-required={props.required}
        className={cn(
          "flex h-12 w-full rounded-md border border-border bg-background px-4 text-base",
          "focus-visible:outline-none focus-visible:border-primary",
          "focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50",
          errorText && "border-critical focus-visible:border-critical focus-visible:ring-critical/20",
          className
        )}
        {...props}
      >
        {children}
      </select>
      {errorText ? (
        <p id={`${fieldId}-error`} className="text-xs text-critical">
          {errorText}
        </p>
      ) : helperText ? (
        <p id={`${fieldId}-helper`} className="text-xs text-mutedForeground">
          {helperText}
        </p>
      ) : null}
    </div>
  )
}
