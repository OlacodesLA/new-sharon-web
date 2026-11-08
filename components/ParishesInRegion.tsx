import { parishesIn, type ParishRegionId } from "@/lib/parishes";
import { ParishCards } from "./ParishCards";

export function ParishesInRegion({
  region,
  title,
  lede,
}: {
  region: ParishRegionId;
  title: string;
  lede: string;
}) {
  const houses = parishesIn(region);
  if (!houses.length) return null;

  return (
    <section className="fluid-container pb-20 xl:pb-28">
      <p className="display-section mb-3 text-4xl tracking-[-0.08rem] md:text-5xl">
        {title}
      </p>
      <p className="mb-8 max-w-xl text-lg leading-snug text-charcoal/80">
        {lede}
      </p>
      <ParishCards parishes={houses} />
    </section>
  );
}
