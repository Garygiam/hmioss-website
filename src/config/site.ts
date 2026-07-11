import {
  defaultLocale,
  localeDisplayLabels,
  localeLabels,
  supportedLocales,
} from "@/config/i18n";
import type { Locale } from "@/config/i18n";

export const siteConfig = {
  name: "International Hung Men Institute of Strategic Studies",
  shortName: "HMIOSS",
  tagline: "Legacy of Honor. Future of Strategy.",
  description:
    "A strategic studies institute empowering communities through education, research, and national service.",
  url: "https://www.hmioss.org",
  defaultLocale,
  locales: supportedLocales,
  localeLabels,
  localeDisplayLabels,
  address: "F01, First Floor, The Heritage, Jalan Dagang SB, 43300 Seri Kembangan, Selangor",
  phone: "+603-5878 6029",
  email: "hello@hmioss.org",
  stats: [
    { value: "Strategic", labelKey: "stats.partnerships" },
    { value: "Leadership", labelKey: "stats.programmes" },
    { value: "Education", labelKey: "stats.education" },
    { value: "Community", labelKey: "stats.community" },
    { value: "Institutional", labelKey: "stats.network" },
  ],
  socialLinks: [],
  navItems: [
    { key: "home", href: "/" },
    { key: "about", href: "/about" },
    { key: "leadership", href: "/leadership" },
    { key: "programmes", href: "/programmes" },
    { key: "partners", href: "/partners" },
    { key: "news", href: "/news" },
    { key: "impact", href: "/impact" },
    { key: "recognition", href: "/recognition" },
    { key: "institutionalHistory", href: "/institutional-history" },
    { key: "contact", href: "/contact" },
  ] as const,
} as const;

export const placeholderImages = {
  hero: undefined,
  story: undefined,
  graduation: undefined,
  defence: undefined,
};

export function isLocale(value: string): value is Locale {
  return supportedLocales.includes(value as Locale);
}
