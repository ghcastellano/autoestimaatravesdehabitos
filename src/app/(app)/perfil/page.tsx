"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings, LogOut, ChevronRight, Crown, Shield,
  Eye, EyeOff, Camera, Edit3, Trophy, Target, Flame,
  Calendar, Star, Heart, Sparkles
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BadgeDisplay } from "@/components/ui/badge-display";
import { ProgressBar } from "@/components/ui/progress-bar";
import Link from "next/link";

const mockProfile = {
  name: "Querida Usuaria",
  email: "usuario@email.com",
  bio: "Em busca da melhor versao de mim mesma, um habito de cada vez.",
  avatar: null,
  isPublic: true,
  showHabits: false,
  badges: [
    { name: "Co-Fundadora", icon: "Crown", color: "#f59e0b", rarity: "legendary" },
    { name: "Patrocinadora", icon: "Heart", color: "#ec4899", rarity: "epic" },
    { name: "7 Dias de Forca", icon: "Flame", color: "#f97316", rarity: "common" },
  ],
  stats: {
    totalHabits: 4,
    totalDaysTracked: 45,
    longestStreak: 12,
    currentStreak: 5,
    challengesCompleted: 1,
    completionRate: 78,
  },
};

export default function PerfilPage() {
  const [isPublic, setIsPublic] = useState(mockProfile.isPublic);
  const [showHabits, setShowHabits] = useState(mockProfile.showHabits);

  return (
    <div className="page-container bg-gradient-to-b from-oat-50 via-white to-teal-50/20">
      {/* Cabecalho do perfil */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <div className="relative inline-block mb-3">
          <Avatar name={mockProfile.name} size="xl" />
          <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center shadow-glow-teal">
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <h1 className="font-display text-xl font-bold text-gray-900">{mockProfile.name}</h1>
        <p className="text-sm text-gray-500">{mockProfile.email}</p>
        {mockProfile.bio && (
          <p className="text-sm text-gray-600 mt-2 italic">&ldquo;{mockProfile.bio}&rdquo;</p>
        )}
      </motion.div>

      {/* Badges */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <h3 className="font-display font-semibold text-gray-900 mb-3">Minhas conquistas</h3>
        <Card variant="default" padding="md" className="mb-6">
          <div className="flex justify-around">
            {mockProfile.badges.map((badge, i) => (
              <BadgeDisplay key={i} {...badge} size="md" />
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Estatisticas */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h3 className="font-display font-semibold text-gray-900 mb-3">Estatisticas</h3>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card variant="default" padding="sm" className="glass-teal text-center">
            <Flame className="w-5 h-5 text-peach-500 mx-auto mb-1" />
            <p className="text-xl font-bold text-gray-900">{mockProfile.stats.currentStreak}</p>
            <p className="text-[10px] text-gray-500">Sequencia atual</p>
          </Card>
          <Card variant="default" padding="sm" className="glass-lilac text-center">
            <Star className="w-5 h-5 text-lilac-500 mx-auto mb-1" />
            <p className="text-xl font-bold text-gray-900">{mockProfile.stats.longestStreak}</p>
            <p className="text-[10px] text-gray-500">Maior sequencia</p>
          </Card>
          <Card variant="default" padding="sm" className="glass-peach text-center">
            <Target className="w-5 h-5 text-teal-500 mx-auto mb-1" />
            <p className="text-xl font-bold text-gray-900">{mockProfile.stats.completionRate}%</p>
            <p className="text-[10px] text-gray-500">Taxa de conclusao</p>
          </Card>
          <Card variant="default" padding="sm" className="glass-teal text-center">
            <Trophy className="w-5 h-5 text-oat-500 mx-auto mb-1" />
            <p className="text-xl font-bold text-gray-900">{mockProfile.stats.challengesCompleted}</p>
            <p className="text-[10px] text-gray-500">Desafios concluidos</p>
          </Card>
        </div>
      </motion.div>

      {/* Configuracoes de privacidade */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h3 className="font-display font-semibold text-gray-900 mb-3">Privacidade</h3>
        <div className="space-y-2 mb-6">
          <Card variant="default" padding="sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isPublic ? <Eye className="w-5 h-5 text-teal-500" /> : <EyeOff className="w-5 h-5 text-gray-400" />}
                <div>
                  <p className="text-sm font-medium text-gray-900">Perfil publico</p>
                  <p className="text-xs text-gray-500">Outras pessoas podem ver seu perfil</p>
                </div>
              </div>
              <button
                onClick={() => setIsPublic(!isPublic)}
                className={`w-12 h-7 rounded-full transition-colors relative ${isPublic ? "bg-teal-500" : "bg-gray-300"}`}
              >
                <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-sm transition-transform ${isPublic ? "left-[22px]" : "left-0.5"}`} />
              </button>
            </div>
          </Card>

          <Card variant="default" padding="sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-lilac-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Mostrar habitos</p>
                  <p className="text-xs text-gray-500">Exibir seus habitos e progresso publicamente</p>
                </div>
              </div>
              <button
                onClick={() => setShowHabits(!showHabits)}
                className={`w-12 h-7 rounded-full transition-colors relative ${showHabits ? "bg-teal-500" : "bg-gray-300"}`}
              >
                <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-sm transition-transform ${showHabits ? "left-[22px]" : "left-0.5"}`} />
              </button>
            </div>
          </Card>
        </div>
      </motion.div>

      {/* Links */}
      <div className="space-y-2">
        <Link href="/proposito">
          <Card variant="default" padding="sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-teal-500" />
                <span className="text-sm font-medium text-gray-900">Nosso proposito</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Card>
        </Link>

        <Card variant="default" padding="sm" className="cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-900">Configuracoes</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </Card>

        <button className="w-full">
          <Card variant="default" padding="sm">
            <div className="flex items-center gap-3">
              <LogOut className="w-5 h-5 text-red-500" />
              <span className="text-sm font-medium text-red-600">Sair da conta</span>
            </div>
          </Card>
        </button>
      </div>
    </div>
  );
}
