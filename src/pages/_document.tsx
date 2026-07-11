import Document, {
  Head,
  Html,
  Main,
  NextScript,
  type DocumentContext,
  type DocumentInitialProps,
} from "next/document";

import { getCompatibilityBrandAssetPath, hmiossBrandRegistry } from "@/config/brand-registry";

type LocaleHtmlLang = "en" | "ms" | "zh-Hant" | "zh-Hans";

function resolveHtmlLang(pathname: string): LocaleHtmlLang {
  const segment = pathname.split("?")[0]?.split("/")[1];

  if (segment === "zh-TW") {
    return "zh-Hant";
  }

  if (segment === "zh-CN") {
    return "zh-Hans";
  }

  if (segment === "ms") {
    return "ms";
  }

  return "en";
}

export default class HmiossDocument extends Document<{ htmlLang: LocaleHtmlLang }> {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps & { htmlLang: LocaleHtmlLang }> {
    const initialProps = await Document.getInitialProps(ctx);
    const requestPath = ctx.req?.url ?? "/";

    return {
      ...initialProps,
      htmlLang: resolveHtmlLang(requestPath),
    };
  }

  render() {
    const { favicons, manifest } = hmiossBrandRegistry.assets;

    return (
      <Html lang={this.props.htmlLang}>
        <Head>
          <link href={getCompatibilityBrandAssetPath(favicons.ico)} rel="icon" sizes="any" />
          <link
            href={getCompatibilityBrandAssetPath(favicons.png32)}
            rel="icon"
            sizes={favicons.png32.sizes}
            type={favicons.png32.type}
          />
          <link
            href={getCompatibilityBrandAssetPath(favicons.png16)}
            rel="icon"
            sizes={favicons.png16.sizes}
            type={favicons.png16.type}
          />
          <link
            href={getCompatibilityBrandAssetPath(favicons.appleTouchIcon)}
            rel="apple-touch-icon"
            sizes={favicons.appleTouchIcon.sizes}
          />
          <link href={getCompatibilityBrandAssetPath(manifest)} rel="manifest" />
        </Head>
        <body className="antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
