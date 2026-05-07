"use client";

import { useEffect, useRef } from "react";
import type { ReactElement } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Hero(): ReactElement {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-eyebrow", { autoAlpha: 0, y: 12, duration: 0.6 })
        .from(
          ".hero-title",
          { autoAlpha: 0, y: 28, duration: 1.0 },
          "-=0.35"
        )
        .from(
          ".hero-subtext",
          { autoAlpha: 0, y: 18, duration: 0.7 },
          "-=0.55"
        )
        .from(".hero-cta", { autoAlpha: 0, y: 14, duration: 0.6 }, "-=0.45");
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32"
    >
      <div className="dot-grid pointer-events-none absolute inset-0 -z-10 opacity-30" />
      <Container className="flex flex-col items-center text-center">
        <span className="hero-eyebrow mb-6 rounded-full bg-foreground/5 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground/60">
          Choose Your Fashion Style
        </span>
        <h1 className="hero-title max-w-4xl font-serif text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl md:text-6xl lg:text-[80px]">
          Transform your style, making everyday extraordinary.
        </h1>
        <p className="hero-subtext mt-8 max-w-xl text-base leading-relaxed text-foreground/70 md:text-lg">
          Explore a handpicked collection of pieces, where timeless elegance
          meets effortless modern flair.
        </p>
        <Link href="/collections" className="hero-cta mt-10 inline-block">
          <Button size="lg">Get Started</Button>
        </Link>
      </Container>
    </section>
  );
}
