"use client";

import { useMemo } from "react";
import { calculateStreak, getCompletionPercentage } from "@/lib/utils";
import type { UserHabit, HabitLog } from "@/types/database";

interface UseStatsReturn {
  streak: number;
  weekProgress: number;
  todayCompleted: number;
  todayTotal: number;
}

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

function getDayOfWeek(): number {
  return new Date().getDay();
}

function getWeekStart(): string {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day;
  const start = new Date(now);
  start.setDate(diff);
  return start.toISOString().split("T")[0];
}

export function useStats(
  userHabits: UserHabit[],
  logs: HabitLog[]
): UseStatsReturn {
  return useMemo(() => {
    const today = getToday();
    const dayOfWeek = getDayOfWeek();
    const weekStart = getWeekStart();

    // Habits scheduled for today
    const todayHabits = userHabits.filter((h) =>
      h.preferred_days.includes(dayOfWeek)
    );
    const todayTotal = todayHabits.length;

    // Today's completed logs
    const todayLogs = logs.filter((l) => l.date === today && l.status === "completed");
    const todayCompletedIds = new Set(todayLogs.map((l) => l.user_habit_id));
    const todayCompleted = todayHabits.filter((h) => todayCompletedIds.has(h.id)).length;

    // Streak: consecutive days with at least one completion
    const allCompletedLogs = logs.filter((l) => l.status === "completed");
    const streak = calculateStreak(allCompletedLogs);

    // Week progress: completed / expected for this week
    const weekLogs = logs.filter((l) => l.date >= weekStart && l.status === "completed");
    const uniqueWeekCompletions = weekLogs.length;

    // Expected completions this week: sum of habits for each day that has passed
    const daysPassed = dayOfWeek + 1; // Sun=0, so +1 for days elapsed
    let expectedWeek = 0;
    for (let d = 0; d < daysPassed; d++) {
      expectedWeek += userHabits.filter((h) => h.preferred_days.includes(d)).length;
    }

    const weekProgress = getCompletionPercentage(uniqueWeekCompletions, expectedWeek);

    return { streak, weekProgress, todayCompleted, todayTotal };
  }, [userHabits, logs]);
}
