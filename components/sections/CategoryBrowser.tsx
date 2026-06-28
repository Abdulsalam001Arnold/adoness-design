"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactElement } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Container } from "@/components/ui/Container";
import {
  CATEGORY_OPTIONS,
  PRODUCTS,
  SIZE_OPTIONS,
  STYLE_OPTIONS,
  filterProducts,
  formatPrice,
} from "@/lib/category";
import type {
  Product,
  ProductCategory,
  ProductSize,
  ProductStyle,
} from "@/lib/category";

type CategoryTab = ProductCategory | "All";

const CATEGORY_TABS: readonly CategoryTab[] = [
  "All",
  ...CATEGORY_OPTIONS,
] as const;

export function CategoryBrowser(): ReactElement {
  const [category, setCategory] = useState<CategoryTab>("All");
  const [sizes, setSizes] = useState<ProductSize[]>([]);
  const [styles, setStyles] = useState<ProductStyle[]>([]);
  const [refineOpen, setRefineOpen] = useState<boolean>(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo<readonly Product[]>(
    () => filterProducts(PRODUCTS, { category, sizes, styles }),
    [category, sizes, styles]
  );

  const activeCount = sizes.length + styles.length;
  const hasAnyFilter =
    category !== "All" || sizes.length > 0 || styles.length > 0;

  function toggleSize(size: ProductSize): void {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  }

  function toggleStyle(style: ProductStyle): void {
    setStyles((prev) =>
      prev.includes(style)
        ? prev.filter((s) => s !== style)
        : [...prev, style]
    );
  }

  function resetFilters(): void {
    setCategory("All");
    setSizes([]);
    setStyles([]);
  }

  // Re-run grid fade whenever the filtered list changes.
  // Pure opacity fade — no transforms, no autoAlpha (avoids visibility lock).
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = Array.from(
      grid.querySelectorAll<HTMLElement>(".product-card")
    );
    if (cards.length === 0) return;
    gsap.killTweensOf(cards);
    gsap.fromTo(
      cards,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.05,
      }
    );
    return () => {
      gsap.killTweensOf(cards);
      // Guarantee cards are visible if the effect is interrupted mid-tween.
      gsap.set(cards, { opacity: 1 });
    };
  }, [filtered]);

  return (
    <div ref={rootRef} className="mt-16 md:mt-20">
      <Container>
        {/* Category tab row */}
        <div className="border-b border-foreground/15 pb-5">
          <div
            role="tablist"
            aria-label="Product categories"
            className="-mx-2 flex items-center gap-2 overflow-x-auto px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-8"
          >
            {CATEGORY_TABS.map((tab) => {
              const isActive = category === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setCategory(tab)}
                  className={`relative shrink-0 whitespace-nowrap pb-3 pt-1 text-[11px] font-semibold uppercase tracking-[0.25em] transition-colors duration-300 ${
                    isActive
                      ? "text-accent"
                      : "text-foreground/45 hover:text-foreground"
                  }`}
                >
                  <span>{tab}</span>
                  <span
                    aria-hidden
                    className={`absolute -bottom-[21px] left-0 h-[2px] w-full origin-left bg-accent transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Refine row — desktop inline / mobile collapsible */}
        <div className="mt-6 flex items-center justify-between gap-4 md:hidden">
          <button
            type="button"
            onClick={() => setRefineOpen((v) => !v)}
            aria-expanded={refineOpen}
            className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <FilterIcon />
            Refine
            {activeCount > 0 ? (
              <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-[10px] tracking-normal text-surface">
                {activeCount}
              </span>
            ) : null}
            <Chevron open={refineOpen} />
          </button>
          {hasAnyFilter ? (
            <button
              type="button"
              onClick={resetFilters}
              className="text-[11px] font-semibold uppercase tracking-[0.25em] text-foreground/60 underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              Clear all
            </button>
          ) : null}
        </div>

        <div className={`${refineOpen ? "block" : "hidden"} md:block`}>
          <RefineRows
            sizes={sizes}
            styles={styles}
            onToggleSize={toggleSize}
            onToggleStyle={toggleStyle}
            hasAnyFilter={hasAnyFilter}
            onReset={resetFilters}
          />
        </div>

        {/* Result count + sort hint */}
        <div className="mt-8 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.25em] text-foreground/55 md:mt-10">
          <span>
            {filtered.length}{" "}
            {filtered.length === 1 ? "Piece" : "Pieces"}
          </span>
          <span className="hidden md:inline">Curated · Editorial Order</span>
        </div>

        {/* Product grid */}
        <div ref={gridRef} className="mt-8 md:mt-10">
          {filtered.length === 0 ? (
            <EmptyState onReset={resetFilters} />
          ) : (
            <div className="grid grid-cols-1 items-start gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
              {filtered.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  staggered={index % 2 === 1}
                  wide={
                    product.aspect === "aspect-[16/9]" && filtered.length > 3
                  }
                />
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

interface RefineRowsProps {
  sizes: readonly ProductSize[];
  styles: readonly ProductStyle[];
  onToggleSize: (size: ProductSize) => void;
  onToggleStyle: (style: ProductStyle) => void;
  hasAnyFilter: boolean;
  onReset: () => void;
}

function RefineRows({
  sizes,
  styles,
  onToggleSize,
  onToggleStyle,
  hasAnyFilter,
  onReset,
}: RefineRowsProps): ReactElement {
  return (
    <div className="flex flex-col gap-6 pb-2 pt-6 md:flex-row md:items-center md:gap-10 md:pb-0 md:pt-8">
      <div className="flex flex-col gap-3">
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-foreground/45">
          Size
        </span>
        <div className="flex flex-wrap gap-2">
          {SIZE_OPTIONS.map((size) => {
            const active = sizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                onClick={() => onToggleSize(size)}
                aria-pressed={active}
                className={`min-w-11 rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-200 ${
                  active
                    ? "border-accent bg-accent text-surface"
                    : "border-foreground/25 bg-background text-foreground hover:border-foreground/60"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-foreground/45">
          Style
        </span>
        <div className="flex flex-wrap gap-2">
          {STYLE_OPTIONS.map((style) => {
            const active = styles.includes(style);
            return (
              <button
                key={style}
                type="button"
                onClick={() => onToggleStyle(style)}
                aria-pressed={active}
                className={`rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-200 ${
                  active
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-foreground/25 bg-background text-foreground hover:border-foreground/60"
                }`}
              >
                {style}
              </button>
            );
          })}
        </div>
      </div>

      {hasAnyFilter ? (
        <button
          type="button"
          onClick={onReset}
          className="hidden self-end pb-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-foreground/60 underline-offset-4 transition-colors hover:text-accent hover:underline md:inline"
        >
          Clear all
        </button>
      ) : null}
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  staggered: boolean;
  wide: boolean;
}

function ProductCard({
  product,
  staggered,
  wide,
}: ProductCardProps): ReactElement {
  const desktopOffset = staggered ? "lg:mt-16" : "";
  const desktopSpan = wide ? "lg:col-span-2" : "";
  return (
    <article
      className={`product-card group cursor-pointer ${desktopOffset} ${desktopSpan}`.trim()}
    >
      <div
        className={`relative overflow-hidden rounded-2xl bg-surface shadow-[0_18px_40px_-22px_rgba(17,17,17,0.25)] transition-shadow duration-500 group-hover:shadow-[0_28px_60px_-25px_rgba(17,17,17,0.4)] ${product.aspect}`}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
        />
      </div>
      <div className="mt-5 flex items-end justify-between gap-4">
        <div>
          <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/55">
            {product.collectionLabel}
          </span>
          <h3 className="mt-2 font-serif text-xl font-semibold text-foreground md:text-2xl">
            {product.name}
          </h3>
        </div>
        <span className="text-[12px] font-semibold uppercase tracking-[0.15em] text-accent">
          {formatPrice(product.price)}
        </span>
      </div>
    </article>
  );
}

function EmptyState({ onReset }: { onReset: () => void }): ReactElement {
  return (
    <div className="flex flex-col items-center gap-6 rounded-2xl border border-foreground/10 bg-foreground/[0.02] py-20 text-center">
      <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-foreground/50">
        Nothing matches your filter
      </span>
      <p className="max-w-md text-base leading-relaxed text-foreground/70">
        Try removing a size or style — the edit refines best with one or two
        choices at a time.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="rounded-full bg-accent px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-surface transition-opacity hover:opacity-90"
      >
        Clear filters
      </button>
    </div>
  );
}

function FilterIcon(): ReactElement {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="7" y1="12" x2="17" y2="12" />
      <line x1="10" y1="18" x2="14" y2="18" />
    </svg>
  );
}

function Chevron({ open }: { open: boolean }): ReactElement {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
