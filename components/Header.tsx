"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CtaLink } from "./Buttons";
import { FullMenu } from "./FullMenu";
import { IconMenu, IconPin } from "./Icons";
import { Logo } from "./Logo";
import { parishNavLinks, primaryNav } from "@/lib/parishes";

export function Header({ theme = "light" }: { theme?: "light" | "dark" }) {
  const [sticky, setSticky] = useState(false);
  const [open, setOpen] = useState(false);
  const [locs, setLocs] = useState(false);
  const [hovered, setHovered] = useState<number | "locations" | null>(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    let cancelled = false;

    async function check() {
      if (document.visibilityState === "hidden") return;
      try {
        const res = await fetch("/api/live/status", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { live?: boolean };
        if (!cancelled) setIsLive(Boolean(data.live));
      } catch {
        /* keep last known state — a failed poll is not "offline" */
      }
    }

    check();
    const id = window.setInterval(check, 15000);
    document.addEventListener("visibilitychange", check);
    return () => {
      cancelled = true;
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", check);
    };
  }, []);

  const ink =
    theme === "dark" && !sticky ? "text-white" : "text-black";

  return (
    <>
      <a
        href="#maincontent"
        className="fixed top-4 left-8 z-50 -translate-y-24 rounded-lg bg-primary px-4 py-2 text-sm text-white opacity-0 focus-visible:translate-y-0 focus-visible:opacity-100"
      >
        Skip to Content
      </a>

      <header
        className={`fixed z-40 w-full transition ${
          sticky ? "bg-white/10 backdrop-blur-lg" : ""
        }`}
      >
        <nav className="relative hidden p-2 pt-6 md:block">
          <div className="absolute inset-0 bg-gray-150" />
          <ul className="relative flex items-center justify-center gap-6 px-4">
            {primaryNav().flatMap((link, i) => {
              const item = (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    className={`relative text-sm leading-none tracking-wider transition duration-300 hover:text-black ${
                      hovered !== null && hovered !== i
                        ? "opacity-30 hover:opacity-100"
                        : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );

              if (i !== 0) return [item];

              return [
                item,
                <li
                  key="parishes"
                  className="relative"
                  onMouseEnter={() => {
                    setHovered("locations");
                    setLocs(true);
                  }}
                  onMouseLeave={() => {
                    setHovered(null);
                    setLocs(false);
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setLocs(true)}
                    className={`relative flex items-center text-sm leading-none tracking-wider transition duration-300 hover:text-black ${
                      hovered !== null && hovered !== "locations"
                        ? "opacity-30 hover:opacity-100"
                        : ""
                    }`}
                    aria-expanded={locs}
                    aria-haspopup="true"
                  >
                    <span className="mr-1 w-3">
                      <IconPin />
                    </span>
                    Parishes
                  </button>
                  {locs ? (
                    <div className="absolute top-full left-0 z-50 pt-3">
                      <ul className="flex w-64 flex-col items-start space-y-3 border border-gray-100 bg-white p-4">
                        {parishNavLinks.map((parish) => (
                          <li key={parish.href}>
                            <Link
                              href={parish.href}
                              onClick={() => setLocs(false)}
                              className="relative text-sm leading-none tracking-wider transition duration-300 hover:text-primary"
                            >
                              {parish.label}
                            </Link>
                          </li>
                        ))}
                        <li>
                          <Link
                            href="/parishes"
                            onClick={() => setLocs(false)}
                            className="relative text-sm leading-none tracking-wider text-charcoal/50 transition duration-300 hover:text-primary"
                          >
                            All parishes
                          </Link>
                        </li>
                      </ul>
                    </div>
                  ) : null}
                </li>,
              ];
            })}
          </ul>
        </nav>

        <div
          className={`fluid-container relative flex items-center justify-between gap-6 py-4 transition-all duration-200 md:py-8 ${
            sticky ? "py-2 md:py-2" : ""
          } ${ink}`}
        >
          <div className="flex items-center gap-3">
            <Logo />
            {isLive ? (
              <Link
                href="/live"
                className="inline-flex items-center gap-2 rounded-full bg-[#e10600] px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white transition hover:opacity-90"
              >
                <span className="live-dot" aria-hidden />
                Live
              </Link>
            ) : null}
          </div>
          <div className="flex items-center space-x-8">
            <div className="hidden items-center gap-3 md:flex">
              <CtaLink href="/live" shape="soft">
                Watch Live
              </CtaLink>
              <CtaLink href="/events" shape="soft" tone="ghost">
                Upcoming Events
              </CtaLink>
            </div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex w-8 cursor-pointer flex-col items-center"
              aria-label="Menu"
            >
              <IconMenu />
            </button>
          </div>
        </div>
      </header>

      <FullMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
