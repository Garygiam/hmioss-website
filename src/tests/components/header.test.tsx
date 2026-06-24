import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import enCommon from "../../../public/locales/en/common.json";

import { Header } from "@/components/layout/Header";
import { siteConfig } from "@/config/site";
import { localeDisplayLabels } from "@/config/i18n";
import { buildLocalizedPath, getAlternateLocalePath } from "@/lib/locale";

const pushMock = vi.fn();
const setItemMock = vi.fn();

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
    query: {
      locale: "en",
    },
    asPath: "/en/about?lang=en",
    push: pushMock,
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

describe("Header", () => {
  beforeEach(() => {
    pushMock.mockReset();
    setItemMock.mockReset();
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: {
        setItem: setItemMock,
      },
    });
  });

  it("reveals the mobile navigation links when the menu toggle is activated", () => {
    render(<Header />);

    fireEvent.click(screen.getByRole("button", { name: "Open navigation menu" }));

    const mobileNavigation = screen.getByRole("navigation", { name: "Mobile navigation" });

    for (const item of siteConfig.navItems) {
      expect(
        within(mobileNavigation).getByRole("link", {
          name: enCommon.nav[item.key],
        }),
      ).toHaveAttribute("href", buildLocalizedPath("en", item.href));
    }
  });

  it("keeps the language switcher usable in the mobile navigation", () => {
    render(<Header />);

    fireEvent.click(screen.getByRole("button", { name: "Open navigation menu" }));

    const mobileNavigation = screen.getByRole("navigation", { name: "Mobile navigation" });
    const languageSelect = within(mobileNavigation.parentElement as HTMLElement).getByRole("combobox", {
      name: enCommon.language.label,
    });

    expect(languageSelect).toBeInTheDocument();
    expect(within(languageSelect).getByRole("option", { name: localeDisplayLabels.ms })).toBeInTheDocument();

    fireEvent.change(languageSelect, {
      target: {
        value: "ms",
      },
    });

    expect(setItemMock).toHaveBeenCalledWith("hmioss:locale", "ms");
    expect(pushMock).toHaveBeenCalledWith(getAlternateLocalePath("/en/about?lang=en", "ms"));
  });
});
