"use client";

import { useCallback, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "scatp-theme";

function subscribe(onChange: () => void) {
  const el = document.documentElement;
  const observer = new MutationObserver(onChange);
  observer.observe(el, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

function getDarkSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getDarkServerSnapshot() {
  return false;
}

function persistTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  try {
    localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light");
  } catch {
    /* ignore quota / private mode */
  }
}

function IconSun({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function IconMoon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function ThemeToggle({ className }: { className?: string }) {
  const dark = useSyncExternalStore(subscribe, getDarkSnapshot, getDarkServerSnapshot);

  const toggle = useCallback(() => {
    persistTheme(!document.documentElement.classList.contains("dark"));
  }, []);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      className={cn(
        "relative h-8 w-[52px] shrink-0 cursor-pointer rounded-full border transition-[background-color,box-shadow,border-color] duration-300 ease-out",
        "border-border bg-accent-soft/90 shadow-[inset_0_1px_0_var(--surface-inset-highlight)]",
        "dark:border-border dark:bg-surface/55 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        className,
      )}
    >
      <span
        className="pointer-events-none absolute left-1.5 top-1/2 -translate-y-1/2 text-accent transition-opacity duration-300"
        style={{ opacity: dark ? 0.22 : 1 }}
      >
        <IconSun className="h-[13px] w-[13px]" />
      </span>
      <span
        className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-ink-muted transition-opacity duration-300 dark:text-accent-bright"
        style={{ opacity: dark ? 1 : 0.26 }}
      >
        <IconMoon className="h-[13px] w-[13px]" />
      </span>

      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-border/55 bg-surface text-accent shadow-[0_1px_2px_rgba(15,78,168,0.14)] transition-[left,box-shadow,color,border-color] duration-300 ease-[cubic-bezier(0.34,1.45,0.64,1)] motion-reduce:transition-none motion-reduce:duration-0",
          "dark:border-white/12 dark:bg-canvas-elevated dark:text-accent-bright dark:shadow-[0_1px_3px_rgba(0,0,0,0.38)]",
          dark ? "left-[calc(100%-0.25rem-1.75rem)]" : "left-1",
        )}
      >
        <span
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 ease-out"
          style={{ opacity: dark ? 0 : 1 }}
        >
          <IconSun className="h-[15px] w-[15px]" />
        </span>
        <span
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 ease-out"
          style={{ opacity: dark ? 1 : 0 }}
        >
          <IconMoon className="h-[15px] w-[15px]" />
        </span>
      </span>
    </button>
  );
}
