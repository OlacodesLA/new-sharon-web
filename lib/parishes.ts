import { navLinks, site } from "./content";

/**
 * One record is one house.
 * It publishes `/parishes/[slug]` and `/parishes/[slug]/live`.
 * Set `youtube.source` to `"own"` when the parish has its own channel.
 * `"family"` means this house gathers in person. Its live page does not borrow the headquarter stream.
 */
export type ParishRegionId = "ikorodu" | "nigeria" | "united-states";

export type ParishYoutube =
  | { source: "family" }
  | { source: "own"; handle: string; channelId: string; url: string };

export type Parish = {
  slug: string;
  name: string;
  fullName: string;
  role: "headquarters" | "parish";
  region: ParishRegionId;
  city: string;
  locality: string;
  regionName: string;
  country: "NG" | "US";
  address: string;
  image: string;
  lede: string;
  story: string[];
  times: string[];
  established?: string;
  latitude?: number;
  longitude?: number;
  /** Equirectangular map position (0–100), used when traveling to this house. */
  map?: { x: number; y: number };
  social?: {
    facebook?: string;
    instagram?: string;
  };
  youtube: ParishYoutube;
};

export const parishRegions: {
  id: ParishRegionId;
  title: string;
  lede: string;
}[] = [
  {
    id: "ikorodu",
    title: "Ikorodu",
    lede: "The town where the altar was laid. These houses stand under the mother altar at Jumofak.",
  },
  {
    id: "nigeria",
    title: "Across Nigeria",
    lede: "Offshoots planted from Ikorodu, still one family.",
  },
  {
    id: "united-states",
    title: "United States",
    lede: "The house that crossed the Atlantic in 2018.",
  },
];

export const parishes: Parish[] = [
  {
    slug: "headquarter",
    name: "Headquarter",
    fullName: "Celestial Church of Christ, Sharon Parish Headquarter",
    role: "headquarters",
    region: "ikorodu",
    city: "Ikorodu",
    locality: "Ikorodu",
    regionName: "Lagos",
    country: "NG",
    address: site.address,
    image: "/images/headquarter.jpg",
    lede: "The altar laid on 1 May 2003. The house from which every other Sharon parish grew.",
    story: [
      "Pila-Oba Circuit Headquarter stands at 35/36 Mobolaji Benson Street, Jumofak Bus Stop, Igbo Oluwo, Ikorodu. This is the mother altar — swamp turned sanctuary — and the administrative heart of the Sharon family.",
      "Sunday gatherings, New Moon, harvests, and the daily work of evangelism begin here. The livestream of the family is broadcast from this house.",
      "Come for Sunday worship. Stay for the New Moon. Bring your children to the Academy. The door of the house is open.",
    ],
    times: [
      "Sunday worship · 8:00a & 10:30a",
      "New Moon · 10:00p",
      "Sharon Academy · Sundays",
    ],
    established: "1 May 2003",
    latitude: 6.62,
    longitude: 3.51,
    map: { x: 52.2, y: 48.4 },
    social: {
      facebook: site.social.facebook,
      instagram: site.social.instagram,
    },
    youtube: {
      source: "own",
      handle: site.youtube.handle,
      channelId: site.youtube.channelId,
      url: site.youtube.url,
    },
  },
  {
    slug: "throne-of-the-lamb",
    name: "Throne of the Lamb",
    fullName: "Celestial Church of Christ, Throne of the Lamb Parish",
    role: "parish",
    region: "nigeria",
    city: "Igode",
    locality: "Olota Estate",
    regionName: "Ogun",
    country: "NG",
    address: "Gadafi Street, Olota Estate, Igode, Ogun State, Nigeria",
    image: "/images/throne-of-the-lamb.jpg",
    lede: "A house of Sharon on Gadafi Street, Olota Estate, Igode, named for the worship before the throne and the Lamb.",
    story: [
      "Throne of the Lamb Parish stands on Gadafi Street, Olota Estate, Igode, Ogun State. It is a house of this family, gathered under the same doctrine and the same name of Jesus Christ.",
      "The parish takes its name from the vision in Revelation: a multitude before the throne and before the Lamb. Worship here is that same work — a people come to seek God.",
      "The parish keeps its own livestream. When this house is gathered, the service is on air from its channel.",
    ],
    times: ["Sunday worship"],
    latitude: 6.702886,
    longitude: 3.580008,
    map: { x: 52.9, y: 48.0 },
    social: {
      facebook: "https://www.facebook.com/p/CCC-Throne-of-the-lamb-parish-100089850108614/",
      instagram: "https://www.instagram.com/throneofthelambparish/",
    },
    youtube: {
      source: "own",
      handle: "@c.c.c.throneofthelambparish",
      channelId: "UCASNWPNivRx7okB2ezeJDCA",
      url: "https://www.youtube.com/@c.c.c.throneofthelambparish",
    },
  },
  {
    slug: "sharon-ogijo",
    name: "Sharon Ogijo",
    fullName: "Celestial Church of Christ, Sharon Parish Ogijo",
    role: "parish",
    region: "nigeria",
    city: "Ogijo",
    locality: "Ogijo",
    regionName: "Ogun",
    country: "NG",
    address: "Abafon Quarters, Church Bus-Stop, Ogijo, Ogun State, Nigeria",
    image: "/images/ogijo.jpg",
    lede: "Sharon’s house at Church Bus-Stop, Abafon Quarters, Ogijo. The same family, a short way from the mother altar.",
    story: [
      "Sharon Parish Ogijo stands in Abafon Quarters, at Church Bus-Stop, Ogijo, Ogun State. It is a house of this family, gathered under the same doctrine.",
      "The parish keeps its own livestream. When this house is gathered, the service is on air from its channel.",
    ],
    times: ["Sunday worship"],
    latitude: 6.7036,
    longitude: 3.5111,
    map: { x: 51.7, y: 47.7 },
    youtube: {
      source: "own",
      handle: "@cccsharonparishogijo",
      channelId: "UCC3vj-cMaNMCxZ4k_xLd2LA",
      url: "https://www.youtube.com/@cccsharonparishogijo",
    },
  },
  {
    slug: "sharon-likosi",
    name: "Sharon Likosi",
    fullName: "Celestial Church of Christ, Sharon Parish Likosi",
    role: "parish",
    region: "nigeria",
    city: "Likosi",
    locality: "Likosi",
    regionName: "Ogun",
    country: "NG",
    address: "Likosi-Olowo Farmland, off Likosi Bus-Stop, Along Ogijo Sagamu Road, Ogun State, Nigeria",
    image: "/images/likosi.jpg",
    lede: "Sharon’s house at Likosi-Olowo, off Likosi Bus-Stop. The same family, along the Ogijo–Sagamu road.",
    story: [
      "Sharon Parish Likosi stands at Likosi-Olowo Farmland, off Likosi Bus-Stop, along the Ogijo–Sagamu Road in Ogun State. It is a house of this family, gathered under the same doctrine.",
      "The parish keeps its own livestream. When this house is gathered, the service is on air from its channel.",
    ],
    times: ["Sunday worship"],
    latitude: 6.699426,
    longitude: 3.515509,
    map: { x: 52.0, y: 48.05 },
    social: {
      facebook: "https://www.facebook.com/people/CCC-Sharon-Parish-Likosi/61555906659269/",
      instagram: "https://www.instagram.com/likosicccsharonparish/",
    },
    youtube: {
      source: "own",
      handle: "@cccsharonparishlikosi",
      channelId: "UCUXAlYzIXLPnZjAerHmnocw",
      url: "https://www.youtube.com/@cccsharonparishlikosi",
    },
  },
  {
    slug: "sharon-igbalu",
    name: "Sharon Igbalu",
    fullName: "Celestial Church of Christ, Sharon Parish Igbalu",
    role: "parish",
    region: "ikorodu",
    city: "Igbalu",
    locality: "Imota",
    regionName: "Lagos",
    country: "NG",
    address: "Igbalu, Imota, Ikorodu, Lagos",
    image: "/images/home-gathering.jpg",
    lede: "Sharon’s house in Igbalu, Imota. The same family, east of the mother altar.",
    story: [
      "Sharon Parish Igbalu stands in Igbalu, Imota, Ikorodu. It is a house of this family, gathered under the same doctrine.",
      "The parish keeps its own livestream. When this house is gathered, the service is on air from its channel.",
    ],
    times: ["Sunday worship"],
    latitude: 6.58007,
    longitude: 3.65424,
    map: { x: 53.6, y: 48.75 },
    youtube: {
      source: "own",
      handle: "@SharonParishIgbalu",
      channelId: "UCjXakwt3_L9xpCHfYKm10uw",
      url: "https://www.youtube.com/@SharonParishIgbalu",
    },
  },
  {
    slug: "sharon-fakale",
    name: "Sharon Fakale",
    fullName: "Celestial Church of Christ, Sharon Parish Fakale",
    role: "parish",
    region: "nigeria",
    city: "Fakale",
    locality: "Imede",
    regionName: "Ogun",
    country: "NG",
    address: "Sharon Close, Sharon Bus-Stop, Idi Orogbo, Fakale, Imede, Iraye Moro District Headquarters, Ogun State, Nigeria",
    image: "/images/home-gathering.jpg",
    lede: "Sharon’s house on Sharon Close, at Sharon Bus-Stop, Idi Orogbo. The Iraye Moro district house, in Imede.",
    story: [
      "Sharon Parish Fakale stands at Sharon Close, Sharon Bus-Stop, Idi Orogbo, Fakale. It is the house of the Iraye Moro District in Imede, Ogun State, gathered under the same doctrine.",
      "This house gathers in person. The family’s livestream belongs to the headquarter, until this parish opens its own channel.",
    ],
    times: ["Sunday worship"],
    latitude: 6.7,
    longitude: 3.567,
    map: { x: 52.65, y: 47.85 },
    social: {
      facebook: "https://www.facebook.com/p/CCC-Sharon-Parish-Fakale-100067500540476/",
      instagram: "https://www.instagram.com/sharonfakale/",
    },
    youtube: { source: "family" },
  },
  {
    slug: "sharon-ilu-oloye",
    name: "Sharon Ilu Oloye",
    fullName: "Celestial Church of Christ, Sharon Parish Ilu Oloye",
    role: "parish",
    region: "ikorodu",
    city: "Ilu Oloye",
    locality: "Maya",
    regionName: "Lagos",
    country: "NG",
    address: "Ilu-Oloye, Maya, Ikorodu, Lagos",
    image: "/images/home-sanctuary.jpg",
    lede: "Sharon’s house in Ilu-Oloye, Maya. The same family, along the road through Ikorodu.",
    story: [
      "Sharon Parish Ilu Oloye stands in Ilu-Oloye, Maya, Ikorodu. It is a house of this family, gathered under the same doctrine.",
      "This house gathers in person. The family’s livestream belongs to the headquarter, until this parish opens its own channel.",
    ],
    times: ["Sunday worship"],
    latitude: 6.651948,
    longitude: 3.576821,
    map: { x: 53.15, y: 48.25 },
    youtube: { source: "family" },
  },
  {
    slug: "sharon-texas",
    name: "Sharon Texas",
    fullName: "Celestial Church of Christ, Sharon Parish, Texas",
    role: "parish",
    region: "united-states",
    city: "Lewisville, Texas",
    locality: "Lewisville",
    regionName: "Texas",
    country: "US",
    address: "810 Office Park Circle, Lewisville, Texas 75057",
    image: "/images/sharon-texas.jpg",
    lede: "Sharon’s house in Lewisville, Texas. Planted in 2018. The same family, a different city.",
    story: [
      "With a mind to winning more souls for Jesus Christ, Sharon took the gospel to the United States in 2018. The house now stands at 810 Office Park Circle, Lewisville.",
      "The same doctrine. The same family. A different city. If you are in the Dallas–Fort Worth area, you have a house.",
      "This house gathers in person. The family’s livestream belongs to the headquarter, until this parish opens its own channel.",
    ],
    times: ["Sunday worship · local time"],
    established: "2018",
    latitude: 33.0526163,
    longitude: -96.9977246,
    map: { x: 22.9, y: 36.0 },
    social: {
      facebook: "https://www.facebook.com/SHARONPARISHTEXAS/",
      instagram: "https://www.instagram.com/cccsharontx/",
    },
    youtube: { source: "family" },
  },
];

export function parishPath(slug: string) {
  return `/parishes/${slug}`;
}

/** Headquarter first, then every other house by name. */
export const parishNavLinks = parishes.map((parish) => ({
  href: parishPath(parish.slug),
  label: parish.name,
}));

/** About, Give, Live. Parish names live under the Parishes menu. */
export function primaryNav() {
  return navLinks;
}

export type ParishStop = {
  href: string;
  title: string;
  region: string;
  image: string;
  map: { x: number; y: number; lat: number; lng: number };
};

export function parishStops(): ParishStop[] {
  return parishes.flatMap((parish) => {
    if (
      parish.latitude == null ||
      parish.longitude == null ||
      !parish.map
    ) {
      return [];
    }
    return [
      {
        href: parishPath(parish.slug),
        title: parish.name,
        region:
          parish.role === "headquarters"
            ? "The mother altar"
            : "A house of Sharon",
        image: parish.image,
        map: {
          x: parish.map.x,
          y: parish.map.y,
          lat: parish.latitude,
          lng: parish.longitude,
        },
      },
    ];
  });
}

export function parishLivePath(slug: string) {
  return `/parishes/${slug}/live`;
}

export function getParish(slug: string) {
  return parishes.find((parish) => parish.slug === slug);
}

export function parishesIn(region: ParishRegionId) {
  return parishes.filter((parish) => parish.region === region);
}

export function groupedParishes() {
  return parishRegions
    .map((region) => ({
      ...region,
      houses: parishesIn(region.id),
    }))
    .filter((group) => group.houses.length > 0);
}

export function parishRoleLabel(parish: Parish) {
  return parish.role === "headquarters" ? "Headquarter" : "Parish";
}

/** A parish with its own channel. Family parishes return null and use the headquarter stream. */
export function ownChannel(parish: Parish) {
  if (parish.youtube.source !== "own") return null;
  return {
    handle: parish.youtube.handle,
    channelId: parish.youtube.channelId,
    url: parish.youtube.url,
  };
}

export function parishChannelUrl(parish: Parish) {
  return ownChannel(parish)?.url ?? site.youtube.url;
}

/** Pass to the livestream loader. The family channel keeps the env override. */
export function parishBroadcastChannel(parish: Parish) {
  const own = ownChannel(parish);
  if (!own || own.channelId === site.youtube.channelId) return undefined;
  return own;
}

export function headquarterParish() {
  return parishes.find((parish) => parish.role === "headquarters");
}

export function parishLiveNote(parish: Parish) {
  if (parish.youtube.source === "own") return undefined;
  const head = headquarterParish();
  const name = head?.name ?? "Headquarter";
  return `${parish.name} is not on its own channel. Worship here is in person. The family’s livestream is from ${name}.`;
}

export function relatedParishes(parish: Parish) {
  const inRegion = parishes.filter(
    (item) => item.region === parish.region && item.slug !== parish.slug,
  );
  if (inRegion.length) return inRegion;
  return parishes.filter((item) => item.slug !== parish.slug);
}
