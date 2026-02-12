"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Target, CalendarDays, Trophy, Rocket, ArrowRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: Sparkles,
    title: "Bem-vinda ao Florir",
    description: "Um espaco seguro e acolhedor para voce construir habitos que fortalecem sua autoestima. Tudo aqui e baseado em ciencia e feito com carinho para voce.",
    color: "from-teal-400 to-teal-600",
    glow: "shadow-glow-teal",
    bg: "glass-teal",
  },
  {
    icon: Target,
    title: "Habitos que transformam",
    description: "Vamos sugerir habitos cientificamente comprovados para melhorar sua autoestima. Cada habito vem com explicacao cientifica, melhor horario e dicas personalizadas.",
    color: "from-lilac-400 to-lilac-600",
    glow: "shadow-glow-lilac",
    bg: "glass-lilac",
  },
  {
    icon: CalendarDays,
    title: "Sua agenda, seu ritmo",
    description: "Nos respeitamos sua rotina. Vamos conhecer seus horarios para sugerir os melhores momentos para seus novos habitos, sem sobrecarregar voce.",
    color: "from-sage-400 to-sage-600",
    glow: "shadow-glow-teal",
    bg: "glass-teal",
  },
  {
    icon: Trophy,
    title: "Celebre cada passo",
    description: "Aqui nos nunca punimos - so celebramos! Conquiste badges, participe de desafios e compartilhe suas vitorias com uma comunidade que torce por voce.",
    color: "from-peach-400 to-peach-600",
    glow: "shadow-glow-peach",
    bg: "glass-peach",
  },
  {
    icon: Rocket,
    title: "Vamos configurar sua rotina",
    description: "Agora vamos conhecer um pouco da sua semana para criar a melhor experiencia possivel para voce. Vai ser rapido, prometemos!",
    color: "from-teal-400 to-lilac-500",
    glow: "shadow-glow-teal",
    bg: "glass-lilac",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push("/onboarding/agenda");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-b from-oat-50 via-white to-teal-50/30 flex flex-col px-6 py-8">
      {/* Cabecalho com voltar e indicadores */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={handleBack}
          className={`p-2 rounded-xl transition-colors ${currentStep > 0 ? "hover:bg-gray-100 text-gray-600" : "invisible"}`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Indicadores de progresso */}
        <div className="flex gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentStep ? "w-8 bg-teal-500" : i < currentStep ? "w-4 bg-teal-300" : "w-4 bg-gray-200"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => router.push("/onboarding/agenda")}
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          Pular
        </button>
      </div>

      {/* Conteudo animado */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="text-center max-w-sm"
          >
            {/* Icone */}
            <motion.div
              className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-8 ${step.glow}`}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <step.icon className="w-12 h-12 text-white" />
            </motion.div>

            {/* Texto */}
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">
              {step.title}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              {step.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Botao */}
      <div className="mt-auto">
        <Button variant="primary" size="lg" fullWidth onClick={handleNext}>
          {currentStep === steps.length - 1 ? "Configurar minha rotina" : "Proximo"}
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
