export const INTRO_READY = "sharon-intro-ready";
export const TRAVEL_START = "sharon-travel-start";
export const TRAVEL_PAGE_READY = "sharon-travel-page-ready";
export const TRAVEL_LIFT = "sharon-travel-lift";

const TRAVEL_KEY = "sharon-travel-to";
let travelPageIsReady = false;

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function introAlreadySeen() {
  return sessionStorage.getItem("sharon-intro") === "1";
}

export function waitForIntro() {
  return new Promise<void>((resolve) => {
    if (prefersReducedMotion() || introAlreadySeen()) {
      resolve();
      return;
    }

    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(fallback);
      window.removeEventListener(INTRO_READY, finish);
      resolve();
    };

    window.addEventListener(INTRO_READY, finish);
    const fallback = window.setTimeout(finish, 4000);
  });
}

export function travelDestination() {
  return sessionStorage.getItem(TRAVEL_KEY);
}

export function beginLocationTravel(href: string, detail: unknown) {
  travelPageIsReady = false;
  sessionStorage.setItem(TRAVEL_KEY, href);
  window.dispatchEvent(new CustomEvent(TRAVEL_START, { detail }));
}

export function clearLocationTravel() {
  travelPageIsReady = false;
  sessionStorage.removeItem(TRAVEL_KEY);
}

export function signalTravelPageReady() {
  travelPageIsReady = true;
  window.dispatchEvent(new Event(TRAVEL_PAGE_READY));
}

export function waitForTravelPageReady() {
  return new Promise<void>((resolve) => {
    if (travelPageIsReady) {
      resolve();
      return;
    }

    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(fallback);
      window.removeEventListener(TRAVEL_PAGE_READY, finish);
      resolve();
    };
    window.addEventListener(TRAVEL_PAGE_READY, finish);
    const fallback = window.setTimeout(finish, 1800);
  });
}

export function waitForTravelLift() {
  return new Promise<void>((resolve) => {
    if (!travelDestination()) {
      resolve();
      return;
    }

    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(fallback);
      window.removeEventListener(TRAVEL_LIFT, finish);
      resolve();
    };

    window.addEventListener(TRAVEL_LIFT, finish);
    const fallback = window.setTimeout(finish, 2500);
  });
}

export function signalTravelLift() {
  window.dispatchEvent(new Event(TRAVEL_LIFT));
}

export async function waitForPageEnter() {
  await waitForIntro();
  await waitForTravelLift();
}
