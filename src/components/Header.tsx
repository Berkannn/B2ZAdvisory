"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import Logo from "./Logo";
import LocaleSwitcher from "./LocaleSwitcher";

const navItems = [
  { href: "/", key: "home" },
  { href: "/hizmetler", key: "services" },
  { href: "/cbam-nedir", key: "cbam" },
  { href: "/hakkimizda", key: "about" },
  { href: "/iletisim", key: "contact" },
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled
          ? "border-b border-carbon-100 bg-paper/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-page flex items-center justify-between px-6 py-4 lg:px-8">
        <Logo locale={locale} />

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  active
                    ? "text-brand-700"
                    : "text-carbon-600 hover:text-brand-700"
                }`}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LocaleSwitcher />
          <Link href="/iletisim" className="btn-primary">
            {t("cta")}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-full border border-carbon-200 bg-white p-2 text-carbon-800 lg:hidden"
          aria-label="Menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-carbon-100 bg-paper px-6 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-brand-50 text-brand-700"
                      : "text-carbon-700 hover:bg-carbon-50"
                  }`}
                >
                  {t(item.key)}
                </Link>
              );
            })}
          </nav>
          <div className="mt-4 flex items-center justify-between gap-4">
            <LocaleSwitcher />
            <Link href="/iletisim" className="btn-primary flex-1">
              {t("cta")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
