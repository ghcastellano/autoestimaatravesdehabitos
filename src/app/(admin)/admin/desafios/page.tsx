"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Plus, Users, Calendar, Edit, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { BadgeDisplay } from "@/components/ui/badge-display";

const mockDesafios = [
  {
    id: "1", title: "21 Dias de Meditacao", status: "active",
    participants: 145, startDate: "2026-02-01", endDate: "2026-02-22",
    badge: { name: "21 Dias", icon: "Zap", color: "#a855f7", rarity: "rare" },
  },
  {
    id: "2", title: "4 Semanas de Treino", status: "upcoming",
    participants: 98, startDate: "2026-02-15", endDate: "2026-03-15",
    badge: { name: "Desafiante", icon: "Award", color: "#f43f5e", rarity: "rare" },
  },
  {
    id: "3", title: "10 Dias Dormindo no Horario", status: "completed",
    participants: 203, startDate: "2026-01-20", endDate: "2026-01-30",
    badge: { name: "Sono Regular", icon: "Star", color: "#eab308", rarity: "rare" },
  },
];

export default function AdminDesafiosPage() {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900 mb-1">Gerenciar Desafios</h1>
          <p className="text-sm text-gray-500">{mockDesafios.length} desafios criados</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setShowCreate(true)}>
          <Plus className="w-4 h-4" />
          Novo desafio
        </Button>
      </div>

      <div className="space-y-3">
        {mockDesafios.map((desafio, i) => (
          <motion.div
            key={desafio.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card variant="default" padding="md">
              <div className="flex items-center gap-3">
                <BadgeDisplay {...desafio.badge} size="sm" showName={false} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-gray-900">{desafio.title}</p>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      desafio.status === "active" ? "bg-teal-100 text-teal-700" :
                      desafio.status === "upcoming" ? "bg-lilac-100 text-lilac-700" :
                      "bg-gray-100 text-gray-500"
                    }`}>
                      {desafio.status === "active" ? "Ativo" : desafio.status === "upcoming" ? "Em breve" : "Concluido"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" />{desafio.participants}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{desafio.startDate} a {desafio.endDate}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button className="p-2 rounded-xl hover:bg-gray-100"><Edit className="w-4 h-4 text-gray-400" /></button>
                  <button className="p-2 rounded-xl hover:bg-red-50"><Trash2 className="w-4 h-4 text-red-400" /></button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Modal para criar desafio */}
      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Novo desafio">
        <div className="space-y-4">
          <Input label="Titulo do desafio" placeholder="Ex: 21 Dias de Meditacao" />
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Descricao</label>
            <textarea className="input-field resize-none" rows={3} placeholder="Descreva o desafio e o que a participante precisa fazer..." />
          </div>
          <Input label="Beneficio cientifico" placeholder="Qual a base cientifica deste desafio?" />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Data de inicio" type="date" />
            <Input label="Data de fim" type="date" />
          </div>
          <Input label="Duracao (dias)" type="number" placeholder="21" />
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Tipo de desafio</label>
            <select className="input-field">
              <option value="consecutive_days">Dias consecutivos</option>
              <option value="weekly_frequency">Frequencia semanal</option>
              <option value="total_completions">Total de conclusoes</option>
              <option value="custom">Personalizado</option>
            </select>
          </div>
          <Button variant="primary" fullWidth>
            <Trophy className="w-4 h-4" />
            Criar desafio
          </Button>
        </div>
      </Modal>
    </div>
  );
}
