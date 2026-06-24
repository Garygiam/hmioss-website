import { generateNextSeo } from "next-seo/pages";

import type { Locale } from "@/config/i18n";
import { getPageSeo } from "@/lib/seo";

type PageSeoProps = {
  locale: Locale;
  path: string;
  title: string;
  description: string;
};

export function PageSeo({ locale, path, title, description }: PageSeoProps) {
  return <>{generateNextSeo(getPageSeo({ locale, path, title, description }))}</>;
}
