"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home, Target, CalendarDays, MessageCircle, User,
  Trophy, Gift, Heart, Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const mainNavItems = [
  { href: "/dashboard", icon: Home, label: "Inicio" },
  { href: "/habitos", icon: Target, label: "Habitos" },
  { href: "/calendario", icon: CalendarDays, label: "Calendario" },
  { href: "/social", icon: MessageCircle, label: "Feed" },
  { href: "/desafios", icon: Trophy, label: "Desafios" },
];

const secondaryNavItems = [
  { href: "/doacoes", icon: Gift, label: "Apoie o Florir" },
  { href: "/proposito", icon: Heart, label: "Nosso proposito" },
  { href: "/perfil", icon: User, label: "Meu perfil" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 bg-white/70 backdrop-blur-2xl border-r border-white/40 shadow-glass">
      <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-100/50">
        <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-glow-teal">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <span className="font-display font-bold text-lg text-gray-900">Florir</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {mainNavItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-teal-50 text-teal-700 shadow-sm"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive && "text-teal-600")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-gray-100/50 space-y-1">
        {secondaryNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-teal-50 text-teal-700"
                  : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
