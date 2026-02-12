"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, User, Camera, Sparkles, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

export default function CadastroPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setAvatarPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Criar conta
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (authError) throw authError;

      // Upload do avatar se houver
      if (avatarFile && authData.user) {
        const fileExt = avatarFile.name.split(".").pop();
        const filePath = `avatars/${authData.user.id}.${fileExt}`;

        await supabase.storage.from("avatars").upload(filePath, avatarFile, {
          upsert: true,
        });

        const { data: urlData } = supabase.storage
          .from("avatars")
          .getPublicUrl(filePath);

        await supabase
          .from("profiles")
          .update({ avatar_url: urlData.publicUrl, full_name: fullName })
          .eq("id", authData.user.id);
      }

      router.push("/onboarding");
    } catch (err: any) {
      if (err.message?.includes("already registered")) {
        setError("Este email ja esta cadastrado. Tente fazer login.");
      } else {
        setError("Ocorreu um erro no cadastro. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setError("Erro ao conectar com Google. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8 bg-gradient-to-b from-oat-50 via-white to-teal-50/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md flex flex-col"
      >
        {/* Voltar */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Voltar</span>
        </Link>

        {/* Cabecalho */}
        <div className="mb-8">
          <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center mb-4 shadow-lg shadow-primary-500/20">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">
            Vamos comecar!
          </h1>
          <p className="text-gray-500">
            Crie sua conta e comece a florescer
          </p>
        </div>

        {/* Google */}
        <button
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl border-2 border-gray-200 bg-white text-gray-700 font-semibold text-sm hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 mb-6"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Cadastrar com Google
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 font-medium">ou com email</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Formulario */}
        <form onSubmit={handleRegister} className="space-y-4 flex-1">
          {/* Avatar */}
          <div className="flex justify-center mb-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="relative group"
            >
              <Avatar src={avatarPreview} name={fullName} size="xl" />
              <div className="absolute inset-0 rounded-full bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </button>
          </div>
          <p className="text-xs text-gray-400 text-center">Toque para adicionar sua foto</p>

          <Input
            label="Seu nome"
            type="text"
            placeholder="Como gostaria de ser chamada?"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            icon={<User className="w-4 h-4" />}
            required
          />

          <Input
            label="Email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail className="w-4 h-4" />}
            required
          />

          <div className="relative">
            <Input
              label="Crie uma senha"
              type={showPassword ? "text" : "password"}
              placeholder="Minimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="w-4 h-4" />}
              minLength={6}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-[38px] text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3"
            >
              {error}
            </motion.p>
          )}

          <Button type="submit" variant="primary" fullWidth loading={loading}>
            Criar minha conta
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Ja tem uma conta?{" "}
            <Link href="/login" className="text-primary-600 font-semibold hover:text-primary-700">
              Fazer login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
