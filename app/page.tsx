import type { ReactElement } from "react";
import { Hero } from "@/components/sections/Hero";
import { HangingGrid } from "@/components/sections/HangingGrid";
import { Editorial } from "@/components/sections/Editorial";
import { Quote } from "@/components/sections/Quote";
import { Newsletter } from "@/components/sections/Newsletter";

export default function HomePage(): ReactElement {
  return (
    <>
      <Hero />
      <HangingGrid />
      <Editorial />
      <Quote />
      <Newsletter />
    </>
  );
}
