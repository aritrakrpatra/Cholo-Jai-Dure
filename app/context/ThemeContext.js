"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);
const STORAGE_KEY = "cholo-jai-dure-theme";
const THEME_OPTIONS = ["light", "dark", "system"];

function getSystemTheme() {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function resolveTheme(theme) {
  return theme === "system" ? getSystemTheme() : theme;
}

function getInitialTheme() {
  if (typeof window === "undefined") {
    return "system";
  }

  const storedTheme = localStorage.getItem(STORAGE_KEY);
  return THEME_OPTIONS.includes(storedTheme) ? storedTheme : "system";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);
  const resolvedTheme = resolveTheme(theme);

  useEffect(() => {
    const root = document.documentElement;
    const applyTheme = () => {
      const nextResolvedTheme = resolveTheme(theme);
      root.dataset.theme = nextResolvedTheme;
      root.dataset.themePreference = theme;
      root.style.colorScheme = nextResolvedTheme;
    };

    applyTheme();
    localStorage.setItem(STORAGE_KEY, theme);

    if (theme !== "system") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => applyTheme();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}