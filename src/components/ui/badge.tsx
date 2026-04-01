import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-2 rounded-xl font-medium transition-all duration-100 focus:outline-none focus:ring-2 focus:ring-base-content/20",
  {
    variants: {
      variant: {
        default:
          "border border-neutral-content text-neutral-content bg-gradient-to-br from-transparent to-transparent hover:from-accent-2/15 hover:border-accent-2/50 hover:text-accent-2 hover:shadow-sm",
        highlight:
          "border border-accent-3/15 text-accent-3/90 from-accent-3 bg-gradient-to-br from-transparent to-transparent hover:from-accent-2/15 hover:border-accent-2/50 hover:text-accent-2 hover:shadow-sm",
      },
      size: {
        default: "px-3 py-1.5 text-sm",
        full: "w-full justify-center px-3 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof badgeVariants> {
  href?: string;
  ariaLabel?: string;
}

const Badge = React.forwardRef<HTMLElement, BadgeProps>(
  ({ className, variant, size, href, ariaLabel, children, ...props }, ref) => {
    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={href.startsWith("http") ? "_blank" : "_self"}
          rel="noopener"
          aria-label={ariaLabel}
          className={cn(badgeVariants({ variant, size, className }))}
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <span
        ref={ref as React.Ref<HTMLSpanElement>}
        aria-label={ariaLabel}
        className={cn(badgeVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </span>
    );
  }
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
