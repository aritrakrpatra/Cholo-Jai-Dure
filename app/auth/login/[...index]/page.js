"use client";

import { SignIn } from "@clerk/nextjs";
import Navbar from "@/app/components/Navbar";

export default function LoginSubPage() {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 shadow-2xl sm:p-6">
            <SignIn
              path="/auth/login"
              routing="path"
              signUpUrl="/auth/signup"
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
