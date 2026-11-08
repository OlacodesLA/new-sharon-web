"use client";

import { CtaLink } from "./Buttons";
import { Line, ParallaxImage, Reveal } from "./Reveal";

export function GivingBlock() {
  return (
    <section className="fluid-container relative">
      <div className="relative flex flex-col justify-center gap-16 py-20 lg:flex-row">
        <ParallaxImage
          src="/images/hands.jpg"
          className="relative h-[27rem] w-full rounded-xl lg:h-[47.6rem] lg:w-2/5"
        />
        <Reveal className="w-full lg:w-[40%] lg:py-20">
          <h2 className="display-hero text-6xl leading-none lg:text-8xl xl:text-10xl">
            <Line className="block">Giving</Line>
          </h2>
          <div className="mb-14 mt-8 space-y-6 text-lg leading-snug tracking-wide text-charcoal">
            <p>
              We believe Jesus is a giver and not a taker. He has given us life
              and breath, and by His death and resurrection He defeated the sin
              that would rob us of both.
            </p>
            <p>
              Giving is worship — a response to the grace of God, and a way this
              house keeps feeding the sheep, raising children, and sending the
              gospel from Ikorodu to the nations.
            </p>
          </div>
          <CtaLink href="/give" className="w-full">
            Give Now
          </CtaLink>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <CtaLink href="/give#options" shape="soft" className="flex-1">
              Additional Giving Options
            </CtaLink>
            <CtaLink href="/give#returning" tone="ghost" shape="soft" className="flex-1">
              Returning Givers
            </CtaLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
