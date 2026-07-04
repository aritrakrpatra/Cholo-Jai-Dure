"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { Mail, Lock, Phone, Plane } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, error, clearError } = useAuth();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    clearError();

    if (!emailOrPhone || !password) {
      setLocalError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      await login(emailOrPhone, password);
      router.push("/"); // Redirect to home after login
    } catch (err) {
      setLocalError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <div className="sticky top-0 z-50 px-4 py-5 backdrop-blur-xl bg-slate-950/40">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-3xl bg-amber-400/15 text-amber-300 ring-1 ring-amber-300/20">
              <Plane className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold">Cholo Jai Dure</p>
              <p className="text-xs text-white/70">Explore Beyond Boundaries</p>
            </div>
          </Link>
          <Link href="/" className="text-white/70 hover:text-white transition">
            Back to Home
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-white/60 mb-8">Sign in to your Cholo Jai Dure account</p>

            {displayError && (
              <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-200">
                {displayError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email or Phone */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Email or Phone Number
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-white/40" />
                  <input
                    type="text"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder="example@email.com or 9876543210"
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 transition"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-white/40" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 transition"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-400 hover:bg-amber-300 disabled:bg-amber-400/50 text-slate-950 font-semibold py-3 rounded-lg transition duration-200"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-white/10" />
              <p className="text-xs text-white/50">Don't have an account?</p>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Sign up link */}
            <Link
              href="/auth/signup"
              className="block w-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold py-3 rounded-lg text-center transition"
            >
              Create New Account
            </Link>
          </div>

          {/* Demo info */}
          <div className="mt-6 rounded-lg bg-blue-500/10 border border-blue-500/20 p-4">
            <p className="text-xs text-blue-200/80">
              <strong>Demo Credentials:</strong> Use any email/phone with password to sign up and login.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
