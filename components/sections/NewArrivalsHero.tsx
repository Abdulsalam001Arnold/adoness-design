"use client";

import { useEffect, useRef } from "react";
import type { ReactElement } from "react";
import gsap from "gsap";
import { Container } from "@/components/ui/Container";

export function NewArrivalsHero(): ReactElement {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const items = Array.from(
      el.querySelectorAll<HTMLElement>(".arrivals-hero-item")
    );
    if (items.length === 0) return;
    gsap.killTweensOf(items);
    gsap.fromTo(
      items,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
      }
    );
    return () => {
      gsap.killTweensOf(items);
      gsap.set(items, { opacity: 1 });
    };
  }, []);

  return (
    <section ref={rootRef} className="relative pt-28 md:pt-36">
      <span
        aria-hidden
        className="dot-grid pointer-events-none absolute inset-0 -z-10 opacity-30"
      />
      <Container className="flex flex-col items-start text-left md:items-center md:text-center">
        <span className="arrivals-hero-item text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
          Summer Collection
        </span>
        <h1 className="arrivals-hero-item mt-4 font-serif text-5xl font-semibold leading-tight text-foreground sm:text-6xl md:mt-6 md:text-[80px] md:leading-[0.95] md:tracking-tight">
          New Arrivals
        </h1>
        <p className="arrivals-hero-item mt-6 max-w-2xl text-base leading-relaxed text-foreground/70 md:mt-8 md:text-lg">
          Experience the confluence of architectural form and fluid silhouettes.
          Our latest editorial curation explores the essence of modern
          refinement.
        </p>
      </Container>
    </section>
  );
}
