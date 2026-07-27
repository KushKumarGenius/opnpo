"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
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
            <div className="group relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface shadow-lift transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-soft via-canvas to-accent-glow" />
              <div className="pointer-events-none absolute inset-y-0 left-[-35%] w-[30%] -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 transition-all duration-700 group-hover:left-[115%] group-hover:opacity-100" />
              <div className="relative flex h-full items-center justify-center p-6 sm:p-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full max-w-[380px] transition-transform duration-300 group-hover:scale-[1.04]"
                >
                  <div className="pointer-events-none absolute inset-0 rounded-[var(--radius-md)] bg-gradient-to-b from-white/30 via-transparent to-transparent" />
                  <Image
                    src="/images/scatp-logo.png"
                    alt="Santa Clara Technology Access Project logo"
                    width={940}
                    height={618}
                    className="h-auto w-full object-contain [mask-image:radial-gradient(ellipse_at_center,black_62%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_62%,transparent_100%)]"
                    priority
                  />
                </motion.div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.1}>
          <div className="mt-14 border-t border-border/70 pt-10 sm:mt-16">
            <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent">
              The Team
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              The people behind SCTAP
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="group relative overflow-hidden rounded-[var(--radius-md)] border border-border bg-surface p-5 shadow-sm transition-shadow duration-300 hover:shadow-md">
                <div className="pointer-events-none absolute inset-0 -translate-x-[140%] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-[140%] group-hover:opacity-100" />
                <p className="relative z-10 text-sm font-medium uppercase tracking-[0.14em] text-ink-subtle">
                  President • Head of Hardware • Secondary Treasurer
                </p>
                <p className="relative z-10 mt-2 text-lg font-semibold text-ink">Shayan Mahajan</p>
              </div>
              <div className="group relative overflow-hidden rounded-[var(--radius-md)] border border-border bg-surface p-5 shadow-sm transition-shadow duration-300 hover:shadow-md">
                <div className="pointer-events-none absolute inset-0 -translate-x-[140%] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-[140%] group-hover:opacity-100" />
                <p className="relative z-10 text-sm font-medium uppercase tracking-[0.14em] text-ink-subtle">
                  Vice President • Head of Software & Marketing
                </p>
                <p className="relative z-10 mt-2 text-lg font-semibold text-ink">Kushagr Kumar</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
