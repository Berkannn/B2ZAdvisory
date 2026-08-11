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
      <span
        className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
          isDark ? "bg-brand-500" : "bg-brand-600"
        } shadow-sm shadow-brand-900/20 transition-transform group-hover:scale-105`}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 15c0-6.075 4.925-11 11-11h1v1c0 6.075-4.925 11-11 11H4v-1z"
            fill="white"
            fillOpacity="0.95"
          />
          <path
            d="M4.5 19.5 13 11"
            stroke={isDark ? "#0a221c" : "#163f33"}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
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
