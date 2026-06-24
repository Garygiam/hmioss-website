import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";

import nextI18NextConfig from "../../next-i18next.config.js";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { bodyFont, headingFont } from "@/lib/fonts";
import type { NextPageWithLayout } from "@/types/page";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? ((page) => <SiteLayout>{page}</SiteLayout>);

  return (
    <div className={`${bodyFont.variable} ${headingFont.variable}`.trim()}>
      {getLayout(<Component {...pageProps} />)}
    </div>
  );
}

export default appWithTranslation(App, nextI18NextConfig);
