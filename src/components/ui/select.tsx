import * as React from "react";
import { cn } from "../../lib/utils";

const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        className={cn(
          "flex h-8 rounded-lg border border-base-300 bg-base-100 px-1 py-1 text-xs text-neutral transition-colors hover:border-base-content hover:text-base-content focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-base-content cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = "Select";

export { Select };
