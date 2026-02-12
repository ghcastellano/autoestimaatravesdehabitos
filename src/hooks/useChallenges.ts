"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase/client";
import type { Challenge, UserChallenge } from "@/types/database";

interface ChallengeWithStatus extends Challenge {
  userStatus: "active" | "completed" | "failed" | "abandoned" | "available";
  progress: number;
  participantsCount: number;
}

interface UseChallengesReturn {
  challenges: ChallengeWithStatus[];
  loading: boolean;
  joinChallenge: (challengeId: string) => Promise<void>;
  refreshChallenges: () => Promise<void>;
}

export function useChallenges(userId: string | undefined): UseChallengesReturn {
  const [challenges, setChallenges] = useState<ChallengeWithStatus[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchChallenges = useCallback(async () => {
    const { data: challengesData } = await supabase
      .from("challenges")
      .select("*, badge:badges(*)")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (!challengesData) return;

    // Fetch participant counts
    const { data: participantCounts } = await supabase
      .from("user_challenges")
      .select("challenge_id");

    const countMap: Record<string, number> = {};
    if (participantCounts) {
      participantCounts.forEach((uc) => {
        countMap[uc.challenge_id] = (countMap[uc.challenge_id] || 0) + 1;
      });
    }

    // Fetch user's challenge status
    let userChallenges: UserChallenge[] = [];
    if (userId) {
      const { data } = await supabase
        .from("user_challenges")
        .select("*")
        .eq("user_id", userId);

      if (data) userChallenges = data as UserChallenge[];
    }

    const enriched: ChallengeWithStatus[] = challengesData.map((c) => {
      const userChallenge = userChallenges.find((uc) => uc.challenge_id === c.id);
      return {
        ...c,
        userStatus: userChallenge?.status || "available",
        progress: userChallenge?.progress || 0,
        participantsCount: countMap[c.id] || 0,
      };
    });

    setChallenges(enriched);
  }, [userId]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchChallenges();
      setLoading(false);
    };
    load();
  }, [fetchChallenges]);

  const joinChallenge = useCallback(async (challengeId: string) => {
    if (!userId) return;

    await supabase.from("user_challenges").insert({
      user_id: userId,
      challenge_id: challengeId,
      status: "active",
      progress: 0,
    });

    await fetchChallenges();
  }, [userId, fetchChallenges]);

  const refreshChallenges = useCallback(async () => {
    await fetchChallenges();
  }, [fetchChallenges]);

  return { challenges, loading, joinChallenge, refreshChallenges };
}
