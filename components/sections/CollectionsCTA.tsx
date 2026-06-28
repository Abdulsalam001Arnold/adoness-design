"use client";

import { useEffect, useRef } from "react";
import type { ReactElement } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";

gsap.registerPlugin(ScrollTrigger);

export function CollectionsCTA(): ReactElement {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 88%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });
      tl.from(".collections-cta-rule", {
        scaleX: 0,
        transformOrigin: "center",
        duration: 0.55,
      })
        .from(
          ".collections-cta-title",
          { autoAlpha: 0, y: 22, duration: 0.85 },
          "-=0.25"
        )
        .from(
          ".collections-cta-button",
          { autoAlpha: 0, y: 18, duration: 0.6 },
          "-=0.5"
        );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="py-20 md:py-28">
      <Container className="flex flex-col items-center text-center">
        <span
          aria-hidden
          className="collections-cta-rule mb-12 block h-px w-24 bg-accent/60"
        />
        <h2 className="collections-cta-title max-w-2xl font-serif text-3xl font-semibold text-foreground md:text-5xl">
          Crafting Modern Tradition
        </h2>
        <Link
          href="/about"
          className="collections-cta-button mt-12 inline-flex items-center justify-center rounded-full bg-accent px-12 py-5 text-[12px] font-semibold uppercase tracking-[0.2em] text-surface shadow-md transition-all duration-300 hover:scale-[1.03] hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          View Our Story
        </Link>
      </Container>
    </section>
  );
}