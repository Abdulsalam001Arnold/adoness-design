import type { Metadata } from "next";
import type { ReactElement } from "react";
import { cookies } from "next/headers";
import { Container } from "@/components/ui/Container";
import { PostForm } from "@/components/admin/PostForm";
import { ADMIN_COOKIE, isPinValid } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Post a New Arrival — Adoness Studio",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPostPage(): Promise<ReactElement> {
  const store = await cookies();
  const cookieValue = store.get(ADMIN_COOKIE)?.value ?? null;
  const initiallyUnlocked = isPinValid(cookieValue);

  return (
    <section className="relative pt-28 pb-24 md:pt-36 md:pb-32">
      <span
        aria-hidden
        className="dot-grid pointer-events-none absolute inset-0 -z-10 opacity-20"
      />
      <Container>
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-10">
          <div className="flex flex-col items-start text-left">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
              Adoness Studio
            </span>
            <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl md:text-6xl">
              New Arrival Console
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground/70">
              A private workspace for posting new pieces to the public site.
              Submitted items appear on the New Arrivals page in real time.
            </p>
          </div>

          <PostForm initiallyUnlocked={initiallyUnlocked} />
        </div>
      </Container>
    </section>
  );
}
