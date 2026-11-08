"use client";

import { gsap } from "gsap";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { events, familyLinks, houseLinks, site } from "@/lib/content";
import { parishNavLinks, primaryNav } from "@/lib/parishes";
import { startScroll, stopScroll } from "@/lib/lenis";
import { prefersReducedMotion } from "@/lib/motion";
import { IconClose, IconFacebook, IconInstagram, IconSearch, IconYouTube } from "./Icons";
import { Mark } from "./Logo";

export function FullMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [shown, setShown] = useState(open);
  const root = useRef<HTMLDivElement>(null);
  const featured = events[0];

  function search(e: FormEvent) {
    e.preventDefault();
    if (!q.trim()) return;
    onClose();
    router.push(`/events?q=${encodeURIComponent(q.trim())}`);
  }

  useEffect(() => {
    if (open) setShown(true);
  }, [open]);

  useEffect(() => {
    const el = root.current;
    if (!shown || !el) return;

    if (prefersReducedMotion()) {
      if (!open) setShown(false);
      return;
    }

    const ctx = gsap.context(() => {
      if (open) {
        stopScroll();
        gsap.fromTo(
          el,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.25, ease: "power2.out" },
        );
        gsap.fromTo(
          "[data-menu-panel]",
          { yPercent: -10, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.7, ease: "power4.out" },
        );
        gsap.fromTo(
          "[data-menu-item]",
          { y: 18, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.035, delay: 0.12, ease: "power3.out" },
        );
      } else {
        gsap.to(el, {
          autoAlpha: 0,
          duration: 0.28,
          ease: "power2.in",
          onComplete: () => {
            startScroll();
            setShown(false);
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, [open, shown]);

  if (!shown) return null;

  return (
    <div ref={root} className="fixed inset-0 z-50 h-full w-screen overflow-y-auto">
      <div className="absolute inset-0 bg-black/25" onClick={onClose} />
      <div data-menu-panel className="relative w-full px-6 pt-6 md:min-h-screen md:px-10 lg:pt-8">
        <div className="absolute inset-x-0 top-0 h-1/2 bg-black" />
        <div className="absolute inset-x-0 bottom-0 h-full origin-top bg-black -skew-y-3" />

        <div className="relative mx-auto flex w-full max-w-[1680px] items-center justify-between">
          <div className="flex items-center space-x-4 sm:space-x-8 lg:w-1/3">
            <Link href="/" onClick={onClose} className="block w-12 sm:w-14" data-menu-item>
              <Mark />
            </Link>
            <form onSubmit={search} className="relative flex w-full max-w-sm items-center" data-menu-item>
              <button type="submit" className="mr-3 w-8 text-white transition hover:text-primary" aria-label="Search">
                <IconSearch />
              </button>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="h-full w-full border border-white bg-transparent px-3 py-2 text-base text-white placeholder-gray-500 focus:placeholder-transparent focus:outline-none"
                placeholder="Search Sharon"
                type="search"
              />
            </form>
          </div>
          <div className="flex items-center justify-end space-x-8 lg:w-1/2">
            <nav className="hidden space-x-8 lg:flex">
              {primaryNav().map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  data-menu-item
                  className="text-xs font-bold uppercase leading-none text-white transition hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <button
              type="button"
              onClick={onClose}
              className="w-8 text-white transition hover:text-primary"
              aria-label="Close"
              data-menu-item
            >
              <IconClose />
            </button>
          </div>
        </div>

        <nav className="mt-8 flex flex-wrap justify-center gap-4 lg:hidden">
          {primaryNav().map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              data-menu-item
              className="text-xs font-bold text-white transition hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/events" onClick={onClose} data-menu-item className="text-xs font-bold uppercase text-white hover:text-primary">
            Upcoming Events
          </Link>
        </nav>

        <div className="relative mx-auto mt-6 flex w-full max-w-[1680px] flex-col-reverse md:mt-24 lg:flex-row lg:items-center lg:justify-end">
          <div className="hidden w-full md:block lg:w-2/5" data-menu-item>
            <Link href={`/events/${featured.slug}`} onClick={onClose} className="block">
              <div className="relative w-full pb-[56.25%]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="relative flex w-full flex-col justify-between pt-6 sm:flex-row">
                <h6 className="font-headline-sans text-xl font-bold tracking-tight text-white lg:text-2xl">
                  {featured.title}
                </h6>
                <h6 className="font-headline-sans text-xl font-bold tracking-tight text-gray-300 lg:text-2xl">
                  {featured.date}
                </h6>
              </div>
            </Link>
          </div>

          <div className="lg:w-3/5 lg:pl-24">
            <div className="mb-4 hidden w-full items-end gap-10 md:block xl:flex" data-menu-item>
              <Link href="/" onClick={onClose}>
                <h4 className="mb-2 w-full font-headline-sans text-2xl font-bold tracking-tight text-white transition hover:text-primary lg:mb-0 lg:text-3xl">
                  {site.name}
                </h4>
              </Link>
              <p className="mb-8 hidden text-base tracking-wide text-gray-100 xl:block">
                {site.tagline}
              </p>
            </div>

            <div className="mb-8 hidden h-px w-full bg-white md:block" data-menu-item />

            <div className="flex flex-wrap">
              <nav className="mb-4 w-full pr-10 md:mb-0 md:w-1/3">
                <h6 className="mb-3 font-headline-sans text-xl font-bold tracking-tight text-gray-500 lg:text-2xl" data-menu-item>
                  Our House
                </h6>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
                  {houseLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={onClose}
                      data-menu-item
                      className="font-bold text-white hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </nav>
              <nav className="mb-4 w-full pr-10 md:mb-0 md:w-1/3">
                <h6 className="mb-3 font-headline-sans text-xl font-bold tracking-tight text-gray-500 lg:text-2xl" data-menu-item>
                  Parishes
                </h6>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
                  {parishNavLinks.map((parish) => (
                    <Link
                      key={parish.href}
                      href={parish.href}
                      onClick={onClose}
                      data-menu-item
                      className="font-bold text-white hover:text-primary"
                    >
                      {parish.label}
                    </Link>
                  ))}
                  <Link
                    href="/parishes"
                    onClick={onClose}
                    data-menu-item
                    className="font-bold text-white hover:text-primary"
                  >
                    All parishes
                  </Link>
                </div>
              </nav>
              <nav className="w-full pr-10 md:w-1/3">
                <h6 className="mb-3 font-headline-sans text-xl font-bold tracking-tight text-gray-500 lg:text-2xl" data-menu-item>
                  The Sharon Family
                </h6>
                <div className="grid grid-cols-1 gap-2">
                  {familyLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={onClose}
                      data-menu-item
                      className="font-bold text-white hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </nav>

              <div className="mt-8 mb-8 flex items-center space-x-4 lg:mb-0">
                <a
                  href="https://www.youtube.com/@cccsharonparish"
                  className="inline-flex w-4 items-center text-gray-400 hover:text-white"
                  aria-label="YouTube"
                  data-menu-item
                >
                  <IconYouTube />
                </a>
                <a
                  href="https://www.instagram.com/cccsharonparish"
                  className="inline-flex w-4 items-center text-gray-400 hover:text-white"
                  aria-label="Instagram"
                  data-menu-item
                >
                  <IconInstagram />
                </a>
                <a
                  href="https://www.facebook.com/cccsharonparish"
                  className="inline-flex w-4 items-center text-gray-400 hover:text-white"
                  aria-label="Facebook"
                  data-menu-item
                >
                  <IconFacebook />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
