"use client";

import { useEffect, useRef } from "react";
import type { ReactElement } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import type { Collection, CollectionGalleryImage } from "@/lib/collections";

gsap.registerPlugin(ScrollTrigger);

interface CollectionGalleryProps {
  collection: Collection;
}

interface PositionedImage extends CollectionGalleryImage {
  desktopColSpan: string;
  desktopOffset: string;
}

const DESKTOP_LAYOUT: readonly { colSpan: string; offset: string }[] = [
  { colSpan: "lg:col-span-7", offset: "" },
  { colSpan: "lg:col-span-5", offset: "lg:mt-24" },
  { colSpan: "lg:col-span-4", offset: "lg:-mt-12" },
  { colSpan: "lg:col-span-8", offset: "" },
  { colSpan: "lg:col-span-6", offset: "lg:mt-16" },
  { colSpan: "lg:col-span-6", offset: "" },
];

export function CollectionGallery({
  collection,
}: CollectionGalleryProps): ReactElement {
  const rootRef = useRef<HTMLElement>(null);

  const positioned: PositionedImage[] = collection.gallery.map(
    (image, index) => {
      const layout = DESKTOP_LAYOUT[index % DESKTOP_LAYOUT.length];
      return {
        ...image,
        desktopColSpan: layout.colSpan,
        desktopOffset: layout.offset,
      };
    }
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gallery-eyebrow", {
        autoAlpha: 0,
        y: 14,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".gallery-eyebrow",
          start: "top 90%",
          once: true,
        },
      });
      gsap.from(".gallery-heading", {
        autoAlpha: 0,
        y: 22,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".gallery-heading",
          start: "top 88%",
          once: true,
        },
      });
      gsap.from(".gallery-story", {
        autoAlpha: 0,
        y: 18,
        duration: 0.75,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".gallery-story",
          start: "top 85%",
          once: true,
        },
      });
      gsap.from(".gallery-image", {
        autoAlpha: 0,
        y: 60,
        scale: 0.97,
        duration: 1,
        stagger: { each: 0.12, from: "start" },
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".gallery-grid",
          start: "top 80%",
          once: true,
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, [collection.slug]);

  return (
    <section ref={rootRef} className="py-20 md:py-28">
      <Container>
        <div className="mb-14 grid grid-cols-1 gap-8 md:mb-20 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <span className="gallery-eyebrow block text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
              The Story
            </span>
            <h2 className="gallery-heading mt-4 font-serif text-3xl font-semibold text-foreground md:text-4xl">
              Inside the collection
            </h2>
          </div>
          <div className="flex flex-col gap-5 md:col-span-7">
            {collection.story.map((paragraph, index) => (
              <p
                key={index}
                className="gallery-story text-base leading-relaxed text-foreground/70 md:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="gallery-grid grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-12 lg:items-start lg:gap-x-8 lg:gap-y-16">
          {positioned.map((image, index) => (
            <figure
              key={`${collection.slug}-${index}`}
              className={`gallery-image group ${image.desktopColSpan} ${image.desktopOffset}`.trim()}
            >
              <div
                className={`relative overflow-hidden rounded-2xl bg-surface shadow-[0_22px_50px_-25px_rgba(17,17,17,0.3)] ${image.aspect}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 60vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                />
              </div>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
