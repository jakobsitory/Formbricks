import { Button } from "@/modules/ui/components/button";
import { VariantProps, cva } from "class-variance-authority";
import { AlertCircle, AlertTriangle, CheckCircle, Info, Terminal } from "lucide-react";
import * as React from "react";
import { cn } from "@formbricks/lib/cn";

// Add a type definition for variant configuration
type VariantConfig = {
  variant?: string;
  icon: React.ReactNode;
  buttonClass?: string;
  buttonHover?: string;
  buttonActive?: string;
  buttonDisabled?: string;
  buttonText?: string;
};

const alertVariants = cva(
  "relative w-full rounded-xl border px-4 py-3 flex justify-between [&>svg]:absolute [&>svg]:left-3 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-9",
  {
    variants: {
      variant: {
        default: "text-foreground border-border",
        error: "text-red-800 border-red-600 [&>svg]:text-red-600",
        warning: "text-amber-800 border-amber-600 [&>svg]:text-amber-600",
        info: "text-blue-800 border-blue-600 [&>svg]:text-blue-600",
        success: "text-green-800 border-green-600 [&>svg]:text-green-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Updated variantConfig to remove the default button shadow for non-default variants.
const variantConfig: Record<string, VariantConfig> = {
  default: {
    icon: <Terminal className="h-4 w-4" />,
    buttonClass: "secondary",
  },
  error: {
    icon: <AlertCircle className="h-4 w-4 text-red-600" />,
    buttonClass: "bg-red-50 shadow-none",
    buttonHover: "hover:bg-red-50/50",
    buttonDisabled: "disabled:bg-red-50",
    buttonText: "text-red-800",
  },
  warning: {
    icon: <AlertTriangle className="h-4 w-4 text-amber-600" />,
    buttonClass: "bg-amber-50 shadow-none",
    buttonHover: "hover:bg-amber-50/50",
    buttonDisabled: "disabled:bg-amber-50",
    buttonText: "text-amber-800",
  },
  info: {
    icon: <Info className="h-4 w-4 text-blue-600" />,
    buttonClass: "bg-blue-50 shadow-none",
    buttonHover: "hover:bg-blue-50/50",
    buttonDisabled: "disabled:bg-blue-50",
    buttonText: "text-blue-800",
  },
  success: {
    icon: <CheckCircle className="h-4 w-4 text-green-600" />,
    buttonClass: "bg-green-50 shadow-none",
    buttonHover: "hover:bg-green-50/50",
    buttonDisabled: "disabled:bg-green-50",
    buttonText: "text-green-800",
  },
};

// Extend the props to include an optional "button" prop
type AlertJakobProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof alertVariants> & {
    icon?: React.ReactNode;
    dangerouslySetInnerHTML?: { __html: string | TrustedHTML };
    button?: React.ReactElement<{ className?: string; variant?: string }>;
  };

const AlertJakob = React.forwardRef<HTMLDivElement, AlertJakobProps>(
  ({ className, variant = "default", icon, button, children, ...props }, ref) => {
    const validVariant = variant || "default";
    const config = variantConfig[validVariant] || variantConfig.default;
    const renderIcon = icon || config.icon;

    return (
      <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
        {renderIcon && <span className="absolute left-3 top-4">{renderIcon}</span>}
        <div className="flex-grow">{children}</div>
        {button && (
          <div className="ml-3 self-end">
            {React.isValidElement(button)
              ? React.cloneElement(button as React.ReactElement<{ className?: string; variant?: string }>, {
                  // For the default alert we force variant:"secondary"
                  variant: validVariant === "default" ? "secondary" : button.props?.variant,
                  className: cn(
                    button.props?.className,
                    config.buttonClass || "",
                    config.buttonHover || "",
                    config.buttonActive || "",
                    config.buttonDisabled || "",
                    config.buttonText || ""
                  ),
                })
              : button}
          </div>
        )}
      </div>
    );
  }
);
AlertJakob.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & { dangerouslySetInnerHTML?: { __html: string | TrustedHTML } }
>(({ className, children, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-0.5 cursor-default text-sm font-medium leading-none", className)}
    {...props}>
    {children}
  </h5>
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & { dangerouslySetInnerHTML?: { __html: string | TrustedHTML } }
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("cursor-default text-sm [&_p]:leading-none", className)} {...props}>
    {children}
  </div>
));
AlertDescription.displayName = "AlertDescription";

const AlertButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }
>(({ className, loading, ...props }, ref) => (
  <Button
    ref={ref}
    className={cn("shrink-0", className)}
    disabled={loading || props.disabled}
    // variant="secondary"
    {...props}>
    {loading ? "Loading..." : props.children}
  </Button>
));
AlertButton.displayName = "AlertButton";

export { AlertJakob, AlertDescription, AlertTitle, AlertButton };
