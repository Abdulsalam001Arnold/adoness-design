"use client";

import { useCallback } from "react";
import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "adoness-theme";

/** Reads the theme currently applied to <html> (source of truth). */
function getSnapshot(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

/** SSR / first hydration render — always the default brand theme. */
function getServerSnapshot(): Theme {
  return "light";
}

function subscribe(callback: () => void): () => void {
  window.addEventListener("themechange", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("themechange", callback);
    window.removeEventListener("storage", callback);
  };
}

interface UseTheme {
  theme: Theme;
  setTheme: (next: Theme) => void;
  toggleTheme: () => void;
}

/**
 * Light/dark theme control. State lives on `document.documentElement`
 * (`data-theme`) so an inline pre-paint script can set it before React
 * hydrates, and every consumer (navbar toggle, animated background) stays in
 * sync via a `themechange` event + cross-tab `storage` event.
 */
export function useTheme(): UseTheme {
  const theme = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const setTheme = useCallback((next: Theme): void => {
    document.documentElement.dataset.theme = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore storage failures (private mode / disabled) — the DOM still updates.
    }
    window.dispatchEvent(new Event("themechange"));
  }, []);

  const toggleTheme = useCallback((): void => {
    setTheme(getSnapshot() === "dark" ? "light" : "dark");
  }, [setTheme]);

  return { theme, setTheme, toggleTheme };
}