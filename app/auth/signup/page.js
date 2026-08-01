"use client";

import Link from "next/link";
import Image from "next/image";
import { SignUp } from "@clerk/nextjs";
import ThemeToggle from "@/app/components/ThemeToggle";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <div className="sticky top-0 z-50 px-4 py-5 backdrop-blur-xl bg-slate-950/40">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-white">
            <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-3xl bg-white ring-1 ring-amber-300/20">
              <Image src="/cjd%20logo.jpg" alt="Cholo Jai Dure logo" width={40} height={40} className="h-full w-full object-cover" />
            </span>
            <div>
              <p className="text-sm font-semibold">Cholo Jai Dure</p>
              <p className="text-xs text-white/70">Your Journey, Our Priority</p>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-white/70 hover:text-white transition">
              Back to Home
            </Link>
            <ThemeToggle align="right" />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 shadow-2xl sm:p-6">
            <SignUp
              path="/auth/signup"
              routing="path"
              signInUrl="/auth/login"
              forceRedirectUrl="/"
              appearance={{
                variables: {
                  colorPrimary: "#fbbf24",
                  colorBackground: "transparent",
                  colorText: "#ffffff",
                  colorInputText: "#ffffff",
                  colorInputBackground: "rgba(255,255,255,0.06)",
                  colorNeutral: "#94a3b8",
                  borderRadius: "0.75rem",
                },
                elements: {
                  card: "!bg-transparent !shadow-none !border-0",
                  headerTitle: "!text-white",
                  headerSubtitle: "!text-white/70",
                  socialButtonsBlockButton: "!bg-white/5 !border-white/15 !text-white hover:!bg-white/10",
                  formFieldInput: "!text-white !border-white/15 focus:!border-amber-300",
                  footerActionText: "!text-white/70",
                  footerActionLink: "!text-amber-300 hover:!text-amber-200",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
