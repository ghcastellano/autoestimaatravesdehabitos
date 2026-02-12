"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase/client";
import type { SocialPost, PostLike } from "@/types/database";

interface SocialPostWithMeta extends SocialPost {
  liked: boolean;
}

interface UseSocialReturn {
  posts: SocialPostWithMeta[];
  loading: boolean;
  toggleLike: (postId: string) => Promise<void>;
  createPost: (content: string, postType: string) => Promise<void>;
  refreshPosts: () => Promise<void>;
}

export function useSocial(userId: string | undefined): UseSocialReturn {
  const [posts, setPosts] = useState<SocialPostWithMeta[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    const { data: postsData } = await supabase
      .from("social_posts")
      .select("*, profile:profiles(id, full_name, avatar_url)")
      .order("created_at", { ascending: false })
      .limit(50);

    if (!postsData) return;

    let userLikes: Set<string> = new Set();
    if (userId) {
      const { data: likesData } = await supabase
        .from("post_likes")
        .select("post_id")
        .eq("user_id", userId);

      if (likesData) {
        userLikes = new Set(likesData.map((l) => l.post_id));
      }
    }

    const enriched: SocialPostWithMeta[] = postsData.map((p) => ({
      ...p,
      liked: userLikes.has(p.id),
    }));

    setPosts(enriched);
  }, [userId]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchPosts();
      setLoading(false);
    };
    load();
  }, [fetchPosts]);

  const toggleLike = useCallback(async (postId: string) => {
    if (!userId) return;

    const post = posts.find((p) => p.id === postId);
    if (!post) return;

    if (post.liked) {
      await supabase
        .from("post_likes")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", userId);
    } else {
      await supabase.from("post_likes").insert({
        post_id: postId,
        user_id: userId,
      });
    }

    // Optimistic update
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, liked: !p.liked, likes_count: p.liked ? p.likes_count - 1 : p.likes_count + 1 }
          : p
      )
    );
  }, [userId, posts]);

  const createPost = useCallback(async (content: string, postType: string) => {
    if (!userId) return;

    await supabase.from("social_posts").insert({
      user_id: userId,
      content,
      post_type: postType,
    });

    await fetchPosts();
  }, [userId, fetchPosts]);

  const refreshPosts = useCallback(async () => {
    await fetchPosts();
  }, [fetchPosts]);

  return { posts, loading, toggleLike, createPost, refreshPosts };
}
