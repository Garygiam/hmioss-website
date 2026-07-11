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
  url: "https://hmioss.org",
  defaultLocale,
  locales: supportedLocales,
  localeLabels,
  localeDisplayLabels,
  address: "F01, First Floor, The Heritage, Jalan Dagang SB, 43300 Seri Kembangan, Selangor",
  phone: "+603-87339334",
  email: "secretariat@hmioss.org",
  stats: [
    { value: "Strategic", labelKey: "stats.partnerships" },
    { value: "Leadership", labelKey: "stats.programmes" },
    { value: "Education", labelKey: "stats.education" },
    { value: "Community", labelKey: "stats.community" },
    { value: "Institutional", labelKey: "stats.network" },
  ],
  socialLinks: [
    { label: "WeChat", href: "https://wechat.com" },
    { label: "WhatsApp", href: "https://wa.me/60387339334" },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ],
  navItems: [
    { key: "home", href: "/" },
    { key: "about", href: "/about" },
    { key: "missionVision", href: "/mission-vision" },
    { key: "leadership", href: "/leadership" },
    { key: "programmes", href: "/programmes" },
    { key: "partners", href: "/partners" },
    { key: "impact", href: "/impact" },
    { key: "institutionalHistory", href: "/institutional-history" },
    { key: "news", href: "/news" },
    { key: "join", href: "/join" },
    { key: "contact", href: "/contact" },
  ] as const,
} as const;

export const placeholderImages = {
  hero:
    "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=modern%20malaysian%20institutional%20campus%20with%20strategic%20planning%20room%2C%20elegant%20civic%20architecture%2C%20professional%20documentary%20photography%2C%20warm%20natural%20light%2C%20premium%20editorial%20website%20hero&image_size=landscape_16_9",
  story: "/images/institutional-vision.svg",
  graduation:
    "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=graduation%20ceremony%20at%20a%20modern%20university%20in%20malaysia%2C%20formal%20robes%2C%20institutional%20documentary%20photography%2C%20clean%20website%20visual&image_size=landscape_4_3",
  defence:
    "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=malaysian%20reserve%20officer%20leadership%20training%20camp%2C%20professional%20documentary%20photography%2C%20disciplined%20formation%2C%20credible%20institutional%20visual&image_size=landscape_4_3",
};

export function isLocale(value: string): value is Locale {
  return supportedLocales.includes(value as Locale);
}
