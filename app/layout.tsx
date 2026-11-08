import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Instrument_Serif, Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Intro } from "@/components/Intro";
import { JsonLd } from "@/components/JsonLd";
import { LocationTravelHost } from "@/components/LocationTravelHost";
import { SmoothScroll } from "@/components/SmoothScroll";
import { site } from "@/lib/content";
import { churchJsonLd, SITE_URL } from "@/lib/seo";
import "./globals.css";

/** Body / UI — Passion: Commercial Type “Owners” */
const owners = localFont({
  src: [
    { path: "./fonts/satoshi-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/satoshi-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/satoshi-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-owners",
  display: "swap",
});

/** Display sans — Passion: Helvetica Now Pro Text (normal width, not condensed) */
const helveticaNow = Inter({
  variable: "--font-helvetica-now",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

/** Display serif — Passion: Saol Text / Saol Display */
const saol = Instrument_Serif({
  variable: "--font-saol",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const viewport: Viewport = {
  themeColor: "#f4efe6",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.legalName} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.legalName, url: SITE_URL }],
  creator: site.legalName,
  publisher: site.legalName,
  category: "Church",
  keywords: [
    "Sharon Parish",
    "Celestial Church of Christ",
    "CCC Sharon Parish",
    "Ikorodu church",
    "Lewisville Texas church",
    "watch live church",
    "Celestial Church Lagos",
  ],
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: SITE_URL,
    siteName: site.legalName,
    title: `${site.legalName} — ${site.tagline}`,
    description: site.description,
    images: [
      {
        url: "/images/hero.jpg",
        width: 1600,
        height: 900,
        alt: `${site.legalName} — ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.legalName} — ${site.tagline}`,
    description: site.description,
    images: ["/images/hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${owners.variable} ${helveticaNow.variable} ${saol.variable} ${owners.className} h-full antialiased`}
    >
      <body className="min-h-full bg-gray-30 font-sans text-charcoal">
        <JsonLd data={churchJsonLd()} />
        <SmoothScroll />
        <Intro />
        <LocationTravelHost />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
