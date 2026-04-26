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
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface shadow-lift">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-soft via-canvas to-accent-glow" />
              <div className="relative flex h-full items-center justify-center p-6 sm:p-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full max-w-[380px]"
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
      </Container>
    </Section>
  );
}
