"use client";

import { CtaLink } from "./Buttons";
import { Line, ParallaxImage, Reveal } from "./Reveal";

export function EquipBanner() {
  return (
    <section className="fluid-container">
      <div className="relative flex h-80 w-full items-end overflow-hidden rounded-1_5xl p-8 md:h-auto md:items-center md:p-24">
        <ParallaxImage
          src="/images/texture.jpg"
          className="absolute inset-0 h-full w-full"
        />
        <div className="media-overlay absolute inset-0" />
        <Reveal className="relative hidden md:block">
          <p className="mb-8 font-headline text-lg tracking-tight leading-none text-white/75 lg:text-xl">
            Knowing God Above All Else
          </p>
          <h2 className="display-hero mb-3 text-5xl text-white lg:text-6xl xl:text-[5rem]">
            <Line className="block">Daily Word</Line>
          </h2>
          <p className="mb-10 hidden max-w-md text-lg leading-snug tracking-wide text-white md:block">
            The Bible Teachers’ Desk exists so people in our House — and around
            the globe — can know Jesus and draw closer to Him each day through
            the truth of His Word.
          </p>
          <CtaLink href="/live">Watch Live</CtaLink>
        </Reveal>
      </div>
      <Reveal className="relative pt-3 md:hidden">
        <p className="mb-2 font-headline text-lg tracking-tight text-charcoal">
          Knowing God Above All Else
        </p>
        <h2 className="mb-4 font-headline-sans text-4xl font-bold tracking-tight leading-negative">
          Daily Word
        </h2>
        <p className="mb-3 max-w-md text-lg leading-snug tracking-wide text-charcoal">
          The Bible Teachers’ Desk exists so people in our House — and around
          the globe — can know Jesus and draw closer to Him each day through
          the truth of His Word.
        </p>
        <CtaLink href="/live">Watch Live</CtaLink>
      </Reveal>
    </section>
  );
}
