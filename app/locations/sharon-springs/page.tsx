import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { LocationView } from "@/components/LocationView";
import { breadcrumbJsonLd, pageMeta, placeJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Sharon Springs",
  description:
    "Sharon Springs Nursery and Primary School in Ikorodu — raised for the children of the city, fees subsidised, a future aimed at free.",
  path: "/locations/sharon-springs",
  image: "/images/school.jpg",
});

export default function SharonSpringsPage() {
  return (
    <>
    <JsonLd
      data={[
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
          { name: "Sharon Springs", path: "/locations/sharon-springs" },
        ]),
        placeJsonLd({
          name: "Sharon Springs Nursery and Primary School",
          description: metadata.description as string,
          path: "/locations/sharon-springs",
          image: "/images/school.jpg",
          address: "Sharon Springs Nursery and Primary School, Ikorodu, Lagos",
          locality: "Ikorodu",
          region: "Lagos",
          country: "NG",
        }),
      ]}
    />
    <LocationView
      kicker="Locations"
      title="Sharon Springs"
      lede="A nursery and primary school raised for the children of Ikorodu — quality held, fees subsidised, a future aimed at free."
      image="/images/school.jpg"
      body={[
        "Sharon Springs Nursery and Primary School was commissioned in September 2022 under the leadership of Senior Evangelist Sunday Sofowora. It was built for low-income and indigent families of the city.",
        "Fees are presently subsidised. The vision of the house is that the school become free, and that a secondary arm rise on the Sharon City site at Imala, along the Abeokuta–Imeko highway.",
      ]}
      times={["School days · term time", "Enquiries through the parish office"]}
      address="Sharon Springs Nursery and Primary School, Ikorodu, Lagos"
    />
    </>
  );
}
