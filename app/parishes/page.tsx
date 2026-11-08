import type { Metadata } from "next";
import { ParishDirectory } from "@/components/ParishDirectory";
import { InteriorHero } from "@/components/InteriorPage";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Parishes",
  description:
    "The houses of Sharon Parish — the Headquarter in Ikorodu, and every parish planted from that altar.",
  path: "/parishes",
  image: "/images/congregation.jpg",
});

export default function ParishesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Parishes", path: "/parishes" },
        ])}
      />
      <InteriorHero
        kicker="The Family"
        title="Parishes"
        lede="The mother altar in Ikorodu, and every house planted from it. One family, sent into different cities."
        image="/images/congregation.jpg"
      />
      <main id="maincontent" className="fluid-container py-20 xl:py-28">
        <ParishDirectory />
      </main>
    </>
  );
}
