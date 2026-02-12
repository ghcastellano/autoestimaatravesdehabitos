"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles, ArrowRight, Leaf, Brain, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50/50 via-oat-50 to-lilac-50/30 flex flex-col">
      {/* Cabecalho */}
      <header className="px-6 safe-top">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-glow-teal">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-gray-900">Florir</span>
          </div>
          <Link href="/login" className="text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors">
            Entrar
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <motion.div
          className="text-center max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-20 h-20 rounded-3xl gradient-primary flex items-center justify-center mx-auto mb-8 shadow-glow-teal"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="font-display text-4xl font-extrabold text-gray-900 mb-4 leading-tight text-balance">
            Sua jornada de{" "}
            <span className="gradient-text">autoestima</span>{" "}
            comeca aqui
          </h1>

          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Descubra como pequenos habitos diarios, construidos com carinho e ciencia, podem transformar a forma como voce se ve.
          </p>

          <div className="space-y-3">
            <Link href="/cadastro">
              <Button variant="primary" size="lg" fullWidth>
                Comecar minha jornada
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="secondary" size="lg" fullWidth>
                Ja tenho uma conta
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Destaques com Liquid Glass */}
        <motion.div
          className="mt-16 grid grid-cols-3 gap-3 max-w-sm w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            { icon: <Brain className="w-5 h-5 text-lilac-500" />, label: "Base cientifica", glass: "glass-lilac" },
            { icon: <Shield className="w-5 h-5 text-teal-500" />, label: "Espaco seguro", glass: "glass-teal" },
            { icon: <Leaf className="w-5 h-5 text-sage-500" />, label: "100% gratuito", glass: "glass-peach" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className={`text-center p-4 rounded-2xl ${item.glass}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              <div className="flex justify-center mb-2">{item.icon}</div>
              <span className="text-xs font-medium text-gray-700">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* Rodape */}
      <footer className="px-6 py-6 text-center">
        <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
          <span>Feito com</span>
          <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
          <span>por Sophia & parceiro</span>
        </div>
      </footer>
    </div>
  );
}
