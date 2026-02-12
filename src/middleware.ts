import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const protectedPaths = [
  "/dashboard",
  "/habitos",
  "/calendario",
  "/social",
  "/desafios",
  "/perfil",
  "/doacoes",
  "/proposito",
  "/admin",
];

const authPaths = ["/login", "/cadastro"];

export async function middleware(req: NextRequest) {
  const { supabaseResponse, user } = await updateSession(req);
  const pathname = req.nextUrl.pathname;

  const isProtected = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(path + "/")
  );
  const isAuthRoute = authPaths.some(
    (path) => pathname === path || pathname.startsWith(path + "/")
  );

  if (isProtected && !user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/habitos/:path*",
    "/calendario/:path*",
    "/social/:path*",
    "/desafios/:path*",
    "/perfil/:path*",
    "/doacoes/:path*",
    "/proposito/:path*",
    "/admin/:path*",
    "/login",
    "/cadastro",
  ],
};
