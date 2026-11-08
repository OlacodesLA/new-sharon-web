import type { Metadata } from "next";
import { CitySelect } from "@/components/CitySelect";
import { InteriorHero } from "@/components/InteriorPage";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Parishes",
  description:
    "Find a house of Sharon — Headquarter, and every parish that carries the name.",
  path: "/locations",
  image: "/images/night-city.jpg",
});

export default function LocationsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Parishes", path: "/locations" },
        ])}
      />
      <InteriorHero
        kicker="Find a House"
        title="Parishes"
        lede="Headquarter, then every house that carries this name."
        image="/images/night-city.jpg"
      />
      <main id="maincontent" className="py-20 xl:py-28">
        <CitySelect />
      </main>
    </>
  );
}
