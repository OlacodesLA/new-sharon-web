"use client";

import { useRouter } from "next/navigation";
import { ImageReveal, Line, Reveal } from "./Reveal";
import { parishStops } from "@/lib/parishes";
import { beginLocationTravel } from "@/lib/motion";

export function CitySelect() {
  const router = useRouter();

  return (
    <section id="locations">
      <div className="fluid-container relative">
        <Reveal>
          <p className="display-section grid-cards-title text-5xl lg:text-6xl xl:text-[5rem] tracking-[-0.1rem] xl:tracking-[-0.2rem]">
            <Line className="block">
              Select a <i>Parish</i>
            </Line>
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-6 mb-8 max-w-xl text-lg leading-snug tracking-wide text-charcoal">
            Headquarter is the mother altar. Every name after it is a house of
            the same family. Choose a parish and come in.
          </p>
        </Reveal>
        <div className="grid gap-8 pt-6 sm:grid-cols-2 lg:pt-12">
          {parishStops().map((city) => (
            <button
              key={city.href}
              type="button"
              onClick={() => {
                router.prefetch(city.href);
                beginLocationTravel(city.href, city);
              }}
              className="group relative block w-full cursor-pointer text-left"
              aria-label={`Visit ${city.title}`}
            >
              <ImageReveal className="relative flex h-[32rem] flex-col overflow-hidden rounded-xl lg:h-[40rem]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={city.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                  <p className="font-headline-sans text-2xl font-bold tracking-tight text-white lg:text-3xl">
                    {city.title}
                  </p>
                  <span className="hidden rounded-full border border-white/30 bg-white/10 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm sm:inline-block">
                    Visit
                  </span>
                </div>
              </ImageReveal>
            </button>
          ))}
        </div>
      </div>

    </section>
  );
}
