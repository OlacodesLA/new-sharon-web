import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { LocationView } from "@/components/LocationView";
import { ParishesInRegion } from "@/components/ParishesInRegion";
import { site } from "@/lib/content";
import { breadcrumbJsonLd, pageMeta, placeJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Ikorodu",
  description:
    "Worship with Sharon Parish in Ikorodu, Lagos — the headquarter at Jumofak, Igbo Oluwo. Sunday gatherings at 8:00a and 10:30a.",
  path: "/ikorodu",
  image: "/images/city-lagos.jpg",
});

export default function IkoroduPage() {
  return (
    <>
    <JsonLd
      data={[
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Ikorodu", path: "/ikorodu" },
        ]),
        placeJsonLd({
          name: "Sharon Parish, Ikorodu",
          description: metadata.description as string,
          path: "/ikorodu",
          image: "/images/city-lagos.jpg",
          address: site.address,
          locality: "Ikorodu",
          region: "Lagos",
          country: "NG",
          latitude: 6.62,
          longitude: 3.51,
        }),
      ]}
    />
    <LocationView
      kicker="A City of the House"
      title="Ikorodu"
      lede="Our roots are in Ikorodu. Come worship with us in the city we were sent to."
      image="/images/city-lagos.jpg"
      body={[
        "God directed Evangelist Sofowora to Ikorodu. The altar of Sharon Parish Headquarter was laid here on 1 May 2003, and from this swampy portion the house has spread through the town and its suburbs.",
        "About five parishes now stand in Ikorodu under this family, with fifteen other offshoots across Nigeria. The headquarter remains at Jumofak, Igbo Oluwo — Pila-Oba Circuit Headquarter.",
        "Sunday gatherings, New Moon, harvests, and the daily work of evangelism all begin here. If you are in Lagos, this is your house.",
      ]}
      times={["Sunday worship · 8:00a & 10:30a", "New Moon · 10:00p", "Sharon Academy · Sundays"]}
      address={site.address}
    />
    <ParishesInRegion
      region="ikorodu"
      title="Houses in Ikorodu"
      lede="Each parish in this city keeps its own home and its own live page."
    />
    </>
  );
}
