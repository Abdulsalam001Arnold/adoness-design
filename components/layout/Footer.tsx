import Link from "next/link";
import type { ReactElement } from "react";

interface FooterLink {
  label: string;
  href: string;
}

const FOOTER_LINKS: readonly FooterLink[] = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Shipping & Returns", href: "#" },
  { label: "Contact", href: "/contact" },
] as const;

export function Footer(): ReactElement {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-muted/40 bg-background">
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col items-center px-6 sm:px-10 py-20 text-center">
        <span className="font-serif text-2xl md:text-3xl font-bold tracking-[0.2em] text-foreground">
          ADONESS
        </span>

        <ul className="mt-10 flex flex-wrap justify-center gap-6 sm:gap-8">
          {FOOTER_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/70 hover:text-accent transition-colors duration-300"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-12 text-[11px] uppercase tracking-[0.2em] text-foreground/50">
          © {year} Adoness Design. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
