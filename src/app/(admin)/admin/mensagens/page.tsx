"use client";
import { MessageSquare, Plus, Edit, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MOTIVATIONAL_MESSAGES } from "@/lib/constants/habits";

export default function AdminMensagensPage() {
  const allMessages = [
    ...MOTIVATIONAL_MESSAGES.missed_habit.map(m => ({ message: m, category: "missed_habit" })),
    ...MOTIVATIONAL_MESSAGES.streak.map(m => ({ message: m, category: "streak" })),
    ...MOTIVATIONAL_MESSAGES.general.map(m => ({ message: m, category: "general" })),
  ];
  const categoryLabels: Record<string, string> = { missed_habit: "Habito perdido", streak: "Sequencia", general: "Geral" };
  const categoryColors: Record<string, string> = { missed_habit: "bg-peach-100 text-peach-700", streak: "bg-teal-100 text-teal-700", general: "bg-lilac-100 text-lilac-700" };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900 mb-1">Mensagens Motivacionais</h1>
          <p className="text-sm text-gray-500">{allMessages.length} mensagens cadastradas</p>
        </div>
        <Button variant="primary" size="sm"><Plus className="w-4 h-4" />Nova mensagem</Button>
      </div>
      <div className="space-y-2">
        {allMessages.slice(0, 10).map((item, i) => (
          <Card key={i} variant="default" padding="sm">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${categoryColors[item.category]}`}>
                  {categoryLabels[item.category]}
                </span>
                <p className="text-sm text-gray-700 mt-2 italic">&ldquo;{item.message}&rdquo;</p>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <button className="p-1.5 rounded-lg hover:bg-gray-100"><Edit className="w-3.5 h-3.5 text-gray-400" /></button>
                <button className="p-1.5 rounded-lg hover:bg-red-50"><Trash2 className="w-3.5 h-3.5 text-red-400" /></button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
