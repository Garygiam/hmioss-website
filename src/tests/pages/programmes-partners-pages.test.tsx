/* eslint-disable @next/next/no-img-element */
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import enPages from "../../../public/locales/en/pages.json";

import ProgrammesPage from "@/pages/[locale]/programmes";
import PartnersPage from "@/pages/[locale]/partners";

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
        }, enPages);

      if (options?.returnObjects) {
        return value;
      }

      return typeof value === "string" ? value : key;
    },
  }),
}));

vi.mock("@/components/seo/PageSeo", () => ({
  PageSeo: (props: Record<string, unknown>) => {
    pageSeoSpy(props);
    return null;
  },
}));

describe("ProgrammesPage", () => {
  beforeEach(() => {
    pageSeoSpy.mockClear();
  });

  it("renders the flagship landing page sections and final conversion block", () => {
    render(<ProgrammesPage />);

    expect(
      screen.getByRole("heading", { name: enPages.programmes.phase2.heroTitle }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: enPages.programmes.phase2.sections.whyThisProgramme.title,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(enPages.programmes.phase2.heroStrapline)).toBeInTheDocument();

    for (const point of enPages.programmes.phase2.sections.whyThisProgramme.points) {
      expect(screen.getByText(point)).toBeInTheDocument();
    }

    expect(
      screen.getByRole("heading", { name: enPages.programmes.phase2.pathway.title }),
    ).toBeInTheDocument();

    for (const step of enPages.programmes.phase2.pathway.items) {
      expect(screen.getAllByText(step.title).length).toBeGreaterThan(0);
    }

    expect(
      screen.getByRole("heading", {
        name: enPages.programmes.phase2.sections.industryExposure.title,
      }),
    ).toBeInTheDocument();

    for (const outcome of enPages.programmes.phase2.outcomes) {
      expect(screen.getAllByText(outcome).length).toBeGreaterThan(0);
    }

    expect(
      screen.getByRole("heading", {
        name: enPages.programmes.phase2.sections.roleOfHmioss.title,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: enPages.programmes.phase2.sections.roleOfGenovasi.title,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: enPages.programmes.phase2.sections.entryRequirements.title,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(enPages.programmes.phase2.cta.title)).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: enPages.programmes.primaryCta }).at(-1)).toHaveAttribute(
      "href",
      "/en/join?lang=en",
    );
    expect(
      screen.getAllByRole("link", { name: enPages.programmes.secondaryCta }).at(-1),
    ).toHaveAttribute("href", "/en/contact?lang=en");
    expect(screen.getByRole("link", { name: enPages.programmes.tertiaryCta })).toHaveAttribute(
      "href",
      "/en/contact?lang=en",
    );
  });

  it("provides SEO metadata for the programmes page", () => {
    render(<ProgrammesPage />);

    expect(pageSeoSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        locale: "en",
        path: "/programmes",
        title: `${enPages.programmes.title} | HMIOSS`,
      }),
    );
  });
});

describe("PartnersPage", () => {
  beforeEach(() => {
    pageSeoSpy.mockClear();
  });

  it("renders the partnership rationale shell and the six opportunity categories", () => {
    render(<PartnersPage />);

    expect(
      screen.getByRole("heading", { name: enPages.partners.phase2.rationale.title }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: enPages.partners.phase2.opportunities.title }),
    ).toBeInTheDocument();

    for (const category of enPages.partners.phase2.categories) {
      expect(screen.getAllByRole("heading", { name: category.title })).toHaveLength(2);
      expect(screen.getAllByText(category.summary)).toHaveLength(2);
      expect(screen.getByText(category.value)).toBeInTheDocument();

      for (const mode of category.collaborationModes) {
        expect(screen.getByText(mode)).toBeInTheDocument();
      }
    }
  });

  it("provides SEO metadata for the partners page", () => {
    render(<PartnersPage />);

    expect(pageSeoSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        locale: "en",
        path: "/partners",
        title: `${enPages.partners.title} | HMIOSS`,
      }),
    );
  });
});
