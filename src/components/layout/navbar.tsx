"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

function subscribeScrolled(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

function getScrolledSnapshot() {
  return window.scrollY > 12;
}

function getScrolledServerSnapshot() {
  return false;
}

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/contact", label: "Contact" },
] as const;

function navLinkActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(
    subscribeScrolled,
    getScrolledSnapshot,
    getScrolledServerSnapshot,
  );
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <header
      className="sticky top-0 z-50"
      style={{ height: "var(--navbar-height)" }}
    >
      <motion.div
        className="absolute inset-x-0 top-0 border-b border-transparent"
        initial={false}
        animate={{
          backgroundColor: scrolled ? "rgba(245, 240, 232, 0.92)" : "rgba(245, 240, 232, 0)",
          borderBottomColor: scrolled ? "var(--border)" : "rgba(26, 61, 43, 0)",
          backdropFilter: scrolled ? "blur(14px)" : "blur(0px)",
        }}
        transition={transition}
      >
        <Container className="flex h-[var(--navbar-height)] items-center justify-between gap-6">
          <Link
            href="/"
            className="flex items-center text-[17px] font-semibold tracking-tight text-ink"
          >
            <span className="hidden sm:inline">Santa Clara Tech Access Project</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {navItems.map((item) => {
              const active = navLinkActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-[var(--radius-sm)] px-3 py-2 text-[14px] font-medium transition-colors duration-200",
                    active
                      ? "bg-surface/80 text-ink"
                      : "text-ink-subtle hover:bg-surface/60 hover:text-ink",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
            <ButtonLink
              href="/contact"
              variant="primary"
              className="ml-2 px-5 py-2.5 text-[14px]"
            >
              Request Access
            </ButtonLink>
          </nav>

          <div className="flex items-center gap-3 md:hidden">
            <ButtonLink
              href="/contact"
              variant="primary"
              className="px-4 py-2 text-[13px]"
              onClick={() => setOpen(false)}
            >
              Request Access
            </ButtonLink>
            <button
              type="button"
              className="relative flex h-11 w-11 items-center justify-center rounded-[var(--radius-sm)] border border-border bg-surface/70 text-ink shadow-sm backdrop-blur-sm"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">Menu</span>
              <span className="flex h-3 w-5 flex-col justify-between">
                <motion.span
                  className="block h-0.5 w-full rounded-full bg-ink"
                  animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                  transition={transition}
                />
                <motion.span
                  className="block h-0.5 w-full rounded-full bg-ink"
                  animate={open ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: reduceMotion ? 0 : 0.2 }}
                />
                <motion.span
                  className="block h-0.5 w-full rounded-full bg-ink"
                  animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                  transition={transition}
                />
              </span>
            </button>
          </div>
        </Container>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            className="fixed inset-0 top-[var(--navbar-height)] z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-ink/20 backdrop-blur-[2px]"
              aria-label="Close menu overlay"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              className="absolute right-0 top-0 flex w-[min(100%,320px)] flex-col gap-1 border-l border-border bg-canvas/95 p-4 pb-8 shadow-lift backdrop-blur-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={transition}
              aria-label="Mobile"
            >
              {navItems.map((item, i) => {
                const active = navLinkActive(pathname, item.href);
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ ...transition, delay: reduceMotion ? 0 : 0.04 * i }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "block rounded-[var(--radius-sm)] px-4 py-3 text-[16px] font-medium",
                        active ? "bg-surface/80 text-ink" : "text-ink",
                      )}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
