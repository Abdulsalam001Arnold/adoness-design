import type { Metadata } from "next";
import type { ReactElement } from "react";
import { AboutHero } from "@/components/sections/AboutHero";
import { AboutProcess } from "@/components/sections/AboutProcess";
import { AboutCTA } from "@/components/sections/AboutCTA";

export const metadata: Metadata = {
  title: "About — Adoness",
  description:
    "The story behind Adoness Design — timeless craftsmanship and warm minimal aesthetic, redefining luxury through an editorial lens.",
};

export default function AboutPage(): ReactElement {
  return (
    <>
      <AboutHero />
      <AboutProcess />
      <AboutCTA />
    </>
  );
}
