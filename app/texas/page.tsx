import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { LocationView } from "@/components/LocationView";
import { ParishesInRegion } from "@/components/ParishesInRegion";
import { breadcrumbJsonLd, pageMeta, placeJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Sharon Texas",
  description:
    "Sharon Parish in Lewisville, Texas — 810 Office Park Circle, Lewisville, Texas 75057. Planted in 2018 as Sharon’s first house in the United States.",
  path: "/texas",
  image: "/images/sharon-texas.jpg",
});

export default function TexasPage() {
  return (
    <>
    <JsonLd
      data={[
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Sharon Texas", path: "/texas" },
        ]),
        placeJsonLd({
          name: "Sharon Parish, Texas",
          description: metadata.description as string,
          path: "/texas",
          image: "/images/sharon-texas.jpg",
          address: "810 Office Park Circle, Lewisville, Texas 75057",
          locality: "Lewisville",
          region: "Texas",
          country: "US",
          latitude: 33.0526163,
          longitude: -96.9977246,
        }),
      ]}
    />
    <LocationView
      kicker="A City of the House"
      title="Sharon Texas"
      lede="In 2018 the house crossed the Atlantic. Sharon Texas now stands in Lewisville."
      image="/images/sharon-texas.jpg"
      body={[
        "With a mind to winning more souls for Jesus Christ, Sharon took the gospel to the United States in 2018. The house now stands at 810 Office Park Circle, Lewisville.",
        "The same doctrine. The same family. A different city. If you are in the Dallas–Fort Worth area, you have a house.",
      ]}
      times={["Sunday worship · local time", "Watch with the headquarter when we go live"]}
      address="810 Office Park Circle, Lewisville, Texas 75057"
    />
    <ParishesInRegion
      region="united-states"
      title="Houses in Texas"
      lede="Each parish here keeps its own home and its own live page."
    />
    </>
  );
}
