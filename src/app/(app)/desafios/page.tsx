"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Users, Calendar, ChevronRight, Clock, Star, Flame, Target } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { BadgeDisplay } from "@/components/ui/badge-display";
import { Tabs } from "@/components/ui/tabs";
import { Modal } from "@/components/ui/modal";

const mockDesafios = [
  {
    id: "1",
    title: "21 Dias de Meditacao",
    description: "Medite por pelo menos 10 minutos todos os dias durante 21 dias. A ciencia mostra que 21 dias e o inicio da formacao de um novo habito neural.",
    scientific_benefit: "Pesquisas de Harvard demonstram que 21 dias consecutivos de meditacao podem reduzir o cortisol em ate 25% e aumentar a massa cinzenta em areas do cerebro associadas a autocompaixao.",
    duration_days: 21,
    participants: 145,
    progress: 12,
    status: "active" as const,
    badge: { name: "21 Dias", icon: "Zap", color: "#a855f7", rarity: "rare" },
    icon: "🧘",
    start_date: "2026-02-01",
    end_date: "2026-02-22",
    color: "#a855f7",
  },
  {
    id: "2",
    title: "4 Semanas de Treino",
    description: "Complete seus treinos com a frequencia que voce definiu durante 4 semanas seguidas. Se voce treina 3x por semana, complete as 3 sessoes em cada semana.",
    scientific_benefit: "Estudo publicado no British Journal of Sports Medicine mostra que 4 semanas de exercicio consistente melhora significativamente a autoimagem e aumenta a confianca corporal.",
    duration_days: 28,
    participants: 98,
    progress: 0,
    status: "available" as const,
    badge: { name: "Desafiante", icon: "Award", color: "#f43f5e", rarity: "rare" },
    icon: "🏋️‍♀️",
    start_date: "2026-02-15",
    end_date: "2026-03-15",
    color: "#0d9488",
  },
  {
    id: "3",
    title: "10 Dias Dormindo no Horario",
    description: "Durma no horario que voce definiu como ideal durante 10 dias consecutivos. Seu corpo e sua mente agradecem pela regularidade.",
    scientific_benefit: "Pesquisa do Sleep journal mostra que manter horarios regulares de sono por 10 dias ja e suficiente para melhorar o humor em ate 20% e reduzir irritabilidade.",
    duration_days: 10,
    participants: 203,
    progress: 10,
    status: "completed" as const,
    badge: { name: "Sono Regular", icon: "Star", color: "#eab308", rarity: "rare" },
    icon: "😴",
    start_date: "2026-01-20",
    end_date: "2026-01-30",
    color: "#7a8d64",
  },
];

export default function DesafiosPage() {
  const [activeTab, setActiveTab] = useState("ativos");
  const [selectedDesafio, setSelectedDesafio] = useState<typeof mockDesafios[0] | null>(null);

  const filtered = mockDesafios.filter((d) => {
    if (activeTab === "ativos") return d.status === "active" || d.status === "available";
    return d.status === "completed";
  });

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

      <div className="space-y-3">
        {filtered.map((desafio, i) => (
          <motion.div
            key={desafio.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <button className="w-full text-left" onClick={() => setSelectedDesafio(desafio)}>
              <Card variant="default" padding="md">
                <div className="flex gap-3">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl"
                    style={{ backgroundColor: desafio.color + "15" }}
                  >
                    {desafio.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-gray-900 truncate">{desafio.title}</p>
                      {desafio.status === "completed" && (
                        <span className="badge-teal text-[10px]">Concluido</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {desafio.duration_days} dias
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {desafio.participants} participantes
                      </span>
                    </div>
                    {desafio.status === "active" && (
                      <ProgressBar value={desafio.progress} max={desafio.duration_days} color="from-teal-400 to-lilac-500" size="sm" />
                    )}
                  </div>
                  <BadgeDisplay {...desafio.badge} size="sm" showName={false} />
                </div>
              </Card>
            </button>
          </motion.div>
        ))}
      </div>

      {/* Modal de detalhe */}
      <Modal isOpen={!!selectedDesafio} onClose={() => setSelectedDesafio(null)} title={selectedDesafio?.title}>
        {selectedDesafio && (
          <div className="space-y-5">
            <div className="flex justify-center">
              <div
                className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl"
                style={{ backgroundColor: selectedDesafio.color + "15" }}
              >
                {selectedDesafio.icon}
              </div>
            </div>

            <p className="text-sm text-gray-600 text-center">{selectedDesafio.description}</p>

            <Card variant="highlight" padding="md">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-lilac-100 flex items-center justify-center flex-shrink-0">
                  <Star className="w-4 h-4 text-lilac-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-lilac-700 mb-1">Base cientifica</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{selectedDesafio.scientific_benefit}</p>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 rounded-xl bg-oat-100/50">
                <p className="text-lg font-bold text-gray-900">{selectedDesafio.duration_days}</p>
                <p className="text-[10px] text-gray-500">dias</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-oat-100/50">
                <p className="text-lg font-bold text-gray-900">{selectedDesafio.participants}</p>
                <p className="text-[10px] text-gray-500">participantes</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-oat-100/50">
                <BadgeDisplay {...selectedDesafio.badge} size="sm" />
              </div>
            </div>

            {selectedDesafio.status === "active" && (
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>Progresso</span>
                  <span>{selectedDesafio.progress}/{selectedDesafio.duration_days} dias</span>
                </div>
                <ProgressBar value={selectedDesafio.progress} max={selectedDesafio.duration_days} color="from-teal-400 to-lilac-500" size="md" />
              </div>
            )}

            {selectedDesafio.status === "available" && (
              <Button variant="primary" fullWidth>
                <Trophy className="w-4 h-4" />
                Participar do desafio
              </Button>
            )}

            {selectedDesafio.status === "completed" && (
              <Card variant="highlight" padding="md" className="text-center">
                <Trophy className="w-8 h-8 text-teal-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-900">Parabens! Voce concluiu este desafio!</p>
                <p className="text-xs text-gray-500 mt-1">Voce ganhou o badge {selectedDesafio.badge.name}</p>
              </Card>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
