import type { Metadata } from "next";
import { CtaLink } from "@/components/Buttons";
import { InteriorHero, Prose } from "@/components/InteriorPage";
import { JsonLd } from "@/components/JsonLd";
import { departments } from "@/lib/content";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Join Our Team",
  description:
    "Serve at Sharon Parish — evangelism, choir, youth, academy, the Good Women, and Men of Valor. Everyone in this house has gifts that can serve others.",
  path: "/join-our-team",
  image: "/images/youth.jpg",
});

export default function JoinPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Join Our Team", path: "/join-our-team" },
        ])}
      />
      <InteriorHero
        kicker="Our House"
        title="Join Our Team"
        lede="Everyone in this house has gifts that can serve others. Find a department and take your place."
        image="/images/youth.jpg"
        action={{ href: "/departments/evangelism", label: "See Departments" }}
      />
      <main id="maincontent" className="fluid-container py-20 xl:py-28">
        <Prose>
          <p>
            Departments in Sharon are given room to grow at their own pace — an
            initiative that has kept the working relationship of this family
            intact as the parish spread. If you are new, start here. If you have
            been in the house a long time, there is still a place to serve.
          </p>
        </Prose>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((d) => (
            <a key={d.slug} href={`/departments/${d.slug}`} className="group block">
              <div className="relative mb-4 aspect-[4/5] overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={d.image}
                  alt={d.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
              <h2 className="font-headline-sans text-2xl font-bold tracking-tight">{d.title}</h2>
            </a>
          ))}
        </div>
        <div className="mt-16 text-center">
          <CtaLink href="mailto:info@cccsharonparish.com">Write the House</CtaLink>
        </div>
      </main>
    </>
  );
}
