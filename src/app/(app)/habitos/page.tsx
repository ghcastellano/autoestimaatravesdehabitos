"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Target, Brain, Heart, Sparkles, TrendingUp,
  Apple, Users, Search, Clock, ChevronRight, Info, Leaf,
  Dumbbell, BookOpen, Moon, Droplets, Star, Music, Loader2,
  Trash2, Sun, Snowflake, Wind, Eye, EyeOff, Phone, Zap,
  Lightbulb, PenTool, Flower2, Trophy, Palette, TreePine,
  Ban, Layout, Footprints, Salad
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Tabs } from "@/components/ui/tabs";
import { useAuth, useHabits, useHabitLogs } from "@/hooks";
import { calculateStreak } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart, Brain, Users, Sparkles, TrendingUp, Apple,
  Dumbbell, BookOpen, Moon, Droplets, Star, Music, Leaf, Target,
  Sun, Snowflake, Wind, Eye, EyeOff, Phone, Zap, Lightbulb,
  PenTool, Flower2, Trophy, Palette, TreePine, Ban, Layout,
  Footprints, Salad,
};

export default function HabitosPage() {
  const [activeTab, setActiveTab] = useState("meus");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showHabitDetail, setShowHabitDetail] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  const { user, loading: authLoading } = useAuth();
  const { userHabits, categories, templates, loading: habitsLoading, addHabit, removeHabit } = useHabits(user?.id);
  const { logs } = useHabitLogs(user?.id);

  const loading = authLoading || habitsLoading;

  const filteredTemplates = selectedCategory
    ? templates.filter((t) => t.category_id === selectedCategory)
    : templates;

  const selectedTemplate = showHabitDetail ? templates.find((t) => t.id === showHabitDetail) : null;
  const selectedCategory$ = selectedTemplate ? categories.find((c) => c.id === selectedTemplate.category_id) : null;

  const handleAddHabit = async (templateId: string) => {
    setAdding(true);
    await addHabit(templateId);
    setAdding(false);
    setShowHabitDetail(null);
  };

  // Check if user already has this habit
  const userHasTemplate = (templateId: string) =>
    userHabits.some((h) => h.template_id === templateId);

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
            className="space-y-3 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0"
          >
            {userHabits.length > 0 ? (
              userHabits.map((habit, i) => {
                const Icon = iconMap[habit.icon] || Star;
                const name = habit.custom_name || habit.template?.name || "Habito";
                const habitLogs = logs.filter((l) => l.user_habit_id === habit.id);
                const habitStreak = calculateStreak(habitLogs);

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
                          <p className="text-sm font-semibold text-gray-900">{name}</p>
                          <p className="text-xs text-gray-500">
                            {habit.preferred_time?.slice(0, 5)} · {habit.duration_minutes} min · {habit.frequency_per_week}x/semana
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-peach-500">
                              <span className="text-xs font-bold">{habitStreak}</span>
                              <span className="text-[10px]">dias</span>
                            </div>
                          </div>
                          <button
                            onClick={() => removeHabit(habit.id)}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })
            ) : (
              <div className="lg:col-span-2">
                <Card variant="default" padding="lg" className="text-center">
                  <Target className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500 mb-1">Voce ainda nao tem habitos</p>
                  <p className="text-xs text-gray-400">Explore os habitos recomendados e comece sua jornada</p>
                </Card>
              </div>
            )}

            <div className={userHabits.length > 0 ? "" : "lg:col-span-2"}>
              <Button variant="primary" fullWidth onClick={() => { setActiveTab("explorar"); }}>
                <Plus className="w-4 h-4" />
                Adicionar novo habito
              </Button>
            </div>
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
              {categories.map((cat) => (
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
            <div className="space-y-2 lg:grid lg:grid-cols-2 lg:gap-3 lg:space-y-0">
              {filteredTemplates.map((template, i) => {
                const Icon = iconMap[template.icon] || Star;
                const cat = categories.find((c) => c.id === template.category_id);
                const alreadyAdded = userHasTemplate(template.id);

                return (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <button
                      onClick={() => setShowHabitDetail(template.id)}
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
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-semibold text-gray-900">{template.name}</p>
                              {alreadyAdded && <span className="badge-teal text-[10px]">Adicionado</span>}
                            </div>
                            <p className="text-xs text-gray-500 truncate">{template.description}</p>
                            <div className="flex gap-2 mt-1.5">
                              <span className="badge-teal text-[10px]">{template.recommended_duration_minutes} min</span>
                              <span className="badge-lilac text-[10px]">{template.recommended_frequency_per_week}x/sem</span>
                              <span className={`badge text-[10px] ${
                                template.esteem_impact === "high" ? "bg-teal-100 text-teal-700" : "bg-oat-200 text-oat-700"
                              }`}>
                                {template.esteem_impact === "high" ? "Alto impacto" : "Impacto medio"}
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
        isOpen={!!selectedTemplate}
        onClose={() => setShowHabitDetail(null)}
        title={selectedTemplate?.name}
      >
        {selectedTemplate && (
          <div className="space-y-5">
            <p className="text-sm text-gray-600">{selectedTemplate.description}</p>

            {/* Beneficio cientifico */}
            <Card variant="highlight" padding="md">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-lilac-100 flex items-center justify-center flex-shrink-0">
                  <Brain className="w-4 h-4 text-lilac-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-lilac-700 mb-1">Base cientifica</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{selectedTemplate.scientific_benefit}</p>
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
                  <p className="text-xs font-semibold text-teal-700 mb-1">Melhor horario: {selectedTemplate.best_time_of_day?.slice(0, 5)}</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{selectedTemplate.best_time_reason}</p>
                </div>
              </div>
            </Card>

            {/* Detalhes */}
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 rounded-xl bg-oat-100/50">
                <p className="text-lg font-bold text-gray-900">{selectedTemplate.recommended_duration_minutes}</p>
                <p className="text-[10px] text-gray-500">minutos</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-oat-100/50">
                <p className="text-lg font-bold text-gray-900">{selectedTemplate.recommended_frequency_per_week}</p>
                <p className="text-[10px] text-gray-500">vezes/semana</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-oat-100/50">
                <p className="text-lg font-bold text-gray-900 capitalize">{selectedTemplate.difficulty === "easy" ? "Facil" : selectedTemplate.difficulty === "medium" ? "Medio" : "Dificil"}</p>
                <p className="text-[10px] text-gray-500">dificuldade</p>
              </div>
            </div>

            {userHasTemplate(selectedTemplate.id) ? (
              <Card variant="default" padding="md" className="text-center">
                <p className="text-sm text-teal-600 font-medium">Voce ja adicionou este habito!</p>
              </Card>
            ) : (
              <Button variant="primary" fullWidth onClick={() => handleAddHabit(selectedTemplate.id)} loading={adding}>
                <Plus className="w-4 h-4" />
                Adicionar este habito
              </Button>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
