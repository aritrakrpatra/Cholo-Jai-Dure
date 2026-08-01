"use client";

import Link from "next/link";
import Image from "next/image";
import { SignIn } from "@clerk/nextjs";
import { useTheme } from "@/app/context/ThemeContext";

export default function LoginPage() {
  const { resolvedTheme } = useTheme();
  const isLightTheme = resolvedTheme === "light";

  return (
    <div
      className={`min-h-screen flex flex-col bg-linear-to-br ${
        isLightTheme
          ? "from-(--surface-strong) via-background to-(--surface-strong)"
          : "from-slate-950 via-slate-900 to-slate-950"
      }`}
    >
      {/* Navigation */}
      <div className={`sticky top-0 z-50 px-4 py-5 backdrop-blur-xl ${isLightTheme ? "bg-(--surface-strong)" : "bg-slate-950/40"}`}>
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <Link href="/" className={`flex items-center gap-3 ${isLightTheme ? "text-foreground" : "text-white"}`}>
            <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-3xl bg-white ring-1 ring-amber-300/20">
              <Image src="/cjd%20logo.jpg" alt="Cholo Jai Dure logo" width={40} height={40} className="h-full w-full object-cover" />
            </span>
            <div>
              <p className="text-sm font-semibold">Cholo Jai Dure</p>
              <p className={`text-xs ${isLightTheme ? "text-(--muted)" : "text-white/70"}`}>Your Journey, Our Priority</p>
            </div>
          </Link>
          <Link
            href="/"
            className={`transition ${isLightTheme ? "text-(--muted) hover:text-foreground" : "text-white/70 hover:text-white"}`}
          >
            Back to Home
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div
            className={`rounded-3xl border backdrop-blur-xl p-4 shadow-2xl sm:p-6 ${
              isLightTheme ? "border-(--border) bg-(--surface)" : "border-white/10 bg-white/5"
            }`}
          >
            <SignIn
              path="/auth/login"
              routing="path"
              signUpUrl="/auth/signup"
              forceRedirectUrl="/"
              appearance={{
                variables: {
                  colorPrimary: isLightTheme ? "#c58c2b" : "#fbbf24",
                  colorBackground: "transparent",
                  colorText: isLightTheme ? "#14213d" : "#ffffff",
                  colorInputText: isLightTheme ? "#14213d" : "#ffffff",
                  colorInputBackground: isLightTheme ? "rgba(20,33,61,0.05)" : "rgba(255,255,255,0.06)",
                  colorNeutral: isLightTheme ? "#5e6472" : "#94a3b8",
                  borderRadius: "0.75rem",
                },
                elements: {
                  card: "!bg-transparent !shadow-none !border-0",
                  headerTitle: isLightTheme ? "!text-slate-900" : "!text-white",
                  headerSubtitle: isLightTheme ? "!text-slate-600" : "!text-white/70",
                  socialButtonsBlockButton: isLightTheme
                    ? "!bg-black/5 !border-black/10 !text-slate-900 hover:!bg-black/10"
                    : "!bg-white/5 !border-white/15 !text-white hover:!bg-white/10",
                  formFieldInput: isLightTheme
                    ? "!text-slate-900 !border-black/15 focus:!border-amber-600"
                    : "!text-white !border-white/15 focus:!border-amber-300",
                  footerActionText: isLightTheme ? "!text-slate-600" : "!text-white/70",
                  footerActionLink: isLightTheme ? "!text-amber-700 hover:!text-amber-800" : "!text-amber-300 hover:!text-amber-200",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
