import Link from "next/link";
import { CtaLink } from "./Buttons";
import { IconFacebook, IconInstagram, IconYouTube } from "./Icons";
import { InteriorHero, Prose } from "./InteriorPage";
import { ParishBar } from "./ParishBar";
import { ParishCards } from "./ParishCards";
import { Reveal } from "./Reveal";
import { site } from "@/lib/content";
import {
  ownChannel,
  parishLivePath,
  parishPath,
  relatedParishes,
  type Parish,
} from "@/lib/parishes";

export function ParishHome({ parish }: { parish: Parish }) {
  const home = parishPath(parish.slug);
  const live = parishLivePath(parish.slug);
  const related = relatedParishes(parish);
  const youtube = ownChannel(parish)?.url;
  const hasSocial = Boolean(
    parish.social?.facebook || parish.social?.instagram || youtube,
  );

  return (
    <>
      <InteriorHero
        kicker={
          parish.role === "headquarters" ? "The mother altar" : "A house of Sharon"
        }
        title={parish.name}
        lede={parish.lede}
        image={parish.image}
        action={{ href: live, label: "Watch Live" }}
      />
      <main
        id="maincontent"
        className="fluid-container py-16 xl:py-24"
      >
        <ParishBar home={home} live={live} />
        <div className="grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Prose>
              {parish.story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Prose>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-5">
            <aside className="rounded-2_5xl bg-tan p-8">
              <p className="mb-4 font-mono text-xs uppercase tracking-wider text-charcoal/50">
                Gather with us
              </p>
              <ul className="mb-8 space-y-3 text-lg">
                {parish.times.map((time) => (
                  <li key={time}>{time}</li>
                ))}
              </ul>
              <p
                className={`text-lg leading-relaxed ${
                  parish.established ? "mb-2" : hasSocial ? "mb-6" : "mb-8"
                }`}
              >
                {parish.address}
              </p>
              {parish.established ? (
                <p
                  className={`font-mono text-xs uppercase tracking-wider text-charcoal/50 ${
                    hasSocial ? "mb-6" : "mb-8"
                  }`}
                >
                  Established {parish.established}
                </p>
              ) : null}
              {hasSocial ? (
                <div className="mb-8 flex items-center gap-4">
                  {parish.social?.facebook ? (
                    <a
                      href={parish.social.facebook}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Facebook"
                      className="inline-flex w-6 text-charcoal transition-colors hover:text-primary"
                    >
                      <IconFacebook />
                    </a>
                  ) : null}
                  {parish.social?.instagram ? (
                    <a
                      href={parish.social.instagram}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Instagram"
                      className="inline-flex w-6 text-charcoal transition-colors hover:text-primary"
                    >
                      <IconInstagram />
                    </a>
                  ) : null}
                  {youtube ? (
                    <a
                      href={youtube}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="YouTube"
                      className="inline-flex w-6 text-charcoal transition-colors hover:text-primary"
                    >
                      <IconYouTube />
                    </a>
                  ) : null}
                </div>
              ) : null}
              <div className="flex flex-wrap gap-3">
                <CtaLink href={live} shape="soft">
                  Watch Live
                </CtaLink>
                <CtaLink href={`mailto:${site.email}`} shape="soft" tone="ghost">
                  Write the House
                </CtaLink>
              </div>
            </aside>
          </Reveal>
        </div>

        {related.length ? (
          <section className="mt-20 xl:mt-28">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <p className="display-section text-4xl tracking-[-0.08rem] md:text-5xl">
                Other <i>houses</i>
              </p>
              <Link
                href="/parishes"
                className="font-mono text-xs uppercase tracking-wider text-charcoal/60 hover:text-charcoal"
              >
                All parishes
              </Link>
            </div>
            <ParishCards parishes={related} />
          </section>
        ) : null}
      </main>
    </>
  );
}
