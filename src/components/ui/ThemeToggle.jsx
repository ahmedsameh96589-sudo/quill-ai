import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "../../context/ThemeContext.jsx";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="relative grid size-10 shrink-0 place-items-center rounded-full border border-border-subtle bg-bg-raised text-text-secondary transition-colors duration-[var(--dur-fast)] hover:text-text-primary"
    >
      <motion.span
        className="absolute grid place-items-center"
        initial={false}
        animate={{ opacity: isDark ? 1 : 0, rotate: isDark ? 0 : -90 }}
        transition={{ duration: 0.15 }}
      >
        <Moon size={18} aria-hidden="true" />
      </motion.span>
      <motion.span
        className="absolute grid place-items-center"
        initial={false}
        animate={{ opacity: isDark ? 0 : 1, rotate: isDark ? 90 : 0 }}
        transition={{ duration: 0.15 }}
      >
        <Sun size={18} aria-hidden="true" />
      </motion.span>
    </button>
  );
}
