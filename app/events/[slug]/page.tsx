import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaLink } from "@/components/Buttons";
import { InteriorHero, Prose } from "@/components/InteriorPage";
import { JsonLd } from "@/components/JsonLd";
import { events } from "@/lib/content";
import { breadcrumbJsonLd, eventJsonLd, pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) return { title: "Event" };
  return pageMeta({
    title: event.title,
    description: event.summary,
    path: `/events/${event.slug}`,
    image: event.image,
    type: "article",
  });
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Upcoming Events", path: "/events" },
            { name: event.title, path: `/events/${event.slug}` },
          ]),
          eventJsonLd(event),
        ]}
      />
      <InteriorHero
        kicker={event.when}
        title={event.title}
        lede={event.summary}
        image={event.image}
        action={{ href: "/live", label: "Watch Live" }}
      />
      <main id="maincontent" className="fluid-container py-20 xl:py-28">
        <Prose>
          <p>{event.summary}</p>
          <p>
            Join us at the headquarter in Ikorodu, or gather with the house
            online. For directions and service times, visit the location pages.
          </p>
        </Prose>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <CtaLink href="/parishes/headquarter">Get Directions</CtaLink>
          <CtaLink href="/events" shape="soft" tone="ghost">
            All Events
          </CtaLink>
        </div>
      </main>
    </>
  );
}
