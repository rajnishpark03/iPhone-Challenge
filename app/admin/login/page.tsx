"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2, ShieldCheck } from "lucide-react";
import { adminLogin, verifyAdmin } from "@/lib/adminAuth";
import { GOLD, GOLD_BTN, CARD } from "@/lib/tokens";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState("");

  // If already logged in, skip to dashboard
  useEffect(() => {
    verifyAdmin().then((admin) => {
      if (admin) router.replace("/admin");
      else setChecking(false);
    });
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Email and password required");
      return;
    }
    setLoading(true);
    const { ok, error: err } = await adminLogin(email.trim(), password);
    setLoading(false);
    if (!ok) {
      setError(err || "Login failed");
      return;
    }
    router.replace("/admin");
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#edc168]" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className={`${CARD} w-full max-w-md px-8 py-10`}>
        <div className="mb-6 flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#edc168]/10">
            <ShieldCheck className="h-7 w-7 text-[#edc168]" />
          </div>
          <h1 className={`font-display text-2xl font-extrabold ${GOLD}`}>Admin Access</h1>
          <p className="text-center text-sm text-white/60">
            iPhone Challenge Analytics — Restricted
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              type="email"
              autoComplete="email"
              placeholder="admin@tutedude.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/[0.04] py-3 pl-10 pr-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#edc168]/60"
            />
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/[0.04] py-3 pl-10 pr-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#edc168]/60"
            />
          </div>

          {error && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-bold ${GOLD_BTN} disabled:opacity-60`}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
