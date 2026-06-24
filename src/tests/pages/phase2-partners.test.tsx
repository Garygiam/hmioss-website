/* eslint-disable @next/next/no-img-element */
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import enPages from "../../../public/locales/en/pages.json";
import zhCnPages from "../../../public/locales/zh-CN/pages.json";

import PartnersPage from "@/pages/[locale]/partners";

let mockLocale = "en";
let mockPagesBundle = enPages;

vi.mock("next/image", () => ({
  default: ({ alt, src, ...props }: Record<string, unknown>) => {
    const sanitizedProps = { ...props };

    delete sanitizedProps.fill;
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
    query: {
      locale: mockLocale,
    },
  }),
}));

vi.mock("next-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, options?: { returnObjects?: boolean }) => {
      const [, ...segments] = key.split(":");
      const value = segments
        .join(":")
        .split(".")
        .reduce<unknown>((current, segment) => {
          if (typeof current === "object" && current !== null && segment in current) {
            return (current as Record<string, unknown>)[segment];
          }

          return undefined;
        }, mockPagesBundle);

      if (options?.returnObjects) {
        return value;
      }

      return typeof value === "string" ? value : key;
    },
  }),
}));

vi.mock("@/components/seo/PageSeo", () => ({
  PageSeo: () => null,
}));

describe("Phase 2 partners page", () => {
  it("renders the full partnership opportunity categories", () => {
    mockLocale = "en";
    mockPagesBundle = enPages;
    render(<PartnersPage locale="en" />);

    expect(
      screen.getByRole("heading", { name: enPages.partners.phase2.opportunities.title }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { name: enPages.partners.phase2.categories[0].title })).toHaveLength(2);
    expect(screen.getAllByRole("heading", { name: enPages.partners.phase2.categories[1].title })).toHaveLength(2);
    expect(screen.getAllByRole("heading", { name: enPages.partners.phase2.categories[2].title })).toHaveLength(2);
    expect(screen.getAllByRole("heading", { name: enPages.partners.phase2.categories[3].title })).toHaveLength(2);
    expect(screen.getAllByRole("heading", { name: enPages.partners.phase2.categories[4].title })).toHaveLength(2);
    expect(screen.getAllByRole("heading", { name: enPages.partners.phase2.categories[5].title })).toHaveLength(2);
  });

  it("renders Simplified Chinese partnership content from locale files", () => {
    mockLocale = "zh-CN";
    mockPagesBundle = zhCnPages;

    render(<PartnersPage locale="zh-CN" />);

    expect(screen.getByText(zhCnPages.partners.phase2.heroBody)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: zhCnPages.partners.phase2.rationale.title }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: zhCnPages.partners.phase2.opportunities.title }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { name: zhCnPages.partners.phase2.categories[0].title })).toHaveLength(2);
    expect(screen.getByText(zhCnPages.partners.phase2.categories[0].collaborationModes[0])).toBeInTheDocument();
  });
});
