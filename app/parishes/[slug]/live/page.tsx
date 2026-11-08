import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LiveWatch } from "@/components/LiveWatch";
import { ParishBar } from "@/components/ParishBar";
import { JsonLd } from "@/components/JsonLd";
import {
  getParish,
  headquarterParish,
  parishes,
  parishBroadcastChannel,
  parishChannelUrl,
  parishLiveNote,
  parishLivePath,
  parishPath,
} from "@/lib/parishes";
import { breadcrumbJsonLd, liveJsonLd, pageMeta } from "@/lib/seo";
import { getChannelBroadcasts } from "@/lib/youtube";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return parishes.map((parish) => ({ slug: parish.slug }));
}

export const dynamicParams = false;
export const revalidate = 20;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const parish = getParish(slug);
  if (!parish) return { title: "Live" };
  const own = parish.youtube.source === "own";
  return pageMeta({
    title: `${parish.name} Live`,
    description: own
      ? `Watch ${parish.fullName} — worship, the Word, and the house gathered.`
      : `${parish.name} gathers in person. The family’s livestream is from the headquarter.`,
    path: parishLivePath(parish.slug),
    image: parish.image,
  });
}

export default async function ParishLivePage({ params }: Props) {
  const { slug } = await params;
  const parish = getParish(slug);
  if (!parish) notFound();

  const own = parish.youtube.source === "own";
  const head = headquarterParish();
  const { live, previous } = own
    ? await getChannelBroadcasts(parishBroadcastChannel(parish))
    : { live: null, previous: [] };
  const path = parishLivePath(parish.slug);
  const description = own
    ? `Watch ${parish.fullName} — worship, the Word, and the house gathered.`
    : `${parish.name} gathers in person. The family’s livestream is from the headquarter.`;
  const videoSchema = liveJsonLd(live, previous, { path, description });

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Parishes", path: "/parishes" },
            { name: parish.name, path: parishPath(parish.slug) },
            { name: "Live", path },
          ]),
          ...(videoSchema ? [videoSchema] : []),
        ]}
      />
      <main
        id="maincontent"
        className="fluid-container pt-[6.5rem] pb-20 md:pt-[8.75rem] xl:pb-28"
      >
        <ParishBar home={parishPath(parish.slug)} live={path} />
        <LiveWatch
          live={live}
          previous={previous}
          heading={live ? `${parish.name} is live` : `Watch ${parish.name}`}
          idleBody={
            own
              ? `Join ${parish.name} in person, or come back when this house gathers.`
              : `${parish.name} gathers in person. This page stays quiet until the parish has its own channel.`
          }
          channelUrl={
            own
              ? parishChannelUrl(parish)
              : head
                ? parishLivePath(head.slug)
                : "/live"
          }
          channelLabel={own ? "YouTube channel" : `Watch ${head?.name ?? "the headquarter"}`}
          note={parishLiveNote(parish)}
        />
      </main>
    </>
  );
}
