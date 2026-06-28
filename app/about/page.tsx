import type { Metadata } from "next";
import type { ReactElement } from "react";
import { AboutHero } from "@/components/sections/AboutHero";
import { AboutProcess } from "@/components/sections/AboutProcess";
import { AboutCTA } from "@/components/sections/AboutCTA";
import { AboutFounder } from "@/components/sections/AboutFounder";
import { PaintbrushDivider } from "@/components/sections/PaintbrushDivider";

export const metadata: Metadata = {
  title: "About — Adoness",
  description:
    "The story behind Adoness Design — a premium Afrocentric fabric-art gallery by Bidemi Odusi, crafting luxury handmade fabric works of art.",
};

export default function AboutPage(): ReactElement {
  return (
    <>
      <AboutHero />
      <PaintbrushDivider direction="left" />
      <AboutFounder />
      <PaintbrushDivider direction="right" />
      <AboutProcess />
      <AboutCTA />
    </>
  );
}
