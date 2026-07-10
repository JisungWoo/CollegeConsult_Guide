"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { defaultLocalState, parseLocalState, serializeLocalState, STORAGE_KEY, type LocalDeskState } from "@/lib/local-state";

type LocalStateContextValue = {
  state: LocalDeskState;
  hydrated: boolean;
  update: (recipe: (current: LocalDeskState) => LocalDeskState) => void;
  reset: () => void;
  importState: (raw: string) => { ok: boolean; message: string };
  exportState: () => string;
};

const LocalStateContext = createContext<LocalStateContextValue | null>(null);

export function LocalStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LocalDeskState>(defaultLocalState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let loaded = defaultLocalState;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) loaded = parseLocalState(stored);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    const hydrationFrame = window.requestAnimationFrame(() => {
      setState(loaded);
      setHydrated(true);
    });
    return () => window.cancelAnimationFrame(hydrationFrame);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.reducedMotion = state.preferences.reducedMotion ? "true" : "false";
  }, [state.preferences.reducedMotion]);

  const value = useMemo<LocalStateContextValue>(() => ({
    state,
    hydrated,
    update: (recipe) => setState((current) => {
      const next = recipe(current);
      window.localStorage.setItem(STORAGE_KEY, serializeLocalState(next));
      return next;
    }),
    reset: () => {
      window.localStorage.removeItem(STORAGE_KEY);
      setState(defaultLocalState);
    },
    importState: (raw) => {
      try {
        const imported = parseLocalState(raw);
        window.localStorage.setItem(STORAGE_KEY, serializeLocalState(imported));
        setState(imported);
        return { ok: true, message: "Local desk data imported." };
      } catch {
        return { ok: false, message: "Import failed. Choose a valid Admissions Desk JSON export." };
      }
    },
    exportState: () => serializeLocalState(state),
  }), [state, hydrated]);

  return <LocalStateContext.Provider value={value}>{children}</LocalStateContext.Provider>;
}

export function useLocalState() {
  const value = useContext(LocalStateContext);
  if (!value) throw new Error("useLocalState must be used inside LocalStateProvider");
  return value;
}
