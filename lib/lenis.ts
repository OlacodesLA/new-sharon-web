import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}

export function stopScroll() {
  instance?.stop();
}

export function startScroll() {
  instance?.start();
}
