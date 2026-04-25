"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ScrollReveal } from "./scroll-reveal";

const steps = [
  {
    step: "01",
    title: "Reach out",
    body: "Tell us what you can share. We respond with a simple plan—no paperwork maze.",
  },
  {
    step: "02",
    title: "Handoff, thoughtfully",
    body: "We coordinate pickup or drop-off around your day, not the other way around.",
  },
  {
    step: "03",
    title: "Renew and place",
    body: "We refurbish what we can, recycle responsibly when we cannot, and route devices to partners who know their students best.",
  },
] as const;

export function HowItWorksContent() {
  return (
    <Section className="pt-10 sm:pt-14">
      <Container>
        <ScrollReveal className="max-w-2xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent">
            How it works
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Three calm steps from your drawer to someone&apos;s desk.
          </h1>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:gap-8">
          {steps.map((item, i) => (
            <ScrollReveal key={item.step} delay={0.06 * i}>
              <article className="group h-full rounded-[var(--radius-lg)] border border-border bg-surface/60 p-8 shadow-soft backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-bright/35 hover:shadow-lift">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent-glow text-sm font-semibold text-accent">
                  {item.step}
                </span>
                <h2 className="mt-6 text-xl font-semibold tracking-tight text-ink">{item.title}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-subtle">{item.body}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
