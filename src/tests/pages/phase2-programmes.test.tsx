/* eslint-disable @next/next/no-img-element */
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import enPages from "../../../public/locales/en/pages.json";
import msPages from "../../../public/locales/ms/pages.json";

import ProgrammesPage from "@/pages/[locale]/programmes";

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

describe("Phase 2 programmes page", () => {
  it("renders the flagship conversion sections in the approved order", () => {
    mockLocale = "en";
    mockPagesBundle = enPages;
    render(<ProgrammesPage locale="en" />);

    const whyThisProgramme = screen.getByRole("heading", {
      name: enPages.programmes.phase2.sections.whyThisProgramme.title,
    });
    const careerPathways = screen.getByRole("heading", {
      name: enPages.programmes.phase2.pathway.title,
    });
    const industryExposure = screen.getByRole("heading", {
      name: enPages.programmes.phase2.sections.industryExposure.title,
    });
    const roleOfHmioss = screen.getByRole("heading", {
      name: enPages.programmes.phase2.sections.roleOfHmioss.title,
    });
    const roleOfGenovasi = screen.getByRole("heading", {
      name: enPages.programmes.phase2.sections.roleOfGenovasi.title,
    });
    const entryRequirements = screen.getByRole("heading", {
      name: enPages.programmes.phase2.sections.entryRequirements.title,
    });
    const applyNow = screen.getByRole("heading", { name: enPages.programmes.phase2.cta.title });

    expect(
      whyThisProgramme.compareDocumentPosition(careerPathways) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      careerPathways.compareDocumentPosition(industryExposure) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      industryExposure.compareDocumentPosition(roleOfHmioss) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      roleOfHmioss.compareDocumentPosition(roleOfGenovasi) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      roleOfGenovasi.compareDocumentPosition(entryRequirements) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      entryRequirements.compareDocumentPosition(applyNow) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("keeps the page outcome-led and conversion-ready", () => {
    mockLocale = "en";
    mockPagesBundle = enPages;
    render(<ProgrammesPage locale="en" />);

    expect(screen.getByText(enPages.programmes.phase2.heroTitle)).toBeInTheDocument();
    expect(screen.getByText(enPages.programmes.phase2.heroStrapline)).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: enPages.programmes.primaryCta }).at(-1),
    ).toHaveAttribute("href", "/en/join?lang=en");
    expect(
      screen.getAllByRole("link", { name: enPages.programmes.secondaryCta }).at(-1),
    ).toHaveAttribute("href", "/en/contact?lang=en");
    expect(screen.getByRole("link", { name: enPages.programmes.tertiaryCta })).toHaveAttribute(
      "href",
      "/en/contact?lang=en",
    );
  });

  it("renders Malay Phase 2 programme copy from locale content", () => {
    mockLocale = "ms";
    mockPagesBundle = msPages;

    render(<ProgrammesPage locale="ms" />);

    expect(screen.getByText(msPages.programmes.phase2.heroBody)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: msPages.programmes.phase2.pathway.title })).toBeInTheDocument();
    expect(screen.getAllByText(msPages.programmes.phase2.positioning[0]).length).toBeGreaterThan(0);
    expect(screen.getAllByText(msPages.programmes.phase2.positioning[4]).length).toBeGreaterThan(0);
    expect(screen.getByText(msPages.programmes.phase2.outcomesEyebrow)).toBeInTheDocument();
    expect(screen.getAllByText(msPages.programmes.phase2.outcomes[0]).length).toBeGreaterThan(0);
  });
});
