/* eslint-disable @next/next/no-img-element */
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import enImpact from "../../../public/locales/en/impact.json";
import enPages from "../../../public/locales/en/pages.json";
import msPages from "../../../public/locales/ms/pages.json";
import zhCnPages from "../../../public/locales/zh-CN/pages.json";
import zhTwPages from "../../../public/locales/zh-TW/pages.json";

import JoinPage from "@/pages/[locale]/join";
import NewsPage from "@/pages/[locale]/news";

const pageSeoSpy = vi.fn();

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
      locale: "en",
    },
  }),
}));

vi.mock("next-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, options?: { returnObjects?: boolean; defaultValue?: unknown }) => {
      const [namespace, ...segments] = key.split(":");
      const bundles = {
        impact: enImpact,
        pages: enPages,
      } as const;
      const bundle = bundles[namespace as keyof typeof bundles];
      const value = segments
        .join(":")
        .split(".")
        .reduce<unknown>((current, segment) => {
          if (typeof current === "object" && current !== null && segment in current) {
            return (current as Record<string, unknown>)[segment];
          }

          return undefined;
        }, bundle);

      if (options?.returnObjects) {
        return value ?? options.defaultValue;
      }

      return typeof value === "string" ? value : key;
    },
  }),
}));

vi.mock("@/components/forms/MembershipForm", () => ({
  MembershipForm: () => <div data-testid="membership-form">Membership form</div>,
}));

vi.mock("@/components/seo/PageSeo", () => ({
  PageSeo: (props: Record<string, unknown>) => {
    pageSeoSpy(props);
    return null;
  },
}));

describe("news, join, and impact pages", () => {
  beforeEach(() => {
    pageSeoSpy.mockClear();
  });

  it("defines localized news filters and join journey content for every supported locale", () => {
    for (const bundle of [enPages, zhTwPages, zhCnPages, msPages]) {
      expect(bundle.news.filters).toMatchObject({
        all: expect.any(String),
        news: expect.any(String),
        events: expect.any(String),
        announcements: expect.any(String),
      });
      expect(bundle.join.journey.items).toHaveLength(4);
      expect(bundle.join.faq.items.length).toBeGreaterThan(0);
    }
  });

  it("renders localized news filters and narrows the visible cards", () => {
    render(<NewsPage />);

    fireEvent.click(screen.getByRole("button", { name: enPages.news.filters.events }));

    expect(
      screen.getByRole("heading", { name: "Delegation Visit" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Opening Ceremony Marks HMIOSS Launch" }),
    ).not.toBeInTheDocument();
  });

  it("provides SEO metadata for the news page", () => {
    render(<NewsPage />);

    expect(pageSeoSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        locale: "en",
        path: "/news",
        title: `${enPages.news.title} | HMIOSS`,
      }),
    );
  });

  it("uses a local navy fallback for the Opening Ceremony card instead of an external image", () => {
    render(<NewsPage />);

    expect(
      screen.queryByAltText("Guests officiate the HMIOSS opening ceremony"),
    ).not.toBeInTheDocument();
    expect(
      screen.getByLabelText("Opening Ceremony Marks HMIOSS Launch fallback"),
    ).toBeInTheDocument();
  });

  it("renders the localized membership journey and FAQ alongside the form", () => {
    render(<JoinPage />);

    expect(
      screen.getByRole("heading", { name: enPages.join.journey.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(enPages.join.journey.items[0].title)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: enPages.join.faq.title })).toBeInTheDocument();
    expect(screen.getByText(enPages.join.faq.items[0].question)).toBeInTheDocument();
    expect(screen.getByText(enPages.join.faq.items[0].answer)).toBeInTheDocument();
    expect(screen.getByTestId("membership-form")).toBeInTheDocument();
  });

  it("provides SEO metadata for the join page", () => {
    render(<JoinPage />);

    expect(pageSeoSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        locale: "en",
        path: "/join",
        title: `${enPages.join.title} | HMIOSS`,
      }),
    );
  });

  it("keeps the join pathway headings balanced on narrow cards", () => {
    render(<JoinPage />);

    expect(screen.getByText("Onboarding & Orientation")).toHaveClass("text-balance");
    expect(screen.getByText("Participate & Grow")).toHaveClass("text-balance");
  });

  it("renders the impact page with localized highlights, proof sections, and CTA links", async () => {
    const impactModule = await import("@/pages/[locale]/impact");
    const ImpactPage = impactModule.default;

    render(<ImpactPage locale="en" />);

    expect(
      screen.getByRole("heading", { name: enImpact.highlightsTitle }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: enImpact.sectionsTitle }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(enImpact.highlights.leadership.label).length,
    ).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: enImpact.sections.members.title })).toBeInTheDocument();
    expect(screen.getByText(enImpact.cta.title)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: enImpact.cta.primary })).toHaveAttribute(
      "href",
      "/en/contact?lang=en",
    );
    expect(screen.getByRole("link", { name: enImpact.cta.secondary })).toHaveAttribute(
      "href",
      "/en/programmes?lang=en",
    );
  });
});
