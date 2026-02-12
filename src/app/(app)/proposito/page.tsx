"use client";

import { motion } from "framer-motion";
import { Sparkles, Heart, Brain, Users, Leaf, Shield, ArrowLeft, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const valores = [
  {
    icon: Heart,
    title: "Acolhimento",
    description: "Criamos um espaco onde voce e acolhida como e. Sem julgamento, sem pressao. Cada passo no seu ritmo e celebrado.",
    color: "text-rose-500",
    bg: "glass-peach",
  },
  {
    icon: Brain,
    title: "Ciencia",
    description: "Cada habito, dica e recomendacao e embasada em pesquisas cientificas. Nada de achismo - so evidencias que realmente funcionam.",
    color: "text-lilac-500",
    bg: "glass-lilac",
  },
  {
    icon: Shield,
    title: "Seguranca",
    description: "Aqui e seu espaco seguro. Nunca punimos, so celebramos. Entendemos que o caminho nao e linear e isso e perfeitamente normal.",
    color: "text-teal-500",
    bg: "glass-teal",
  },
  {
    icon: Users,
    title: "Comunidade",
    description: "Voce nao esta sozinha nessa jornada. Uma comunidade de mulheres que se apoiam, se inspiram e crescem juntas.",
    color: "text-sage-500",
    bg: "glass-teal",
  },
  {
    icon: Leaf,
    title: "Gratuito para sempre",
    description: "Acreditamos que autoestima nao deveria ter preco. O Florir sera sempre gratuito, mantido por doacoes voluntarias da comunidade.",
    color: "text-sage-600",
    bg: "glass-peach",
  },
];

export default function PropositoPage() {
  return (
    <div className="page-container bg-gradient-to-b from-oat-50 via-white to-teal-50/20">
      {/* Cabecalho */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <motion.div
          className="w-20 h-20 rounded-3xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-glow-teal"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="w-10 h-10 text-white" />
        </motion.div>

        <h1 className="font-display text-3xl font-extrabold text-gray-900 mb-3">
          Nosso <span className="gradient-text">proposito</span>
        </h1>

        <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
          Acreditamos que cada mulher merece se sentir confiante, forte e em paz consigo mesma. E que pequenos habitos diarios sao o caminho mais gentil e eficaz para essa transformacao.
        </p>
      </motion.div>

      {/* Historia */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card variant="highlight" padding="lg" className="mb-8">
          <div className="flex gap-3">
            <Star className="w-6 h-6 text-oat-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-display font-bold text-gray-900 mb-2">Como tudo comecou</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                O Florir nasceu de uma conversa entre Sophia e seu parceiro sobre como a autoestima e construida no dia a dia, nao em grandes momentos.
                Percebemos que muitas mulheres querem cuidar de si mesmas mas nao sabem por onde comecar, ou se cobram demais quando nao conseguem manter a consistencia.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed mt-3">
                Entao decidimos criar um espaco que une ciencia e acolhimento - onde cada habito tem uma razao de existir, cada conquista e celebrada, e cada dia nao cumprido e recebido com gentileza e nao com culpa.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Valores */}
      <div className="mb-8">
        <h2 className="font-display text-xl font-bold text-gray-900 mb-4 text-center">No que acreditamos</h2>
        <div className="space-y-3">
          {valores.map((valor, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
            >
              <Card variant="default" padding="md" className={valor.bg}>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/50 flex items-center justify-center flex-shrink-0">
                    <valor.icon className={`w-5 h-5 ${valor.color}`} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">{valor.title}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">{valor.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Como cumprimos */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <Card variant="default" padding="lg" className="glass-lilac">
          <Sparkles className="w-8 h-8 text-lilac-500 mx-auto mb-3" />
          <h3 className="font-display font-bold text-gray-900 mb-2">Como cumprimos nosso proposito</h3>
          <ul className="text-sm text-gray-600 space-y-2 text-left">
            <li className="flex gap-2"><span className="text-teal-500 font-bold">1.</span> Cada recomendacao de habito e baseada em pesquisas publicadas em journals cientificos revisados por pares.</li>
            <li className="flex gap-2"><span className="text-teal-500 font-bold">2.</span> Nossa linguagem e sempre positiva e encorajadora. Nunca punimos, sempre celebramos o progresso.</li>
            <li className="flex gap-2"><span className="text-teal-500 font-bold">3.</span> O app sera sempre gratuito. Custos sao cobertos por doacoes voluntarias da comunidade.</li>
            <li className="flex gap-2"><span className="text-teal-500 font-bold">4.</span> Desafios e badges motivam sem criar ansiedade - grace periods garantem que voce nao perde progresso por um dia ruim.</li>
            <li className="flex gap-2"><span className="text-teal-500 font-bold">5.</span> A comunidade interna e um espaco seguro de troca e apoio mutuo entre mulheres.</li>
          </ul>
        </Card>
      </motion.div>

      <div className="text-center mt-6">
        <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
          <span>Feito com</span>
          <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
          <span>por Sophia & parceiro</span>
        </div>
      </div>
    </div>
  );
}
