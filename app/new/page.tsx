import type { Metadata } from "next";
import { CtaLink } from "@/components/Buttons";
import { InteriorHero, Prose } from "@/components/InteriorPage";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "I'm New",
  description:
    "New to Sharon Parish or exploring a life with God? Plan your visit to Ikorodu or Lewisville — come as you are, hear the Word, and find a family.",
  path: "/new",
  image: "/images/hero.jpg",
});

export default function NewHerePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "I'm New", path: "/new" },
        ])}
      />
      <InteriorHero
        kicker="Welcome"
        title="I'm New"
        lede="If you are new to this church, or exploring a life with God, this is the place to start."
        image="/images/hero.jpg"
        action={{ href: "/parishes/headquarter", label: "Plan Your Visit" }}
      />
      <main id="maincontent" className="fluid-container space-y-16 py-20 xl:py-28">
        <Prose>
          <p>
            Come as you are. Wear white if you have it — if you do not, the
            house will help you. Arrive a little early. Sit. Sing. Hear the
            Word. After the service, find someone in a sash and tell them you
            are new. We will take it from there.
          </p>
          <p>
            Sunday gatherings are the centre of the week. New Moon is kept at
            10pm. The children have Sharon Academy. The young people have a
            house of their own. There is a department for every gift.
          </p>
        </Prose>
        <div className="flex flex-wrap justify-center gap-4">
          <CtaLink href="/beliefs">Our Beliefs</CtaLink>
          <CtaLink href="/join-our-team" shape="soft" tone="ghost">
            Join a Department
          </CtaLink>
        </div>
      </main>
    </>
  );
}
