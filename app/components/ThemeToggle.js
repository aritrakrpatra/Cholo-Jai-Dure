"use client";

import { useEffect, useRef, useState } from "react";
import { MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "@/app/context/ThemeContext";

const themeOptions = [
  { value: "light", label: "Light", icon: SunMedium },
  { value: "dark", label: "Dark", icon: MoonStar },
];

// Standalone theme toggle button for pages/sections that don't render the main Navbar.
export default function ThemeToggle({ align = "left", className = "" }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const activeOption = themeOptions.find((option) => option.value === theme) ?? themeOptions[0];
  const ActiveIcon = activeOption.icon;
  const isLightTheme = resolvedTheme === "light";

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div ref={menuRef} className={`relative shrink-0 ${className}`}>
      <button
        type="button"
        aria-label={`Change theme, current theme ${activeOption.label.toLowerCase()}`}
        onClick={() => setOpen((value) => !value)}
        className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl border transition ${
          isLightTheme
            ? "border-(--border) bg-(--surface-strong) text-slate-900 hover:bg-black/5"
            : "border-white/10 bg-white/5 text-white/85 hover:bg-white/10 hover:text-white"
        }`}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-400/15 text-amber-300">
          <ActiveIcon className="h-4 w-4" />
        </span>
      </button>

      {open && (
        <div
          className={`absolute top-full mt-2 grid w-48 gap-2 rounded-2xl border p-2 shadow-2xl backdrop-blur-xl z-50 ${
            align === "right" ? "right-0" : "left-0"
          } ${isLightTheme ? "border-(--border) bg-(--surface-strong)" : "border-white/10 bg-slate-950/95"}`}
        >
          {themeOptions.map((option) => {
            const OptionIcon = option.icon;
            const selected = option.value === theme;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setTheme(option.value);
                  setOpen(false);
                }}
                className={`flex items-center justify-between rounded-xl border px-3 py-2 text-left text-sm transition ${
                  selected
                    ? isLightTheme
                      ? "border-amber-300/40 bg-amber-300/15 text-slate-900"
                      : "border-amber-300/40 bg-amber-300/15 text-amber-100"
                    : isLightTheme
                      ? "border-(--border) bg-transparent text-slate-700 hover:bg-black/5 hover:text-slate-950"
                      : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2">
                  <OptionIcon className="h-4 w-4" />
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
