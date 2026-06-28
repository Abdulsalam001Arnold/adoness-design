import Link from "next/link";
import Image from "next/image";
import type { ReactElement } from "react";

interface FooterLink {
  label: string;
  href: string;
}

const FOOTER_LINKS: readonly FooterLink[] = [
  { label: "Collections", href: "/collections" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export function Footer(): ReactElement {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-muted/40 bg-background">
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col items-center px-6 py-20 text-center sm:px-10">
        <Image
          src="/logo.png"
          alt="Adoness"
          width={150}
          height={64}
          className="h-12 w-auto md:h-14"
        />

        <p className="mt-6 max-w-md font-serif text-base italic text-foreground/70 md:text-lg">
          …making luxury fabric-art statements
        </p>

        <ul className="mt-10 flex flex-wrap justify-center gap-6 sm:gap-8">
          {FOOTER_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/70 transition-colors duration-300 hover:text-accent"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex items-center gap-5">
          <SocialLink
            href="https://instagram.com/adoness_designs"
            label="Adoness on Instagram"
          >
            <InstagramIcon />
          </SocialLink>
        </div>

        <p className="mt-12 text-[11px] uppercase tracking-[0.2em] text-foreground/50">
          © {year} Adoness Design. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactElement;
}): ReactElement {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-foreground/70 transition-all duration-300 hover:rotate-[8deg] hover:text-accent"
    >
      {children}
    </a>
  );
}

function InstagramIcon(): ReactElement {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
    </svg>
  );
}
