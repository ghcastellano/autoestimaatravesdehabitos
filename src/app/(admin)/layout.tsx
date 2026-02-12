"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, Trophy, Target, Gift,
  MessageSquare, Settings, ChevronLeft, Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminLinks = [
  { href: "/admin", icon: LayoutDashboard, label: "Painel" },
  { href: "/admin/usuarios", icon: Users, label: "Usuarios" },
  { href: "/admin/desafios", icon: Trophy, label: "Desafios" },
  { href: "/admin/habitos", icon: Target, label: "Habitos" },
  { href: "/admin/doacoes", icon: Gift, label: "Doacoes" },
  { href: "/admin/mensagens", icon: MessageSquare, label: "Mensagens" },
  { href: "/admin/configuracoes", icon: Settings, label: "Config" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cabecalho admin mobile */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-40">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="p-2 rounded-xl hover:bg-gray-100">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-gray-900">Admin</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navegacao admin - scroll horizontal no mobile */}
      <div className="bg-white border-b border-gray-100 overflow-x-auto scrollbar-hide">
        <div className="flex gap-1 px-4 py-2 min-w-max">
          {adminLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap",
                  isActive
                    ? "bg-primary-50 text-primary-700"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                )}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}
