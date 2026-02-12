"use client";

import { BottomNav } from "@/components/layout/bottom-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pb-20">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
