"use client";

import { BottomNav } from "@/components/layout/bottom-nav";
import { Sidebar } from "@/components/layout/sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 lg:flex">
      <Sidebar />
      <main className="pb-20 lg:pb-0 lg:pl-64 lg:flex-1">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
