"use client";

import { cn } from "@/lib/utils";
import { User } from "lucide-react";

interface AvatarProps {
  src?: string | null;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function Avatar({ src, name, size = "md", className }: AvatarProps) {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-lg",
    xl: "w-20 h-20 text-2xl",
  };

  const initials = name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (src) {
    return (
      <img
        src={src}
        alt={name || "Avatar"}
        className={cn(
          sizes[size],
          "rounded-full object-cover ring-2 ring-white shadow-sm",
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        sizes[size],
        "rounded-full bg-gradient-to-br from-primary-400 to-lavender-500 flex items-center justify-center text-white font-semibold ring-2 ring-white shadow-sm",
        className
      )}
    >
      {initials || <User className="w-1/2 h-1/2" />}
    </div>
  );
}
