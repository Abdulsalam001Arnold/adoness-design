"use client";

import { useEffect, useRef } from "react";
import type { ReactElement } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";

gsap.registerPlugin(ScrollTrigger);

export function CategoryCTA(): ReactElement {
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
      tl.from(".cta-card", {
        autoAlpha: 0,
        y: 50,
        duration: 0.95,
      })
        .from(".cta-text-title", { autoAlpha: 0, y: 22, duration: 0.7 }, "-=0.5")
        .from(".cta-text-body", { autoAlpha: 0, y: 18, duration: 0.6 }, "-=0.45")
        .from(".cta-text-button", { autoAlpha: 0, y: 14, duration: 0.55 }, "-=0.4");
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="py-20 md:py-28">
      <Container>
        <div className="cta-card flex flex-col items-center rounded-3xl bg-foreground px-8 py-16 text-center text-background md:px-16 md:py-24">
          <h2 className="cta-text-title max-w-2xl font-serif text-3xl font-semibold leading-tight md:text-5xl md:leading-[1.1]">
            Made to Measure
          </h2>
          <p className="cta-text-body mt-6 max-w-xl text-base leading-relaxed text-background/70 md:mt-8 md:text-lg">
            Discover the pinnacle of our craftsmanship through our bespoke
            atelier services — available by private appointment only.
          </p>
          <Link
            href="/contact"
            className="cta-text-button mt-10 inline-flex items-center justify-center rounded-full bg-background px-10 py-4 text-[12px] font-semibold uppercase tracking-[0.25em] text-foreground transition-colors hover:bg-accent hover:text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Inquire Atelier
          </Link>
        </div>
      </Container>
    </section>
  );
}
