"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, type ReactNode } from "react";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export function Reveal({
  children,
  className = "",
  y = 40,
  delay = 0,
  stagger,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const lines = el.querySelectorAll(".line-inner");
    const items = el.querySelectorAll("[data-reveal-item]");
    const targets = lines.length
      ? lines
      : items.length
        ? items
        : stagger
          ? el.children
          : el;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { y: lines.length ? "110%" : y, autoAlpha: lines.length ? 1 : 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.95,
          delay,
          stagger: stagger ?? (lines.length || items.length ? 0.08 : 0),
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 84%",
            once: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay, stagger, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function Line({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`line-mask ${className}`}>
      <span className="line-inner">{children}</span>
    </span>
  );
}

export function ParallaxImage({
  src,
  alt = "",
  className = "",
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !wrap.current || !img.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        img.current,
        { yPercent: -8, scale: 1.12 },
        {
          yPercent: 8,
          scale: 1.18,
          ease: "none",
          scrollTrigger: {
            trigger: wrap.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.1,
          },
        },
      );
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrap} className={`overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={img}
        src={src}
        alt={alt}
        className="h-full w-full object-cover will-change-transform"
      />
    </div>
  );
}

export function ImageReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const image = el.querySelector("img");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 84%",
          once: true,
        },
      });

      tl.fromTo(
        el,
        { clipPath: "inset(18% 18% 18% 18%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.15, ease: "power4.out" },
      );

      if (image) {
        tl.fromTo(
          image,
          { scale: 1.12 },
          { scale: 1, duration: 1.25, ease: "power4.out" },
          0,
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
