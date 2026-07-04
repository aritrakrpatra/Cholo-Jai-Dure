"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { User, Mail, Phone, LogOut, Plane, ArrowLeft } from "lucide-react";

export default function AccountPage() {
  const router = useRouter();
  const { user, logout, loading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (mounted && !loading && !user) {
      router.push("/auth/login");
    }
  }, [mounted, loading, user, router]);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
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
          <button
            onClick={() => router.back()}
            className="text-white/70 hover:text-white transition flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber-400/15 text-amber-300 ring-2 ring-amber-300/20 mb-4">
                <User className="h-8 w-8" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Account</h1>
              <p className="text-white/60">Your profile information</p>
            </div>

            {/* User Info */}
            <div className="space-y-4 mb-8">
              {/* Name */}
              <div className="rounded-lg bg-white/5 border border-white/10 p-4">
                <p className="text-xs font-semibold text-white/60 uppercase tracking-wide mb-1">
                  Full Name
                </p>
                <p className="text-lg font-semibold text-white">{user.name}</p>
              </div>

              {/* Gender */}
              <div className="rounded-lg bg-white/5 border border-white/10 p-4">
                <p className="text-xs font-semibold text-white/60 uppercase tracking-wide mb-1">
                  Gender
                </p>
                <p className="text-lg font-semibold text-white capitalize">{user.gender}</p>
              </div>

              {/* Phone Number */}
              <div className="rounded-lg bg-white/5 border border-white/10 p-4">
                <p className="text-xs font-semibold text-white/60 uppercase tracking-wide mb-1 flex items-center gap-2">
                  <Phone className="h-3 w-3" />
                  Phone Number
                </p>
                <p className="text-lg font-semibold text-white">{user.phoneNumber}</p>
              </div>

              {/* Email */}
              {user.email && (
                <div className="rounded-lg bg-white/5 border border-white/10 p-4">
                  <p className="text-xs font-semibold text-white/60 uppercase tracking-wide mb-1 flex items-center gap-2">
                    <Mail className="h-3 w-3" />
                    Email
                  </p>
                  <p className="text-lg font-semibold text-white break-all">{user.email}</p>
                </div>
              )}

              {/* Member Since */}
              <div className="rounded-lg bg-white/5 border border-white/10 p-4">
                <p className="text-xs font-semibold text-white/60 uppercase tracking-wide mb-1">
                  Member Since
                </p>
                <p className="text-lg font-semibold text-white">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Recently"}
                </p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-200 font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>

          {/* Additional info */}
          <div className="mt-6 rounded-lg bg-blue-500/10 border border-blue-500/20 p-4 text-center">
            <p className="text-xs text-blue-200/80">
              <strong>Welcome, {user.name}!</strong> You are successfully logged in.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
