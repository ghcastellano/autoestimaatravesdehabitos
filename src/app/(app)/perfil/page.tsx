"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Settings, LogOut, ChevronRight, Crown, Shield,
  Eye, EyeOff, Camera, Edit3, Trophy, Target, Flame,
  Calendar, Star, Heart, Sparkles, Loader2
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BadgeDisplay } from "@/components/ui/badge-display";
import { ProgressBar } from "@/components/ui/progress-bar";
import { useAuth, useHabits, useHabitLogs, useStats } from "@/hooks";
import { supabase } from "@/lib/supabase/client";
import type { UserBadge, Badge } from "@/types/database";
import Link from "next/link";

export default function PerfilPage() {
  const { user, profile, loading: authLoading, signOut, updateProfile } = useAuth();
  const { userHabits, loading: habitsLoading } = useHabits(user?.id);
  const { logs, loading: logsLoading } = useHabitLogs(user?.id);
  const { streak, weekProgress } = useStats(userHabits, logs);
  const [userBadges, setUserBadges] = useState<(UserBadge & { badge: Badge })[]>([]);
  const [badgesLoading, setBadgesLoading] = useState(true);

  const loading = authLoading || habitsLoading || logsLoading;

  useEffect(() => {
    const fetchBadges = async () => {
      if (!user?.id) return;
      const { data } = await supabase
        .from("user_badges")
        .select("*, badge:badges(*)")
        .eq("user_id", user.id);

      if (data) setUserBadges(data as any);
      setBadgesLoading(false);
    };
    fetchBadges();
  }, [user?.id]);

  const handleTogglePublic = async () => {
    if (!profile) return;
    await updateProfile({ is_public_profile: !profile.is_public_profile });
  };

  const handleToggleShowHabits = async () => {
    if (!profile) return;
    await updateProfile({ show_habits_publicly: !profile.show_habits_publicly });
  };

  if (loading) {
    return (
      <div className="page-container flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-teal-500 animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">Carregando...</p>
        </div>
      </div>
    );
  }

  const userName = profile?.full_name || "Querida";
  const userEmail = profile?.email || user?.email || "";
  const userBio = profile?.bio || "";

  // Compute completion rate
  const totalLogs = logs.filter((l) => l.status === "completed").length;

  return (
    <div className="page-container bg-gradient-to-b from-oat-50 via-white to-teal-50/20">
      {/* Cabecalho do perfil */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6 lg:text-left lg:flex lg:items-center lg:gap-6"
      >
        <div className="relative inline-block mb-3">
          <Avatar name={userName} size="xl" />
          <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center shadow-glow-teal">
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <h1 className="font-display text-xl font-bold text-gray-900">{userName}</h1>
        <p className="text-sm text-gray-500">{userEmail}</p>
        {userBio && (
          <p className="text-sm text-gray-600 mt-2 italic">&ldquo;{userBio}&rdquo;</p>
        )}
      </motion.div>

      {/* Badges */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <h3 className="font-display font-semibold text-gray-900 mb-3">Minhas conquistas</h3>
        <Card variant="default" padding="md" className="mb-6">
          {userBadges.length > 0 ? (
            <div className="flex justify-around flex-wrap gap-3">
              {userBadges.map((ub) => (
                <BadgeDisplay
                  key={ub.id}
                  name={ub.badge.name}
                  icon={ub.badge.icon}
                  color={ub.badge.color}
                  rarity={ub.badge.rarity}
                  size="md"
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center">Nenhum badge conquistado ainda. Continue praticando seus habitos!</p>
          )}
        </Card>
      </motion.div>

      {/* Estatisticas */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h3 className="font-display font-semibold text-gray-900 mb-3">Estatisticas</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6">
          <Card variant="default" padding="sm" className="glass-teal text-center">
            <Flame className="w-5 h-5 text-peach-500 mx-auto mb-1" />
            <p className="text-xl font-bold text-gray-900">{streak}</p>
            <p className="text-[10px] text-gray-500">Sequencia atual</p>
          </Card>
          <Card variant="default" padding="sm" className="glass-lilac text-center">
            <Star className="w-5 h-5 text-lilac-500 mx-auto mb-1" />
            <p className="text-xl font-bold text-gray-900">{userHabits.length}</p>
            <p className="text-[10px] text-gray-500">Habitos ativos</p>
          </Card>
          <Card variant="default" padding="sm" className="glass-peach text-center">
            <Target className="w-5 h-5 text-teal-500 mx-auto mb-1" />
            <p className="text-xl font-bold text-gray-900">{weekProgress}%</p>
            <p className="text-[10px] text-gray-500">Progresso semanal</p>
          </Card>
          <Card variant="default" padding="sm" className="glass-teal text-center">
            <Trophy className="w-5 h-5 text-oat-500 mx-auto mb-1" />
            <p className="text-xl font-bold text-gray-900">{userBadges.length}</p>
            <p className="text-[10px] text-gray-500">Badges ganhos</p>
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
                {profile?.is_public_profile ? <Eye className="w-5 h-5 text-teal-500" /> : <EyeOff className="w-5 h-5 text-gray-400" />}
                <div>
                  <p className="text-sm font-medium text-gray-900">Perfil publico</p>
                  <p className="text-xs text-gray-500">Outras pessoas podem ver seu perfil</p>
                </div>
              </div>
              <button
                onClick={handleTogglePublic}
                className={`w-12 h-7 rounded-full transition-colors relative ${profile?.is_public_profile ? "bg-teal-500" : "bg-gray-300"}`}
              >
                <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-sm transition-transform ${profile?.is_public_profile ? "left-[22px]" : "left-0.5"}`} />
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
                onClick={handleToggleShowHabits}
                className={`w-12 h-7 rounded-full transition-colors relative ${profile?.show_habits_publicly ? "bg-teal-500" : "bg-gray-300"}`}
              >
                <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-sm transition-transform ${profile?.show_habits_publicly ? "left-[22px]" : "left-0.5"}`} />
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

        <button className="w-full" onClick={signOut}>
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
