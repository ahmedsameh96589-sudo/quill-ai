import { createContext, useCallback, useContext, useMemo, useState } from "react";

const STORAGE_KEY = "quill-theme";

const ThemeContext = createContext(null);

/** The class applied by the pre-paint script in index.html is the source of truth. */
function readAppliedTheme() {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readAppliedTheme);

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark";
      const root = document.documentElement;
      root.classList.remove("dark", "light");
      root.classList.add(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Private mode or blocked storage: the toggle still works for this session.
      }
      return next;
    });
  }, []);

  const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}
