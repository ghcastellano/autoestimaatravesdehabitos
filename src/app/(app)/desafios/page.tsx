"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Users, Calendar, ChevronRight, Clock, Star, Flame, Target, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { BadgeDisplay } from "@/components/ui/badge-display";
import { Tabs } from "@/components/ui/tabs";
import { Modal } from "@/components/ui/modal";
import { useAuth, useChallenges } from "@/hooks";

const iconEmojis: Record<string, string> = {
  Flame: "\uD83D\uDD25",
  Zap: "\u26A1",
  Calendar: "\uD83D\uDCC5",
  Trophy: "\uD83C\uDFC6",
  Star: "\u2B50",
};

export default function DesafiosPage() {
  const [activeTab, setActiveTab] = useState("ativos");
  const [selectedDesafio, setSelectedDesafio] = useState<string | null>(null);
  const [joining, setJoining] = useState(false);

  const { user, loading: authLoading } = useAuth();
  const { challenges, loading: challengesLoading, joinChallenge } = useChallenges(user?.id);

  const loading = authLoading || challengesLoading;

  const filtered = challenges.filter((d) => {
    if (activeTab === "ativos") return d.userStatus === "active" || d.userStatus === "available";
    return d.userStatus === "completed";
  });

  const selected = selectedDesafio ? challenges.find((c) => c.id === selectedDesafio) : null;

  const handleJoin = async (challengeId: string) => {
    setJoining(true);
    await joinChallenge(challengeId);
    setJoining(false);
    setSelectedDesafio(null);
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

  return (
    <div className="page-container bg-gradient-to-b from-oat-50 via-white to-lilac-50/20">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-gray-900 mb-1">Desafios</h1>
        <p className="text-sm text-gray-500">Supere-se e conquiste badges especiais</p>
      </div>

      <Tabs
        tabs={[
          { id: "ativos", label: "Ativos", icon: <Flame className="w-4 h-4" /> },
          { id: "concluidos", label: "Concluidos", icon: <Trophy className="w-4 h-4" /> },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
        className="mb-6"
      />

      {filtered.length > 0 ? (
        <div className="space-y-3 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
          {filtered.map((desafio, i) => {
            const emoji = iconEmojis[desafio.icon] || "\uD83C\uDFC6";
            const badge = desafio.badge as any;

            return (
              <motion.div
                key={desafio.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <button className="w-full text-left" onClick={() => setSelectedDesafio(desafio.id)}>
                  <Card variant="default" padding="md">
                    <div className="flex gap-3">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl"
                        style={{ backgroundColor: desafio.color + "15" }}
                      >
                        {emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-semibold text-gray-900 truncate">{desafio.title}</p>
                          {desafio.userStatus === "completed" && (
                            <span className="badge-teal text-[10px]">Concluido</span>
                          )}
                          {desafio.userStatus === "active" && (
                            <span className="badge-lilac text-[10px]">Participando</span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {desafio.duration_days} dias
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {desafio.participantsCount} participantes
                          </span>
                        </div>
                        {desafio.userStatus === "active" && (
                          <ProgressBar value={desafio.progress} max={desafio.duration_days} color="from-teal-400 to-lilac-500" size="sm" />
                        )}
                      </div>
                      {badge && (
                        <BadgeDisplay name={badge.name} icon={badge.icon} color={badge.color} rarity={badge.rarity} size="sm" showName={false} />
                      )}
                    </div>
                  </Card>
                </button>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <Card variant="default" padding="lg" className="text-center">
          <Trophy className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-500">
            {activeTab === "ativos" ? "Nenhum desafio disponivel no momento" : "Voce ainda nao completou nenhum desafio"}
          </p>
        </Card>
      )}

      {/* Modal de detalhe */}
      <Modal isOpen={!!selected} onClose={() => setSelectedDesafio(null)} title={selected?.title}>
        {selected && (() => {
          const emoji = iconEmojis[selected.icon] || "\uD83C\uDFC6";
          const badge = selected.badge as any;

          return (
            <div className="space-y-5">
              <div className="flex justify-center">
                <div
                  className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl"
                  style={{ backgroundColor: selected.color + "15" }}
                >
                  {emoji}
                </div>
              </div>

              <p className="text-sm text-gray-600 text-center">{selected.description}</p>

              <Card variant="highlight" padding="md">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-lilac-100 flex items-center justify-center flex-shrink-0">
                    <Star className="w-4 h-4 text-lilac-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-lilac-700 mb-1">Base cientifica</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{selected.scientific_benefit}</p>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 rounded-xl bg-oat-100/50">
                  <p className="text-lg font-bold text-gray-900">{selected.duration_days}</p>
                  <p className="text-[10px] text-gray-500">dias</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-oat-100/50">
                  <p className="text-lg font-bold text-gray-900">{selected.participantsCount}</p>
                  <p className="text-[10px] text-gray-500">participantes</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-oat-100/50">
                  {badge && <BadgeDisplay name={badge.name} icon={badge.icon} color={badge.color} rarity={badge.rarity} size="sm" />}
                </div>
              </div>

              {selected.userStatus === "active" && (
                <div>
                  <div className="flex justify-between text-xs text-gray-500 mb-2">
                    <span>Progresso</span>
                    <span>{selected.progress}/{selected.duration_days} dias</span>
                  </div>
                  <ProgressBar value={selected.progress} max={selected.duration_days} color="from-teal-400 to-lilac-500" size="md" />
                </div>
              )}

              {selected.userStatus === "available" && (
                <Button variant="primary" fullWidth onClick={() => handleJoin(selected.id)} loading={joining}>
                  <Trophy className="w-4 h-4" />
                  Participar do desafio
                </Button>
              )}

              {selected.userStatus === "completed" && (
                <Card variant="highlight" padding="md" className="text-center">
                  <Trophy className="w-8 h-8 text-teal-500 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-900">Parabens! Voce concluiu este desafio!</p>
                  {badge && <p className="text-xs text-gray-500 mt-1">Voce ganhou o badge {badge.name}</p>}
                </Card>
              )}
            </div>
          );
        })()}
      </Modal>
    </div>
  );
}
