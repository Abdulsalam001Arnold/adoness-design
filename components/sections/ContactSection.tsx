"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactElement } from "react";
import gsap from "gsap";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

interface ContactChannel {
  label: string;
  value: string;
  href: string;
}

const CHANNELS: readonly ContactChannel[] = [
  {
    label: "Instagram",
    value: "@adoness_designs",
    href: "https://instagram.com/adoness_designs",
  },
  {
    label: "Email",
    value: "hello@adonessdesigns.com",
    href: "mailto:hello@adonessdesigns.com",
  },
  {
    label: "Studio",
    value: "Lagos, Nigeria",
    href: "#",
  },
] as const;

export function ContactSection(): ReactElement {
  const rootRef = useRef<HTMLElement>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".contact-eyebrow", { autoAlpha: 0, y: 14, duration: 0.6 })
        .from(".contact-title", { autoAlpha: 0, y: 26, duration: 0.85 }, "-=0.3")
        .from(".contact-body", { autoAlpha: 0, y: 18, duration: 0.7 }, "-=0.5")
        .from(
          ".contact-channel",
          { autoAlpha: 0, x: -20, duration: 0.55, stagger: 0.1 },
          "-=0.45"
        )
        .from(".contact-form", { autoAlpha: 0, y: 24, duration: 0.8 }, "-=0.6");
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    if (submitting || !name.trim() || !email.trim() || !message.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });
      if (!response.ok) {
        const data: unknown = await response.json().catch(() => null);
        const messageText =
          data &&
          typeof data === "object" &&
          typeof (data as { error?: unknown }).error === "string"
            ? (data as { error: string }).error
            : "Unable to send your message right now. Please try again.";
        throw new Error(messageText);
      }
      setSubmitted(true);
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Unable to send your message right now. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section ref={rootRef} className="pt-32 pb-24 md:pt-40 md:pb-32">
      <Container className="grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-20">
        <div className="flex flex-col">
          <span className="contact-eyebrow text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
            Get in Touch
          </span>
          <h1 className="contact-title mt-4 font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl md:text-[56px] md:leading-[1.05]">
            Let&rsquo;s create something beautiful.
          </h1>
          <p className="contact-body mt-6 max-w-md text-base leading-relaxed text-foreground/70 md:text-lg">
            For bespoke fabric-art commissions, collaborations, or enquiries,
            reach out — Bidemi and the Adoness team would love to hear from you.
          </p>

          <ul className="mt-12 flex flex-col gap-6">
            {CHANNELS.map((channel) => (
              <li key={channel.label} className="contact-channel">
                <a
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    channel.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group flex flex-col"
                >
                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-foreground/45">
                    {channel.label}
                  </span>
                  <span className="mt-1 font-serif text-xl text-foreground transition-colors duration-300 group-hover:text-accent md:text-2xl">
                    {channel.value}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="contact-form rounded-3xl bg-surface p-8 shadow-[0_30px_70px_-30px_rgba(17,17,17,0.3)] md:p-10">
          {submitted ? (
            <div
              className="flex h-full min-h-[320px] flex-col items-center justify-center text-center"
              role="status"
            >
              <span className="font-serif text-3xl text-accent">Thank you</span>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-foreground/70">
                Your message has been received. We&rsquo;ll be in touch shortly.
              </p>
            </div>
          ) : (
            <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
              <Field
                id="contact-name"
                label="Name"
                type="text"
                value={name}
                onChange={setName}
                autoComplete="name"
                disabled={submitting}
              />
              <Field
                id="contact-email"
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
                autoComplete="email"
                disabled={submitting}
              />
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-message"
                  className="text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground/55"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  disabled={submitting}
                  className="resize-none rounded-2xl border border-muted/60 bg-background px-5 py-4 text-sm text-foreground placeholder:text-foreground/40 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60"
                  placeholder="Tell us about your project…"
                />
              </div>
              {error ? (
                <p
                  role="alert"
                  className="text-[11px] font-semibold uppercase tracking-[0.15em] text-accent"
                >
                  {error}
                </p>
              ) : null}
              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                aria-busy={submitting}
                className="w-full"
              >
                {submitting ? "Sending…" : "Send Message"}
              </Button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}

interface FieldProps {
  id: string;
  label: string;
  type: "text" | "email";
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  disabled?: boolean;
}

function Field({
  id,
  label,
  type,
  value,
  onChange,
  autoComplete,
  disabled,
}: FieldProps): ReactElement {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground/55"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        required
        autoComplete={autoComplete}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        className="rounded-full border border-muted/60 bg-background px-5 py-3.5 text-sm text-foreground placeholder:text-foreground/40 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60"
      />
    </div>
  );
}
