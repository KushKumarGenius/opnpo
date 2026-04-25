import type { Metadata } from "next";
import { AboutMission } from "@/components/landing/about-mission";

export const metadata: Metadata = {
  title: "About",
  description: "Our mission: closing the device gap for students with calm, human-centered access.",
};

export default function AboutPage() {
  return <AboutMission />;
}
