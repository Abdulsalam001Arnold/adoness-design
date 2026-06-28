"use client";

import { useEffect, useRef } from "react";
import type { ReactElement } from "react";
import Image from "next/image";
import logo from "@/public/assets/Screenshot (477).png"
import gsap from "gsap";
import { Container } from "@/components/ui/Container";

export function AboutHero(): ReactElement {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".about-hero-image", {
        autoAlpha: 0,
        scale: 1.04,
        duration: 1.05,
      })
        .from(
          ".about-hero-eyebrow",
          { autoAlpha: 0, y: 14, duration: 0.6 },
          "-=0.6"
        )
        .from(
          ".about-hero-title",
          { autoAlpha: 0, y: 26, duration: 0.85 },
          "-=0.4"
        )
        .from(
          ".about-hero-body",
          { autoAlpha: 0, y: 18, duration: 0.7, stagger: 0.1 },
          "-=0.55"
        );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="pt-28 md:pt-36">
      <Container className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
        <div className="relative order-1 md:order-1">
          <div className="about-hero-image relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface shadow-[0_30px_70px_-25px_rgba(17,17,17,0.35)] md:aspect-[1.05/1] md:rounded-3xl">
            <Image
              src={logo}
              alt="Adoness atelier — quiet workspace with natural light"
              fill
              priority
              sizes="(max-width: 768px) 92vw, 50vw"
              className="object-contain"
            />
          </div>
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-8 -left-8 hidden h-40 w-40 rounded-full bg-accent/15 blur-3xl md:block"
          />
        </div>

        <div className="order-2 flex flex-col gap-6 md:order-2 md:gap-8">
          <span className="about-hero-eyebrow text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
            Our Story
          </span>
          <h1 className="about-hero-title font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl md:text-[64px] md:leading-[1.05] lg:text-[72px]">
            The Story
            <br />
            Behind Adoness
          </h1>
          <p className="about-hero-body max-w-xl text-base leading-relaxed text-foreground/70 md:text-lg">
            Adoness Designs is a ‘FABRIC ART GALLERY’; an establishment whose mission is to design, create, showcase and sell luxury handcrafted fabric art items. 
          </p>
          <p className="about-hero-body max-w-xl text-sm leading-relaxed text-foreground/60 md:text-base">
            At Adoness Fabric-art Gallery, we design, create, showcase and sell luxury handmade fabric works of art to beautify our customers and their space. What this means is that our products are made from high quality natural 'fabrics' both locally and internationally sourced; and their process of production is of superior construction which involves detailing, sustainability, human connection and high quality of craftsmanship.
          </p>
        </div>
      </Container>
    </section>
  );
}
