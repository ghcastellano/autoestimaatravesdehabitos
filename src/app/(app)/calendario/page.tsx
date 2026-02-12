"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, Minus, X, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { DAYS_OF_WEEK } from "@/lib/constants/habits";
import { useAuth, useHabits, useHabitLogs } from "@/hooks";

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function formatDate(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

const MONTHS = [
  "Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export default function CalendarioPage() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today.getDate());

  const { user, loading: authLoading } = useAuth();
  const { userHabits, loading: habitsLoading } = useHabits(user?.id);

  // Fetch logs for the current month
  const startDate = formatDate(currentYear, currentMonth, 1);
  const endDate = formatDate(currentYear, currentMonth, getDaysInMonth(currentYear, currentMonth));
  const { logs, loading: logsLoading } = useHabitLogs(user?.id, startDate, endDate);

  const loading = authLoading || habitsLoading || logsLoading;

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Group logs by date
  const logsByDate = useMemo(() => {
    const map: Record<string, typeof logs> = {};
    logs.forEach((log) => {
      if (!map[log.date]) map[log.date] = [];
      map[log.date].push(log);
    });
    return map;
  }, [logs]);

  const getDayStatus = (day: number) => {
    const date = formatDate(currentYear, currentMonth, day);
    const dayLogs = logsByDate[date];
    if (!dayLogs || dayLogs.length === 0) return null;

    const dayOfWeek = new Date(currentYear, currentMonth, day).getDay();
    const scheduledHabits = userHabits.filter((h) => h.preferred_days.includes(dayOfWeek));
    if (scheduledHabits.length === 0) return null;

    const completedCount = dayLogs.filter((l) => l.status === "completed").length;
    if (completedCount >= scheduledHabits.length) return "complete";
    if (completedCount > 0) return "partial";
    return "missed";
  };

  const selectedDateStr = formatDate(currentYear, currentMonth, selectedDate);
  const selectedLogs = logsByDate[selectedDateStr] || [];

  // Map logs to habit names
  const selectedDayHabits = useMemo(() => {
    const habitMap = new Map(userHabits.map((h) => [h.id, h]));
    return selectedLogs.map((log) => {
      const habit = habitMap.get(log.user_habit_id);
      return {
        ...log,
        habitName: habit?.custom_name || habit?.template?.name || "Habito",
        habitIcon: habit?.icon || "Star",
      };
    });
  }, [selectedLogs, userHabits]);

  const isToday = (day: number) =>
    day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();

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
    <div className="page-container bg-gradient-to-b from-oat-50 via-white to-teal-50/20">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-gray-900 mb-1">Calendario</h1>
        <p className="text-sm text-gray-500">Acompanhe seu progresso dia a dia</p>
      </div>

      <div className="lg:grid lg:grid-cols-5 lg:gap-6">
      {/* Calendario */}
      <div className="lg:col-span-3">
      <Card variant="default" padding="md" className="mb-6">
        {/* Navegacao do mes */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h3 className="font-display font-bold text-gray-900">
            {MONTHS[currentMonth]} {currentYear}
          </h3>
          <button onClick={nextMonth} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Dias da semana */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAYS_OF_WEEK.map((day) => (
            <div key={day.value} className="text-center text-[10px] font-semibold text-gray-400 py-1">
              {day.label}
            </div>
          ))}
        </div>

        {/* Dias do mes */}
        <div className="grid grid-cols-7 gap-1">
          {/* Espacos vazios */}
          {Array.from({ length: firstDay }, (_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {/* Dias */}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const status = getDayStatus(day);
            const selected = day === selectedDate;
            const todayDay = isToday(day);

            return (
              <button
                key={day}
                onClick={() => setSelectedDate(day)}
                className={`relative aspect-square rounded-xl flex items-center justify-center text-sm transition-all ${
                  selected
                    ? "bg-teal-500 text-white font-bold shadow-glow-teal"
                    : todayDay
                    ? "bg-teal-100 text-teal-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {day}
                {status && !selected && (
                  <div className={`absolute bottom-0.5 w-1.5 h-1.5 rounded-full ${
                    status === "complete" ? "bg-teal-500" :
                    status === "partial" ? "bg-peach-400" :
                    "bg-gray-300"
                  }`} />
                )}
              </button>
            );
          })}
        </div>

        {/* Legenda */}
        <div className="flex justify-center gap-4 mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-teal-500" />
            <span className="text-[10px] text-gray-500">Completo</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-peach-400" />
            <span className="text-[10px] text-gray-500">Parcial</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-gray-300" />
            <span className="text-[10px] text-gray-500">Pendente</span>
          </div>
        </div>
      </Card>
      </div>

      {/* Habitos do dia selecionado */}
      <div className="lg:col-span-2 mb-4">
        <h3 className="font-display font-semibold text-gray-900 mb-3">
          {isToday(selectedDate) ? "Hoje" : `Dia ${selectedDate}`}
        </h3>

        {selectedDayHabits.length > 0 ? (
          <div className="space-y-2">
            {selectedDayHabits.map((log, i) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card variant="default" padding="sm">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                      log.status === "completed" ? "bg-teal-100" :
                      log.status === "partial" ? "bg-peach-100" :
                      "bg-gray-100"
                    }`}>
                      {log.status === "completed" ? (
                        <Check className="w-4 h-4 text-teal-600" />
                      ) : log.status === "partial" ? (
                        <Minus className="w-4 h-4 text-peach-600" />
                      ) : (
                        <X className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{log.habitName}</p>
                    </div>
                    <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${
                      log.status === "completed" ? "bg-teal-100 text-teal-700" :
                      log.status === "partial" ? "bg-peach-100 text-peach-700" :
                      "bg-gray-100 text-gray-500"
                    }`}>
                      {log.status === "completed" ? "Feito" : log.status === "partial" ? "Parcial" : "Nao feito"}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card variant="default" padding="lg" className="text-center">
            <p className="text-sm text-gray-500">Nenhum registro para este dia</p>
          </Card>
        )}
      </div>
      </div>
    </div>
  );
}
