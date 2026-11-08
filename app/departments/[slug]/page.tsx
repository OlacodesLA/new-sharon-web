import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaLink } from "@/components/Buttons";
import { InteriorHero, Prose } from "@/components/InteriorPage";
import { JsonLd } from "@/components/JsonLd";
import { departments } from "@/lib/content";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return departments.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dept = departments.find((d) => d.slug === slug);
  if (!dept) return { title: "Department" };
  return pageMeta({
    title: dept.title,
    description: dept.body,
    path: `/departments/${dept.slug}`,
    image: dept.image,
  });
}

export default async function DepartmentPage({ params }: Props) {
  const { slug } = await params;
  const dept = departments.find((d) => d.slug === slug);
  if (!dept) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Join Our Team", path: "/join-our-team" },
          { name: dept.title, path: `/departments/${dept.slug}` },
        ])}
      />
      <InteriorHero
        kicker="The Sharon Family"
        title={dept.title}
        lede={dept.body}
        image={dept.image}
        action={{ href: "/join-our-team", label: "Join This Work" }}
      />
      <main id="maincontent" className="fluid-container py-20 xl:py-28">
        <Prose>
          <p>{dept.body}</p>
          <p>
            Write the parish office if you want to take a place in this
            department. We will connect you to the head of the arm.
          </p>
        </Prose>
        <div className="mt-12 flex justify-center">
          <CtaLink href="mailto:info@cccsharonparish.com">Write the House</CtaLink>
        </div>
      </main>
    </>
  );
}
