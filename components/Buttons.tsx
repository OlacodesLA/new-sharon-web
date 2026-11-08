import Link from "next/link";
import type { ReactNode } from "react";

type Tone = "primary" | "ghost" | "charcoal";
type Shape = "pill" | "soft";

const tones: Record<Tone, string> = {
  primary:
    "bg-primary text-black hover:bg-tan hover:text-black",
  ghost:
    "bg-charcoal text-white hover:bg-tan hover:text-black",
  charcoal:
    "bg-primary text-black hover:bg-charcoal hover:text-white",
};

const shapes: Record<Shape, string> = {
  pill: "rounded-jumbo py-5 px-14 font-sans text-lg tracking-wide leading-none",
  soft: "rounded-2_5xl py-3 px-6 font-mono text-sm uppercase leading-none",
};

export function CtaLink({
  href,
  children,
  tone = "primary",
  shape = "pill",
  className = "",
  onClick,
}: {
  href: string;
  children: ReactNode;
  tone?: Tone;
  shape?: Shape;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`inline-flex items-center justify-center whitespace-nowrap transition select-none ${tones[tone]} ${shapes[shape]} ${className}`}
    >
      {children}
    </Link>
  );
}

export function CtaButton({
  children,
  tone = "primary",
  shape = "pill",
  className = "",
  type = "submit",
}: {
  children: ReactNode;
  tone?: Tone;
  shape?: Shape;
  className?: string;
  type?: "submit" | "button";
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center whitespace-nowrap transition select-none cursor-pointer ${tones[tone]} ${shapes[shape]} ${className}`}
    >
      {children}
    </button>
  );
}
