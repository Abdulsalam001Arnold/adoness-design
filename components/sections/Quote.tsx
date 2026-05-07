"use client";

import { useEffect, useRef } from "react";
import type { ReactElement } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";

gsap.registerPlugin(ScrollTrigger);

export function Quote(): ReactElement {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 80%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });
      tl.from(".quote-rule", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.6,
      })
        .from(
          ".quote-body",
          { autoAlpha: 0, y: 24, duration: 0.95 },
          "-=0.25"
        )
        .from(
          ".quote-author",
          { autoAlpha: 0, y: 12, duration: 0.5 },
          "-=0.45"
        );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="border-y border-muted/30 bg-foreground/[0.02] py-24 md:py-32"
    >
      <Container className="flex flex-col items-center text-center">
        <span
          aria-hidden
          className="quote-rule mb-10 block h-px w-24 bg-accent"
        />
        <blockquote className="quote-body max-w-3xl font-serif text-2xl italic leading-relaxed text-foreground md:text-4xl md:leading-[1.25]">
          “Style is a way to say who you are without having to speak.”
        </blockquote>
        <p className="quote-author mt-8 text-[11px] font-semibold uppercase tracking-[0.3em] text-foreground/60">
          — Rachel Zoe
        </p>
      </Container>
    </section>
  );
}
