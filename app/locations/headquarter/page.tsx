import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { LocationView } from "@/components/LocationView";
import { site } from "@/lib/content";
import { breadcrumbJsonLd, pageMeta, placeJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Headquarter",
  description:
    "Visit Sharon Parish Headquarter at Jumofak, Igbo Oluwo, Ikorodu — Sunday worship at 8:00a and 10:30a, New Moon at 10:00p.",
  path: "/locations/headquarter",
  image: "/images/headquarter.jpg",
});

export default function HeadquarterPage() {
  return (
    <>
    <JsonLd
      data={[
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
          { name: "Headquarter", path: "/locations/headquarter" },
        ]),
        placeJsonLd({
          name: "Sharon Parish Headquarter",
          description: metadata.description as string,
          path: "/locations/headquarter",
          image: "/images/headquarter.jpg",
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
      kicker="Locations"
      title="Headquarter"
      lede="The altar laid on 1 May 2003. The house from which Sharon grew."
      image="/images/headquarter.jpg"
      body={[
        "Pila-Oba Circuit Headquarter stands at 35/36 Mobolaji Benson Street, Jumofak Bus Stop, Igbo Oluwo, Ikorodu. This is the mother altar — swamp turned sanctuary — and the administrative heart of the Sharon family.",
        "Come for Sunday worship. Stay for the New Moon. Bring your children to the Academy. The door of the house is open.",
      ]}
      times={["Sunday worship · 8:00a & 10:30a", "New Moon · 10:00p"]}
      address={site.address}
    />
    </>
  );
}
