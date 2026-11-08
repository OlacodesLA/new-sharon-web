import type { Metadata } from "next";
import { InteriorHero, Prose } from "@/components/InteriorPage";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/content";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Our Story",
  description:
    "How Sharon Parish began in Ikorodu on 1 May 2003 — a Celestial house raised for sheep that had been scattered, where the gospel is the lead story.",
  path: "/us",
  image: "/images/worship.jpg",
});

export default function OurStoryPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Our Story", path: "/us" },
        ])}
      />
      <InteriorHero
        kicker="Our House"
        title="Our Story"
        lede="Sharon is a place created for people who really seek God and desire a true relationship with Him."
        image="/images/worship.jpg"
        action={{ href: "/new", label: "I'm New" }}
      />
      <main id="maincontent" className="fluid-container py-20 xl:py-28">
        <Reveal>
        <Prose>
          <p>
            God gave Evangelist Sofowora a mandate to set up this parish for
            sheep that had been scattered — a house where the true ideologies of
            the Celestial Church of Christ would be portrayed, and the gospel
            would be the lead story.
          </p>
          <p>
            The idea had been conceived years earlier, in a personal meditation
            on Isaiah 65 that climaxed at verse 10. God directed him to Ikorodu.
            With less than a thousand naira in hand, he purchased about two
            plots. The altar was laid by Superior Evangelist Falola on Thursday,
            1 May 2003.
          </p>
          <p>
            That same night the New Moon service was due at 10pm. The land was
            swampy. There was no proper structure. Three soldiers of Christ —
            S/E Sofowora, S/E Majekodunmi and S/E Abraham Okuribido — held the
            service anyway, with mosquitoes and toads for a choir. That first
            obedience still marks the culture of this house.
          </p>
          <p>
            Since 2003 Sharon has grown from a swampy portion into a family
            across Ikorodu, Nigeria, and the United States — still keeping the
            family culture, bonded by the love of Jesus Christ. Five parishes
            in Ikorodu. Fifteen offshoots across Nigeria. A house in Lewisville,
            Texas, planted in 2018.
          </p>
          <blockquote className="border-l-2 border-primary pl-6 font-headline text-2xl italic leading-snug text-charcoal">
            The desert and the parched land will be glad; the wilderness will
            rejoice and blossom… the splendor of Carmel and Sharon; they will
            see the glory of the Lord. — Isaiah 35:2
          </blockquote>
          <p>
            {site.address}
            <br />
            {site.email} · {site.phone}
          </p>
        </Prose>
        </Reveal>
      </main>
    </>
  );
}
