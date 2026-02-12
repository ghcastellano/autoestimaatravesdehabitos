"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sparkles, Plus, ChevronRight, Trophy, Target,
  Flame, CalendarDays, Gift, Star, TrendingUp,
  Heart, MessageCircle
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { ProgressBar } from "@/components/ui/progress-bar";
import { BadgeDisplay } from "@/components/ui/badge-display";
import { getGreeting, getRandomItem } from "@/lib/utils";
import { MOTIVATIONAL_MESSAGES } from "@/lib/constants/habits";
import Link from "next/link";

export default function DashboardPage() {
  const greeting = getGreeting();
  const [dailyMessage] = useState(() => getRandomItem(MOTIVATIONAL_MESSAGES.general));

  // Dados simulados para a interface - serao substituidos por dados reais do Supabase
  const mockData = {
    userName: "Querida",
    avatar: null,
    todayHabits: [
      { id: "1", name: "Meditacao", icon: "🧘", time: "07:00", duration: 10, completed: true, color: "#0d9488" },
      { id: "2", name: "Caminhada", icon: "🚶‍♀️", time: "07:30", duration: 30, completed: true, color: "#7a8d64" },
      { id: "3", name: "Diario de gratidao", icon: "📝", time: "22:00", duration: 10, completed: false, color: "#a855f7" },
      { id: "4", name: "Leitura", icon: "📚", time: "21:30", duration: 20, completed: false, color: "#f97316" },
    ],
    streak: 5,
    weekProgress: 68,
    totalBadges: 3,
    activeChallenges: 1,
  };

  const completedToday = mockData.todayHabits.filter((h) => h.completed).length;
  const totalToday = mockData.todayHabits.length;

  return (
    <div className="page-container bg-gradient-to-b from-oat-50 via-white to-teal-50/20">
      {/* Cabecalho */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div className="flex items-center gap-3">
          <Avatar name={mockData.userName} size="md" />
          <div>
            <p className="text-sm text-gray-500">{greeting},</p>
            <h1 className="font-display text-xl font-bold text-gray-900">{mockData.userName}</h1>
          </div>
        </div>
        <Link href="/perfil" className="p-2 rounded-xl glass hover:shadow-glass-lg transition-all">
          <Sparkles className="w-5 h-5 text-teal-500" />
        </Link>
      </motion.div>

      {/* Mensagem motivacional */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card variant="highlight" padding="md" className="mb-6">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Heart className="w-4 h-4 text-teal-600" />
            </div>
            <p className="text-sm text-gray-700 leading-relaxed italic">
              &ldquo;{dailyMessage}&rdquo;
            </p>
          </div>
        </Card>
      </motion.div>

      {/* Resumo do dia */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="section-title">Hoje</h2>
          <span className="text-sm font-semibold text-teal-600">{completedToday}/{totalToday}</span>
        </div>
        <ProgressBar
          value={completedToday}
          max={totalToday}
          color="from-teal-400 to-lilac-500"
          size="md"
          className="mb-4"
        />

        {/* Lista de habitos do dia */}
        <div className="space-y-2">
          {mockData.todayHabits.map((habit, i) => (
            <motion.div
              key={habit.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
            >
              <Card variant="default" padding="sm">
                <div className="flex items-center gap-3">
                  <button
                    className={habit.completed ? "habit-check-done" : "habit-check"}
                  >
                    {habit.completed && <span className="text-xs">✓</span>}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${habit.completed ? "text-gray-400 line-through" : "text-gray-900"}`}>
                      {habit.icon} {habit.name}
                    </p>
                    <p className="text-xs text-gray-400">{habit.time} · {habit.duration} min</p>
                  </div>
                  {habit.completed && (
                    <span className="badge-teal text-[10px]">Feito!</span>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <Link href="/habitos">
          <Button variant="outline" size="sm" fullWidth className="mt-3">
            <Plus className="w-4 h-4" />
            Adicionar novo habito
          </Button>
        </Link>
      </motion.div>

      {/* Cards de estatisticas */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 gap-3 mb-6"
      >
        <Card variant="default" padding="md" className="glass-teal">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-5 h-5 text-peach-500" />
            <span className="text-xs font-medium text-gray-500">Sequencia</span>
          </div>
          <p className="font-display text-2xl font-bold text-gray-900">{mockData.streak} <span className="text-sm font-normal text-gray-500">dias</span></p>
        </Card>

        <Card variant="default" padding="md" className="glass-lilac">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-lilac-500" />
            <span className="text-xs font-medium text-gray-500">Semana</span>
          </div>
          <p className="font-display text-2xl font-bold text-gray-900">{mockData.weekProgress}<span className="text-sm font-normal text-gray-500">%</span></p>
        </Card>

        <Link href="/desafios" className="block">
          <Card variant="default" padding="md" className="glass-peach">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-peach-500" />
              <span className="text-xs font-medium text-gray-500">Desafios</span>
            </div>
            <p className="font-display text-2xl font-bold text-gray-900">{mockData.activeChallenges} <span className="text-sm font-normal text-gray-500">ativo</span></p>
          </Card>
        </Link>

        <Link href="/perfil" className="block">
          <Card variant="default" padding="md" className="glass-teal">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-oat-500" />
              <span className="text-xs font-medium text-gray-500">Badges</span>
            </div>
            <p className="font-display text-2xl font-bold text-gray-900">{mockData.totalBadges} <span className="text-sm font-normal text-gray-500">ganhos</span></p>
          </Card>
        </Link>
      </motion.div>

      {/* Links rapidos */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-2"
      >
        <Link href="/social">
          <Card variant="default" padding="sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-lilac-100 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-lilac-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Feed da comunidade</p>
                  <p className="text-xs text-gray-500">Veja o que a comunidade esta compartilhando</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Card>
        </Link>

        <Link href="/doacoes">
          <Card variant="default" padding="sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-peach-100 flex items-center justify-center">
                  <Gift className="w-5 h-5 text-peach-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Apoie o Florir</p>
                  <p className="text-xs text-gray-500">Ajude a manter o app gratuito</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Card>
        </Link>

        <Link href="/proposito">
          <Card variant="default" padding="sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Nosso proposito</p>
                  <p className="text-xs text-gray-500">Conheca nossa missao</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Card>
        </Link>
      </motion.div>
    </div>
  );
}
