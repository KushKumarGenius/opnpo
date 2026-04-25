"use client";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ScrollReveal } from "./scroll-reveal";

export function ContactCta() {
  return (
    <Section className="pb-24 sm:pb-28">
      <Container>
        <ScrollReveal>
          <div className="overflow-hidden rounded-[var(--radius-lg)] border border-ink/10 bg-ink px-6 py-16 text-canvas shadow-lift sm:px-12 sm:py-20 lg:px-16">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent-bright/90">
                Contact
              </p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
                Ready when you are.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-canvas/85">
                Whether you are a neighbor with a laptop to spare or a school looking for dependable
                devices, we will meet you with clarity and respect for your time.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <ButtonLink
                  href="mailto:hello@techaccess.org?subject=Request%20Access"
                  variant="secondary"
                  className="border-canvas/20 bg-canvas text-ink hover:bg-surface"
                >
                  Request Access
                </ButtonLink>
                <ButtonLink
                  href="/about"
                  variant="primary"
                  className="bg-accent-bright text-ink hover:bg-canvas"
                >
                  Learn more
                </ButtonLink>
              </div>
              <p className="mt-10 text-sm text-canvas/65">
                No forms on this site—just a direct line when you are ready to talk.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
