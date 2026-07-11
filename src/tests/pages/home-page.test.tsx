/* eslint-disable @next/next/no-img-element */
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import enCommon from "../../../public/locales/en/common.json";
import enHome from "../../../public/locales/en/home.json";

import HomePage from "@/pages/[locale]/index";

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
    t: (key: string, options?: { returnObjects?: boolean }) => {
      const [namespace, ...segments] = key.split(":");
      const bundle = namespace === "common" ? enCommon : enHome;
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

describe("LocalizedHomePage", () => {
  it("renders homepage authority, pillars, metrics, and institutional vision content", () => {
    render(<HomePage locale="en" />);

    expect(screen.getByText(enHome.hero.value)).toBeInTheDocument();

    for (const item of enHome.authority.items) {
      expect(screen.getAllByText(item).length).toBeGreaterThan(0);
    }

    expect(screen.getByRole("heading", { name: enHome.pillars.title })).toBeInTheDocument();

    for (const pillar of enHome.pillars.items) {
      expect(screen.getAllByText(pillar.title).length).toBeGreaterThan(0);
      expect(screen.getByText(pillar.description)).toBeInTheDocument();
    }

    for (const label of [
      enCommon.stats.partnerships,
      enCommon.stats.programmes,
      enCommon.stats.education,
      enCommon.stats.community,
      enCommon.stats.network,
    ]) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }

    expect(screen.getByText(enHome.vision.eyebrow)).toBeInTheDocument();
    expect(screen.getByText(enHome.vision.title)).toBeInTheDocument();
    expect(screen.getByText(enHome.vision.quote)).toBeInTheDocument();
    expect(screen.getByText(enHome.vision.body)).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: enHome.vision.cta,
      }),
    ).toHaveAttribute("href", "/en/mission-vision?lang=en");
  });

  it("uses a solid institutional hero and vision surface instead of placeholder imagery", () => {
    render(<HomePage locale="en" />);

    expect(screen.queryByAltText("International Hung Men Institute of Strategic Studies")).not.toBeInTheDocument();
  });
});
