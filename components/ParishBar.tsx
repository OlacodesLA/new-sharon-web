"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function ParishBar({ home, live }: { home: string; live: string }) {
  const path = usePathname();
  const links = [
    { href: "/parishes", label: "All parishes" },
    { href: home, label: "This house" },
    { href: live, label: "Live" },
  ];

  return (
    <nav aria-label="Parish" className="mb-10 flex flex-wrap gap-2">
      {links.map((link) => {
        const current = path === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={current ? "page" : undefined}
            className={`rounded-full px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.18em] transition ${
              current
                ? "bg-charcoal text-white"
                : "bg-tan text-charcoal hover:bg-charcoal hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
