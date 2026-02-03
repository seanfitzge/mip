import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

type FormFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
  helperText?: string
  errorText?: string
}

export function FormField({
  label,
  helperText,
  errorText,
  id,
  className,
  ...props
}: FormFieldProps) {
  const fieldId = id ?? `field-${label.replace(/\s+/g, "-").toLowerCase()}`
  const descriptionId = errorText ? `${fieldId}-error` : helperText ? `${fieldId}-helper` : undefined

  return (
    <div className="space-y-1">
      <label htmlFor={fieldId} className="text-sm font-semibold text-foreground">
        {label}
      </label>
      <Input
        id={fieldId}
        aria-invalid={Boolean(errorText)}
        aria-describedby={descriptionId}
        aria-required={props.required}
        className={cn(
          "min-h-[44px]",
          errorText && "border-critical focus-visible:border-critical focus-visible:ring-critical/20",
          className
        )}
        {...props}
      />
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
