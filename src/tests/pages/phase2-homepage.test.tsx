/* eslint-disable @next/next/no-img-element */
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import enCommon from "../../../public/locales/en/common.json";
import enHome from "../../../public/locales/en/home.json";
import msHome from "../../../public/locales/ms/home.json";

import HomePage from "@/pages/[locale]/index";

let mockLocale = "en";
let mockHomeBundle = enHome;

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
      const [namespace, ...segments] = key.split(":");
      const bundle = namespace === "common" ? enCommon : mockHomeBundle;
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
        return value;
      }

      return typeof value === "string" ? value : key;
    },
  }),
}));

vi.mock("@/components/seo/PageSeo", () => ({
  PageSeo: () => null,
}));

describe("Phase 2 homepage", () => {
  it("renders the flagship programme section after Why HMIOSS and before metrics", () => {
    mockLocale = "en";
    mockHomeBundle = enHome;
    render(<HomePage locale="en" />);

    const whyHmiossHeading = screen.getByRole("heading", { name: enHome.pillars.title });
    const flagshipHeading = screen.getByRole("heading", { name: enHome.flagship.title });
    const metricsLabel = screen.getAllByText(enCommon.stats.partnerships).at(-1);

    expect(metricsLabel).toBeDefined();
    expect(
      whyHmiossHeading.compareDocumentPosition(flagshipHeading) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      flagshipHeading.compareDocumentPosition(metricsLabel as Node) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();

    expect(screen.getByText(enHome.flagship.description)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: enHome.flagship.pathwayTitle })).toBeInTheDocument();
  });

  it("renders the homepage partnership summary and final conversion CTA block", () => {
    mockLocale = "en";
    mockHomeBundle = enHome;
    render(<HomePage locale="en" />);

    expect(
      screen.getByRole("heading", { name: enHome.partnershipSummary.title }),
    ).toBeInTheDocument();

    for (const category of enHome.partnershipSummary.categories) {
      expect(screen.getByText(category.title)).toBeInTheDocument();
      expect(screen.getByText(category.summary)).toBeInTheDocument();
    }

    expect(screen.getByRole("heading", { name: enHome.finalCta.title })).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: enHome.finalCta.primary }).at(-1),
    ).toHaveAttribute("href", "/en/programmes?lang=en");
    expect(
      screen.getAllByRole("link", { name: enHome.finalCta.secondary }).at(-1),
    ).toHaveAttribute("href", "/en/partners?lang=en");
    expect(
      screen.getAllByRole("link", { name: enHome.finalCta.tertiary }).at(-1),
    ).toHaveAttribute("href", "/en/contact?lang=en");
  });

  it("renders Malay flagship positioning and outcome cards from locale content", () => {
    mockLocale = "ms";
    mockHomeBundle = msHome;

    render(<HomePage locale="ms" />);

    expect(screen.getByRole("heading", { name: msHome.flagship.title })).toBeInTheDocument();
    expect(screen.getAllByText(msHome.flagship.positioning[0]).length).toBeGreaterThan(0);
    expect(screen.getAllByText(msHome.flagship.positioning[4]).length).toBeGreaterThan(0);
    expect(screen.getAllByText(msHome.flagship.outcomes[0]).length).toBeGreaterThan(0);
    expect(screen.getAllByText(msHome.flagship.outcomes[4]).length).toBeGreaterThan(0);
  });
});
