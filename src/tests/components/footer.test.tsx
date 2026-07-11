/* eslint-disable @next/next/no-img-element */
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import enCommon from "../../../public/locales/en/common.json";

import { Footer } from "@/components/layout/Footer";
import { hmiossBrandRegistry } from "@/config/brand-registry";
import { buildLocalizedPath } from "@/lib/locale";

vi.mock("next/image", () => ({
  default: ({ alt, src, ...props }: Record<string, unknown>) => {
    const { priority, ...imageProps } = props;
    void priority;

    return (
      <img
        alt={typeof alt === "string" ? alt : ""}
        src={typeof src === "string" ? src : ""}
        {...imageProps}
      />
    );
  },
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("next/router", () => ({
  useRouter: () => ({
    query: {
      locale: "en",
    },
  }),
}));

vi.mock("next-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const value = key
        .split(".")
        .reduce<unknown>((current, segment) => {
          if (typeof current === "object" && current !== null && segment in current) {
            return (current as Record<string, unknown>)[segment];
          }

          return undefined;
        }, enCommon);

      return typeof value === "string" ? value : key;
    },
  }),
}));

describe("Footer", () => {
  it("renders the approved footer wordmark as the localized home link", () => {
    render(<Footer />);

    const homeLink = screen.getByRole("link", { name: "HMIOSS home" });
    const logo = within(homeLink).getByRole("img", {
      name: hmiossBrandRegistry.assets.wordmark.light.alt,
    });

    expect(homeLink).toHaveAttribute("href", buildLocalizedPath("en", "/"));
    expect(homeLink).toHaveClass("focus-visible:ring-2");
    expect(logo).toHaveAttribute("src", hmiossBrandRegistry.assets.wordmark.light.normalized);
  });

  it("renders the approved public contact information", () => {
    render(<Footer />);

    expect(screen.getByText("hello@hmioss.org", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("+603-5878 6029", { exact: false })).toBeInTheDocument();
  });
});
