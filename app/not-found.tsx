import type { Metadata } from "next";
import { CtaLink } from "@/components/Buttons";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Page not found",
  description: "This page is not in the house. Return home or find a gathering.",
  path: "/",
  noIndex: true,
});

export default function NotFound() {
  return (
    <main
      id="maincontent"
      className="fluid-container flex min-h-[70vh] flex-col items-center justify-center pt-40 pb-24 text-center"
    >
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-charcoal/50">
        404
      </p>
      <h1 className="display-hero mb-6 text-5xl md:text-6xl">Page not found</h1>
      <p className="mb-10 max-w-md text-lg text-charcoal">
        This path is not in the house. Come back to the gathering, or find a
        parish.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <CtaLink href="/">Home</CtaLink>
        <CtaLink href="/parishes" shape="soft" tone="ghost">
          Parishes
        </CtaLink>
      </div>
    </main>
  );
}
