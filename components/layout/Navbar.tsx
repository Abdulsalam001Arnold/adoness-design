"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import gsap from "gsap";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: readonly NavLink[] = [
  { label: "Collections", href: "/collections" },
  { label: "Category", href: "/category" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

function isActivePath(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar(): ReactElement {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const drawerRootRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".mobile-menu-backdrop", { autoAlpha: 0 });
      gsap.set(".mobile-menu-drawer", { xPercent: -100, autoAlpha: 0 });
      gsap.set(".mobile-menu-header", { autoAlpha: 0, y: -8 });
      gsap.set(".mobile-menu-link", { x: -28, autoAlpha: 0 });
      gsap.set(".mobile-menu-footer", { autoAlpha: 0, y: 16 });

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });

      tl.to(".mobile-menu-backdrop", { autoAlpha: 1, duration: 0.45 })
        .to(
          ".mobile-menu-drawer",
          { xPercent: 0, autoAlpha: 1, duration: 0.6, ease: "power4.out" },
          "<"
        )
        .to(
          ".mobile-menu-header",
          { autoAlpha: 1, y: 0, duration: 0.4 },
          "-=0.4"
        )
        .to(
          ".mobile-menu-link",
          { x: 0, autoAlpha: 1, stagger: 0.07, duration: 0.5 },
          "-=0.3"
        )
        .to(
          ".mobile-menu-footer",
          { autoAlpha: 1, y: 0, duration: 0.4 },
          "-=0.4"
        );

      tlRef.current = tl;
    }, drawerRootRef);

    return () => {
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    if (open) {
      tl.timeScale(1).play();
    } else {
      tl.timeScale(1.4).reverse();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event: KeyboardEvent): void => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-muted/30 bg-background/85 backdrop-blur-md">
        <nav className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-6 py-5 sm:px-10 md:py-6">
          <ul className="hidden flex-1 items-center gap-8 md:flex lg:gap-10">
            {NAV_LINKS.map((link) => {
              const active = isActivePath(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`group relative text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 hover:text-accent ${
                      active ? "text-accent" : "text-foreground"
                    }`}
                  >
                    {link.label}
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute -bottom-1.5 left-1/2 h-px -translate-x-1/2 bg-accent transition-all duration-300 ${
                        active ? "w-6" : "w-0 group-hover:w-4"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex flex-1 justify-start md:justify-center">
            <Link href="/" aria-label="Adoness — home" className="inline-block">
              <Image
                src="/logo.png"
                alt="Adoness"
                width={120}
                height={51}
                priority
                className="h-9 w-auto md:h-11"
              />
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-end gap-4 md:gap-6">
            <button
              type="button"
              aria-label="Search"
              className="text-foreground transition-colors duration-300 hover:text-accent"
            >
              <SearchIcon />
            </button>
            <button
              type="button"
              aria-label="Cart"
              className="text-foreground transition-colors duration-300 hover:text-accent"
            >
              <BagIcon />
            </button>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu-drawer"
              onClick={() => setOpen((value) => !value)}
              className="text-foreground transition-colors duration-300 hover:text-accent md:hidden"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>
      </header>

      <div ref={drawerRootRef} className="md:hidden">
        <button
          type="button"
          aria-label="Close menu"
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
          className="mobile-menu-backdrop invisible fixed inset-0 z-[120] cursor-default bg-foreground/45 opacity-0 backdrop-blur-sm"
        />

        <aside
          id="mobile-menu-drawer"
          aria-label="Mobile navigation"
          aria-hidden={!open}
          className="mobile-menu-drawer invisible fixed inset-y-0 left-0 z-[130] flex w-[85%] max-w-[360px] flex-col bg-background opacity-0 shadow-[0_0_60px_rgba(17,17,17,0.18)]"
        >
          <div className="flex h-full flex-col bg-background px-8 py-8">
            <div className="mobile-menu-header flex items-center justify-between">
              <Image
                src="/logo.png"
                alt="Adoness"
                width={104}
                height={44}
                className="h-8 w-auto"
              />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="text-foreground transition-colors duration-300 hover:text-accent"
              >
                <CloseIcon />
              </button>
            </div>

            <nav className="mt-16 flex-1">
              <ul className="space-y-7">
                {NAV_LINKS.map((link) => {
                  const active = isActivePath(pathname, link.href);
                  return (
                    <li key={link.href} className="mobile-menu-link">
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={`flex items-center gap-3 font-serif text-3xl font-semibold transition-colors duration-300 hover:text-accent ${
                          active ? "text-accent" : "text-foreground"
                        }`}
                      >
                        <span
                          aria-hidden
                          className={`inline-block h-px bg-accent transition-all duration-300 ${
                            active ? "w-6 opacity-100" : "w-0 opacity-0"
                          }`}
                        />
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="mobile-menu-footer">
              <p className="text-[11px] uppercase tracking-[0.25em] text-foreground/50">
                © {new Date().getFullYear()} Adoness Design
              </p>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

function SearchIcon(): ReactElement {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7.5" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function BagIcon(): ReactElement {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function MenuIcon(): ReactElement {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

function CloseIcon(): ReactElement {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
}
