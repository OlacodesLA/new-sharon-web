"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { getLenis, setLenis } from "@/lib/lenis";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ ease: "power3.out", duration: 0.85 });

export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;

    document.documentElement.classList.add("has-motion");

    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.88,
      touchMultiplier: 1.1,
      anchors: true,
    });

    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
      gsap.ticker.remove(ticker);
      document.documentElement.classList.remove("has-motion");
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (document.documentElement.classList.contains("travel-active")) {
        window.scrollTo(0, 0);
        getLenis()?.scrollTo(0, { immediate: true });
        return;
      }
      getLenis()?.scrollTo(0, { immediate: true });
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
