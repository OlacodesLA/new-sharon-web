"use client";

import { useEffect, useState } from "react";
import { LocationMapTravel } from "./LocationMapTravel";
import { parishStops, type ParishStop } from "@/lib/parishes";
import { TRAVEL_START } from "@/lib/motion";

type City = ParishStop;

export function LocationTravelHost() {
  const [city, setCity] = useState<City | null>(null);

  useEffect(() => {
    const onStart = (event: Event) => {
      const href = (event as CustomEvent<City>).detail?.href;
      const next = parishStops().find((item) => item.href === href) ?? null;
      if (next) setCity(next);
    };

    window.addEventListener(TRAVEL_START, onStart);
    return () => window.removeEventListener(TRAVEL_START, onStart);
  }, []);

  if (!city) return null;

  return <LocationMapTravel city={city} onDone={() => setCity(null)} />;
}
