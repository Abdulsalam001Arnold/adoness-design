"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactElement } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export function Newsletter(): ReactElement {
  const rootRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 85%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });
      tl.from(".newsletter-eyebrow", {
        autoAlpha: 0,
        y: 14,
        duration: 0.6,
      })
        .from(
          ".newsletter-title",
          { autoAlpha: 0, y: 22, duration: 0.9 },
          "-=0.3"
        )
        .from(
          ".newsletter-body",
          { autoAlpha: 0, y: 18, duration: 0.7 },
          "-=0.55"
        )
        .from(
          ".newsletter-form",
          { autoAlpha: 0, y: 18, duration: 0.7 },
          "-=0.5"
        );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section ref={rootRef} className="py-24 md:py-32">
      <Container className="flex flex-col items-center text-center">
        <span className="newsletter-eyebrow text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
          The Atelier
        </span>
        <h2 className="newsletter-title mt-4 max-w-2xl font-serif text-3xl font-semibold text-foreground md:text-5xl">
          Stay Inspired
        </h2>
        <p className="newsletter-body mt-6 max-w-xl text-base leading-relaxed text-foreground/70 md:text-lg">
          Subscribe to receive early access to new collections, editorial
          stories, and private events.
        </p>

        {submitted ? (
          <p
            className="newsletter-form mt-10 text-[11px] font-semibold uppercase tracking-[0.3em] text-foreground"
            role="status"
          >
            Thank you — we’ll be in touch.
          </p>
        ) : (
          <form
            className="newsletter-form mt-10 flex w-full max-w-lg flex-col gap-4 sm:flex-row"
            onSubmit={handleSubmit}
            noValidate
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              autoComplete="email"
              placeholder="YOUR EMAIL ADDRESS"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="flex-1 rounded-full border border-muted/60 bg-surface px-6 py-4 text-[12px] uppercase tracking-[0.2em] text-foreground placeholder:text-foreground/40 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
            <Button type="submit" size="md">
              Subscribe
            </Button>
          </form>
        )}
      </Container>
    </section>
  );
}
