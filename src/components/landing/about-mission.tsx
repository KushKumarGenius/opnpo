"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ScrollReveal } from "./scroll-reveal";

export function AboutMission() {
  const reduceMotion = useReducedMotion();

  return (
    <Section className="border-t border-border/60 bg-canvas-elevated/60 pt-10 sm:pt-14">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <ScrollReveal>
            <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent">
              Our mission
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              Quietly close the gap between what students need and what they have at home.
            </h1>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink-subtle">
              Too many young people are asked to keep up with school on a device that does not
              work—or without one at all. Tech Access exists to change that rhythm: fewer apologies,
              fewer workarounds, more room to focus on learning itself.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface shadow-lift">
              <div
                className="absolute inset-0 bg-gradient-to-br from-accent-soft via-canvas to-accent-glow"
                aria-hidden
              />
              <div className="absolute inset-8 rounded-[var(--radius-md)] border border-white/40 bg-white/30 shadow-soft backdrop-blur-md" />
              <div className="absolute bottom-8 left-8 right-8 rounded-[var(--radius-md)] border border-border/60 bg-surface/90 p-6 shadow-soft backdrop-blur">
                <p className="text-sm font-medium text-ink-subtle">This week</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-ink">
                  Devices ready for classrooms
                </p>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-accent-soft">
                  <motion.div
                    className="h-full rounded-full bg-accent-bright"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "72%" }}
                    viewport={{ once: true }}
                    transition={{ duration: reduceMotion ? 0 : 1.1, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </Section>
  );
}
