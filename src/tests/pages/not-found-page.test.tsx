/* eslint-disable @next/next/no-img-element */
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { hmiossBrandRegistry } from "@/config/brand-registry";
import { buildLocalizedPath } from "@/lib/locale";
import * as NotFoundModule from "@/pages/404";

let mockAsPath = "/en/unknown-page";

vi.mock("next/image", () => ({
  default: ({ alt, src, ...props }: Record<string, unknown>) => {
    const sanitizedProps = { ...props };

    delete sanitizedProps.priority;

    return (
      <img
        alt={typeof alt === "string" ? alt : ""}
        src={typeof src === "string" ? src : ""}
        {...sanitizedProps}
      />
    );
  },
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("next/router", () => ({
  useRouter: () => ({
    asPath: mockAsPath,
  }),
}));

const localizedExpectations = [
  {
    asPath: "/en/unknown-page",
    locale: "en",
    heading: "Page Not Found",
    explanation: "The page you are looking for may have moved, been removed, or is temporarily unavailable.",
    returnHomeLabel: "Return to HMIOSS Home",
  },
  {
    asPath: "/ms/unknown-page",
    locale: "ms",
    heading: "Halaman Tidak Dijumpai",
    explanation:
      "Halaman yang anda cari mungkin telah dipindahkan, dibuang, atau tidak tersedia buat sementara waktu.",
    returnHomeLabel: "Kembali ke Laman Utama HMIOSS",
  },
  {
    asPath: "/zh-CN/unknown-page",
    locale: "zh-CN",
    heading: "页面不存在",
    explanation: "您要查找的页面可能已被移动、删除，或暂时无法使用。",
    returnHomeLabel: "返回 HMIOSS 首页",
  },
  {
    asPath: "/zh-TW/unknown-page",
    locale: "zh-TW",
    heading: "頁面不存在",
    explanation: "您要查找的頁面可能已被移動、刪除，或暫時無法使用。",
    returnHomeLabel: "返回 HMIOSS 首頁",
  },
  {
    asPath: "/unknown-page",
    locale: "en",
    heading: "Page Not Found",
    explanation: "The page you are looking for may have moved, been removed, or is temporarily unavailable.",
    returnHomeLabel: "Return to HMIOSS Home",
  },
] as const;

describe("NotFoundPage", () => {
  it("exports inferSupportedLocale and resolves supported locales with an English fallback", () => {
    expect(NotFoundModule).toHaveProperty("inferSupportedLocale");

    if (!("inferSupportedLocale" in NotFoundModule)) {
      return;
    }

    const inferSupportedLocale = NotFoundModule.inferSupportedLocale as (
      asPath: string | null | undefined,
    ) => string;

    expect(inferSupportedLocale("/en/unknown-page")).toBe("en");
    expect(inferSupportedLocale("/ms/unknown-page")).toBe("ms");
    expect(inferSupportedLocale("/zh-CN/unknown-page")).toBe("zh-CN");
    expect(inferSupportedLocale("/zh-TW/unknown-page")).toBe("zh-TW");
    expect(inferSupportedLocale("/unknown-page")).toBe("en");
    expect(inferSupportedLocale(undefined)).toBe("en");
  });

  it.each(localizedExpectations)(
    "renders the approved brand wordmark and localized recovery path for $asPath",
    ({ asPath, locale, heading, explanation, returnHomeLabel }) => {
      mockAsPath = asPath;

      render(<NotFoundModule.default />);

      const logo = screen.getByRole("img", {
        name: hmiossBrandRegistry.assets.wordmark.light.alt,
      });
      const returnHomeLink = screen.getByRole("link", { name: returnHomeLabel });

      expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
      expect(screen.getByText(explanation)).toBeInTheDocument();
      expect(logo).toHaveAttribute("src", hmiossBrandRegistry.assets.wordmark.light.normalized);
      expect(returnHomeLink).toHaveAttribute("href", buildLocalizedPath(locale, "/"));
      expect(returnHomeLink).toHaveClass("focus-visible:ring-2");
    },
  );
});
