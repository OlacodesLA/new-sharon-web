"use client";

import { useMemo, useState } from "react";
import { CtaLink } from "./Buttons";
import { site } from "@/lib/content";
import { formatBroadcastDate, type YtVideo } from "@/lib/youtube-types";

function LiveBadge({ label = "Live" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-[#e10600] px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white">
      <span className="live-dot" aria-hidden />
      {label}
    </span>
  );
}

export function LiveWatch({
  live,
  previous,
  heading,
  idleBody = "Join a parish in person, or come back here when the house gathers. Previous services are below.",
  channelUrl = site.youtube.url,
  channelLabel = "YouTube channel",
  note,
}: {
  live: YtVideo | null;
  previous: YtVideo[];
  heading?: string;
  idleBody?: string;
  channelUrl?: string;
  channelLabel?: string;
  note?: string;
}) {
  const initial = live ?? previous[0] ?? null;
  const [activeId, setActiveId] = useState(initial?.id ?? "");

  const active = useMemo(() => {
    if (live?.id === activeId) return live;
    return previous.find((video) => video.id === activeId) ?? initial;
  }, [activeId, initial, live, previous]);

  const others = previous.filter((video) => video.id !== active?.id);
  const watchingLive = Boolean(live && active?.id === live.id);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4 md:mb-8">
        <div>
          <div className="mb-3 flex items-center gap-3">
            {live ? (
              <LiveBadge label="Live now" />
            ) : (
              <span className="inline-flex items-center rounded-full border border-charcoal/20 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-charcoal/60">
                Watch Live
              </span>
            )}
          </div>
          <h1 className="display-hero text-4xl text-charcoal md:text-5xl xl:text-6xl">
            {heading ?? (live ? "The house is live" : "Watch Live")}
          </h1>
          {note ? (
            <p className="mt-3 max-w-md text-base leading-snug text-charcoal/70">
              {note}
            </p>
          ) : null}
        </div>
        <CtaLink href={channelUrl} shape="soft" tone="ghost">
          {channelLabel}
        </CtaLink>
      </div>

      <div className="relative mb-6 overflow-hidden rounded-1_5xl bg-charcoal aspect-video">
        {watchingLive ? (
          <div className="pointer-events-none absolute top-4 left-4 z-10">
            <LiveBadge label="On air" />
          </div>
        ) : null}
        {active ? (
          <iframe
            key={active.id}
            title={active.title}
            src={`https://www.youtube-nocookie.com/embed/${active.id}?rel=0&modestbranding=1${watchingLive ? "&autoplay=1" : ""}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center text-white">
            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-white/50">
              Livestream
            </p>
            <h2 className="mb-4 font-headline-sans text-3xl font-bold md:text-5xl">
              We are not live right now
            </h2>
            <p className="max-w-lg text-lg text-white/75">{idleBody}</p>
          </div>
        )}
      </div>

      {active ? (
        <div className="mb-16">
          <p className="mb-2 font-mono text-xs uppercase tracking-wider text-charcoal/50">
            {watchingLive ? "Streaming now" : formatBroadcastDate(active.publishedAt)}
          </p>
          <h2 className="font-headline-sans text-2xl font-bold tracking-tight md:text-4xl">
            {active.title}
          </h2>
        </div>
      ) : null}

      {others.length ? (
        <section>
          <p className="display-section mb-8 text-4xl tracking-[-0.1rem] md:text-5xl">
            Previous <i>Live</i>
          </p>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((video) => (
              <button
                key={video.id}
                type="button"
                onClick={() => setActiveId(video.id)}
                className="group cursor-pointer text-left"
              >
                <div className="relative mb-4 aspect-video overflow-hidden rounded-xl bg-charcoal">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={video.thumbnail}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  <span className="absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-white">
                    Play
                  </span>
                </div>
                <p className="mb-1 font-mono text-xs uppercase tracking-wider text-charcoal/50">
                  {formatBroadcastDate(video.publishedAt)}
                </p>
                <p className="font-headline-sans text-xl font-bold tracking-tight leading-snug">
                  {video.title}
                </p>
              </button>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
