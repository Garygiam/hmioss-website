/* eslint-disable @next/next/no-img-element */
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import enAbout from "../../../public/locales/en/about.json";
import enMission from "../../../public/locales/en/mission.json";
import enPages from "../../../public/locales/en/pages.json";

import { leadershipGroups } from "@/config/leadership";
import AboutPage from "@/pages/[locale]/about";
import LeadershipPage from "@/pages/[locale]/leadership";
import MissionVisionPage from "@/pages/[locale]/mission-vision";

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

vi.mock("next-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, options?: { returnObjects?: boolean }) => {
      const [namespace, ...segments] = key.split(":");
      const bundles = {
        about: enAbout,
        mission: enMission,
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

describe("institutional content pages", () => {
  beforeEach(() => {
    pageSeoSpy.mockClear();
  });

  it("renders the approved about timeline and focus areas", () => {
    render(<AboutPage locale="en" />);

    expect(screen.getByRole("heading", { name: enAbout.timeline.title })).toBeInTheDocument();

    for (const item of enAbout.timeline.items) {
      expect(screen.getByText(item.period)).toBeInTheDocument();
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
    }

    expect(
      screen.getByRole("heading", { name: enAbout.focusAreas.title }),
    ).toBeInTheDocument();

    for (const item of enAbout.focusAreas.items) {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
    }
  });

  it("renders mission priorities with leadership-first ordering", () => {
    render(<MissionVisionPage locale="en" />);

    expect(
      screen.getByRole("heading", { name: enMission.prioritiesTitle }),
    ).toBeInTheDocument();

    const firstPriority = screen.getByText(enMission.priorities[0].title);
    const secondPriority = screen.getByText(enMission.priorities[1].title);

    expect(
      firstPriority.compareDocumentPosition(secondPriority) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();

    for (const item of enMission.priorities) {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
    }

    expect(
      screen.getByRole("heading", { name: enPages.missionVision.title }),
    ).toBeInTheDocument();
  });

  it("renders leadership profiles with bios, portraits, and expertise tags", () => {
    render(<LeadershipPage locale="en" />);

    const president = leadershipGroups[0].members[0];

    expect(screen.getByText(president.name)).toBeInTheDocument();
    expect(screen.getAllByText(president.title).length).toBeGreaterThan(0);
    expect(screen.getByText(president.bio)).toBeInTheDocument();
    expect(screen.getByAltText(president.imageAlt)).toBeInTheDocument();

    for (const item of president.expertise) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
  });

  it("provides SEO metadata for the leadership page", () => {
    render(<LeadershipPage locale="en" />);

    expect(pageSeoSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        locale: "en",
        path: "/leadership",
        title: `${enPages.leadership.title} | HMIOSS`,
      }),
    );
  });
});
