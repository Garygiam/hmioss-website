import Document, {
  Head,
  Html,
  Main,
  NextScript,
  type DocumentContext,
  type DocumentInitialProps,
} from "next/document";

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
    return (
      <Html lang={this.props.htmlLang}>
        <Head />
        <body className="antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
