import { type InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-text-primary font-body">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full rounded-lg border bg-surface px-4 py-2.5 text-sm text-text-primary',
            'placeholder:text-text-muted font-body',
            'transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent',
            error
              ? 'border-red-500 focus:ring-red-400'
              : 'border-border hover:border-accent/50',
            className,
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-500 font-body">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
