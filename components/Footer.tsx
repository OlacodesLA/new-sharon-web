"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { familyLinks, houseLinks, site } from "@/lib/content";
import { parishNavLinks } from "@/lib/parishes";
import { IconFacebook, IconInstagram, IconYouTube } from "./Icons";

export function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
  }

  return (
    <footer className="w-full overflow-x-hidden bg-tan pt-10 text-charcoal lg:pt-20">
      <div className="fluid-container">
        <div className="my-8 flex flex-col items-center space-y-16 md:my-16 lg:flex-row lg:items-start lg:justify-between lg:space-y-0 lg:space-x-8">
          <div className="flex flex-col">
            <div className="max-w-xs">
              <p className="mb-6 text-lg leading-snug tracking-wide text-gray-800 opacity-60">
                Stay up to date with Sharon
              </p>
              <h6 className="font-headline-sans text-xl font-bold tracking-tight leading-tighter lg:text-2xl">
                Sign up for email updates from Sharon Parish
              </h6>
            </div>
            <form onSubmit={submit} className="mt-6 w-auto pb-6 md:w-96 lg:mt-12">
              <label className="sr-only" htmlFor="footer-email">
                Email address
              </label>
              <div className="flex items-end justify-between gap-4">
                <input
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="footer-field"
                />
                <button type="submit" className="submit-underline shrink-0">
                  Submit
                </button>
              </div>
              {done ? (
                <p className="mt-3 text-sm">Thank you. We will write when there is news from the house.</p>
              ) : null}
            </form>
          </div>

          <div className="mx-auto flex w-full max-w-sm flex-col space-y-10 sm:max-w-full sm:flex-row sm:justify-between sm:space-y-0 sm:space-x-8 lg:justify-end xl:space-x-24">
            <nav>
              <p className="mb-6 text-lg leading-snug tracking-wide text-gray-800 opacity-60">
                Our House
              </p>
              <div className="flex flex-col space-y-2">
                {houseLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-headline-sans text-xl font-bold tracking-tighter leading-tight hover:text-primary lg:text-2xl"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>
            <nav>
              <p className="mb-6 text-lg leading-snug tracking-wide text-gray-800 opacity-60">
                Parishes
              </p>
              <div className="flex flex-col space-y-2">
                {parishNavLinks.map((parish) => (
                  <Link
                    key={parish.href}
                    href={parish.href}
                    className="font-headline-sans text-xl font-bold tracking-tighter leading-tight hover:text-primary lg:text-2xl"
                  >
                    {parish.label}
                  </Link>
                ))}
                <Link
                  href="/parishes"
                  className="font-headline-sans text-xl font-bold tracking-tighter leading-tight hover:text-primary lg:text-2xl"
                >
                  All parishes
                </Link>
              </div>
            </nav>
            <nav>
              <p className="mb-6 text-lg leading-snug tracking-wide text-gray-800 opacity-60">
                The Sharon Family
              </p>
              <div className="flex flex-col space-y-2">
                {familyLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-headline-sans text-xl font-bold tracking-tighter leading-tight hover:text-primary lg:text-2xl"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>

        <div className="flex w-full flex-col items-center space-y-8 pt-12 xl:flex-row xl:justify-between xl:space-y-0 xl:space-x-12">
          <div className="flex flex-col space-y-2 xl:flex-row xl:space-y-0 xl:space-x-12">
            <span className="text-center text-sm opacity-60">
              © {site.year} {site.legalName}
            </span>
            <div className="flex flex-col sm:flex-row sm:space-x-10">
              <Link href="/cookie-policy" className="text-center text-sm opacity-60 hover:opacity-100 sm:text-right">
                Cookie Policy
              </Link>
              <Link href="/terms" className="text-center text-sm opacity-60 hover:opacity-100 sm:text-right">
                Terms + Conditions
              </Link>
              <Link href="/live" className="text-center text-sm opacity-60 hover:opacity-100 sm:text-right">
                Watch Live
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a href="https://www.facebook.com/cccsharonparish" className="inline-flex w-6 opacity-60 hover:opacity-100" aria-label="Facebook">
              <IconFacebook />
            </a>
            <a href="https://www.instagram.com/cccsharonparish" className="inline-flex w-6 opacity-60 hover:opacity-100" aria-label="Instagram">
              <IconInstagram />
            </a>
            <a href="https://www.youtube.com/@cccsharonparish" className="inline-flex w-6 opacity-60 hover:opacity-100" aria-label="YouTube">
              <IconYouTube />
            </a>
          </div>
        </div>
        <div className="h-10" />
      </div>
    </footer>
  );
}
