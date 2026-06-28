"use client";

import { useEffect, useRef } from "react";
import type { ReactElement } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Container } from "@/components/ui/Container";

interface OrbitPiece {
  src: string;
  alt: string;
  className: string;
}

// Her real studio work, scattered around the portrait like the brand mark.
const ORBIT: readonly OrbitPiece[] = [
  {
    src: "/adoness%20and%20works/image-3.jpeg",
    alt: "Bidemi hand-painting a geometric Ankara motif",
    className: "-left-[2%] top-[4%] h-24 w-28 -rotate-6 md:h-28 md:w-36",
  },
  {
    src: "/adoness%20and%20works/image-6.jpeg",
    alt: "Studio bags and fabric-art pieces on display",
    className: "-right-[3%] top-[1%] h-24 w-28 rotate-6 md:h-28 md:w-36",
  },
  {
    src: "/adoness%20and%20works/image-1.jpeg",
    alt: "Detailing a painted fabric canvas",
    className: "-left-[6%] top-[46%] h-24 w-24 -rotate-3 md:h-28 md:w-32",
  },
  {
    src: "/adoness%20and%20works/image-7.jpeg",
    alt: "Painting lettering onto fabric",
    className: "-right-[6%] top-[50%] h-24 w-28 rotate-3 md:h-28 md:w-36",
  },
  {
    src: "/adoness%20and%20works/image-2.jpeg",
    alt: "A patterned fabric piece in progress",
    className: "left-[10%] -bottom-[3%] h-24 w-28 rotate-5 md:h-28 md:w-36",
  },
  {
    src: "/adoness%20and%20works/image-8.jpeg",
    alt: "Finished fabric-art detail",
    className: "right-[12%] -bottom-[5%] h-24 w-24 -rotate-5 md:h-28 md:w-32",
  },
] as const;

export function AboutFounder(): ReactElement {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".founder-backdrop", { autoAlpha: 0, scale: 0.9, duration: 0.9 })
        .from(
          ".founder-portrait",
          { autoAlpha: 0, scale: 0.85, duration: 0.8 },
          "-=0.5"
        )
        .from(
          ".founder-arc",
          { autoAlpha: 0, rotate: -12, duration: 0.8, transformOrigin: "center" },
          "-=0.5"
        )
        .from(
          ".founder-card",
          {
            autoAlpha: 0,
            scale: 0.7,
            y: 16,
            duration: 0.55,
            stagger: { each: 0.08, from: "center" },
          },
          "-=0.4"
        )
        .from(".founder-badge", { autoAlpha: 0, scale: 0.6, duration: 0.5 }, "-=0.2")
        .from(".about-hero-eyebrow", { autoAlpha: 0, y: 14, duration: 0.6 }, "-=0.8")
        .from(".about-hero-title", { autoAlpha: 0, y: 26, duration: 0.85 }, "-=0.5")
        .from(
          ".about-hero-body",
          { autoAlpha: 0, y: 18, duration: 0.7, stagger: 0.12 },
          "-=0.55"
        );

      // Living gallery — gentle perpetual drift once everything has settled.
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (!reduceMotion) {
        gsap.to(".founder-card", {
          y: "-=8",
          duration: 2.8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1.6,
          stagger: { each: 0.3, from: "random" },
        });
      }
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="pt-28 md:pt-36">
      <Container className="grid grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-20">
        {/* Designer surrounded by her work */}
        <div className="order-1 flex justify-center">
          <div className="relative aspect-square w-full max-w-[26rem]">
            {/* Soft pink ground */}
            <div className="founder-backdrop absolute inset-[8%] rounded-full bg-pink-tint" />
            <div
              aria-hidden
              className="founder-backdrop pointer-events-none absolute inset-0 rounded-full bg-accent/10 blur-2xl"
            />

            {/* Curved artist credit, arcing around the circle */}
            <svg
              aria-hidden
              viewBox="0 0 240 240"
              className="founder-arc absolute inset-0 h-full w-full text-accent"
            >
              <defs>
                <path
                  id="founder-arc-path"
                  d="M 36 184 A 96 96 0 1 1 204 184"
                  fill="none"
                />
              </defs>
              <text
                className="fill-current"
                fontSize="11"
                fontWeight="600"
                letterSpacing="4"
              >
                <textPath href="#founder-arc-path" startOffset="50%" textAnchor="middle">
                  BIDEMI ODUSI — FABRIC ARTIST
                </textPath>
              </text>
            </svg>

            {/* Centre portrait */}
            <div className="founder-portrait absolute left-1/2 top-1/2 h-[52%] w-[52%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full ring-4 ring-accent ring-offset-4 ring-offset-background">
              <Image
                src="/assets/bidemi-adoness.jpeg"
                alt="Bidemi Odusi, founder and creative director of Adoness"
                fill
                priority
                sizes="(max-width: 768px) 13rem, 16rem"
                className="object-cover"
              />
            </div>

            {/* Orbiting work photos */}
            {ORBIT.map((piece) => (
              <div
                key={piece.src}
                className={`founder-card absolute overflow-hidden rounded-xl bg-surface p-1.5 shadow-[0_18px_40px_-18px_rgba(17,17,17,0.45)] ${piece.className}`}
              >
                <div className="relative h-full w-full overflow-hidden rounded-lg">
                  <Image
                    src={piece.src}
                    alt={piece.alt}
                    fill
                    sizes="9rem"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}

            {/* Tagline badge */}
            <div className="founder-badge absolute -left-1 bottom-[14%] flex h-24 w-24 flex-col items-center justify-center rounded-full border border-accent/30 bg-surface text-center shadow-[0_14px_30px_-14px_rgba(255,22,148,0.5)] md:h-28 md:w-28">
              <span className="text-[10px] leading-tight text-foreground/70">
                …making luxury
              </span>
              <span className="text-[10px] leading-tight text-foreground/70">
                fabric-art
              </span>
              <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">
                statements
              </span>
            </div>
          </div>
        </div>

        <div className="order-2 flex flex-col gap-6 md:gap-8">
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