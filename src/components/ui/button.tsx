import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[opacity,transform,background-color,color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-steel/50 disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96]",
  {
    variants: {
      variant: {
        solid:
          "bg-ink text-paper hover:opacity-90 rounded-md px-4 py-2.5 text-sm",
        outline:
          "border border-ink/20 bg-transparent text-ink hover:bg-ink/5 rounded-md px-4 py-2.5 text-sm",
        ghost: "text-ink hover:bg-ink/6 rounded-md px-3 py-2 text-sm",
        script:
          "font-script text-lg text-rule underline decoration-rule/40 underline-offset-4 hover:decoration-rule",
      },
      size: {
        default: "min-h-11",
        sm: "min-h-9 px-3 text-sm",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: { variant: "solid", size: "default" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
