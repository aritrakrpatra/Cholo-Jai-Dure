"use client";

import { SignIn } from "@clerk/nextjs";
import { useTheme } from "@/app/context/ThemeContext";
import Navbar from "@/app/components/Navbar";

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
      <Navbar />

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
