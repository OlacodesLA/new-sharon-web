import type { Metadata } from "next";
import { InteriorHero, Prose } from "@/components/InteriorPage";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Our Beliefs",
  description:
    "Sharon Parish remains devoted to the true gospel of Jesus Christ and the authentic doctrine of the Celestial Church of Christ, as directed by Pa S.B.J. Oshoffa in 1947.",
  path: "/beliefs",
  image: "/images/bible.jpg",
});

export default function BeliefsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Our Beliefs", path: "/beliefs" },
        ])}
      />
      <InteriorHero
        kicker="Our House"
        title="Our Beliefs"
        lede="We remain devoted to the true gospel of Jesus Christ and the authentic doctrine of the Celestial Church of Christ, as directed by Pa S.B.J. Oshoffa in 1947."
        image="/images/bible.jpg"
      />
      <main id="maincontent" className="fluid-container space-y-16 py-20 xl:py-28">
        <Prose>
          <p>
            The Celestial Church of Christ is deeply rooted in its mission to
            uphold the teachings of Christianity. One of the primary goals of
            the church is to cleanse hearts from the corruptions of the world —
            a spiritual transformation that prepares people as pure seedlings,
            ready to be gathered into the kingdom of God.
          </p>
          <p>
            We preach the kingdom of God and the necessity of righteousness. We
            call people away from transient pleasures toward a life that aligns
            with God’s principles and commandments. Worship here is celestial:
            in Spirit, in truth, and in the order given to this church.
          </p>
        </Prose>
        <div className="grid gap-8 md:grid-cols-2">
          {[
            {
              t: "Jesus is the lead story",
              b: "The gospel is central. Every gathering, hymn, and assignment of this house points to Christ.",
            },
            {
              t: "Soul winning for Christ",
              b: "The first assignment given to Pa Oshoffa remains ours — to gather seedlings heavenward.",
            },
            {
              t: "True celestial worship",
              b: "We keep the doctrine, the garments, the New Moon, and the order of this church without apology.",
            },
            {
              t: "A family, not a crowd",
              b: "Sharon grew from a family into a community without losing the family. That is still the measure.",
            },
          ].map((item) => (
            <article key={item.t} className="rounded-2_5xl bg-tan p-8">
              <h2 className="mb-3 font-headline-sans text-2xl font-bold tracking-tight">{item.t}</h2>
              <p className="text-lg leading-relaxed text-charcoal">{item.b}</p>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
