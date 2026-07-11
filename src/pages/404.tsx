import Link from "next/link";
import { useRouter } from "next/router";

import { BrandLogo } from "@/components/brand/BrandLogo";
import { hmiossBrandRegistry } from "@/config/brand-registry";
import { supportedLocales } from "@/config/i18n";
import { buildLocalizedPath } from "@/lib/locale";

import type { NextPageWithLayout } from "@/types/page";

type SupportedLocale = (typeof supportedLocales)[number];

const notFoundCopy: Record<
  SupportedLocale,
  {
    heading: string;
    explanation: string;
    returnHomeLabel: string;
  }
> = {
  en: {
    heading: "Page Not Found",
    explanation:
      "The page you are looking for may have moved, been removed, or is temporarily unavailable.",
    returnHomeLabel: "Return to HMIOSS Home",
  },
  ms: {
    heading: "Halaman Tidak Dijumpai",
    explanation:
      "Halaman yang anda cari mungkin telah dipindahkan, dibuang, atau tidak tersedia buat sementara waktu.",
    returnHomeLabel: "Kembali ke Laman Utama HMIOSS",
  },
  "zh-CN": {
    heading: "页面不存在",
    explanation: "您要查找的页面可能已被移动、删除，或暂时无法使用。",
    returnHomeLabel: "返回 HMIOSS 首页",
  },
  "zh-TW": {
    heading: "頁面不存在",
    explanation: "您要查找的頁面可能已被移動、刪除，或暫時無法使用。",
    returnHomeLabel: "返回 HMIOSS 首頁",
  },
};

export function inferSupportedLocale(asPath: string | null | undefined): SupportedLocale {
  const pathname = (asPath ?? "").split("?")[0].split("#")[0];
  const firstSegment = pathname.split("/").filter(Boolean)[0];

  if (firstSegment && supportedLocales.includes(firstSegment as SupportedLocale)) {
    return firstSegment as SupportedLocale;
  }

  return "en";
}

const NotFoundPage: NextPageWithLayout = () => {
  const { asPath } = useRouter();
  const locale = inferSupportedLocale(asPath);
  const copy = notFoundCopy[locale];

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F5F5] px-6 py-12">
      <div className="w-full max-w-2xl rounded-[2rem] border border-[#E0E0E0] bg-white px-8 py-10 text-center shadow-sm sm:px-12">
        <div className="flex justify-center">
          <BrandLogo
            asset={hmiossBrandRegistry.assets.wordmark.light}
            className="h-auto w-[180px] sm:w-[220px]"
            priority
          />
        </div>
        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-[#C41E3A]">404</p>
        <h1 className="mt-4 font-heading text-3xl text-[#1A2A3A] sm:text-4xl">{copy.heading}</h1>
        <p className="mt-4 text-base leading-8 text-[#4A4A4A]">{copy.explanation}</p>
        <Link
          className="mt-8 inline-flex items-center justify-center rounded-full border border-[#1A2A3A] px-6 py-3 text-sm font-semibold tracking-[0.18em] uppercase text-[#1A2A3A] transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37] focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:outline-none"
          href={buildLocalizedPath(locale, "/")}
        >
          {copy.returnHomeLabel}
        </Link>
      </div>
    </div>
  );
};

NotFoundPage.getLayout = (page) => page;

export default NotFoundPage;
