"use client";

import { FormEvent, useMemo, useState } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button-link";
import { ScrollReveal } from "./scroll-reveal";

const REQUEST_TYPES = [
  { value: "access", label: "Access Request" },
  { value: "donation", label: "Device Donation" },
  { value: "partnership", label: "Partnership" },
  { value: "other", label: "Other" },
] as const;

type FormState = {
  full_name: string;
  email: string;
  phone: string;
  device_type: string;
  request_type: (typeof REQUEST_TYPES)[number]["value"];
  description: string;
};

export function ContactCta() {
  const apiBase = useMemo(
    () => (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000").replace(/\/+$/, ""),
    [],
  );
  const [form, setForm] = useState<FormState>({
    full_name: "",
    email: "",
    device_type: "",
    phone: "",
    request_type: "access",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${apiBase}/api/requests/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as Record<string, string[] | string> | null;
        if (data && typeof data === "object") {
          const firstError = Object.values(data).flat().find(Boolean);
          throw new Error(typeof firstError === "string" ? firstError : "Unable to submit request.");
        }
        throw new Error("Unable to submit request.");
      }

      setSuccess("Thanks. Your request was submitted and our team will follow up shortly.");
      setForm({
        full_name: "",
        email: "",
        phone: "",
        device_type: "",
        request_type: "access",
        description: "",
      });
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Section className="pb-24 sm:pb-28">
      <Container>
        <ScrollReveal>
          <div className="overflow-hidden rounded-[var(--radius-lg)] border border-white/10 bg-brand-deep px-6 py-14 text-on-brand shadow-lift sm:px-12 sm:py-16 lg:px-16">
            <div className="mx-auto max-w-4xl">
              <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent-bright/90">
                Contact
              </p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:leading-tight">
                Ready when you are.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-on-brand/85">
                Whether you are a neighbor with a laptop to spare or a school looking for dependable
                devices, we will meet you with clarity and respect for your time.
              </p>
              <form onSubmit={handleSubmit} className="mt-10 grid gap-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-2 text-sm">
                    <span>
                      Full name <span className="text-red-300">*</span>
                    </span>
                    <input
                      required
                      value={form.full_name}
                      onChange={(event) => setForm((prev) => ({ ...prev, full_name: event.target.value }))}
                      className="rounded-[var(--radius-sm)] border border-canvas/25 bg-canvas/95 px-3 py-2 text-ink outline-none transition focus:border-accent-bright"
                    />
                  </label>
                  <label className="grid gap-2 text-sm">
                    <span>
                      Email <span className="text-red-300">*</span>
                    </span>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                      className="rounded-[var(--radius-sm)] border border-canvas/25 bg-canvas/95 px-3 py-2 text-ink outline-none transition focus:border-accent-bright"
                    />
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-2 text-sm">
                    <span>
                      Device type <span className="text-red-300">*</span>
                    </span>
                    <input
                      required
                      value={form.device_type}
                      onChange={(event) =>
                        setForm((prev) => ({ ...prev, device_type: event.target.value }))
                      }
                      placeholder="Chromebook, laptop, tablet, etc."
                      className="rounded-[var(--radius-sm)] border border-canvas/25 bg-canvas/95 px-3 py-2 text-ink outline-none transition focus:border-accent-bright"
                    />
                  </label>
                  <label className="grid gap-2 text-sm">
                    Phone (optional)
                    <input
                      value={form.phone}
                      onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                      className="rounded-[var(--radius-sm)] border border-canvas/25 bg-canvas/95 px-3 py-2 text-ink outline-none transition focus:border-accent-bright"
                    />
                  </label>
                  <label className="grid gap-2 text-sm">
                    Request type
                    <select
                      value={form.request_type}
                      onChange={(event) =>
                        setForm((prev) => ({
                          ...prev,
                          request_type: event.target.value as FormState["request_type"],
                        }))
                      }
                      className="rounded-[var(--radius-sm)] border border-canvas/25 bg-canvas/95 px-3 py-2 text-ink outline-none transition focus:border-accent-bright"
                    >
                      {REQUEST_TYPES.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="grid gap-2 text-sm">
                  <span>
                    Description <span className="text-red-300">*</span>
                  </span>
                  <textarea
                    required
                    minLength={20}
                    value={form.description}
                    onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
                    className="min-h-32 rounded-[var(--radius-sm)] border border-canvas/25 bg-canvas/95 px-3 py-2 text-ink outline-none transition focus:border-accent-bright"
                  />
                </label>

                {error ? <p className="text-sm text-red-200">{error}</p> : null}
                {success ? <p className="text-sm text-emerald-200">{success}</p> : null}

                <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-[var(--radius-sm)] bg-accent-bright px-6 py-2.5 text-sm font-semibold text-brand-deep transition hover:brightness-110 disabled:opacity-70"
                  >
                    {submitting ? "Submitting..." : "Submit request"}
                  </button>
                  <ButtonLink href="/about" variant="secondary" className="border-on-brand/25 bg-white/10 text-on-brand shadow-none backdrop-blur-sm hover:bg-white/15">
                    Learn more
                  </ButtonLink>
                </div>
              </form>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
