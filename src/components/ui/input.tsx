import * as React from "react";
import { cn } from "../../lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-8 rounded-lg border border-base-300 bg-base-100 px-2 py-1 text-xs text-base-content placeholder:text-neutral transition-colors hover:border-base-content focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-base-content disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
