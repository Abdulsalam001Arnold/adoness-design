"use client";

import { useEffect, useRef } from "react";
import type { ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

interface ScatterProduct {
  src: string;
  position: string;
  rotation: string;
  hideOnMobile?: boolean;
}

const PRODUCTS: readonly ScatterProduct[] = [
  {
    src: "/posters/098c90a0e5d7b19182c3763239c3cea5.webp",
    position: "left-0 top-2 md:left-[2%]",
    rotation: "-rotate-6",
  },
  {
    src: "/posters/88b2af5ac586485c9f180b895cd3971f.webp",
    position: "right-0 top-0 md:right-[3%]",
    rotation: "rotate-6",
  },
  {
    src: "/posters/8dd536af22f54542dcfd855139b7526f.webp",
    position: "bottom-0 left-[8%] md:left-[12%]",
    rotation: "rotate-5",
  },
  {
    src: "/posters/946fc811ab68b1fcc2036cc849f4e5bd.webp",
    position: "bottom-2 right-[6%] md:right-[12%]",
    rotation: "-rotate-6",
  },
  {
    src: "/posters/ad8001af7d37c4120949783e8e5d5fe2.webp",
    position: "left-0 top-1/2 -translate-y-1/2",
    rotation: "-rotate-3",
    hideOnMobile: true,
  },
  {
    src: "/posters/cb248c3ad76cf611b623f247da068bc8.webp",
    position: "right-0 top-1/2 -translate-y-1/2",
    rotation: "rotate-4",
    hideOnMobile: true,
  },
] as const;

export function Hero(): ReactElement {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-eyebrow", { autoAlpha: 0, y: 12, duration: 0.6 })
        .from(
          ".hero-line",
          { autoAlpha: 0, y: 40, duration: 0.8, stagger: 0.15 },
          "-=0.2"
        )
        .from(".hero-subtext", { autoAlpha: 0, y: 18, duration: 0.7 }, "-=0.4")
        .from(
          ".hero-cta",
          { autoAlpha: 0, scale: 0.85, duration: 0.6 },
          "-=0.35"
        )
        .from(
          ".hero-portrait",
          { autoAlpha: 0, scale: 0.9, duration: 0.7 },
          "-=0.9"
        )
        .from(
          ".hero-product",
          { autoAlpha: 0, scale: 0.8, y: 18, duration: 0.6, stagger: 0.1 },
          "-=0.4"
        )
        .from(
          ".hero-ankara",
          { autoAlpha: 0, scale: 0.6, duration: 0.5, stagger: 0.08 },
          "-=0.3"
        );

      // Living gallery — gentle perpetual drift once the pieces have settled.
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (!reduceMotion) {
        gsap.to(".hero-product", {
          y: "-=10",
          duration: 2.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 2,
          stagger: { each: 0.35, from: "random" },
        });
        gsap.to(".hero-ankara", {
          rotation: "+=18",
          scale: 1.12,
          transformOrigin: "center center",
          duration: 3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 2,
          stagger: 0.2,
        });
      }
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28"
    >
      <div className="ankara-pattern pointer-events-none absolute inset-0 -z-10 opacity-[0.07]" />

      <Container className="flex flex-col items-center text-center">
        <span className="hero-eyebrow mb-6 rounded-full bg-accent/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">
          Adoness — Fabric-Art Gallery
        </span>

        <h1 className="max-w-4xl font-serif text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl md:text-6xl lg:text-[78px]">
          <span className="hero-line block">Luxury fabric-art</span>
          <span className="hero-line block">
            statements, <span className="text-accent">Threads Untamed.</span>
          </span>
          <span className="hero-line block">Art Unleashed.</span>
        </h1>

        <p className="hero-subtext mt-8 max-w-xl text-base leading-relaxed text-foreground/70 md:text-lg">
          Premium afrocentric pieces where handcrafted fabric artistry meets culture and elegance to produce masterpieces.
        </p>

        <div className="hero-cta mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/collections">
            <Button size="lg">Explore Collections</Button>
          </Link>
          <Link href="/about">
            <Button size="lg" variant="outline">
              Our Story
            </Button>
          </Link>
        </div>

        {/* Designer surrounded by her work */}
        <div className="relative mt-20 h-[420px] w-full max-w-5xl md:mt-24 md:h-[560px]">
          <AnkaraAccents />

          <div className="hero-portrait absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full ring-4 ring-accent ring-offset-4 ring-offset-background md:h-80 md:w-80">
            <Image
              src="/assets/bidemi-adoness.jpeg"
              alt="Bidemi Odusi, founder of Adoness"
              fill
              priority
              sizes="(max-width: 768px) 13rem, 20rem"
              className="object-cover"
            />
          </div>

          {PRODUCTS.map((product) => (
            <div
              key={product.src}
              className={`hero-product absolute ${product.position} ${
                product.hideOnMobile ? "hidden lg:block" : ""
              }`}
            >
              <div
                className={`rounded-xl bg-surface p-2 pb-4 shadow-[0_18px_40px_-18px_rgba(17,17,17,0.4)] ${product.rotation}`}
              >
                <div className="relative h-28 w-24 overflow-hidden rounded-md md:h-40 md:w-32">
                  <Image
                    src={product.src}
                    alt="Adoness fabric-art piece"
                    fill
                    sizes="(max-width: 768px) 6rem, 8rem"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function AnkaraAccents(): ReactElement {
  return (
    <>
      <svg
        className="hero-ankara absolute left-[14%] top-[6%] h-6 w-6 text-ankara-teal md:h-9 md:w-9"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        <path d="M12 0l12 12-12 12L0 12z" />
      </svg>
      <svg
        className="hero-ankara absolute right-[16%] top-[12%] h-5 w-5 text-ankara-orange md:h-7 md:w-7"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        <path d="M12 2l10 18H2z" />
      </svg>
      <svg
        className="hero-ankara absolute bottom-[10%] left-[24%] h-4 w-4 text-accent md:h-6 md:w-6"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        <circle cx="12" cy="12" r="12" />
      </svg>
      <svg
        className="hero-ankara absolute bottom-[14%] right-[22%] h-6 w-6 text-ankara-teal md:h-8 md:w-8"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        <path d="M12 0l12 12-12 12L0 12z" />
      </svg>
    </>
  );
}
