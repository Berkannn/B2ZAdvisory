import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["tr", "en"],
  defaultLocale: "tr",
  pathnames: {
    "/": "/",
    "/hizmetler": {
      tr: "/hizmetler",
      en: "/services",
    },
    "/cbam-nedir": {
      tr: "/cbam-nedir",
      en: "/what-is-cbam",
    },
    "/hakkimizda": {
      tr: "/hakkimizda",
      en: "/about",
    },
    "/iletisim": {
      tr: "/iletisim",
      en: "/contact",
    },
  },
});

export type AppPathnames = keyof typeof routing.pathnames;
