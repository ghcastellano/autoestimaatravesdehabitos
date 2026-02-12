"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart, MessageCircle, Share2, Send, Sparkles,
  Trophy, Target, Star, Plus
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Tabs } from "@/components/ui/tabs";
import { BadgeDisplay } from "@/components/ui/badge-display";

const mockPosts = [
  {
    id: "1",
    user: { name: "Maria Silva", avatar: null },
    content: "Completei 21 dias de meditacao! A ciencia diz que leva 21 dias para formar um habito e posso dizer que realmente sinto a diferenca. Minha mente esta mais calma e minha autoestima mais forte. 💜",
    type: "milestone" as const,
    likes: 24,
    comments: 5,
    liked: false,
    time: "2h atras",
    badges: [{ name: "21 Dias", icon: "Zap", color: "#a855f7", rarity: "rare" }],
  },
  {
    id: "2",
    user: { name: "Ana Costa", avatar: null },
    content: "Hoje nao consegui fazer minha caminhada e tudo bem! Amanha eu volto. O importante e nao desistir. Cada dia e uma nova chance. 🌿",
    type: "reflection" as const,
    likes: 18,
    comments: 8,
    liked: true,
    time: "4h atras",
    badges: [],
  },
  {
    id: "3",
    user: { name: "Julia Mendes", avatar: null },
    content: "Acabei de entrar no desafio '4 semanas de treino'! Quem vai comigo? Juntas somos mais fortes! 🏋️‍♀️",
    type: "achievement" as const,
    likes: 31,
    comments: 12,
    liked: false,
    time: "6h atras",
    badges: [{ name: "Desafiante", icon: "Award", color: "#f43f5e", rarity: "rare" }],
  },
];

const typeLabels = {
  achievement: { label: "Conquista", color: "bg-teal-100 text-teal-700" },
  reflection: { label: "Reflexao", color: "bg-lilac-100 text-lilac-700" },
  motivation: { label: "Motivacao", color: "bg-peach-100 text-peach-700" },
  milestone: { label: "Marco", color: "bg-oat-200 text-oat-700" },
};

export default function SocialPage() {
  const [posts, setPosts] = useState(mockPosts);
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostType, setNewPostType] = useState<"achievement" | "reflection" | "motivation">("reflection");

  const toggleLike = (postId: string) => {
    setPosts(posts.map((p) =>
      p.id === postId
        ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
        : p
    ));
  };

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
      <div className="space-y-4">
        {posts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card variant="default" padding="md">
              {/* Cabecalho do post */}
              <div className="flex items-center gap-3 mb-3">
                <Avatar name={post.user.name} size="sm" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">{post.user.name}</span>
                    {post.badges.map((b, j) => (
                      <BadgeDisplay key={j} {...b} size="sm" showName={false} />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">{post.time}</span>
                </div>
                <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${typeLabels[post.type].color}`}>
                  {typeLabels[post.type].label}
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
                  <span className="text-xs font-medium">{post.likes}</span>
                </button>
                <button className="flex items-center gap-1.5 text-gray-400 hover:text-lilac-500 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-xs font-medium">{post.comments}</span>
                </button>
                <button className="flex items-center gap-1.5 text-gray-400 hover:text-teal-500 transition-colors ml-auto">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

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

          <Button variant="primary" fullWidth disabled={!newPostContent.trim()}>
            <Send className="w-4 h-4" />
            Publicar
          </Button>
        </div>
      </Modal>
    </div>
  );
}
