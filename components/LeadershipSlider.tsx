"use client";

import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { CtaLink } from "./Buttons";
import { IconArrow } from "./Icons";
import { Line, Reveal } from "./Reveal";
import { leaders } from "@/lib/content";
import { prefersReducedMotion } from "@/lib/motion";

export function LeadershipSlider() {
  const [index, setIndex] = useState(0);
  const leader = leaders[index];
  const last = leaders.length - 1;
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = panel.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-leader-copy], [data-leader-photo]",
        { y: 18, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.08, ease: "power3.out" },
      );
    }, el);

    return () => ctx.revert();
  }, [index]);

  return (
    <section className="fluid-container overflow-hidden 2xl:overflow-visible">
      <div className="rounded-2_5xl bg-tan px-6 pt-12 xl:px-12 2xl:py-0">
        <Reveal>
          <h2 className="display-hero -translate-y-0 text-6xl leading-none text-black lg:text-7xl 2xl:-translate-x-12 2xl:-translate-y-10 2xl:text-9xl">
            <Line className="block">Our Leadership</Line>
          </h2>
        </Reveal>

        <div className="flex justify-center pt-8 md:hidden">
          <Controls
            index={index}
            last={last}
            onPrev={() => setIndex((i) => Math.max(0, i - 1))}
            onNext={() => setIndex((i) => Math.min(last, i + 1))}
          />
        </div>

        <div
          ref={panel}
          className="flex flex-col-reverse items-stretch gap-4 py-8 lg:flex-row lg:items-center"
        >
          <div data-leader-copy className="w-full lg:w-1/2 lg:px-16">
            <p className="mb-3 font-mono text-xs uppercase leading-none text-charcoal/50">
              {leader.role}
            </p>
            <p className="mb-4 font-headline-sans text-2xl font-bold tracking-tight leading-tighter lg:text-3xl">
              {leader.name}
            </p>
            <div className="prose mb-8 max-w-none pb-4 text-lg leading-relaxed text-charcoal">
              {leader.body}
            </div>
            <CtaLink href="/leadership" tone="charcoal" shape="soft" className="mb-4">
              See Our Leadership
            </CtaLink>
          </div>
          <div
            data-leader-photo
            className="relative aspect-video w-full overflow-hidden rounded-lg lg:w-1/2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={leader.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="hidden pb-4 md:flex md:justify-center lg:justify-end">
          <Controls
            index={index}
            last={last}
            onPrev={() => setIndex((i) => Math.max(0, i - 1))}
            onNext={() => setIndex((i) => Math.min(last, i + 1))}
          />
        </div>
      </div>
    </section>
  );
}

function Controls({
  index,
  last,
  onPrev,
  onNext,
}: {
  index: number;
  last: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex items-center gap-8">
      <button
        type="button"
        onClick={onPrev}
        disabled={index === 0}
        className={`w-10 shrink-0 transition ${
          index === 0 ? "cursor-default text-gray-400" : "text-charcoal hover:scale-110"
        }`}
        title="Previous"
      >
        <IconArrow dir="left" />
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={index === last}
        className={`w-10 shrink-0 transition ${
          index === last ? "cursor-default text-gray-400" : "text-charcoal hover:scale-110"
        }`}
        title="Next"
      >
        <IconArrow dir="right" />
      </button>
    </div>
  );
}
