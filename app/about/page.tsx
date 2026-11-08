import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  alternates: { canonical: "/us" },
};

export default function AboutRedirect() {
  redirect("/us");
}
