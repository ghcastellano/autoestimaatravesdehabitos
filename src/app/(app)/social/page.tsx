"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart, MessageCircle, Share2, Send, Sparkles,
  Trophy, Target, Star, Plus, Loader2
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useAuth, useSocial } from "@/hooks";

const typeLabels: Record<string, { label: string; color: string }> = {
  achievement: { label: "Conquista", color: "bg-teal-100 text-teal-700" },
  reflection: { label: "Reflexao", color: "bg-lilac-100 text-lilac-700" },
  motivation: { label: "Motivacao", color: "bg-peach-100 text-peach-700" },
  milestone: { label: "Marco", color: "bg-oat-200 text-oat-700" },
};

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "agora";
  if (diffMin < 60) return `${diffMin}min atras`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `${diffH}h atras`;
  const diffD = Math.floor(diffH / 24);
  if (diffD < 7) return `${diffD}d atras`;
  return `${Math.floor(diffD / 7)}sem atras`;
}

export default function SocialPage() {
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostType, setNewPostType] = useState<"achievement" | "reflection" | "motivation">("reflection");
  const [posting, setPosting] = useState(false);

  const { user, loading: authLoading } = useAuth();
  const { posts, loading: socialLoading, toggleLike, createPost } = useSocial(user?.id);

  const loading = authLoading || socialLoading;

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) return;
    setPosting(true);
    await createPost(newPostContent, newPostType);
    setPosting(false);
    setNewPostContent("");
    setShowNewPost(false);
  };

  if (loading) {
    return (
      <div className="page-container flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-teal-500 animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container bg-gradient-to-b from-oat-50 via-white to-lilac-50/20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900 mb-1">Comunidade</h1>
          <p className="text-sm text-gray-500">Compartilhe e celebre com todas</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setShowNewPost(true)}>
          <Plus className="w-4 h-4" />
          Postar
        </Button>
      </div>

      {/* Feed */}
      {posts.length > 0 ? (
        <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
          {posts.map((post, i) => {
            const profile = post.profile as any;
            const name = profile?.full_name || "Usuaria";
            const typeInfo = typeLabels[post.post_type] || typeLabels.reflection;

            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card variant="default" padding="md">
                  {/* Cabecalho do post */}
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar name={name} size="sm" />
                    <div className="flex-1">
                      <span className="text-sm font-semibold text-gray-900">{name}</span>
                      <br />
                      <span className="text-xs text-gray-400">{timeAgo(post.created_at)}</span>
                    </div>
                    <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${typeInfo.color}`}>
                      {typeInfo.label}
                    </span>
                  </div>

                  {/* Conteudo */}
                  <p className="text-sm text-gray-700 leading-relaxed mb-4">{post.content}</p>

                  {/* Acoes */}
                  <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-1.5 text-sm transition-all ${
                        post.liked ? "text-rose-500" : "text-gray-400 hover:text-rose-400"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${post.liked ? "fill-rose-500" : ""}`} />
                      <span className="text-xs font-medium">{post.likes_count}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-gray-400 hover:text-lilac-500 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-xs font-medium">{post.comments_count}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-gray-400 hover:text-teal-500 transition-colors ml-auto">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <Card variant="default" padding="lg" className="text-center">
          <MessageCircle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-500 mb-1">A comunidade esta silenciosa</p>
          <p className="text-xs text-gray-400">Seja a primeira a compartilhar algo!</p>
        </Card>
      )}

      {/* Modal novo post */}
      <Modal isOpen={showNewPost} onClose={() => setShowNewPost(false)} title="Novo post">
        <div className="space-y-4">
          {/* Tipo do post */}
          <div className="flex gap-2">
            {(["reflection", "achievement", "motivation"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setNewPostType(type)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  newPostType === type ? typeLabels[type].color + " ring-2 ring-offset-1" : "bg-gray-100 text-gray-500"
                }`}
              >
                {typeLabels[type].label}
              </button>
            ))}
          </div>

          {/* Conteudo */}
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="Compartilhe sua experiencia, reflexao ou conquista..."
            className="input-field min-h-[120px] resize-none"
            rows={4}
          />

          <Button variant="primary" fullWidth disabled={!newPostContent.trim()} onClick={handleCreatePost} loading={posting}>
            <Send className="w-4 h-4" />
            Publicar
          </Button>
        </div>
      </Modal>
    </div>
  );
}
