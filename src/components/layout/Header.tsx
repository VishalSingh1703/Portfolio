"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { navSections, site } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (open) {
      // wait for the mobile menu to collapse before scrolling, otherwise the
      // shrinking header shifts the layout mid-scroll and the jump lands wrong
      setOpen(false);
      window.setTimeout(() => scrollToSection(id), 260);
    } else {
      scrollToSection(id);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            setOpen(false);
          }}
          className="font-mono text-sm text-foreground"
          aria-label={`${site.name} — back to top`}
        >
          <span className="text-accent">~</span>/{site.firstName.toLowerCase()}
          <span className="caret text-accent" aria-hidden="true">
            _
          </span>
        </a>

        {/* desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navSections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleNav(e, id)}
              className={cn(
                "rounded px-3 py-1.5 font-mono text-[13px] transition-colors",
                active === id
                  ? "text-accent"
                  : "text-muted hover:text-foreground"
              )}
              aria-current={active === id ? "true" : undefined}
            >
              {active === id ? "./" : ""}
              {label}
            </a>
          ))}
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </nav>

        {/* mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted transition-colors hover:border-border-strong hover:text-foreground"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* mobile nav */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Primary mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden border-t border-border bg-background md:hidden"
          >
            <div className="space-y-1 px-5 py-4">
              {navSections.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => handleNav(e, id)}
                  className={cn(
                    "block rounded px-3 py-2 font-mono text-sm transition-colors",
                    active === id
                      ? "bg-surface-2 text-accent"
                      : "text-muted hover:bg-surface-2 hover:text-foreground"
                  )}
                >
                  <span className="text-faint">{"> "}</span>
                  {label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
