"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ScrollReveal } from "./scroll-reveal";

function useCountUp(target: number, enabled: boolean, duration = 1.35) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [enabled, target, duration]);

  return value;
}

function StatCard({
  label,
  value,
  suffix = "",
  enabled,
}: {
  label: string;
  value: number;
  suffix?: string;
  enabled: boolean;
}) {
  const display = useCountUp(value, enabled);
  return (
    <div className="rounded-[var(--radius-lg)] border border-border bg-surface/70 p-8 shadow-soft backdrop-blur-sm transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-lift">
      <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-ink-subtle">
        {label}
      </p>
      <p className="mt-4 font-semibold tracking-tight text-ink tabular-nums">
        <span className="text-5xl sm:text-6xl lg:text-7xl">{display.toLocaleString()}</span>
        {suffix ? (
          <span className="ml-1 text-3xl font-semibold text-accent sm:text-4xl">{suffix}</span>
        ) : null}
      </p>
    </div>
  );
}

export function ImpactSection() {
  const impactRef = useRef<HTMLDivElement>(null);
  const impactInView = useInView(impactRef, { once: true, margin: "-15%" });

  return (
    <Section className="border-y border-border/60 bg-surface/40">
      <Container>
        <ScrollReveal className="max-w-2xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent">Impact • Live Count</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Proof lives in the numbers—and in quieter evenings for families.
          </h2>
        </ScrollReveal>

        <div ref={impactRef} className="mt-12 grid gap-6 sm:grid-cols-2 lg:gap-8">
          <StatCard label="Devices distributed" value={17} enabled={impactInView} />
          <StatCard label="People helped" value={2} suffix="+" enabled={impactInView} />
        </div>
      </Container>
    </Section>
  );
}
