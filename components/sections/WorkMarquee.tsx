import type { ReactElement } from "react";
import Image from "next/image";

const WORK_IMAGES: readonly string[] = [
  "/adoness%20and%20works/image-1.jpeg",
  "/adoness%20and%20works/image-3.jpeg",
  "/adoness%20and%20works/image-6.jpeg",
  "/adoness%20and%20works/image-2.jpeg",
  "/adoness%20and%20works/image-7.jpeg",
  "/adoness%20and%20works/image-5.jpeg",
  "/adoness%20and%20works/image-8.jpeg",
  "/adoness%20and%20works/image-4.jpeg",
] as const;

/**
 * Seamless auto-scrolling band of Bidemi's studio process photos. The track
 * is duplicated so the -50% translate loops without a seam. Pure CSS; paused
 * on hover and under prefers-reduced-motion (via `.marquee-track`).
 */
export function WorkMarquee(): ReactElement {
  const track = [...WORK_IMAGES, ...WORK_IMAGES];

  return (
    <section
      aria-label="Inside the Adoness studio"
      className="overflow-hidden py-10 md:py-16"
    >
      <div className="mb-8 text-center">
        <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
          Inside the Studio
        </span>
      </div>
      <div className="marquee-track flex w-max gap-5 [animation:marquee-x_50s_linear_infinite] hover:[animation-play-state:paused]">
        {track.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="relative h-44 w-60 shrink-0 overflow-hidden rounded-2xl bg-surface shadow-[0_18px_40px_-22px_rgba(17,17,17,0.4)] md:h-56 md:w-80"
          >
            <Image
              src={src}
              alt={
                index < WORK_IMAGES.length
                  ? "Bidemi crafting fabric art in the Adoness studio"
                  : ""
              }
              fill
              sizes="(max-width: 768px) 15rem, 20rem"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}