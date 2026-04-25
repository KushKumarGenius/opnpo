import type { Metadata } from "next";
import { HomeHero } from "@/components/landing/home-hero";
import { HomeNextSteps } from "@/components/landing/home-next-steps";
import { ImpactSection } from "@/components/landing/impact-section";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Student-led nonprofit restoring and placing technology where it supports learning across the Bay Area.",
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ImpactSection />
      <HomeNextSteps />
    </>
  );
}