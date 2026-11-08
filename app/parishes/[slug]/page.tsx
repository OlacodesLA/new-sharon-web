import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ParishHome } from "@/components/ParishHome";
import { JsonLd } from "@/components/JsonLd";
import { getParish, parishes, parishPath } from "@/lib/parishes";
import { breadcrumbJsonLd, pageMeta, placeJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return parishes.map((parish) => ({ slug: parish.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const parish = getParish(slug);
  if (!parish) return { title: "Parish" };
  return pageMeta({
    title: parish.name,
    description: parish.lede,
    path: parishPath(parish.slug),
    image: parish.image,
  });
}

export default async function ParishPage({ params }: Props) {
  const { slug } = await params;
  const parish = getParish(slug);
  if (!parish) notFound();

  const path = parishPath(parish.slug);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Parishes", path: "/parishes" },
            { name: parish.name, path },
          ]),
          placeJsonLd({
            name: parish.fullName,
            description: parish.lede,
            path,
            image: parish.image,
            address: parish.address,
            locality: parish.locality,
            region: parish.regionName,
            country: parish.country,
            latitude: parish.latitude,
            longitude: parish.longitude,
          }),
        ]}
      />
      <ParishHome parish={parish} />
    </>
  );
}
