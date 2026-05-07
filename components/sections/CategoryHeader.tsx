"use client";

import { useEffect, useRef } from "react";
import type { ReactElement } from "react";
import gsap from "gsap";
import { Container } from "@/components/ui/Container";

export function CategoryHeader(): ReactElement {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".cat-eyebrow", { autoAlpha: 0, y: 14, duration: 0.55 })
        .from(".cat-title", { autoAlpha: 0, y: 30, duration: 0.95 }, "-=0.3")
        .from(".cat-subtitle", { autoAlpha: 0, y: 18, duration: 0.7 }, "-=0.55");
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="pt-28 md:pt-36">
      <Container>
        <span className="cat-eyebrow block text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
          Browse the Edit
        </span>
        <h1 className="cat-title mt-4 font-serif text-5xl font-semibold leading-tight text-foreground sm:text-6xl md:mt-6 md:text-[80px] md:leading-[0.95] md:tracking-tight">
          Summer Capsule
        </h1>
        <p className="cat-subtitle mt-6 max-w-2xl text-base leading-relaxed text-foreground/70 md:mt-8 md:text-lg">
          A curated selection of archival pieces and new seasonal essentials —
          designed with precision and a quiet confidence. Filter by category,
          size and silhouette to refine the edit.
        </p>
      </Container>
    </section>
  );
}
