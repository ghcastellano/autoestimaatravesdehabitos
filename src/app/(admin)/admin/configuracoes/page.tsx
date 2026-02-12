"use client";
import { Settings, Save } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminConfigPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-gray-900 mb-1">Configuracoes</h1>
        <p className="text-sm text-gray-500">Gerencie as configuracoes do app</p>
      </div>
      <Card variant="default" padding="lg">
        <h3 className="font-display font-semibold text-gray-900 mb-4">Informacoes do App</h3>
        <div className="space-y-3">
          <Input label="Nome do app" defaultValue="Florir" />
          <Input label="Subtitulo" defaultValue="Autoestima Atraves de Habitos" />
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Descricao</label>
            <textarea className="input-field resize-none" rows={3} defaultValue="Descubra o poder dos habitos para transformar sua autoestima. Um app gratuito, acolhedor e cientificamente embasado para mulheres." />
          </div>
        </div>
      </Card>
      <Card variant="default" padding="lg">
        <h3 className="font-display font-semibold text-gray-900 mb-4">Grace Period (Periodo de tolerancia)</h3>
        <p className="text-sm text-gray-500 mb-3">Configure quantos dias uma usuaria pode perder sem quebrar a sequencia (streak). Isso evita punir por dias ruins e mantem a motivacao.</p>
        <Input label="Dias de tolerancia" type="number" defaultValue="1" />
        <p className="text-xs text-gray-400 mt-1">Recomendado: 1 dia. A usuaria pode perder 1 dia sem perder a sequencia.</p>
      </Card>
      <Button variant="primary"><Save className="w-4 h-4" />Salvar configuracoes</Button>
    </div>
  );
}
