"use client";

import { FormEvent, useState } from "react";
import { CtaButton } from "./Buttons";
import { Reveal } from "./Reveal";

const labelClass =
  "mb-2 block font-mono text-[0.65rem] uppercase tracking-[0.18em] text-charcoal/50";

export function Updates() {
  const [done, setDone] = useState(false);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDone(true);
  }

  return (
    <section className="fluid-container">
      <Reveal>
        <div className="overflow-hidden rounded-1_5xl bg-tan">
          <div className="grid lg:grid-cols-12">
            <div className="relative min-h-72 lg:col-span-5 lg:min-h-[36rem]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/congregation.jpg"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-center px-6 py-12 md:px-12 lg:col-span-7 lg:py-16 xl:px-16">
              <p className={labelClass}>From the house</p>
              <h2 className="display-section mt-3 text-5xl lg:text-6xl xl:text-[5rem]">
                Stay with <i>Sharon</i>
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-snug tracking-wide text-charcoal">
                Gatherings, the Word, and the work of this house — written when
                there is something to tell.
              </p>

              {done ? (
                <p className="mt-12 font-headline-sans text-2xl font-bold tracking-tight">
                  You are on the list. We will write when the house has news.
                </p>
              ) : (
                <form onSubmit={submit} className="mt-12 max-w-xl">
                  <div className="grid gap-8 sm:grid-cols-2">
                    <label>
                      <span className={labelClass}>First name</span>
                      <input
                        className="footer-field"
                        name="first"
                        autoComplete="given-name"
                        required
                        placeholder="First name"
                      />
                    </label>
                    <label>
                      <span className={labelClass}>Last name</span>
                      <input
                        className="footer-field"
                        name="last"
                        autoComplete="family-name"
                        required
                        placeholder="Last name"
                      />
                    </label>
                  </div>
                  <label className="mt-8 block">
                    <span className={labelClass}>Email</span>
                    <input
                      className="footer-field"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="you@email.com"
                    />
                  </label>
                  <div className="mt-10">
                    <CtaButton>Sign up</CtaButton>
                  </div>
                  <p className="mt-6 max-w-md text-sm leading-relaxed text-charcoal/60">
                    By signing up you agree to hear from Sharon Parish about
                    gatherings, the Word, and the work of this house.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
