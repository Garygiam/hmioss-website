/* eslint-disable @next/next/no-img-element */
import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import enInstitutionalHistory from "../../../public/locales/en/institutional-history.json";
import enPages from "../../../public/locales/en/pages.json";
import InstitutionalHistoryPage from "@/pages/[locale]/institutional-history";
import InstitutionalHistoryEventPage from "@/pages/[locale]/institutional-history/[slug]";

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
    children: ReactNode;
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
      slug: "genovasi-university-mou-signing",
    },
  }),
}));

vi.mock("next-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const [namespace, ...segments] = key.split(":");
      const bundle =
        namespace === "institutional-history" ? enInstitutionalHistory : enPages;
      const value = segments
        .join(":")
        .split(".")
        .reduce<unknown>((current, segment) => {
          if (typeof current === "object" && current !== null && segment in current) {
            return (current as Record<string, unknown>)[segment];
          }

          return undefined;
        }, bundle);

      return typeof value === "string" ? value : key;
    },
  }),
}));

vi.mock("@/components/seo/PageSeo", () => ({
  PageSeo: () => null,
}));

describe("institutional history pages", () => {
  it("renders the featured event and 2026 timeline on the landing page", () => {
    render(<InstitutionalHistoryPage locale="en" />);

    expect(
      screen.getByRole("heading", { name: enPages.institutionalHistory.title }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Genovasi University MOU Signing" }),
    ).toBeInTheDocument();
    expect(screen.getByText("2026")).toBeInTheDocument();
    expect(screen.queryByText("2027")).not.toBeInTheDocument();
  });

  it("renders the Genovasi event detail as an institutional record", () => {
    render(
      <InstitutionalHistoryEventPage
        locale="en"
        slug="genovasi-university-mou-signing"
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Genovasi University MOU Signing" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: enInstitutionalHistory.event.outcomesTitle,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: enInstitutionalHistory.event.galleryTitle,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: enInstitutionalHistory.event.programmeTitle,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Dual Credential Programme" }),
    ).toHaveAttribute("href", "/en/programmes?lang=en");
  });

  it("resolves linked entity references to the active locale route", () => {
    render(
      <InstitutionalHistoryEventPage
        locale="ms"
        slug="genovasi-university-mou-signing"
      />,
    );

    expect(screen.getByRole("link", { name: "Genovasi University" })).toHaveAttribute(
      "href",
      "/ms/partners?lang=ms",
    );
    expect(screen.getByRole("link", { name: "Program Dual Credential" })).toHaveAttribute(
      "href",
      "/ms/programmes?lang=ms",
    );
  });
});
