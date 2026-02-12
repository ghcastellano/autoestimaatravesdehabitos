"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div className={cn("flex gap-1 p-1 bg-gray-100 rounded-2xl", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "relative flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
            activeTab === tab.id ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
          )}
        >
          {activeTab === tab.id && (
            <motion.div
              className="absolute inset-0 bg-white rounded-xl shadow-sm"
              layoutId="activeTab"
              transition={{ type: "spring", duration: 0.4 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5">
            {tab.icon}
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
}
