"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { User, Mail, Lock, Phone, Plane } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const { signUp, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    clearError();

    // Validation
    if (!formData.name.trim()) {
      setLocalError("Name is required");
      return;
    }

    if (!formData.gender) {
      setLocalError("Please select a gender");
      return;
    }

    if (!formData.phoneNumber.trim()) {
      setLocalError("Phone number is required");
      return;
    }

    // Validate phone number (basic validation)
    if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ""))) {
      setLocalError("Please enter a valid 10-digit phone number");
      return;
    }

    if (!formData.password) {
      setLocalError("Password is required");
      return;
    }

    if (formData.password.length < 6) {
      setLocalError("Password must be at least 6 characters long");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    // Email validation (optional but if provided, must be valid)
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setLocalError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const userData = {
        name: formData.name.trim(),
        gender: formData.gender,
        phoneNumber: formData.phoneNumber.replace(/\D/g, ""),
        email: formData.email.trim() || null,
        password: formData.password,
      };

      await signUp(userData);
      router.push("/"); // Redirect to home after signup
    } catch (err) {
      setLocalError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const displayError = localError || error;

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
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-white/60 mb-8">Join Cholo Jai Dure for amazing travel experiences</p>

            {displayError && (
              <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-200">
                {displayError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 h-5 w-5 text-white/40" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 transition"
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Gender *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 transition appearance-none"
                >
                  <option value="" className="bg-slate-950 text-white">
                    Select Gender
                  </option>
                  <option value="male" className="bg-slate-950 text-white">
                    Male
                  </option>
                  <option value="female" className="bg-slate-950 text-white">
                    Female
                  </option>
                  <option value="other" className="bg-slate-950 text-white">
                    Other
                  </option>
                </select>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 h-5 w-5 text-white/40" />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="9876543210"
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 transition"
                  />
                </div>
              </div>

              {/* Email (Optional) */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Email <span className="text-white/50">(Optional)</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-white/40" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 transition"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-white/40" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="At least 6 characters"
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 transition"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-white/40" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 transition"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-400 hover:bg-amber-300 disabled:bg-amber-400/50 text-slate-950 font-semibold py-3 rounded-lg transition duration-200 mt-6"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-white/10" />
              <p className="text-xs text-white/50">Already have an account?</p>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Login link */}
            <Link
              href="/auth/login"
              className="block w-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold py-3 rounded-lg text-center transition"
            >
              Sign In
            </Link>
          </div>

          {/* Demo info */}
          <div className="mt-6 rounded-lg bg-blue-500/10 border border-blue-500/20 p-4">
            <p className="text-xs text-blue-200/80">
              <strong>Note:</strong> Email is optional. All data is stored locally in your browser.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
