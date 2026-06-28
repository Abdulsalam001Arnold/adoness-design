"use client";

import { useEffect, useRef } from "react";
import type { ReactElement } from "react";
import Image, { StaticImageData } from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import image1 from "@/public/adoness and works/image-1.jpeg"
import image2 from "@/public/adoness and works/image-2.jpeg"
import image3 from "@/public/adoness and works/image-3.jpeg"
gsap.registerPlugin(ScrollTrigger);

interface ProcessStep {
  number: string;
  eyebrow: string;
  title: string;
  body: string;
  image: string | StaticImageData;
  offsetClass: string;
}

const STEPS: readonly ProcessStep[] = [
  {
    number: "01",
    eyebrow: "Conceptualization",
    title: "Curated Concept",
    body: "Every collection begins with a narrative. We curate moods, textures, and silhouettes — drawing inspiration from architecture and classic tailoring before the first sketch is drawn.",
    image: image1,
    offsetClass: "",
  },
  {
    number: "02",
    eyebrow: "Craftsmanship",
    title: "Artisan Precision",
    body: "We partner with heritage mills and skilled artisans who treat material with reverence. Each piece is hand-finished to ensure a unique, human touch in every detail.",
    image: image2,
    offsetClass: "md:mt-16",
  },
  {
    number: "03",
    eyebrow: "Curation",
    title: "Spatial Harmony",
    body: "Final construction takes place in our dedicated atelier, where master craftsmen hand-finish every detail — bringing balance and quiet luxury to your wardrobe.",
    image: image3,
    offsetClass: "",
  },
];

export function AboutProcess(): ReactElement {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".process-eyebrow", {
        autoAlpha: 0,
        y: 14,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-eyebrow",
          start: "top 88%",
          once: true,
        },
      });
      gsap.from(".process-heading", {
        autoAlpha: 0,
        y: 22,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-heading",
          start: "top 88%",
          once: true,
        },
      });
      gsap.from(".process-rule", {
        scaleX: 0,
        transformOrigin: "center",
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-rule",
          start: "top 90%",
          once: true,
        },
      });
      gsap.from(".process-card", {
        autoAlpha: 0,
        y: 60,
        scale: 0.97,
        duration: 1,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-grid",
          start: "top 80%",
          once: true,
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="dot-grid bg-foreground/[0.02] py-20 md:py-32"
    >
      <Container>
        <div className="mb-14 flex flex-col items-center text-center md:mb-20">
          <span className="process-eyebrow block text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
            Methodology
          </span>
          <h2 className="process-heading mt-4 font-serif text-3xl font-semibold text-foreground md:text-5xl">
            Our Process
          </h2>
          <span
            aria-hidden
            className="process-rule mt-8 block h-px w-24 bg-accent"
          />
        </div>

        {/* Desktop / tablet: image grid */}
        <div className="process-grid hidden grid-cols-1 items-start gap-10 md:grid md:grid-cols-3 md:gap-12">
          {STEPS.map((step) => (
            <article
              key={step.number}
              className={`process-card flex flex-col gap-6 ${step.offsetClass}`.trim()}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface shadow-[0_22px_50px_-25px_rgba(17,17,17,0.35)]">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  sizes="(max-width: 1024px) 45vw, 30vw"
                  className="object-cover transition-transform duration-700 hover:scale-[1.04]"
                />
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">
                  {step.number}. {step.eyebrow}
                </span>
                <h3 className="mt-3 font-serif text-2xl font-semibold text-foreground md:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-foreground/70 md:text-base">
                  {step.body}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile: numbered card stack (no imagery, per mobile mockup) */}
        <div className="process-grid flex flex-col gap-6 md:hidden">
          {STEPS.map((step) => (
            <article
              key={step.number}
              className="process-card flex flex-col gap-3 rounded-2xl bg-surface p-7 shadow-[0_18px_40px_-20px_rgba(17,17,17,0.18)]"
            >
              <span className="font-serif text-3xl font-semibold text-accent/55">
                {step.number}
              </span>
              <h3 className="font-serif text-xl font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-foreground/70">
                {step.body}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
