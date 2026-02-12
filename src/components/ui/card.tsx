import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "highlight" | "glass";
  padding?: "sm" | "md" | "lg";
}

export function Card({ className, variant = "default", padding = "md", children, ...props }: CardProps) {
  const variants = {
    default: "card",
    highlight: "card-highlight",
    glass: "glass rounded-3xl",
  };

  const paddings = {
    sm: "p-3",
    md: "p-5",
    lg: "p-6",
  };

  return (
    <div className={cn(variants[variant], paddings[padding], className)} {...props}>
      {children}
    </div>
  );
}
