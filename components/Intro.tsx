"use client";

import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { Mark } from "./Logo";
import { INTRO_READY, introAlreadySeen, prefersReducedMotion } from "@/lib/motion";

export function Intro() {
  const [gone, setGone] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const curtain = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || introAlreadySeen()) {
      setGone(true);
      window.dispatchEvent(new Event(INTRO_READY));
      return;
    }

    const el = root.current;
    const panel = curtain.current;
    const logo = mark.current;
    if (!el || !panel || !logo) return;

    document.documentElement.classList.add("lenis-stopped", "intro-active");
    document.body.style.overflow = "hidden";

    const release = () => {
      document.documentElement.classList.remove("lenis-stopped", "intro-active");
      document.body.style.overflow = "";
    };

    const ctx = gsap.context(() => {
      gsap.set(panel, { yPercent: 0 });
      gsap.set(logo, { autoAlpha: 0, y: 16 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          sessionStorage.setItem("sharon-intro", "1");
          release();
          // Wait a frame so the page is painted under the clear curtain
          requestAnimationFrame(() => setGone(true));
        },
      });

      tl.to(logo, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
      })
        .to({}, { duration: 0.28 })
        // Curtain starts lifting first…
        .to(panel, {
          yPercent: -101,
          duration: 1.35,
          ease: "expo.inOut",
        })
        .to(
          logo,
          {
            autoAlpha: 0,
            y: -20,
            duration: 0.45,
            ease: "power2.in",
          },
          "<0.15",
        )
        // …then page content begins once enough of the hero is visible
        .add(() => {
          window.dispatchEvent(new Event(INTRO_READY));
        }, "<0.42")
        .to(
          el,
          {
            autoAlpha: 0,
            duration: 0.2,
            ease: "none",
          },
          "-=0.05",
        );
    }, el);

    return () => {
      ctx.revert();
      release();
    };
  }, []);

  if (gone) return null;

  return (
    <div
      ref={root}
      className="pointer-events-none fixed inset-0 z-50 h-screen w-full overflow-hidden"
      aria-hidden
    >
      <div ref={curtain} className="absolute inset-0 bg-primary will-change-transform" />
      <div
        ref={mark}
        className="absolute bottom-12 left-12 w-24 lg:bottom-24 lg:left-24 lg:w-28"
      >
        <Mark />
      </div>
    </div>
  );
}
