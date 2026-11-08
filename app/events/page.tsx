import type { Metadata } from "next";
import Link from "next/link";
import { InteriorHero } from "@/components/InteriorPage";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { events } from "@/lib/content";
import { breadcrumbJsonLd, eventJsonLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Upcoming Events",
  description:
    "Harvests, the New Moon, Holy Mary’s Day, and the anniversary of the altar — the year of Sharon Parish.",
  path: "/events",
  image: "/images/harvest.jpg",
});

export default function EventsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Upcoming Events", path: "/events" },
          ]),
          ...events.map(eventJsonLd),
        ]}
      />
      <InteriorHero
        kicker="The Calendar of the House"
        title="Upcoming Events"
        lede="Harvests, the New Moon, Holy Mary’s Day, and the anniversary of the altar — the year of Sharon."
        image="/images/harvest.jpg"
      />
      <main id="maincontent" className="fluid-container py-20 xl:py-28">
        <Reveal stagger={0.1} className="grid gap-10 md:grid-cols-2">
          {events.map((event) => (
            <Link key={event.slug} href={`/events/${event.slug}`} data-reveal-item className="group block">
              <div className="relative mb-5 aspect-video overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={event.image}
                  alt={event.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
              <p className="mb-2 font-mono text-xs uppercase tracking-wider text-charcoal/50">
                {event.when}
              </p>
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-headline-sans text-3xl font-bold tracking-tight">{event.title}</h2>
                <span className="font-headline-sans text-xl font-bold text-charcoal/40">{event.date}</span>
              </div>
              <p className="mt-3 text-lg text-charcoal">{event.summary}</p>
            </Link>
          ))}
        </Reveal>
      </main>
    </>
  );
}
