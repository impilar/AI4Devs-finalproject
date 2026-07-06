import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { NotaResumen } from "../types/nota";

type HomeShellSlots = {
  search: ReactNode | null;
  sidebar: ReactNode | null;
  noteCount: number | null;
  notes: NotaResumen[];
  tags: string[];
};

type HomeShellContextValue = {
  slots: HomeShellSlots;
  setSlots: (partial: Partial<HomeShellSlots>) => void;
  clearSlots: () => void;
};

const emptySlots: HomeShellSlots = {
  search: null,
  sidebar: null,
  noteCount: null,
  notes: [],
  tags: [],
};

const HomeShellContext = createContext<HomeShellContextValue | null>(null);

export function HomeShellProvider({ children }: { children: ReactNode }) {
  const [slots, setSlotsState] = useState<HomeShellSlots>(emptySlots);

  const setSlots = useCallback((partial: Partial<HomeShellSlots>) => {
    setSlotsState((current) => ({ ...current, ...partial }));
  }, []);

  const clearSlots = useCallback(() => {
    setSlotsState(emptySlots);
  }, []);

  const value = useMemo(
    () => ({
      slots,
      setSlots,
      clearSlots,
    }),
    [slots, setSlots, clearSlots],
  );

  return <HomeShellContext.Provider value={value}>{children}</HomeShellContext.Provider>;
}

export function useHomeShell(): HomeShellContextValue {
  const context = useContext(HomeShellContext);

  if (!context) {
    throw new Error("useHomeShell must be used within HomeShellProvider");
  }

  return context;
}
