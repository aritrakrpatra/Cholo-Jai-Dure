"use client";

import { MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "@/app/context/ThemeContext";

export default function ThemeToggle({ align = "left", className = "" }) {
  const { setTheme, resolvedTheme } = useTheme();
  const isLightTheme = resolvedTheme === "light";
  const ActiveIcon = isLightTheme ? SunMedium : MoonStar;

  return (
    <button
      type="button"
      data-align={align}
      aria-label={`Switch to ${isLightTheme ? "dark" : "light"} theme`}
      title={`Switch to ${isLightTheme ? "dark" : "light"} theme`}
      onClick={() => setTheme(isLightTheme ? "dark" : "light")}
      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border transition ${
        isLightTheme
          ? "border-(--border) bg-(--surface-strong) text-slate-900 hover:bg-black/5"
          : "border-white/10 bg-white/5 text-white/85 hover:bg-white/10 hover:text-white"
      } ${className}`}
    >
      <ActiveIcon className="h-5 w-5 text-amber-500" />
    </button>
  );
}
