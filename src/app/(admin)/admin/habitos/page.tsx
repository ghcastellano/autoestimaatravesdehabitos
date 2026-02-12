"use client";
import { Target, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RECOMMENDED_HABITS, HABIT_CATEGORIES } from "@/lib/constants/habits";

export default function AdminHabitosPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900 mb-1">Gerenciar Habitos</h1>
          <p className="text-sm text-gray-500">{RECOMMENDED_HABITS.length} habitos no catalogo</p>
        </div>
        <Button variant="primary" size="sm"><Plus className="w-4 h-4" />Novo habito</Button>
      </div>
      <div className="space-y-2">
        {RECOMMENDED_HABITS.map((habit, i) => {
          const cat = HABIT_CATEGORIES.find(c => c.id === habit.category);
          return (
            <Card key={i} variant="default" padding="sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: (cat?.color || "#0d9488") + "15" }}>
                  <span style={{ color: cat?.color }}><Target className="w-5 h-5" /></span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">{habit.name}</p>
                  <p className="text-xs text-gray-500">{cat?.name} · {habit.recommended_duration} min · {habit.recommended_frequency}x/sem</p>
                </div>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${habit.esteem_impact === "high" ? "bg-teal-100 text-teal-700" : "bg-oat-200 text-oat-700"}`}>
                  {habit.esteem_impact === "high" ? "Alto impacto" : "Medio"}
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
