import { useEffect } from "react";
import { useRouter } from "next/router";

import { siteConfig } from "@/config/site";
import { buildLocalizedPath, detectPreferredLocale } from "@/lib/locale";
import { useLanguageSwitcher } from "@/hooks/useLanguageSwitcher";
import type { NextPageWithLayout } from "@/types/page";

const Home: NextPageWithLayout = () => {
  const router = useRouter();
  const { storageKey } = useLanguageSwitcher();

  useEffect(() => {
    const storedLocale =
      typeof window !== "undefined" ? localStorage.getItem(storageKey) : null;

    const preferredLocale = detectPreferredLocale({
      search: typeof window !== "undefined" ? window.location.search : "",
      storedLocale,
      browserLanguage: typeof navigator !== "undefined" ? navigator.language : null,
    });

    void router.replace(buildLocalizedPath(preferredLocale, "/"));
  }, [router, storageKey]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F5F5] px-6">
      <div className="w-full max-w-md rounded-2xl border border-[#E0E0E0] bg-white p-8 text-center shadow-sm">
        <p className="font-heading text-2xl text-[#1A2A3A]">{siteConfig.shortName}</p>
        <p className="mt-4 text-sm leading-7 text-[#4A4A4A]">
          Redirecting to your preferred language…
        </p>
      </div>
    </div>
  );
};

Home.getLayout = (page) => page;

export default Home;
