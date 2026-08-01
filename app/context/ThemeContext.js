"use client";

import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";

const ThemeContext = createContext(null);
const STORAGE_KEY = "cholo-jai-dure-theme";
const THEME_OPTIONS = ["light", "dark"];

function resolveTheme(theme) {
  return theme === "dark" ? "dark" : "light";
}

function getInitialTheme() {
  if (typeof window === "undefined") {
    return "light";
  }

  try {
    const storedTheme = localStorage.getItem(STORAGE_KEY);
    return THEME_OPTIONS.includes(storedTheme) ? storedTheme : "light";
  } catch (error) {
    return "light";
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [hasMounted, setHasMounted] = useState(false);
  const resolvedTheme = resolveTheme(theme);

  useLayoutEffect(() => {
    setTheme(getInitialTheme());
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) {
      return;
    }

    const root = document.documentElement;
    const nextResolvedTheme = resolveTheme(theme);
    root.dataset.theme = nextResolvedTheme;
    root.dataset.themePreference = nextResolvedTheme;
    root.style.colorScheme = nextResolvedTheme;

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {
      // Ignore storage failures.
    }
  }, [hasMounted, theme]);

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