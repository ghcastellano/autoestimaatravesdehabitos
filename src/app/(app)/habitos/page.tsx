"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Target, Brain, Heart, Sparkles, TrendingUp,
  Apple, Users, Search, Clock, ChevronRight, Info, Leaf,
  Dumbbell, BookOpen, Moon, Droplets, Star, Music
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Tabs } from "@/components/ui/tabs";
import { HABIT_CATEGORIES, RECOMMENDED_HABITS, DAYS_OF_WEEK } from "@/lib/constants/habits";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart, Brain, Users, Sparkles, TrendingUp, Apple,
  Dumbbell, BookOpen, Moon, Droplets, Star, Music, Leaf, Target,
};

export default function HabitosPage() {
  const [activeTab, setActiveTab] = useState("meus");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showHabitDetail, setShowHabitDetail] = useState<typeof RECOMMENDED_HABITS[0] | null>(null);

  // Dados simulados
  const meusHabitos = [
    { id: "1", name: "Meditacao", icon: "Leaf", duration: 10, frequency: 7, time: "07:00", color: "#0d9488", streak: 5 },
    { id: "2", name: "Caminhada", icon: "Heart", duration: 30, frequency: 5, time: "07:30", color: "#7a8d64", streak: 3 },
  ];

  const filteredHabits = selectedCategory
    ? RECOMMENDED_HABITS.filter((h) => h.category === selectedCategory)
    : RECOMMENDED_HABITS;

  return (
    <div className="page-container bg-gradient-to-b from-oat-50 via-white to-lilac-50/20">
      {/* Cabecalho */}
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-gray-900 mb-1">Meus habitos</h1>
        <p className="text-sm text-gray-500">Gerencie seus habitos e descubra novos</p>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={[
          { id: "meus", label: "Meus", icon: <Target className="w-4 h-4" /> },
          { id: "explorar", label: "Explorar", icon: <Search className="w-4 h-4" /> },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
        className="mb-6"
      />

      <AnimatePresence mode="wait">
        {activeTab === "meus" ? (
          <motion.div
            key="meus"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-3"
          >
            {meusHabitos.map((habit, i) => {
              const Icon = iconMap[habit.icon] || Star;
              return (
                <motion.div
                  key={habit.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card variant="default" padding="md">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: habit.color + "20" }}
                      >
                        <span style={{ color: habit.color }}><Icon className="w-6 h-6" /></span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">{habit.name}</p>
                        <p className="text-xs text-gray-500">{habit.time} · {habit.duration} min · {habit.frequency}x/semana</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-peach-500">
                          <span className="text-xs font-bold">{habit.streak}</span>
                          <span className="text-[10px]">dias</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}

            <Button variant="primary" fullWidth onClick={() => { setActiveTab("explorar"); }}>
              <Plus className="w-4 h-4" />
              Adicionar novo habito
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="explorar"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {/* Categorias */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-3 mb-4 -mx-4 px-4">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  !selectedCategory ? "bg-teal-500 text-white shadow-glow-teal" : "bg-white/60 text-gray-600 border border-gray-200"
                }`}
              >
                Todos
              </button>
              {HABIT_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? "text-white shadow-lg"
                      : "bg-white/60 text-gray-600 border border-gray-200"
                  }`}
                  style={selectedCategory === cat.id ? { backgroundColor: cat.color } : {}}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Lista de habitos recomendados */}
            <div className="space-y-2">
              {filteredHabits.map((habit, i) => {
                const Icon = iconMap[habit.icon] || Star;
                const cat = HABIT_CATEGORIES.find((c) => c.id === habit.category);
                return (
                  <motion.div
                    key={habit.name}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <button
                      onClick={() => setShowHabitDetail(habit)}
                      className="w-full text-left"
                    >
                      <Card variant="default" padding="md">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: (cat?.color || "#0d9488") + "15" }}
                          >
                            <span style={{ color: cat?.color || "#0d9488" }}><Icon className="w-6 h-6" /></span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900">{habit.name}</p>
                            <p className="text-xs text-gray-500 truncate">{habit.description}</p>
                            <div className="flex gap-2 mt-1.5">
                              <span className="badge-teal text-[10px]">{habit.recommended_duration} min</span>
                              <span className="badge-lilac text-[10px]">{habit.recommended_frequency}x/sem</span>
                              <span className={`badge text-[10px] ${
                                habit.esteem_impact === "high" ? "bg-teal-100 text-teal-700" : "bg-oat-200 text-oat-700"
                              }`}>
                                {habit.esteem_impact === "high" ? "Alto impacto" : "Impacto medio"}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-300 flex-shrink-0" />
                        </div>
                      </Card>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de detalhe do habito */}
      <Modal
        isOpen={!!showHabitDetail}
        onClose={() => setShowHabitDetail(null)}
        title={showHabitDetail?.name}
      >
        {showHabitDetail && (
          <div className="space-y-5">
            <p className="text-sm text-gray-600">{showHabitDetail.description}</p>

            {/* Beneficio cientifico */}
            <Card variant="highlight" padding="md">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-lilac-100 flex items-center justify-center flex-shrink-0">
                  <Brain className="w-4 h-4 text-lilac-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-lilac-700 mb-1">Base cientifica</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{showHabitDetail.scientific_benefit}</p>
                </div>
              </div>
            </Card>

            {/* Melhor horario */}
            <Card variant="default" padding="md" className="glass-teal">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-teal-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-teal-700 mb-1">Melhor horario: {showHabitDetail.best_time}</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{showHabitDetail.best_time_reason}</p>
                </div>
              </div>
            </Card>

            {/* Detalhes */}
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 rounded-xl bg-oat-100/50">
                <p className="text-lg font-bold text-gray-900">{showHabitDetail.recommended_duration}</p>
                <p className="text-[10px] text-gray-500">minutos</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-oat-100/50">
                <p className="text-lg font-bold text-gray-900">{showHabitDetail.recommended_frequency}</p>
                <p className="text-[10px] text-gray-500">vezes/semana</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-oat-100/50">
                <p className="text-lg font-bold text-gray-900 capitalize">{showHabitDetail.difficulty === "easy" ? "Facil" : showHabitDetail.difficulty === "medium" ? "Medio" : "Dificil"}</p>
                <p className="text-[10px] text-gray-500">dificuldade</p>
              </div>
            </div>

            <Button variant="primary" fullWidth onClick={() => setShowHabitDetail(null)}>
              <Plus className="w-4 h-4" />
              Adicionar este habito
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
