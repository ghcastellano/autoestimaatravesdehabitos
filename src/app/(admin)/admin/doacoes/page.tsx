"use client";
import { Gift, Plus, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Input } from "@/components/ui/input";

export default function AdminDoacoesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900 mb-1">Gerenciar Doacoes</h1>
          <p className="text-sm text-gray-500">Configure metas e acompanhe doacoes</p>
        </div>
        <Button variant="primary" size="sm"><Plus className="w-4 h-4" />Nova meta</Button>
      </div>
      <Card variant="default" padding="lg" className="glass-peach">
        <h3 className="font-display font-bold text-gray-900 mb-2">Meta atual</h3>
        <p className="text-sm text-gray-600 mb-4">Manter o Florir no ar - custos mensais de infraestrutura</p>
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">R$ 285 de R$ 500</span>
          <span className="text-sm font-bold text-teal-600">57%</span>
        </div>
        <ProgressBar value={285} max={500} color="from-peach-400 to-rose-400" size="lg" />
        <div className="grid grid-cols-2 gap-3 mt-4">
          <Input label="Valor da meta (R$)" type="number" placeholder="500" />
          <Input label="Custo mensal (R$)" type="number" placeholder="500" />
        </div>
        <Button variant="outline" fullWidth className="mt-3">Atualizar meta</Button>
      </Card>
      <Card variant="default" padding="md">
        <h3 className="font-display font-semibold text-gray-900 mb-3">Historico de doacoes</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span>Maria S.</span><span>R$ 50</span><span className="text-gray-400">10/02/2026</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span>Ana C.</span><span>R$ 25</span><span className="text-gray-400">07/02/2026</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span>Anonima</span><span>R$ 100</span><span className="text-gray-400">05/02/2026</span>
          </div>
          <div className="flex justify-between py-2">
            <span>Julia M.</span><span>R$ 30</span><span className="text-gray-400">01/02/2026</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
