"use client";

import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { CtaLink } from "./Buttons";
import { site } from "@/lib/content";
import { prefersReducedMotion, waitForPageEnter } from "@/lib/motion";

const HERO_SLIDES = [
  {
    src: "/images/hero.jpg",
    alt: "Sharon Parish altar",
    focus: "object-[center_30%]",
  },
  {
    src: "/images/home-sanctuary.jpg",
    alt: "The congregation seated inside Sharon Parish",
    focus: "object-center",
  },
  {
    src: "/images/home-gathering.jpg",
    alt: "The congregation gathered outside Sharon Parish",
    focus: "object-[center_40%]",
  },
] as const;

const SLIDE_MS = 6500;

export function HomeHero() {
  const root = useRef<HTMLElement>(null);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = window.setInterval(() => {
      setSlide((current) => (current + 1) % HERO_SLIDES.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const media = el.querySelector("[data-hero-media]");
    const lines = el.querySelectorAll(".line-inner");
    const copy = el.querySelector("[data-hero-copy]");
    const cta = el.querySelector("[data-hero-cta]");

    // Lock the starting pose immediately so nothing flashes / snaps
    if (!prefersReducedMotion()) {
      if (lines.length) gsap.set(lines, { yPercent: 115 });
      if (copy) gsap.set(copy, { y: 24, autoAlpha: 0 });
      if (cta) gsap.set(cta, { y: 16, autoAlpha: 0 });
      if (media) gsap.set(media, { scale: 1.06 });
    }

    let ctx: gsap.Context | undefined;
    let cancelled = false;

    waitForPageEnter().then(() => {
      if (cancelled || !root.current) return;
      if (prefersReducedMotion()) {
        gsap.set([lines, copy, cta, media], { clearProps: "all" });
        return;
      }

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
        });

        if (media) {
          tl.to(media, { scale: 1, duration: 1.45, ease: "power2.out" }, 0);
        }
        if (lines.length) {
          tl.to(
            lines,
            { yPercent: 0, duration: 1.05, stagger: 0.1, ease: "power4.out" },
            0.05,
          );
        }
        if (copy) {
          tl.to(
            copy,
            { y: 0, autoAlpha: 1, duration: 0.9, ease: "power3.out" },
            0.35,
          );
        }
        if (cta) {
          tl.to(
            cta,
            { y: 0, autoAlpha: 1, duration: 0.75, ease: "power3.out" },
            0.5,
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
      className="relative grid min-h-screen w-full pb-8 pt-[7.5rem] md:pt-[10.5rem]"
    >
      <div className="relative z-0 mx-auto h-full w-full max-w-[1680px] px-6 md:px-10">
        <div className="relative z-0 flex h-full min-h-[calc(100vh-8.5rem)] flex-col justify-center overflow-hidden rounded-1_5xl px-6 md:min-h-[calc(100vh-12rem)] md:px-16">
          <div
            data-hero-media
            className="absolute inset-0 overflow-hidden rounded-1_5xl bg-neutral-800 will-change-transform"
          >
            {HERO_SLIDES.map((item, index) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={item.src}
                src={item.src}
                alt={item.alt}
                aria-hidden={index === slide ? undefined : true}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${item.focus} ${
                  index === slide ? "ken-burns opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <div className="media-overlay-hero absolute inset-0" />
          </div>

          <div className="relative max-w-2xl">
            <h1 className="display-hero mb-3 text-5xl text-white lg:text-6xl xl:text-7xl">
              {site.taglineLines.map((line) => (
                <span key={line} className="line-mask block">
                  <span className="line-inner block">{line}</span>
                </span>
              ))}
            </h1>
            <p
              data-hero-copy
              className="mb-8 max-w-sm text-lg leading-snug tracking-wide text-white/90"
            >
              {site.description}
            </p>
            <div data-hero-cta className="flex flex-wrap gap-3">
              <CtaLink href="/live">Watch Live</CtaLink>
              <CtaLink href="/us" tone="ghost" shape="soft">
                Learn More
              </CtaLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
