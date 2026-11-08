import type { Metadata } from "next";
import { CtaLink } from "@/components/Buttons";
import { CopyButton } from "@/components/CopyButton";
import { JsonLd } from "@/components/JsonLd";
import { givingAccounts, site } from "@/lib/content";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Give",
  description:
    "Give to Sharon Parish — tithe, offering, building, media, choir, harvest, and evangelism. Worship through the parish accounts.",
  path: "/give",
  image: "/images/hands.jpg",
});

export default function GivePage() {
  return (
    <>
    <JsonLd
      data={breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Give", path: "/give" },
      ])}
    />
    <main
      id="maincontent"
      className="fluid-container pt-[6.5rem] pb-20 md:pt-[8.75rem] xl:pb-28"
    >
      <div className="mb-14 grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-charcoal/50">
            Worship
          </p>
          <h1 className="display-hero mb-6 text-5xl md:text-6xl xl:text-7xl">
            Give
          </h1>
          <p className="max-w-lg text-lg leading-snug tracking-wide text-charcoal">
            Giving is worship — a response to the grace of God, not an
            obligation. Transfer to the parish accounts below.
          </p>
        </div>
        <div className="max-w-xl space-y-5 text-lg leading-snug tracking-wide text-charcoal lg:col-span-6 lg:pt-10">
          <p>
            We believe Jesus is a giver and not a taker. He has given us life
            and breath, and by His death and resurrection He defeated the sin
            that would rob us of both.
          </p>
          <p>
            Offerings from this house keep the altar, feed evangelism, raise the
            children of Sharon Springs, and send the gospel from Ikorodu to the
            nations.
          </p>
        </div>
      </div>

      <section id="options">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="display-section text-4xl tracking-[-0.1rem] md:text-5xl">
            Parish <i>accounts</i>
          </h2>
          <p className="hidden font-mono text-xs uppercase tracking-[0.16em] text-charcoal/45 sm:block">
            Nigeria · Naira
          </p>
        </div>

        <ul className="overflow-hidden rounded-2_5xl border border-charcoal/10 bg-white">
          {givingAccounts.map((account, i) => (
            <li
              key={account.number}
              id={account.purpose.toLowerCase().split(" / ")[0]}
              className={`grid gap-4 px-6 py-7 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)_auto] sm:items-center sm:px-8 ${
                i !== 0 ? "border-t border-charcoal/10" : ""
              }`}
            >
              <div>
                <p className="font-headline-sans text-xl font-bold tracking-tight">
                  {account.purpose}
                </p>
                <p className="mt-1 text-sm text-charcoal/55">{account.accountName}</p>
              </div>
              <div>
                <p className="font-headline-sans text-2xl font-bold tracking-tight tabular-nums md:text-3xl">
                  {account.number}
                </p>
                {account.bank ? (
                  <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-charcoal/45">
                    {account.bank}
                  </p>
                ) : null}
              </div>
              <CopyButton value={account.number} label="Copy number" />
            </li>
          ))}
        </ul>
      </section>

      <section
        id="returning"
        className="mt-16 grid gap-8 rounded-2_5xl bg-tan p-8 md:grid-cols-2 md:p-12"
      >
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-charcoal/50">
            Returning givers
          </p>
          <h2 className="display-hero mb-4 text-3xl md:text-4xl">
            Need a hand?
          </h2>
          <p className="max-w-md text-lg leading-snug text-charcoal">
            For questions about giving, write the priesthood office or call the
            house.
          </p>
        </div>
        <div className="flex flex-col justify-center gap-4">
          <p className="text-lg">{site.address}</p>
          <div className="flex flex-wrap gap-3">
            <CtaLink href={`mailto:${site.email}`} shape="soft">
              {site.email}
            </CtaLink>
            <CtaLink href={`tel:${site.phone.replace(/\s/g, "")}`} tone="ghost" shape="soft">
              {site.phone}
            </CtaLink>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
