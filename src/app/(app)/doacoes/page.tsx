"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Heart, Crown, Sparkles, ArrowRight, Star, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Avatar } from "@/components/ui/avatar";
import { BadgeDisplay } from "@/components/ui/badge-display";
import { Modal } from "@/components/ui/modal";
import { useAuth, useDonations } from "@/hooks";

const donationValues = [5, 10, 25, 50, 100];

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 60) return "agora";
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `${diffH}h atras`;
  const diffD = Math.floor(diffH / 24);
  if (diffD < 7) return `${diffD}d atras`;
  if (diffD < 30) return `${Math.floor(diffD / 7)} sem atras`;
  return `${Math.floor(diffD / 30)} mes atras`;
}

export default function DoacoesPage() {
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25);
  const [customAmount, setCustomAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [donating, setDonating] = useState(false);

  const { user, loading: authLoading } = useAuth();
  const { goal, donations, loading: donationsLoading, donate } = useDonations(user?.id);

  const loading = authLoading || donationsLoading;

  const handleDonate = async () => {
    const amount = selectedAmount || Number(customAmount);
    if (!amount || amount <= 0) return;

    setDonating(true);
    await donate(amount, message, isAnonymous);
    setDonating(false);
    setShowDonateModal(false);
    setMessage("");
    setCustomAmount("");
    setSelectedAmount(25);
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

  const percentage = goal ? Math.round((Number(goal.current_amount) / Number(goal.target_amount)) * 100) : 0;

  return (
    <div className="page-container bg-gradient-to-b from-oat-50 via-white to-peach-50/20">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-gray-900 mb-1">Apoie o Florir</h1>
        <p className="text-sm text-gray-500">Ajude a manter este projeto vivo e gratuito</p>
      </div>

      {/* Card principal de meta */}
      {goal && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card variant="highlight" padding="lg" className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-peach-400 to-rose-400 flex items-center justify-center shadow-glow-peach">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-display font-bold text-gray-900">{goal.title}</h3>
                <p className="text-xs text-gray-500">{goal.description}</p>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex justify-between items-end mb-2">
                <div>
                  <span className="text-2xl font-display font-bold text-gray-900">R$ {Number(goal.current_amount).toFixed(0)}</span>
                  <span className="text-sm text-gray-500"> / R$ {Number(goal.target_amount).toFixed(0)}</span>
                </div>
                <span className="text-sm font-bold text-teal-600">{percentage}%</span>
              </div>
              <ProgressBar value={Number(goal.current_amount)} max={Number(goal.target_amount)} color="from-peach-400 to-rose-400" size="lg" />
            </div>

            <Button variant="primary" fullWidth onClick={() => setShowDonateModal(true)}>
              <Gift className="w-4 h-4" />
              Fazer uma doacao
            </Button>
          </Card>
        </motion.div>
      )}

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
        {donations.length > 0 ? (
          <div className="space-y-2 lg:grid lg:grid-cols-2 lg:gap-3 lg:space-y-0">
            {donations.map((donation, i) => {
              const donorProfile = donation.profile as any;
              const name = donation.is_anonymous ? "Anonima" : (donorProfile?.full_name || "Apoiadora");

              return (
                <motion.div
                  key={donation.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                >
                  <Card variant="default" padding="sm">
                    <div className="flex items-center gap-3">
                      <Avatar name={donation.is_anonymous ? "?" : name} size="sm" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900">{name}</span>
                          <Crown className="w-3 h-3 text-peach-500" />
                        </div>
                        {donation.message && (
                          <p className="text-xs text-gray-500 truncate">{donation.message}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-teal-600">R$ {Number(donation.amount).toFixed(0)}</p>
                        <p className="text-[10px] text-gray-400">{timeAgo(donation.created_at)}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <Card variant="default" padding="lg" className="text-center">
            <p className="text-sm text-gray-500">Nenhuma doacao ainda. Seja a primeira!</p>
          </Card>
        )}
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

          <Button variant="primary" fullWidth onClick={handleDonate} loading={donating}>
            <Heart className="w-4 h-4" />
            Doar R$ {selectedAmount || customAmount || 0}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
