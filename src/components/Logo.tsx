import Image from "next/image";
import Link from "next/link";

export default function Logo({
  locale,
  variant = "light",
  className = "",
}: {
  locale: string;
  variant?: "light" | "dark";
  className?: string;
}) {
  const isDark = variant === "dark";

  return (
    <Link
      href={`/${locale}`}
      className={`group inline-flex items-center gap-3 ${className}`}
      aria-label="B2Z Advisory"
    >
      <span className="relative flex h-20 w-20 shrink-0 items-center justify-center transition-transform group-hover:scale-105">
        <Image
          src="/logo-mark.png"
          alt=""
          width={80}
          height={80}
          className="h-full w-full object-contain"
          priority
        />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-lg font-bold tracking-tight ${
            isDark ? "text-white" : "text-carbon-900"
          }`}
        >
          B2Z <span className="font-normal">Advisory</span>
        </span>
        <span
          className={`mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] ${
            isDark ? "text-brand-300" : "text-brand-600"
          }`}
        >
          Business to Zero Carbon
        </span>
      </span>
    </Link>
  );
}
