"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Heart, Crown, Sparkles, ArrowRight, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Avatar } from "@/components/ui/avatar";
import { BadgeDisplay } from "@/components/ui/badge-display";
import { Modal } from "@/components/ui/modal";

const mockGoal = {
  title: "Manter o Florir no ar",
  description: "Custos com servidor, banco de dados e infraestrutura para manter o app funcionando de forma gratuita para todas.",
  target: 500,
  current: 285,
};

const mockDonations = [
  { name: "Maria S.", amount: 50, message: "Amo esse app! Continuem!", time: "2 dias atras", anonymous: false },
  { name: "Ana C.", amount: 25, message: "Obrigada por existirem", time: "5 dias atras", anonymous: false },
  { name: "Anonima", amount: 100, message: null, time: "1 semana atras", anonymous: true },
  { name: "Julia M.", amount: 30, message: "Por mais projetos assim!", time: "2 semanas atras", anonymous: false },
];

const donationValues = [5, 10, 25, 50, 100];

export default function DoacoesPage() {
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25);
  const [customAmount, setCustomAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const percentage = Math.round((mockGoal.current / mockGoal.target) * 100);

  return (
    <div className="page-container bg-gradient-to-b from-oat-50 via-white to-peach-50/20">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-gray-900 mb-1">Apoie o Florir</h1>
        <p className="text-sm text-gray-500">Ajude a manter este projeto vivo e gratuito</p>
      </div>

      {/* Card principal de meta */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card variant="highlight" padding="lg" className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-peach-400 to-rose-400 flex items-center justify-center shadow-glow-peach">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-display font-bold text-gray-900">{mockGoal.title}</h3>
              <p className="text-xs text-gray-500">{mockGoal.description}</p>
            </div>
          </div>

          <div className="mb-3">
            <div className="flex justify-between items-end mb-2">
              <div>
                <span className="text-2xl font-display font-bold text-gray-900">R$ {mockGoal.current}</span>
                <span className="text-sm text-gray-500"> / R$ {mockGoal.target}</span>
              </div>
              <span className="text-sm font-bold text-teal-600">{percentage}%</span>
            </div>
            <ProgressBar value={mockGoal.current} max={mockGoal.target} color="from-peach-400 to-rose-400" size="lg" />
          </div>

          <Button variant="primary" fullWidth onClick={() => setShowDonateModal(true)}>
            <Gift className="w-4 h-4" />
            Fazer uma doacao
          </Button>
        </Card>
      </motion.div>

      {/* Badge de patrocinadora */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card variant="default" padding="md" className="glass-peach mb-6">
          <div className="flex items-center gap-4">
            <BadgeDisplay name="Patrocinadora" icon="Heart" color="#ec4899" rarity="epic" size="md" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">Torne-se Patrocinadora</p>
              <p className="text-xs text-gray-500">Ao doar qualquer valor, voce ganha o badge exclusivo de Patrocinadora e ajuda a comunidade a crescer!</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Doacoes recentes */}
      <div className="mb-4">
        <h3 className="font-display font-semibold text-gray-900 mb-3">Patrocinadoras recentes</h3>
        <div className="space-y-2">
          {mockDonations.map((donation, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
            >
              <Card variant="default" padding="sm">
                <div className="flex items-center gap-3">
                  <Avatar name={donation.anonymous ? "?" : donation.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">{donation.name}</span>
                      <Crown className="w-3 h-3 text-peach-500" />
                    </div>
                    {donation.message && (
                      <p className="text-xs text-gray-500 truncate">{donation.message}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-teal-600">R$ {donation.amount}</p>
                    <p className="text-[10px] text-gray-400">{donation.time}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal de doacao */}
      <Modal isOpen={showDonateModal} onClose={() => setShowDonateModal(false)} title="Fazer doacao">
        <div className="space-y-5">
          <p className="text-sm text-gray-600">
            Cada contribuicao ajuda a manter o Florir gratuito para todas. Voce automaticamente ganha o badge de Patrocinadora!
          </p>

          {/* Valores pre-definidos */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Escolha um valor</p>
            <div className="grid grid-cols-5 gap-2">
              {donationValues.map((val) => (
                <button
                  key={val}
                  onClick={() => { setSelectedAmount(val); setCustomAmount(""); }}
                  className={`py-3 rounded-xl text-sm font-bold transition-all ${
                    selectedAmount === val
                      ? "bg-teal-500 text-white shadow-glow-teal"
                      : "bg-white/60 text-gray-700 border border-gray-200"
                  }`}
                >
                  R${val}
                </button>
              ))}
            </div>
          </div>

          {/* Valor customizado */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Ou digite um valor</label>
            <input
              type="number"
              placeholder="R$ 0,00"
              value={customAmount}
              onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
              className="input-field"
            />
          </div>

          {/* Mensagem */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Mensagem (opcional)</label>
            <textarea
              placeholder="Deixe uma mensagem de apoio..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="input-field resize-none"
              rows={2}
            />
          </div>

          {/* Anonimo */}
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="w-5 h-5 rounded-lg border-gray-300 text-teal-500 focus:ring-teal-500"
            />
            <span className="text-sm text-gray-700">Doar anonimamente</span>
          </label>

          <Button variant="primary" fullWidth>
            <Heart className="w-4 h-4" />
            Doar R$ {selectedAmount || customAmount || 0}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
