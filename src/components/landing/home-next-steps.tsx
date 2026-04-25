"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ScrollReveal } from "./scroll-reveal";

const links = [
  {
    href: "/about",
    title: "Our mission",
    description: "Why we exist, and how we think about access.",
  },
  {
    href: "/how-it-works",
    title: "How it works",
    description: "From pickup to placement—three calm steps.",
  },
] as const;

export function HomeNextSteps() {
  return (
    <Section className="pb-8">
      <Container>
        <ScrollReveal className="max-w-2xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent">
            Keep exploring
          </p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Go deeper in a click—each page is focused on one thing.
          </h2>
        </ScrollReveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {links.map((item, i) => (
            <ScrollReveal key={item.href} delay={0.05 * i}>
              <Link
                href={item.href}
                className="group block rounded-[var(--radius-lg)] border border-border bg-surface/50 p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent-bright/30 hover:shadow-lift"
              >
                <p className="text-lg font-semibold text-ink group-hover:text-accent">
                  {item.title}
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-subtle">{item.description}</p>
                <span className="mt-4 inline-flex text-sm font-semibold text-accent">
                  Open page
                  <span className="ml-1 transition-transform duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
