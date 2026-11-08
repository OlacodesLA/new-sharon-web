import type { Metadata } from "next";
import { CitySelect } from "@/components/CitySelect";
import { HousePhotos } from "@/components/HousePhotos";
import { EquipBanner } from "@/components/EquipBanner";
import { GivingBlock } from "@/components/GivingBlock";
import { HomeHero } from "@/components/HomeHero";
import { LeadershipSlider } from "@/components/LeadershipSlider";
import { Movement } from "@/components/Movement";
import { Updates } from "@/components/Updates";
import { site } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: `${site.legalName} — ${site.tagline}`,
  description: site.description,
  path: "/",
  image: "/images/hero.jpg",
  absoluteTitle: true,
});

export default function Home() {
  return (
    <>
      <HomeHero />
      <main
        id="maincontent"
        className="relative pt-20 pb-20 sm:pt-24 sm:pb-24 xl:pt-32 xl:pb-32"
      >
        <div className="space-y-24 xl:space-y-32">
          <HousePhotos />
          <CitySelect />
          <LeadershipSlider />
          <EquipBanner />
          <GivingBlock />
          <Movement />
          <Updates />
        </div>
      </main>
    </>
  );
}
