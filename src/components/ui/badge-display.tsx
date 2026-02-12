"use client";

import { cn } from "@/lib/utils";
import { Crown, Heart, Flame, Zap, Trophy, Star, Calendar, Award } from "lucide-react";

interface BadgeDisplayProps {
  name: string;
  icon: string;
  color: string;
  rarity: string;
  size?: "sm" | "md" | "lg";
  showName?: boolean;
  className?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Crown, Heart, Flame, Zap, Trophy, Star, Calendar, Award,
};

const rarityGlow: Record<string, string> = {
  common: "shadow-green-200",
  rare: "shadow-blue-300",
  epic: "shadow-purple-400",
  legendary: "shadow-yellow-400",
};

export function BadgeDisplay({
  name,
  icon,
  color,
  rarity,
  size = "md",
  showName = true,
  className,
}: BadgeDisplayProps) {
  const Icon = iconMap[icon] || Star;

  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div className={cn("flex flex-col items-center gap-1.5", className)}>
      <div
        className={cn(
          sizes[size],
          "rounded-2xl flex items-center justify-center shadow-lg",
          rarityGlow[rarity]
        )}
        style={{ backgroundColor: color + "20", borderColor: color, borderWidth: 2 }}
      >
        <span style={{ color }}><Icon className={iconSizes[size]} /></span>
      </div>
      {showName && (
        <span className="text-[10px] font-medium text-gray-600 text-center leading-tight max-w-[80px]">
          {name}
        </span>
      )}
    </div>
  );
}
