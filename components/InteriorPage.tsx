"use client";

import { gsap } from "gsap";
import { useEffect, useRef, type ReactNode } from "react";
import { CtaLink } from "./Buttons";
import {
  prefersReducedMotion,
  signalTravelPageReady,
  travelDestination,
  waitForPageEnter,
} from "@/lib/motion";

export function InteriorHero({
  kicker,
  title,
  lede,
  image,
  action,
}: {
  kicker?: string;
  title: ReactNode;
  lede?: string;
  image: string;
  action?: { href: string; label: string };
}) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const copy = el.querySelectorAll("[data-hero-copy]");
    const cta = el.querySelector("[data-hero-cta]");

    if (!prefersReducedMotion()) {
      if (copy.length) gsap.set(copy, { y: 20, autoAlpha: 0 });
      if (cta) gsap.set(cta, { y: 16, autoAlpha: 0 });
    }

    let ctx: gsap.Context | undefined;
    let cancelled = false;

    if (travelDestination()) {
      requestAnimationFrame(() => signalTravelPageReady());
    }

    waitForPageEnter().then(() => {
      if (cancelled || !root.current) return;
      if (prefersReducedMotion()) {
        gsap.set([...copy, cta].filter(Boolean), { clearProps: "all" });
        return;
      }

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        if (copy.length || cta) {
          tl.to(
            [...copy, cta].filter(Boolean),
            { y: 0, autoAlpha: 1, duration: 0.85, stagger: 0.08 },
            0.12,
          );
        }
      }, el);
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      className="relative grid min-h-[85vh] w-full pb-8 pt-[7.5rem] md:pt-[10.5rem]"
    >
      <div className="relative z-0 mx-auto h-full w-full max-w-[1680px] px-6 md:px-10">
        <div className="relative flex min-h-[65vh] flex-col justify-end overflow-hidden rounded-1_5xl px-6 py-16 md:min-h-[70vh] md:px-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={typeof title === "string" ? title : ""}
            className="ken-burns absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/45 to-charcoal/10" />
          <div className="media-overlay-soft absolute inset-0" />
          <div className="relative max-w-xl">
            {kicker ? (
              <p
                data-hero-copy
                className="mb-5 flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-white/80"
              >
                <span className="h-px w-8 bg-primary" aria-hidden />
                {kicker}
              </p>
            ) : null}
            <h1
              data-hero-copy
              className="mb-5 font-headline-sans text-[3.25rem] font-bold leading-[0.9] tracking-[-0.045em] text-white md:text-6xl xl:text-7xl"
            >
              {title}
            </h1>
            {lede ? (
              <p
                data-hero-copy
                className="mb-8 max-w-md font-headline text-xl italic leading-snug text-white/90 md:text-2xl"
              >
                {lede}
              </p>
            ) : null}
            {action ? (
              <div data-hero-cta>
                <CtaLink href={action.href}>{action.label}</CtaLink>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed tracking-wide text-charcoal">
      {children}
    </div>
  );
}
