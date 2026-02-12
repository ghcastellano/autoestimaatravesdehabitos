"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase/client";
import type { DonationGoal, Donation } from "@/types/database";

interface DonationWithProfile extends Omit<Donation, 'profile'> {
  profile?: { full_name: string; avatar_url: string | null } | null;
}

interface UseDonationsReturn {
  goal: DonationGoal | null;
  donations: DonationWithProfile[];
  loading: boolean;
  donate: (amount: number, message?: string, isAnonymous?: boolean) => Promise<void>;
  refreshDonations: () => Promise<void>;
}

export function useDonations(userId: string | undefined): UseDonationsReturn {
  const [goal, setGoal] = useState<DonationGoal | null>(null);
  const [donations, setDonations] = useState<DonationWithProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const [goalRes, donationsRes] = await Promise.all([
      supabase
        .from("donation_goals")
        .select("*")
        .eq("is_active", true)
        .limit(1)
        .single(),
      supabase
        .from("donations")
        .select("*, profile:profiles(full_name, avatar_url)")
        .order("created_at", { ascending: false })
        .limit(20),
    ]);

    if (goalRes.data) setGoal(goalRes.data as DonationGoal);
    if (donationsRes.data) setDonations(donationsRes.data as DonationWithProfile[]);
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchData();
      setLoading(false);
    };
    load();
  }, [fetchData]);

  const donate = useCallback(async (amount: number, message?: string, isAnonymous?: boolean) => {
    if (!userId || !goal) return;

    await supabase.from("donations").insert({
      user_id: userId,
      goal_id: goal.id,
      amount,
      message: message || null,
      is_anonymous: isAnonymous || false,
    });

    await fetchData();
  }, [userId, goal, fetchData]);

  const refreshDonations = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  return { goal, donations, loading, donate, refreshDonations };
}
