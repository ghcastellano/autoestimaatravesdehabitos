"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Briefcase, Calendar, Plus, X, ArrowRight, ChevronLeft, Clock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { supabase } from "@/lib/supabase/client";
import { DAYS_OF_WEEK } from "@/lib/constants/habits";

const timeOptions = Array.from({ length: 48 }, (_, i) => {
  const h = Math.floor(i / 2).toString().padStart(2, "0");
  const m = i % 2 === 0 ? "00" : "30";
  return `${h}:${m}`;
});

interface Commitment {
  title: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
}

export default function AgendaPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  // Etapa 1: Horarios
  const [wakeTime, setWakeTime] = useState("07:00");
  const [sleepTime, setSleepTime] = useState("23:00");

  // Etapa 2: Trabalho
  const [hasWork, setHasWork] = useState(true);
  const [workStart, setWorkStart] = useState("09:00");
  const [workEnd, setWorkEnd] = useState("18:00");
  const [workDays, setWorkDays] = useState([1, 2, 3, 4, 5]);

  // Etapa 3: Compromissos
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [newCommitment, setNewCommitment] = useState<Commitment>({
    title: "",
    day_of_week: 1,
    start_time: "08:00",
    end_time: "09:00",
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const toggleWorkDay = (day: number) => {
    setWorkDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const addCommitment = () => {
    if (newCommitment.title.trim()) {
      setCommitments([...commitments, { ...newCommitment }]);
      setNewCommitment({ title: "", day_of_week: 1, start_time: "08:00", end_time: "09:00" });
      setShowAddForm(false);
    }
  };

  const removeCommitment = (index: number) => {
    setCommitments(commitments.filter((_, i) => i !== index));
  };

  const handleFinish = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuario nao autenticado");

      // Salvar horarios para cada dia da semana
      const schedules = Array.from({ length: 7 }, (_, i) => ({
        user_id: user.id,
        day_of_week: i,
        wake_time: wakeTime,
        sleep_time: sleepTime,
        work_start: hasWork && workDays.includes(i) ? workStart : null,
        work_end: hasWork && workDays.includes(i) ? workEnd : null,
      }));

      await supabase.from("schedules").upsert(schedules, { onConflict: "user_id,day_of_week" });

      // Salvar compromissos fixos
      if (commitments.length > 0) {
        const commitmentRows = commitments.map((c) => ({
          user_id: user.id,
          ...c,
        }));
        await supabase.from("fixed_commitments").insert(commitmentRows);
      }

      // Marcar onboarding como completo
      await supabase.from("profiles").update({ onboarding_completed: true }).eq("id", user.id);

      router.push("/dashboard");
    } catch (err) {
      console.error("Erro ao salvar agenda:", err);
    } finally {
      setLoading(false);
    }
  };

  const stepTitles = [
    { icon: Sun, title: "Seus horarios", desc: "Quando voce acorda e dorme?" },
    { icon: Briefcase, title: "Seu trabalho", desc: "Nos conte sobre sua rotina profissional" },
    { icon: Calendar, title: "Compromissos fixos", desc: "Algo que se repete toda semana?" },
  ];

  const current = stepTitles[step];

  return (
    <div className="min-h-screen bg-gradient-to-b from-oat-50 via-white to-teal-50/30 flex flex-col px-6 py-8">
      {/* Cabecalho */}
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={() => step > 0 ? setStep(step - 1) : router.back()}
          className="p-2 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-sm text-gray-400 font-medium">Etapa {step + 1} de 3</span>
        <div className="w-9" />
      </div>

      {/* Barra de progresso */}
      <div className="flex gap-2 mb-8">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full flex-1 transition-all duration-500 ${
              i <= step ? "bg-teal-500" : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Titulo */}
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center mb-4 shadow-glow-teal">
          <current.icon className="w-6 h-6 text-white" />
        </div>
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-1">{current.title}</h2>
        <p className="text-gray-500">{current.desc}</p>
      </motion.div>

      {/* Conteudo */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="space-y-6"
            >
              <Card variant="glass" padding="lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-peach-100 flex items-center justify-center">
                    <Sun className="w-5 h-5 text-peach-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Acordo as</p>
                    <p className="text-xs text-gray-500">Quando seu dia comeca?</p>
                  </div>
                </div>
                <select
                  value={wakeTime}
                  onChange={(e) => setWakeTime(e.target.value)}
                  className="input-field"
                >
                  {timeOptions.filter((t) => t >= "04:00" && t <= "12:00").map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </Card>

              <Card variant="glass" padding="lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-lilac-100 flex items-center justify-center">
                    <Moon className="w-5 h-5 text-lilac-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Durmo as</p>
                    <p className="text-xs text-gray-500">Quando voce vai descansar?</p>
                  </div>
                </div>
                <select
                  value={sleepTime}
                  onChange={(e) => setSleepTime(e.target.value)}
                  className="input-field"
                >
                  {timeOptions.filter((t) => t >= "20:00" || t <= "02:00").map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </Card>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="space-y-6"
            >
              {/* Toggle trabalho */}
              <div className="flex gap-3">
                <button
                  onClick={() => setHasWork(true)}
                  className={`flex-1 p-4 rounded-2xl border-2 transition-all ${
                    hasWork ? "border-teal-400 bg-teal-50/50" : "border-gray-200"
                  }`}
                >
                  <Briefcase className={`w-6 h-6 mx-auto mb-2 ${hasWork ? "text-teal-600" : "text-gray-400"}`} />
                  <p className={`text-sm font-medium ${hasWork ? "text-teal-700" : "text-gray-500"}`}>Sim, trabalho</p>
                </button>
                <button
                  onClick={() => setHasWork(false)}
                  className={`flex-1 p-4 rounded-2xl border-2 transition-all ${
                    !hasWork ? "border-teal-400 bg-teal-50/50" : "border-gray-200"
                  }`}
                >
                  <Sun className={`w-6 h-6 mx-auto mb-2 ${!hasWork ? "text-teal-600" : "text-gray-400"}`} />
                  <p className={`text-sm font-medium ${!hasWork ? "text-teal-700" : "text-gray-500"}`}>Nao trabalho</p>
                </button>
              </div>

              {hasWork && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <Card variant="glass" padding="lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Inicio</label>
                        <select value={workStart} onChange={(e) => setWorkStart(e.target.value)} className="input-field">
                          {timeOptions.map((t) => (<option key={t} value={t}>{t}</option>))}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Fim</label>
                        <select value={workEnd} onChange={(e) => setWorkEnd(e.target.value)} className="input-field">
                          {timeOptions.map((t) => (<option key={t} value={t}>{t}</option>))}
                        </select>
                      </div>
                    </div>
                  </Card>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-3">Dias de trabalho</p>
                    <div className="flex gap-2">
                      {DAYS_OF_WEEK.map((day) => (
                        <button
                          key={day.value}
                          onClick={() => toggleWorkDay(day.value)}
                          className={`flex-1 py-3 rounded-xl text-xs font-semibold transition-all ${
                            workDays.includes(day.value)
                              ? "bg-teal-500 text-white shadow-glow-teal"
                              : "bg-white/60 text-gray-500 border border-gray-200"
                          }`}
                        >
                          {day.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="space-y-4"
            >
              {commitments.map((c, i) => (
                <Card key={i} variant="glass" padding="sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                        <Clock className="w-4 h-4 text-teal-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{c.title}</p>
                        <p className="text-xs text-gray-500">
                          {DAYS_OF_WEEK[c.day_of_week].full} - {c.start_time} ate {c.end_time}
                        </p>
                      </div>
                    </div>
                    <button onClick={() => removeCommitment(i)} className="p-1.5 rounded-lg hover:bg-red-50">
                      <X className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </Card>
              ))}

              {showAddForm ? (
                <Card variant="highlight" padding="lg">
                  <div className="space-y-3">
                    <Input
                      placeholder="Ex: Faculdade, Terapia, Pilates..."
                      value={newCommitment.title}
                      onChange={(e) => setNewCommitment({ ...newCommitment, title: e.target.value })}
                    />
                    <select
                      value={newCommitment.day_of_week}
                      onChange={(e) => setNewCommitment({ ...newCommitment, day_of_week: parseInt(e.target.value) })}
                      className="input-field"
                    >
                      {DAYS_OF_WEEK.map((d) => (
                        <option key={d.value} value={d.value}>{d.full}</option>
                      ))}
                    </select>
                    <div className="grid grid-cols-2 gap-3">
                      <select
                        value={newCommitment.start_time}
                        onChange={(e) => setNewCommitment({ ...newCommitment, start_time: e.target.value })}
                        className="input-field"
                      >
                        {timeOptions.map((t) => (<option key={t} value={t}>{t}</option>))}
                      </select>
                      <select
                        value={newCommitment.end_time}
                        onChange={(e) => setNewCommitment({ ...newCommitment, end_time: e.target.value })}
                        className="input-field"
                      >
                        {timeOptions.map((t) => (<option key={t} value={t}>{t}</option>))}
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="secondary" onClick={() => setShowAddForm(false)} className="flex-1">Cancelar</Button>
                      <Button variant="primary" onClick={addCommitment} className="flex-1">Adicionar</Button>
                    </div>
                  </div>
                </Card>
              ) : (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="w-full p-4 rounded-2xl border-2 border-dashed border-gray-300 text-gray-500 hover:border-teal-400 hover:text-teal-600 transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  <span className="text-sm font-medium">Adicionar compromisso</span>
                </button>
              )}

              <p className="text-xs text-gray-400 text-center mt-2">
                Voce pode adicionar mais compromissos depois, nao se preocupe!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Botao */}
      <div className="mt-8">
        {step < 2 ? (
          <Button variant="primary" size="lg" fullWidth onClick={() => setStep(step + 1)}>
            Proximo
            <ArrowRight className="w-5 h-5" />
          </Button>
        ) : (
          <Button variant="primary" size="lg" fullWidth onClick={handleFinish} loading={loading}>
            <Check className="w-5 h-5" />
            Finalizar e comecar a florescer
          </Button>
        )}
      </div>
    </div>
  );
}
