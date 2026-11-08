import Link from "next/link";
import {
  parishLivePath,
  parishPath,
  parishRoleLabel,
  type Parish,
} from "@/lib/parishes";

export function ParishCards({ parishes }: { parishes: Parish[] }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {parishes.map((parish) => (
        <article key={parish.slug} className="flex flex-col">
          <Link href={parishPath(parish.slug)} className="group block">
            <div className="relative mb-4 aspect-[4/5] overflow-hidden rounded-xl bg-charcoal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={parish.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-charcoal">
                {parishRoleLabel(parish)}
              </span>
            </div>
            {parish.established ? (
              <p className="mb-1 font-mono text-xs uppercase tracking-wider text-charcoal/50">
                Established {parish.established}
              </p>
            ) : null}
            <h3 className="font-headline-sans text-2xl font-bold tracking-tight">
              {parish.name}
            </h3>
            <p className="mt-2 text-base leading-snug text-charcoal/80">
              {parish.lede}
            </p>
          </Link>
          <div className="mt-4 flex gap-4 font-mono text-[0.65rem] uppercase tracking-[0.18em]">
            <Link href={parishPath(parish.slug)} className="hover:text-primary">
              Home
            </Link>
            <Link
              href={parishLivePath(parish.slug)}
              className="hover:text-primary"
            >
              Live
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
