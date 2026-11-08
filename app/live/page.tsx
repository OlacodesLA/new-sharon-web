import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { LiveWatch } from "@/components/LiveWatch";
import { breadcrumbJsonLd, liveJsonLd, pageMeta } from "@/lib/seo";
import { getChannelBroadcasts } from "@/lib/youtube";

export const metadata: Metadata = pageMeta({
  title: "Watch Live",
  description:
    "Watch Sharon Parish live — worship, the Word, and the house gathered. Stream Sunday service from Ikorodu and previous gatherings.",
  path: "/live",
  image: "/images/worship.jpg",
});
export const revalidate = 20;

export default async function LivePage() {
  const { live, previous } = await getChannelBroadcasts();
  const videoSchema = liveJsonLd(live, previous);

  return (
    <>
    <JsonLd
      data={[
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Watch Live", path: "/live" },
        ]),
        ...(videoSchema ? [videoSchema] : []),
      ]}
    />
    <main
      id="maincontent"
      className="fluid-container pt-[6.5rem] pb-20 md:pt-[8.75rem] xl:pb-28"
    >
      <LiveWatch live={live} previous={previous} />
    </main>
    </>
  );
}
