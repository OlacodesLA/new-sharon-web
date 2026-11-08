import Image from "next/image";
import Link from "next/link";

export function Mark({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/images/logo.png"
      alt=""
      width={192}
      height={192}
      className={`h-auto w-full ${className}`}
      priority
    />
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-headline-sans text-[1.35rem] font-bold leading-none tracking-[-0.04em] ${className}`}
    >
      Sharon Parish
    </span>
  );
}

export function Logo({
  href = "/",
  onClick,
  markOnly = false,
  className = "",
}: {
  href?: string;
  onClick?: () => void;
  markOnly?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`inline-flex items-center gap-3 text-current transition hover:opacity-80 ${className}`}
      aria-label="Sharon Parish"
    >
      {markOnly ? (
        <Image
          src="/images/logo.png"
          alt=""
          width={48}
          height={48}
          className="h-11 w-11"
          priority
        />
      ) : (
        <>
          <Image
            src="/images/logo.png"
            alt=""
            width={48}
            height={48}
            className="h-11 w-11 md:hidden"
            priority
          />
          <span className="hidden items-center gap-3 md:inline-flex">
            <Image
              src="/images/logo.png"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10"
              priority
            />
            <Wordmark />
          </span>
        </>
      )}
    </Link>
  );
}
