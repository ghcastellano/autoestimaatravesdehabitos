"use client";

import { motion } from "framer-motion";
import {
  Users, Target, Trophy, Gift, MessageSquare, TrendingUp,
  ArrowUp, ArrowDown, Calendar, Flame, Star, Heart
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";

const stats = [
  { label: "Usuarios totais", value: "1.247", change: "+12%", up: true, icon: Users, color: "text-teal-500", bg: "glass-teal" },
  { label: "Habitos ativos", value: "3.891", change: "+8%", up: true, icon: Target, color: "text-lilac-500", bg: "glass-lilac" },
  { label: "Desafios ativos", value: "3", change: "0", up: true, icon: Trophy, color: "text-peach-500", bg: "glass-peach" },
  { label: "Doacoes do mes", value: "R$ 285", change: "+45%", up: true, icon: Gift, color: "text-rose-500", bg: "glass-peach" },
];

const recentActivity = [
  { type: "user", text: "Nova usuaria cadastrada: Maria S.", time: "5 min atras", icon: Users },
  { type: "habit", text: "Ana C. completou 21 dias de meditacao", time: "15 min atras", icon: Flame },
  { type: "challenge", text: "Julia M. entrou no desafio '4 Semanas de Treino'", time: "1h atras", icon: Trophy },
  { type: "donation", text: "Doacao anonima de R$ 50", time: "2h atras", icon: Heart },
  { type: "social", text: "Novo post no feed: Carla R. compartilhou conquista", time: "3h atras", icon: MessageSquare },
  { type: "user", text: "Nova usuaria cadastrada: Fernanda L.", time: "4h atras", icon: Users },
  { type: "habit", text: "Patricia M. adicionou habito 'Yoga'", time: "5h atras", icon: Target },
];

const topHabits = [
  { name: "Meditacao", users: 456, percentage: 37 },
  { name: "Caminhada", users: 389, percentage: 31 },
  { name: "Diario de gratidao", users: 312, percentage: 25 },
  { name: "Leitura", users: 278, percentage: 22 },
  { name: "Skincare", users: 245, percentage: 20 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-gray-900 mb-1">Painel Administrativo</h1>
        <p className="text-sm text-gray-500">Visao geral do Florir</p>
      </div>

      {/* Cards de estatisticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card variant="default" padding="md" className={stat.bg}>
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-xs font-medium text-gray-500">{stat.label}</span>
              </div>
              <div className="flex items-end justify-between">
                <p className="font-display text-2xl font-bold text-gray-900">{stat.value}</p>
                <div className={`flex items-center gap-0.5 text-xs font-medium ${stat.up ? "text-teal-600" : "text-red-500"}`}>
                  {stat.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  {stat.change}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Atividade recente */}
        <div>
          <h3 className="font-display font-semibold text-gray-900 mb-3">Atividade recente</h3>
          <Card variant="default" padding="md">
            <div className="space-y-3">
              {recentActivity.map((activity, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.03 }}
                  className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <activity.icon className="w-4 h-4 text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700">{activity.text}</p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        {/* Top habitos */}
        <div>
          <h3 className="font-display font-semibold text-gray-900 mb-3">Habitos mais populares</h3>
          <Card variant="default" padding="md">
            <div className="space-y-4">
              {topHabits.map((habit, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-400 w-5">{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">{habit.name}</span>
                      <span className="text-xs text-gray-500">{habit.users} usuarios</span>
                    </div>
                    <ProgressBar value={habit.percentage} max={100} color="from-teal-400 to-teal-600" size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Meta de doacao */}
          <h3 className="font-display font-semibold text-gray-900 mb-3 mt-6">Meta de doacoes</h3>
          <Card variant="default" padding="md" className="glass-peach">
            <div className="flex items-center gap-3 mb-3">
              <Gift className="w-6 h-6 text-peach-500" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Manter o Florir no ar</p>
                <p className="text-xs text-gray-500">R$ 285 de R$ 500</p>
              </div>
              <span className="text-lg font-bold text-teal-600">57%</span>
            </div>
            <ProgressBar value={285} max={500} color="from-peach-400 to-rose-400" size="md" />
          </Card>
        </div>
      </div>
    </div>
  );
}
