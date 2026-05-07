import type { ReactElement } from "react";
import Image from "next/image";
import type { ArrivalItem } from "@/types/arrival";

interface ArrivalCardProps {
  item: ArrivalItem;
  variant?: "standard" | "feature";
}

function formatPrice(price: number): string {
  return `$${price.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

export function ArrivalCard({
  item,
  variant = "standard",
}: ArrivalCardProps): ReactElement {
  const isFeature = variant === "feature";
  const aspect = isFeature ? "aspect-[16/9]" : "aspect-[4/5]";

  return (
    <article className="arrival-card group">
      <div
        className={`relative overflow-hidden rounded-2xl bg-surface shadow-[0_18px_40px_-22px_rgba(17,17,17,0.25)] transition-shadow duration-500 group-hover:shadow-[0_28px_60px_-25px_rgba(17,17,17,0.4)] ${aspect}`}
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes={
            isFeature
              ? "(max-width: 1024px) 92vw, 66vw"
              : "(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"
          }
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-foreground px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-background md:left-6 md:top-6">
          New
        </span>
      </div>

      {isFeature ? (
        <div className="mt-6 flex flex-col items-start justify-between gap-4 md:mt-8 md:flex-row md:items-end">
          <div className="max-w-lg">
            <h2 className="font-serif text-2xl font-semibold uppercase tracking-[0.02em] text-foreground sm:text-3xl md:text-4xl md:normal-case md:tracking-normal">
              {item.name}
            </h2>
            {item.description ? (
              <p className="mt-3 text-sm leading-relaxed text-foreground/65 md:text-base">
                {item.description}
              </p>
            ) : null}
            <span className="mt-2 block text-[11px] font-semibold uppercase tracking-[0.25em] text-foreground/50 md:hidden">
              {item.category}
            </span>
          </div>
          <span className="font-serif text-2xl font-semibold text-foreground md:text-3xl">
            {formatPrice(item.price)}
          </span>
        </div>
      ) : (
        <div className="mt-5 flex flex-col gap-3 md:mt-6">
          <h3 className="font-serif text-xl font-semibold uppercase tracking-[0.02em] text-foreground sm:text-2xl md:text-2xl md:normal-case md:tracking-normal">
            {item.name}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/50">
              {item.category}
            </span>
            <span className="text-sm font-semibold text-foreground">
              {formatPrice(item.price)}
            </span>
          </div>
        </div>
      )}

      <button
        type="button"
        className="mt-5 w-full rounded-full bg-foreground py-3.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-background transition-colors hover:bg-accent md:hidden"
      >
        Add to Bag
      </button>
    </article>
  );
}
