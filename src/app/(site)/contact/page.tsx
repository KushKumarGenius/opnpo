import type { Metadata } from "next";
import { ContactCta } from "@/components/landing/contact-cta";

export const metadata: Metadata = {
  title: "Contact",
  description: "Request access or reach out—clear communication from pickup to placement.",
};

export default function ContactPage() {
  return <ContactCta />;
}
