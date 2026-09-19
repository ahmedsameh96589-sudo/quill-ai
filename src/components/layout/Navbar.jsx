import { useCallback, useRef, useState } from "react";
import { Feather, Menu, X } from "lucide-react";
import { motion } from "motion/react";
import { navLinks } from "../../data/navLinks.js";
import { useScrolled } from "../../hooks/useScrolled.js";
import { Button } from "../ui/Button.jsx";
import { ThemeToggle } from "../ui/ThemeToggle.jsx";
import { MobileMenu } from "./MobileMenu.jsx";

export function Navbar() {
  const scrolled = useScrolled(8);
  const [menuOpen, setMenuOpen] = useState(false);
  const hamburgerRef = useRef(null);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    hamburgerRef.current?.focus();
  }, []);

  return (
    <>
      <header
        className={
          "fixed inset-x-0 top-0 z-50 h-16 transition-[background-color,border-color,backdrop-filter] duration-[var(--dur-base)] md:h-18 " +
          (scrolled
            ? "border-b border-border-subtle bg-bg-nav-glass backdrop-blur-[16px]"
            : "border-b border-transparent bg-transparent")
        }
      >
        <div className="container-page flex h-full items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-2.5" aria-label="Quill AI — back to top">
            <span className="grid size-8 place-items-center rounded-md grad-brand">
              <Feather size={18} className="text-white" aria-hidden="true" />
            </span>
            <span className="font-display text-[20px] font-semibold text-text-primary">Quill</span>
          </a>

          <nav aria-label="Primary" className="hidden md:flex md:items-center md:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="type-body-sm py-3 font-medium text-text-secondary transition-colors duration-[var(--dur-fast)] hover:text-text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <ThemeToggle />
            {/* Wrapped rather than given `hidden`: the Button's own display
                utility would win the cascade over a passed-in one. */}
            <div className="hidden md:block">
              <Button variant="primary" size="md">
                Start free
              </Button>
            </div>

            <button
              ref={hamburgerRef}
              type="button"
              onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="relative grid size-10 shrink-0 place-items-center rounded-full border border-border-subtle bg-bg-raised text-text-secondary md:hidden"
            >
              <motion.span
                className="absolute grid place-items-center"
                initial={false}
                animate={{ opacity: menuOpen ? 0 : 1 }}
                transition={{ duration: 0.15 }}
              >
                <Menu size={18} aria-hidden="true" />
              </motion.span>
              <motion.span
                className="absolute grid place-items-center"
                initial={false}
                animate={{ opacity: menuOpen ? 1 : 0 }}
                transition={{ duration: 0.15 }}
              >
                <X size={18} aria-hidden="true" />
              </motion.span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
