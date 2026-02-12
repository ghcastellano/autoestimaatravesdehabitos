"use client";

import { motion } from "framer-motion";
import { Users, Search, Shield, Crown, MoreHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { BadgeDisplay } from "@/components/ui/badge-display";

const mockUsers = [
  { id: "1", name: "Maria Silva", email: "maria@email.com", habits: 5, streak: 12, badges: 3, joined: "2026-01-15", isAdmin: false },
  { id: "2", name: "Ana Costa", email: "ana@email.com", habits: 3, streak: 8, badges: 2, joined: "2026-01-20", isAdmin: false },
  { id: "3", name: "Julia Mendes", email: "julia@email.com", habits: 4, streak: 21, badges: 4, joined: "2026-01-22", isAdmin: false },
  { id: "4", name: "Carla Rodrigues", email: "carla@email.com", habits: 2, streak: 5, badges: 1, joined: "2026-02-01", isAdmin: false },
  { id: "5", name: "Admin", email: "admin@florir.app", habits: 0, streak: 0, badges: 0, joined: "2026-01-01", isAdmin: true },
];

export default function UsuariosPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900 mb-1">Usuarios</h1>
          <p className="text-sm text-gray-500">{mockUsers.length} usuarios cadastrados</p>
        </div>
      </div>

      <Input
        placeholder="Buscar por nome ou email..."
        icon={<Search className="w-4 h-4" />}
      />

      <div className="space-y-2">
        {mockUsers.map((user, i) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            <Card variant="default" padding="sm">
              <div className="flex items-center gap-3">
                <Avatar name={user.name} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                    {user.isAdmin && <Shield className="w-4 h-4 text-teal-500" />}
                  </div>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <div className="text-right text-xs text-gray-500 hidden sm:block">
                  <p>{user.habits} habitos · {user.streak} dias de sequencia</p>
                  <p>{user.badges} badges · Desde {new Date(user.joined).toLocaleDateString("pt-BR")}</p>
                </div>
                <button className="p-2 rounded-xl hover:bg-gray-100">
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
