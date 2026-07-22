"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import { Users, Shield, ShieldOff, Plane, ArrowLeft } from "lucide-react";

export default function AdminUsersPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((d) => setUsers(d.users || []))
      .catch(() => setMessage({ type: "error", text: "Failed to load users." }))
      .finally(() => setLoading(false));
  }, []);

  async function setRole(targetUserId, role) {
    setActionLoading(targetUserId);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUserId, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed");
      setUsers((prev) =>
        prev.map((u) =>
          u.id === targetUserId ? { ...u, role: role === "user" ? "user" : "admin" } : u
        )
      );
      setMessage({ type: "success", text: data.message });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setActionLoading(null);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Nav */}
      <div className="sticky top-0 z-50 px-4 py-4 backdrop-blur-xl bg-slate-950/60 border-b border-white/10">
        <div className="mx-auto max-w-5xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/admin/bookings" className="flex items-center gap-1 text-white/50 hover:text-white text-sm transition">
              <ArrowLeft className="h-4 w-4" />
              Bookings
            </Link>
            <span className="text-white/20">|</span>
            <span className="flex items-center gap-2 text-white font-semibold">
              <Plane className="h-4 w-4 text-amber-300" />
              Manage Admins
            </span>
          </div>
          <span className="text-xs text-white/40">Hi, {user?.name?.split(" ")[0]}</span>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-bold mb-1">User Roles</h1>
        <p className="text-white/50 text-sm mb-6">
          Promote users to <span className="text-amber-300 font-medium">Admin</span> to give them access to the admin dashboard.
        </p>

        {message && (
          <div
            className={`mb-4 rounded-lg px-4 py-3 text-sm ${
              message.type === "error"
                ? "bg-red-500/10 border border-red-500/30 text-red-300"
                : "bg-green-500/10 border border-green-500/30 text-green-300"
            }`}
          >
            {message.text}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-white/50 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Role</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-white/[0.02] transition">
                    <td className="px-4 py-3 font-medium">{u.name}</td>
                    <td className="px-4 py-3 text-white/60">{u.email || "—"}</td>
                    <td className="px-4 py-3">
                      {u.role === "admin" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 px-2.5 py-0.5 text-xs font-semibold">
                          <Shield className="h-3 w-3" /> Admin
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-white/5 border border-white/15 text-white/40 px-2.5 py-0.5 text-xs">
                          <Users className="h-3 w-3" /> User
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {u.id === user?.id ? (
                        <span className="text-xs text-white/25 italic">You</span>
                      ) : u.role === "admin" ? (
                        <button
                          onClick={() => setRole(u.id, "user")}
                          disabled={actionLoading === u.id}
                          className="inline-flex items-center gap-1 rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 px-3 py-1.5 text-xs font-medium transition disabled:opacity-50"
                        >
                          <ShieldOff className="h-3 w-3" />
                          {actionLoading === u.id ? "…" : "Revoke Admin"}
                        </button>
                      ) : (
                        <button
                          onClick={() => setRole(u.id, "admin")}
                          disabled={actionLoading === u.id}
                          className="inline-flex items-center gap-1 rounded-lg bg-amber-400/10 border border-amber-400/20 hover:bg-amber-400/20 text-amber-300 px-3 py-1.5 text-xs font-medium transition disabled:opacity-50"
                        >
                          <Shield className="h-3 w-3" />
                          {actionLoading === u.id ? "…" : "Make Admin"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
