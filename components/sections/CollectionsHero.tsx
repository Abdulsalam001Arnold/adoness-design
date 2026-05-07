"use client";

import { useEffect, useRef } from "react";
import type { ReactElement } from "react";
import gsap from "gsap";
import { Container } from "@/components/ui/Container";

export function CollectionsHero(): ReactElement {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".collections-eyebrow", { autoAlpha: 0, y: 14, duration: 0.55 })
        .from(
          ".collections-title",
          { autoAlpha: 0, y: 30, duration: 0.95 },
          "-=0.3"
        )
        .from(
          ".collections-subtitle",
          { autoAlpha: 0, y: 18, duration: 0.7 },
          "-=0.55"
        );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="pt-28 md:pt-40">
      <Container className="flex flex-col items-start text-left md:items-center md:text-center">
        <span className="collections-eyebrow text-[11px] font-semibold uppercase tracking-[0.3em] text-foreground/60 md:text-accent">
          Curation
        </span>
        <h1 className="collections-title mt-4 font-serif text-5xl font-semibold leading-tight text-foreground sm:text-6xl md:mt-6 md:text-[88px] md:leading-[0.95] md:tracking-tight">
          Collections
        </h1>
        <p className="collections-subtitle mt-6 max-w-xl text-base leading-relaxed text-foreground/70 md:mt-8 md:text-lg">
          Explore the intersection of architectural form and textile fluidity.
          Each season is a narrative — built piece by piece, finished in our
          atelier, and released as a single body of work.
        </p>
      </Container>
    </section>
  );
}