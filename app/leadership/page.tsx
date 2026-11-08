import type { Metadata } from "next";
import { InteriorHero } from "@/components/InteriorPage";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { leaders } from "@/lib/content";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Our Leadership",
  description:
    "Sharon Parish is shepherded by Senior Evangelist S.O. Sofowora, administered by the Priesthood, and carried by a family of departments under the Holy Spirit.",
  path: "/leadership",
  image: "/images/pastor.jpg",
});

export default function LeadershipPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Our Leadership", path: "/leadership" },
        ])}
      />
      <InteriorHero
        kicker="Our House"
        title="Our Leadership"
        lede="Sharon is shepherded by Senior Evangelist S.O. Sofowora, administered by the Priesthood, and carried by a family of departments under the Holy Spirit."
        image="/images/pastor.jpg"
      />
      <main id="maincontent" className="fluid-container space-y-20 py-20 xl:py-28">
        {leaders.map((leader, i) => (
          <Reveal key={leader.name}>
          <article
            className={`flex flex-col items-center gap-10 lg:flex-row ${
              i % 2 ? "lg:flex-row-reverse" : ""
            }`}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl lg:w-1/2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={leader.image} alt={leader.name} className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <div className="w-full lg:w-1/2">
              <p className="mb-3 font-mono text-xs uppercase tracking-wider text-charcoal/50">
                {leader.role}
              </p>
              <h2 className="mb-4 font-headline-sans text-3xl font-bold tracking-tight lg:text-4xl">
                {leader.name}
              </h2>
              <p className="text-lg leading-relaxed text-charcoal">{leader.body}</p>
            </div>
          </article>
          </Reveal>
        ))}
      </main>
    </>
  );
}
