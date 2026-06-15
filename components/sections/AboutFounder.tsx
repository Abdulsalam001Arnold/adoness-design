"use client";

import { useEffect, useRef } from "react";
import type { ReactElement } from "react";
import Image from "next/image";
import founderImage from '@/public/assets/bidemi-adoness.jpeg'

import gsap from "gsap";
import { Container } from "@/components/ui/Container";

export function AboutFounder(): ReactElement {
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
              src={founderImage}
              alt="Adoness atelier — quiet workspace with natural light"
              fill
              priority
              sizes="(max-width: 768px) 92vw, 50vw"
              className="object-cover"
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
            The Face
            <br />
            Behind Adoness
          </h1>
          <p className="about-hero-body max-w-xl text-base leading-relaxed text-foreground/70 md:text-lg">
            Bidemi Oluwafemi is an accomplished entrepreneur, fine artist, and the Chief Operating Officer and Creative Director of Adoness Designs Limited. With over two decades of experience spanning corporate communications, high-end fashion design, and visual arts, she has established herself as a versatile leader in the creative industry.
            ​Bidemi holds a Bachelor of Science degree in Economics from Obafemi Awolowo University, Ile-Ife. She began her professional career in the corporate sector, spending six years as a Client Service Executive in the printing and outdoor advertising industries—a role that solidified her foundational expertise in visual branding and client relations.
          </p>
          <p className="about-hero-body max-w-xl text-sm leading-relaxed text-foreground/60 md:text-base">
            In 2009, Bidemi transitioned her analytical and corporate expertise into the world of fashion. She formalised her training at the prestigious Amazing Fashion School in Opebi, Ikeja, and later refined her technical artistry as a fashion illustrator under the mentorship of the renowned industry expert, Celafrique. Driven by a passion for multi-disciplinary creativity, she also graduated from the Mosart Academy, developing a diverse portfolio as a fine artist specializing in portraits, landscapes, and abstract paintings.
            In 2017, Bidemi pioneered a specialized niche by merging her artistic and textile expertise to launch her Fabric-Art initiative. Her innovative concept earned prestigious recognition in 2022, when she was named a grant winner under the Flourish Africa Women Initiative, founded by Apostle Folorunsho Alakija. Bidemi is also an alumnus of the Flourish Africa Business Skill Acquisition Programme, further strengthening her business leadership and enterprise management capabilities.
            Beyond her executive and creative roles, Bidemi is a published author of two books. She is also passionate about culinary arts and dance. She is happily married and the proud mother of two children.
          </p>
        </div>
      </Container>
    </section>
  );
}
