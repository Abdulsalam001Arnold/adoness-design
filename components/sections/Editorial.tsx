"use client";

import { useEffect, useRef } from "react";
import type { ReactElement } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";

gsap.registerPlugin(ScrollTrigger);

interface EditorialCard {
  tag: string;
  title: string;
  body: string;
  image: string;
  aspect: string;
  translateClass: string;
}

const CARDS: readonly EditorialCard[] = [
  {
    tag: "Editorial · 01",
    title: "The Modern Aesthetic",
    body: "A curated selection of timeless silhouettes designed for the contemporary individual who values substance and form.",
    image: "https://picsum.photos/seed/adoness-editorial-1/640/800",
    aspect: "aspect-[4/5]",
    translateClass: "md:translate-y-12",
  },
  {
    tag: "Craft · 02",
    title: "Artisanal Details",
    body: "Every piece in our atelier is a testament to the enduring beauty of handcrafted excellence and mindful production.",
    image: "https://picsum.photos/seed/adoness-editorial-2/640/640",
    aspect: "aspect-square",
    translateClass: "",
  },
  {
    tag: "Vision · 03",
    title: "Bold Simplicity",
    body: "Exploring the intersection of architectural structure and fluid movement through our latest seasonal collection.",
    image: "https://picsum.photos/seed/adoness-editorial-3/640/800",
    aspect: "aspect-[4/5]",
    translateClass: "md:-translate-y-12",
  },
];

export function Editorial(): ReactElement {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".editorial-eyebrow", {
        autoAlpha: 0,
        y: 14,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".editorial-eyebrow",
          start: "top 85%",
          once: true,
        },
      });
      gsap.from(".editorial-heading", {
        autoAlpha: 0,
        y: 22,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".editorial-heading",
          start: "top 85%",
          once: true,
        },
      });
      gsap.from(".editorial-card", {
        autoAlpha: 0,
        y: 60,
        scale: 0.97,
        duration: 1.0,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".editorial-grid",
          start: "top 75%",
          once: true,
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="py-24 md:py-32">
      <Container>
        <div className="mb-16">
          <span className="editorial-eyebrow block text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
            The Journal
          </span>
          <h2 className="editorial-heading mt-4 max-w-2xl font-serif text-3xl font-semibold text-foreground md:text-5xl">
            Seasonal Narrative
          </h2>
        </div>

        <div className="editorial-grid grid grid-cols-1 items-start gap-12 md:grid-cols-3">
          {CARDS.map((card) => (
            <article
              key={card.title}
              className={`editorial-card flex flex-col gap-6 ${card.translateClass}`.trim()}
            >
              <div
                className={`relative ${card.aspect} overflow-hidden rounded-2xl bg-surface shadow-[0_22px_50px_-25px_rgba(17,17,17,0.35)]`}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 90vw, 30vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-foreground/50">
                  {card.tag}
                </span>
                <h3 className="mt-3 font-serif text-2xl font-semibold text-foreground md:text-3xl">
                  {card.title}
                </h3>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-foreground/70 md:text-base">
                  {card.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
