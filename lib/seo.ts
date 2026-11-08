import type { Metadata } from "next";
import { departments, events, site } from "./content";
import { parishes, parishLivePath, parishPath } from "./parishes";
import type { YtVideo } from "./youtube-types";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || site.url
).replace(/\/$/, "");

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
  absoluteTitle?: boolean;
  type?: "website" | "article";
};

export function pageMeta({
  title,
  description,
  path,
  image = "/images/hero.jpg",
  noIndex,
  absoluteTitle,
  type = "website",
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const ogTitle = absoluteTitle ? title : `${title} — ${site.name}`;
  const imageUrl = absoluteUrl(image);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: site.legalName,
      locale: "en_NG",
      type,
      images: [
        {
          url: imageUrl,
          width: 1600,
          height: 900,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [imageUrl],
    },
    ...(noIndex
      ? { robots: { index: false as const, follow: false as const } }
      : {}),
  };
}

export const routes = [
  {
    path: "/",
    changeFrequency: "weekly" as const,
    priority: 1,
  },
  { path: "/us", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/beliefs", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/leadership", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/new", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/join-our-team", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/locations", changeFrequency: "monthly" as const, priority: 0.8 },
  {
    path: "/locations/headquarter",
    changeFrequency: "monthly" as const,
    priority: 0.8,
  },
  {
    path: "/locations/sharon-springs",
    changeFrequency: "monthly" as const,
    priority: 0.7,
  },
  { path: "/ikorodu", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/texas", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/events", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/live", changeFrequency: "hourly" as const, priority: 0.95 },
  { path: "/parishes", changeFrequency: "monthly" as const, priority: 0.85 },
  ...parishes.flatMap((parish) => [
    {
      path: parishPath(parish.slug),
      changeFrequency: "monthly" as const,
      priority: parish.role === "headquarters" ? 0.85 : 0.75,
    },
    {
      path: parishLivePath(parish.slug),
      changeFrequency: "hourly" as const,
      priority: 0.8,
    },
  ]),
  { path: "/give", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/terms", changeFrequency: "yearly" as const, priority: 0.2 },
  {
    path: "/cookie-policy",
    changeFrequency: "yearly" as const,
    priority: 0.2,
  },
  ...events.map((event) => ({
    path: `/events/${event.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  })),
  ...departments.map((dept) => ({
    path: `/departments/${dept.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  })),
];

export function churchJsonLd() {
  const churchId = `${SITE_URL}/#church`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Church",
      "@id": churchId,
      name: site.legalName,
      alternateName: site.name,
      url: SITE_URL,
      logo: absoluteUrl("/images/logo.png"),
      image: absoluteUrl("/images/hero.jpg"),
      description: site.description,
      email: site.email,
      telephone: site.phone,
      foundingDate: site.foundingDate,
      slogan: site.tagline,
      address: {
        "@type": "PostalAddress",
        streetAddress: "35/36 Mobolaji Benson Street, Jumofak Bus Stop, Igbo Oluwo",
        addressLocality: "Ikorodu",
        addressRegion: "Lagos",
        addressCountry: "NG",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 6.62,
        longitude: 3.51,
      },
      hasMap: "https://maps.google.com/?q=Igbo+Oluwo+Ikorodu+Lagos",
      sameAs: [
        site.youtube.url,
        site.social.facebook,
        site.social.instagram,
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Sunday",
          opens: "08:00",
          closes: "13:00",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: site.name,
      url: SITE_URL,
      description: site.description,
      inLanguage: "en",
      publisher: { "@id": churchId },
    },
  ];
}

export function breadcrumbJsonLd(
  crumbs: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function placeJsonLd({
  name,
  description,
  path,
  image,
  address,
  locality,
  region,
  country,
  latitude,
  longitude,
}: {
  name: string;
  description: string;
  path: string;
  image: string;
  address: string;
  locality: string;
  region: string;
  country: string;
  latitude?: number;
  longitude?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Church",
    name,
    description,
    url: absoluteUrl(path),
    image: absoluteUrl(image),
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressLocality: locality,
      addressRegion: region,
      addressCountry: country,
    },
    ...(latitude != null && longitude != null
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude,
            longitude,
          },
        }
      : {}),
    parentOrganization: { "@id": `${SITE_URL}/#church` },
  };
}

export function eventJsonLd(event: (typeof events)[number]) {
  const [month, day, year] = event.date.split(".").map(Number);
  const start = new Date(2000 + year, month - 1, day);
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.summary,
    url: absoluteUrl(`/events/${event.slug}`),
    image: absoluteUrl(event.image),
    eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    startDate: start.toISOString().slice(0, 10),
    organizer: {
      "@type": "Church",
      name: site.legalName,
      url: SITE_URL,
    },
    location: {
      "@type": "Place",
      name: "Sharon Parish Headquarter",
      address: {
        "@type": "PostalAddress",
        streetAddress: "35/36 Mobolaji Benson Street, Jumofak Bus Stop",
        addressLocality: "Ikorodu",
        addressRegion: "Lagos",
        addressCountry: "NG",
      },
    },
  };
}

export function liveJsonLd(
  live: YtVideo | null,
  previous: YtVideo[],
  options?: { path?: string; description?: string },
) {
  const featured = live ?? previous[0] ?? null;
  if (!featured) return null;
  const watchUrl = `https://www.youtube.com/watch?v=${featured.id}`;
  const path = options?.path ?? "/live";
  return {
    "@context": "https://schema.org",
    "@type": live ? "BroadcastEvent" : "VideoObject",
    name: featured.title,
    description:
      options?.description ??
      (live
        ? "Watch Sharon Parish live — worship, the Word, and the house gathered."
        : featured.title),
    url: absoluteUrl(path),
    embedUrl: `https://www.youtube-nocookie.com/embed/${featured.id}`,
    thumbnailUrl: featured.thumbnail,
    uploadDate: featured.publishedAt,
    isLiveBroadcast: Boolean(live),
    ...(live
      ? { publication: { "@type": "BroadcastEvent", isLiveBroadcast: true } }
      : {}),
    publisher: {
      "@type": "Church",
      name: site.legalName,
      logo: { "@type": "ImageObject", url: absoluteUrl("/images/logo.png") },
    },
    potentialAction: {
      "@type": "WatchAction",
      target: watchUrl,
    },
  };
}
