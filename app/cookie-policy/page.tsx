import type { Metadata } from "next";
import { Prose } from "@/components/InteriorPage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Cookie Policy",
  description:
    "How Sharon Parish uses essential cookies to keep the site working. We do not sell your data.",
  path: "/cookie-policy",
});

export default function CookiePage() {
  return (
    <main id="maincontent" className="fluid-container pt-40 pb-24">
      <h1 className="display-hero mb-10 text-5xl">Cookie Policy</h1>
      <Prose>
        <p>
          This site uses essential cookies to keep the experience working —
          remembering that you have seen the opening curtain, and keeping the
          pages you request. We do not sell your data.
        </p>
      </Prose>
    </main>
  );
}
