import type { Metadata } from "next";
import { HowItWorksContent } from "@/components/landing/how-it-works-content";

export const metadata: Metadata = {
  title: "How It Works",
  description: "Schedule a handoff, we renew devices with care, and route them to partners who know their students.",
};

export default function HowItWorksPage() {
  return <HowItWorksContent />;
}
