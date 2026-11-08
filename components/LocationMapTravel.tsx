"use client";

import { gsap } from "gsap";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  clearLocationTravel,
  prefersReducedMotion,
  signalTravelLift,
  waitForTravelPageReady,
} from "@/lib/motion";
import { parishStops, type ParishStop } from "@/lib/parishes";

type City = ParishStop;

type Props = {
  city: City;
  onDone: () => void;
};

function WorldMapArt() {
  return (
    <svg
      viewBox="0 0 1000 500"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="landFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3a3634" />
          <stop offset="100%" stopColor="#2a2625" />
        </linearGradient>
        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <path
            d="M 50 0 L 0 0 0 50"
            fill="none"
            stroke="rgba(226,227,218,0.08)"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="1000" height="500" fill="#1a1716" />
      <rect width="1000" height="500" fill="url(#grid)" />
      {/* Simplified landmasses — stylized, not geographic precision */}
      <g fill="url(#landFill)" stroke="rgba(226,227,218,0.12)" strokeWidth="1.2">
        {/* Americas */}
        <path d="M155 95c28-18 62-22 94-12 22 7 41 22 48 44 6 19-2 38-14 52-18 22-48 28-74 22-31-8-52-34-58-64-3-14 0-29 4-42z" />
        <path d="M210 210c18-6 38-2 52 12 16 16 22 40 14 62-10 28-38 48-68 52-24 3-48-10-58-32-12-24-4-54 14-72 12-12 28-18 46-22z" />
        {/* Europe / Africa */}
        <path d="M470 105c34-16 74-10 98 14 18 18 22 46 12 70-14 32-48 50-82 46-30-4-54-28-60-58-5-24 6-50 32-72z" />
        <path d="M495 210c26-8 54 0 72 20 20 22 24 54 10 80-16 30-52 46-84 40-28-5-50-28-54-56-4-26 16-56 56-84z" />
        {/* Asia */}
        <path d="M600 90c48-20 108-16 148 12 28 20 42 54 36 88-8 42-44 74-86 82-40 8-84-6-108-38-26-34-22-82 10-114 0 0 0-20 0-30z" />
        {/* Australia */}
        <path d="M760 320c28-12 60-4 76 20 12 18 10 42-6 56-18 16-46 18-68 8-24-10-36-36-28-60 6-16 14-20 26-24z" />
      </g>
      {/* Latitude / longitude arcs */}
      <g fill="none" stroke="rgba(0,183,227,0.12)" strokeWidth="1">
        <ellipse cx="500" cy="250" rx="460" ry="170" />
        <ellipse cx="500" cy="250" rx="320" ry="120" />
        <path d="M40 250h920" />
        <path d="M500 40v420" />
      </g>
    </svg>
  );
}

export function LocationMapTravel({ city, onDone }: Props) {
  const router = useRouter();
  const root = useRef<HTMLDivElement>(null);
  const mapPlane = useRef<HTMLDivElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const otherPins = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);
  const curtain = useRef<HTMLDivElement>(null);
  const finished = useRef(false);

  useEffect(() => {
    router.prefetch(city.href);
  }, [city.href, router]);

  useEffect(() => {
    const el = root.current;
    const plane = mapPlane.current;
    const pinEl = pin.current;
    const others = otherPins.current;
    const labelEl = label.current;
    const curtainEl = curtain.current;
    if (!el || !plane || !pinEl || !labelEl || !curtainEl) return;

    document.documentElement.classList.add("lenis-stopped", "travel-active");
    document.body.style.overflow = "hidden";

    const release = () => {
      document.documentElement.classList.remove("lenis-stopped", "travel-active");
      document.body.style.overflow = "";
    };

    const finish = () => {
      if (finished.current) return;
      finished.current = true;
      clearLocationTravel();
      release();
      onDone();
    };

    const go = async () => {
      router.push(city.href);
      await waitForTravelPageReady();
      signalTravelLift();
      if (prefersReducedMotion() || !curtainEl) {
        finish();
        return;
      }
      await gsap.to(curtainEl, {
        yPercent: -101,
        duration: 1.05,
        ease: "expo.inOut",
      });
      gsap.set(el, { autoAlpha: 0 });
      finish();
    };

    if (prefersReducedMotion()) {
      void go();
      return () => {
        release();
      };
    }

    const focus = `${city.map.x}% ${city.map.y}%`;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          void go();
        },
      });

      gsap.set(el, { autoAlpha: 0 });
      gsap.set(plane, {
        rotateX: 12,
        rotateZ: -8,
        scale: 0.72,
        xPercent: -6,
        yPercent: 8,
        transformOrigin: "50% 55%",
      });
      gsap.set(pinEl, { scale: 0, transformOrigin: "50% 100%" });
      if (others) gsap.set(others.children, { scale: 0, transformOrigin: "50% 100%" });
      gsap.set(labelEl, { autoAlpha: 0, y: 24 });
      gsap.set(curtainEl, { yPercent: 100 });

      tl.to(el, { autoAlpha: 1, duration: 0.45 })
        .to(
          plane,
          {
            rotateX: 56,
            rotateZ: -3,
            scale: 1,
            xPercent: 0,
            yPercent: 0,
            duration: 1.05,
            ease: "power4.out",
          },
          0.12,
        )
        .to(
          others ? [pinEl, ...Array.from(others.children)] : pinEl,
          { scale: 1, duration: 0.45, stagger: 0.08, ease: "back.out(1.8)" },
          0.55,
        )
        // Zoom into the selected pin (origin locked to that city)
        .to(
          plane,
          {
            transformOrigin: focus,
            scale: 2.7,
            rotateX: 64,
            rotateZ: 0,
            duration: 1.5,
            ease: "power2.inOut",
          },
          0.85,
        )
        .to(
          pinEl,
          {
            scale: 1.28,
            duration: 0.35,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut",
          },
          "-=0.55",
        )
        .to(labelEl, { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.45")
        .to(
          curtainEl,
          { yPercent: 0, duration: 0.7, ease: "power4.inOut" },
          "+=0.35",
        );
    }, el);

    return () => {
      ctx.revert();
      release();
    };
  }, [city, onDone, router]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={root}
      className="location-map-travel fixed inset-0 z-[80] flex items-center justify-center overflow-hidden bg-[#120f0e]"
      role="dialog"
      aria-modal="true"
      aria-label={`Opening map for ${city.title}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,183,227,0.14),transparent_58%)]" />

      <div className="absolute top-8 left-8 z-10 sm:top-12 sm:left-12">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-tan/55">
          Finding house
        </p>
      </div>

      <div
        className="relative h-[min(72vw,34rem)] w-[min(92vw,56rem)]"
        style={{ perspective: "1400px" }}
      >
        <div
          ref={mapPlane}
          className="location-map-plane relative h-full w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
          style={{ transformStyle: "preserve-3d" }}
        >
          <WorldMapArt />

          <div ref={otherPins}>
            {parishStops()
              .filter((c) => c.href !== city.href)
              .map((c) => (
                <div
                  key={c.href}
                  className="absolute z-[9] -translate-x-1/2 -translate-y-full opacity-70"
                  style={{ left: `${c.map.x}%`, top: `${c.map.y}%` }}
                >
                  <svg width="18" height="24" viewBox="0 0 28 36" aria-hidden>
                    <path
                      d="M14 0C6.3 0 0 6.2 0 13.8c0 9.7 14 22.2 14 22.2S28 23.5 28 13.8C28 6.2 21.7 0 14 0z"
                      fill="#e2e3da"
                    />
                    <circle cx="14" cy="13" r="5" fill="#120f0e" />
                  </svg>
                </div>
              ))}
          </div>

          <div
            ref={pin}
            className="absolute z-10 -translate-x-1/2 -translate-y-full"
            style={{ left: `${city.map.x}%`, top: `${city.map.y}%` }}
          >
            <span className="location-map-pin-pulse absolute left-1/2 top-[72%] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/35" />
            <svg width="28" height="36" viewBox="0 0 28 36" aria-hidden>
              <path
                d="M14 0C6.3 0 0 6.2 0 13.8c0 9.7 14 22.2 14 22.2S28 23.5 28 13.8C28 6.2 21.7 0 14 0z"
                fill="#00b7e3"
              />
              <circle cx="14" cy="13" r="5" fill="#120f0e" />
            </svg>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      </div>

      <div
        ref={label}
        className="absolute bottom-16 left-1/2 z-10 w-[min(90vw,28rem)] -translate-x-1/2 text-center sm:bottom-20"
      >
        <p className="font-headline-sans text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {city.title}
        </p>
        <p className="mt-2 text-sm tracking-wide text-tan/70">{city.region}</p>
      </div>

      <div
        ref={curtain}
        className="absolute inset-0 z-20 bg-primary"
        aria-hidden
      />
    </div>,
    document.body,
  );
}
