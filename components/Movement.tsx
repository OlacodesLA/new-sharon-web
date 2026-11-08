"use client";

import Link from "next/link";
import { Line, Reveal } from "./Reveal";
import { movement } from "@/lib/content";

export function Movement() {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="fluid-container">
        <Reveal className="relative pb-10">
          <h2 className="display-section info-slider-headline mb-4 text-5xl lg:text-6xl xl:text-[5rem] tracking-[-0.1rem] xl:tracking-[-0.2rem]">
            <Line className="block">
              Around <span>the Sharon</span> <i>Family</i>
            </Line>
          </h2>
        </Reveal>
      </div>
      <Reveal stagger={0.08} className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 sm:px-8 lg:px-12">
        {movement.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            data-reveal-item
            className="group relative block aspect-square w-[78vw] shrink-0 snap-start overflow-hidden rounded-xl shadow-md sm:w-[46vw] lg:w-[28vw] xl:w-[22vw]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={card.image}
              alt={card.title}
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/25" />
            <span className="absolute right-4 bottom-4 font-headline-sans text-lg font-bold text-white">
              {card.title}
            </span>
          </Link>
        ))}
      </Reveal>
    </div>
  );
}
