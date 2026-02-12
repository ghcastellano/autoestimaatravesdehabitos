"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Target, CalendarDays, MessageCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Inicio" },
  { href: "/habitos", icon: Target, label: "Habitos" },
  { href: "/calendario", icon: CalendarDays, label: "Calendario" },
  { href: "/social", icon: MessageCircle, label: "Feed" },
  { href: "/perfil", icon: User, label: "Perfil" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="mobile-nav lg:hidden">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 py-1 px-3 rounded-2xl transition-all duration-200",
                isActive ? "text-teal-600" : "text-gray-400"
              )}
            >
              <div className="relative">
                {isActive && (
                  <motion.div
                    className="absolute -inset-2 bg-teal-100/60 rounded-xl"
                    layoutId="navIndicator"
                    transition={{ type: "spring", duration: 0.4 }}
                  />
                )}
                <item.icon className={cn("w-5 h-5 relative z-10", isActive && "text-teal-600")} />
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
