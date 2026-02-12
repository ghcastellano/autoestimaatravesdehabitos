"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase/client";
import type { UserHabit, HabitTemplate, HabitCategory } from "@/types/database";

interface UseHabitsReturn {
  userHabits: UserHabit[];
  categories: HabitCategory[];
  templates: HabitTemplate[];
  loading: boolean;
  addHabit: (templateId: string) => Promise<void>;
  removeHabit: (habitId: string) => Promise<void>;
  refreshHabits: () => Promise<void>;
}

export function useHabits(userId: string | undefined): UseHabitsReturn {
  const [userHabits, setUserHabits] = useState<UserHabit[]>([]);
  const [categories, setCategories] = useState<HabitCategory[]>([]);
  const [templates, setTemplates] = useState<HabitTemplate[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserHabits = useCallback(async () => {
    if (!userId) return;

    const { data } = await supabase
      .from("user_habits")
      .select("*, template:habit_templates(*)")
      .eq("user_id", userId)
      .eq("is_active", true)
      .order("created_at", { ascending: true });

    if (data) {
      setUserHabits(data as UserHabit[]);
    }
  }, [userId]);

  const fetchCatalog = useCallback(async () => {
    const [catRes, tmplRes] = await Promise.all([
      supabase.from("habit_categories").select("*").order("name"),
      supabase.from("habit_templates").select("*").order("name"),
    ]);

    if (catRes.data) setCategories(catRes.data as HabitCategory[]);
    if (tmplRes.data) setTemplates(tmplRes.data as HabitTemplate[]);
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await Promise.all([fetchUserHabits(), fetchCatalog()]);
      setLoading(false);
    };
    load();
  }, [fetchUserHabits, fetchCatalog]);

  const addHabit = useCallback(async (templateId: string) => {
    if (!userId) return;

    const template = templates.find((t) => t.id === templateId);
    if (!template) return;

    const category = categories.find((c) => c.id === template.category_id);

    const { error } = await supabase.from("user_habits").insert({
      user_id: userId,
      template_id: templateId,
      duration_minutes: template.recommended_duration_minutes,
      frequency_per_week: template.recommended_frequency_per_week,
      preferred_time: template.best_time_of_day,
      preferred_days: [1, 2, 3, 4, 5],
      color: category?.color || "#0d9488",
      icon: template.icon,
    });

    if (!error) {
      await fetchUserHabits();
    }
  }, [userId, templates, categories, fetchUserHabits]);

  const removeHabit = useCallback(async (habitId: string) => {
    if (!userId) return;

    const { error } = await supabase
      .from("user_habits")
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq("id", habitId)
      .eq("user_id", userId);

    if (!error) {
      await fetchUserHabits();
    }
  }, [userId, fetchUserHabits]);

  const refreshHabits = useCallback(async () => {
    await fetchUserHabits();
  }, [fetchUserHabits]);

  return { userHabits, categories, templates, loading, addHabit, removeHabit, refreshHabits };
}
