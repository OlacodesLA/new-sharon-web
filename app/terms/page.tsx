import type { Metadata } from "next";
import { Prose } from "@/components/InteriorPage";
import { site } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Terms + Conditions",
  description: `Terms for the use of the ${site.legalName} website.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <main id="maincontent" className="fluid-container pt-40 pb-24">
      <h1 className="display-hero mb-10 text-5xl">Terms + Conditions</h1>
      <Prose>
        <p>
          The pages of this site are published by {site.legalName} for the
          ministry of the house. Content may not be copied for commercial use
          without permission. For questions write {site.email}.
        </p>
      </Prose>
    </main>
  );
}
