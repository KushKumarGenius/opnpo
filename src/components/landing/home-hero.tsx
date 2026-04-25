"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

export function HomeHero() {
  const reduceMotion = useReducedMotion();

  const heroTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section className="relative overflow-hidden pb-20 pt-8 sm:pb-28 sm:pt-12 lg:pb-32 lg:pt-16">
      <div
        className="pointer-events-none absolute -right-24 top-0 h-[420px] w-[420px] rounded-full bg-accent-glow blur-3xl sm:right-0 sm:h-[520px] sm:w-[520px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 bottom-0 h-[280px] w-[280px] rounded-full bg-accent-soft/50 blur-3xl"
        aria-hidden
      />

      <Container className="relative">
        <div className="max-w-3xl">
          <motion.p
            className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...heroTransition, delay: reduceMotion ? 0 : 0.05 }}
          >
          Student-led · Nonprofit · Monta Vista High School
          </motion.p>
          <motion.h1
            className="mt-6 text-[2.75rem] font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[4.25rem] lg:leading-[1.02]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...heroTransition, delay: reduceMotion ? 0 : 0.12 }}
          >
            Access to technology should feel calm, fair, and human.
          </motion.h1>
          <motion.p
            className="mt-8 max-w-xl text-lg leading-relaxed text-ink-subtle sm:text-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...heroTransition, delay: reduceMotion ? 0 : 0.2 }}
          >
            We collect used devices, restore them with care, and place them where they matter
            most—so students can learn without friction.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...heroTransition, delay: reduceMotion ? 0 : 0.28 }}
          >
            <ButtonLink href="/contact" variant="primary">
              Request Access
            </ButtonLink>
            <ButtonLink href="/how-it-works" variant="secondary">
              See how it works
            </ButtonLink>
          </motion.div>
        </div>

        <motion.div
          className="mt-16 grid gap-4 sm:mt-20 sm:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...heroTransition, delay: reduceMotion ? 0 : 0.36 }}
        >
          {[
            { t: "Local first", d: "Devices stay in the community they came from." },
            { t: "Handled with care", d: "Repair, clean, and test before every handoff." },
            { t: "Built for trust", d: "Clear communication from pickup to placement." },
          ].map((item) => (
            <div
              key={item.t}
              className="rounded-[var(--radius-md)] border border-border/80 bg-surface/50 p-5 shadow-[0_1px_0_rgba(255,255,255,0.65)_inset] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-lift"
            >
              <p className="text-[15px] font-semibold text-ink">{item.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-subtle">{item.d}</p>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
