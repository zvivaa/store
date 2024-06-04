import { forwardRef } from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = forwardRef<HTMLInputElement, InputProps>(
  ({ className, children, disabled, type = 'checkbox', ...props }, ref) => {
    return (
      <input
        className={cn(
          `w-auto rounded-md border-solid border-gray-300 border bg-white px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-50 text-black font-semibold hover:opacity-75 transition`,
          className
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {children}
      </input>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export default Checkbox
