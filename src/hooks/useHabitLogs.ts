"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase/client";
import type { HabitLog } from "@/types/database";

interface UseHabitLogsReturn {
  logs: HabitLog[];
  loading: boolean;
  toggleCompletion: (userHabitId: string, date: string) => Promise<void>;
  getLogsForDate: (date: string) => HabitLog[];
  getLogsForRange: (startDate: string, endDate: string) => HabitLog[];
  refreshLogs: () => Promise<void>;
}

export function useHabitLogs(
  userId: string | undefined,
  startDate?: string,
  endDate?: string
): UseHabitLogsReturn {
  const [logs, setLogs] = useState<HabitLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = useCallback(async () => {
    if (!userId) return;

    let query = supabase
      .from("habit_logs")
      .select("*, user_habit:user_habits!inner(user_id)")
      .eq("user_habit.user_id", userId)
      .order("date", { ascending: false });

    if (startDate) {
      query = query.gte("date", startDate);
    }
    if (endDate) {
      query = query.lte("date", endDate);
    }

    const { data } = await query;

    if (data) {
      // Remove the joined user_habit to keep the type clean
      const cleaned = data.map(({ user_habit, ...rest }) => rest) as HabitLog[];
      setLogs(cleaned);
    }
  }, [userId, startDate, endDate]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchLogs();
      setLoading(false);
    };
    load();
  }, [fetchLogs]);

  const toggleCompletion = useCallback(async (userHabitId: string, date: string) => {
    const existingLog = logs.find(
      (l) => l.user_habit_id === userHabitId && l.date === date
    );

    if (existingLog) {
      // Remove the log (undo completion)
      await supabase.from("habit_logs").delete().eq("id", existingLog.id);
    } else {
      // Create a new log
      await supabase.from("habit_logs").insert({
        user_habit_id: userHabitId,
        date,
        status: "completed",
      });
    }

    await fetchLogs();
  }, [logs, fetchLogs]);

  const getLogsForDate = useCallback((date: string): HabitLog[] => {
    return logs.filter((l) => l.date === date);
  }, [logs]);

  const getLogsForRange = useCallback((start: string, end: string): HabitLog[] => {
    return logs.filter((l) => l.date >= start && l.date <= end);
  }, [logs]);

  const refreshLogs = useCallback(async () => {
    await fetchLogs();
  }, [fetchLogs]);

  return { logs, loading, toggleCompletion, getLogsForDate, getLogsForRange, refreshLogs };
}
