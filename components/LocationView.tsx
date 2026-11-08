import { CtaLink } from "./Buttons";
import { InteriorHero, Prose } from "./InteriorPage";
import { Reveal } from "./Reveal";

export function LocationView({
  kicker,
  title,
  lede,
  image,
  body,
  times,
  address,
}: {
  kicker: string;
  title: string;
  lede: string;
  image: string;
  body: string[];
  times: string[];
  address: string;
}) {
  return (
    <>
      <InteriorHero
        kicker={kicker}
        title={title}
        lede={lede}
        image={image}
        action={{ href: "/new", label: "Plan Your Visit" }}
      />
      <main id="maincontent" className="fluid-container grid gap-16 py-20 lg:grid-cols-12 xl:py-28">
        <Reveal className="lg:col-span-7">
          <Prose>
            {body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Prose>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-5">
        <aside>
          <div className="rounded-2_5xl bg-tan p-8">
            <p className="mb-4 font-mono text-xs uppercase tracking-wider text-charcoal/50">
              Gather with us
            </p>
            <ul className="mb-8 space-y-3 text-lg">
              {times.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p className="mb-8 text-lg leading-relaxed">{address}</p>
            <CtaLink href="/live" shape="soft">
              Watch Live
            </CtaLink>
          </div>
        </aside>
        </Reveal>
      </main>
    </>
  );
}
