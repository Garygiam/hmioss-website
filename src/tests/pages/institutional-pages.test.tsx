/* eslint-disable @next/next/no-img-element */
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import enAbout from "../../../public/locales/en/about.json";
import enMission from "../../../public/locales/en/mission.json";
import enPages from "../../../public/locales/en/pages.json";
import enRecognition from "../../../public/locales/en/recognition.json";

import { leadershipGroups } from "@/config/leadership";
import AboutPage from "@/pages/[locale]/about";
import LeadershipPage from "@/pages/[locale]/leadership";
import MissionVisionPage from "@/pages/[locale]/mission-vision";
import RecognitionPage from "@/pages/[locale]/recognition";

const pageSeoSpy = vi.fn();
const approvedLeadershipPackage = [
  { name: "Young Shang Yi", title: "Chairman" },
  { name: "Dato’ Sri Charles Hwang", title: "Deputy Chairman" },
  { name: "Gary Giam", title: "Vice President" },
  { name: "Dato’ Henry Lee", title: "Vice President" },
  { name: "Prof. Dr. Vincent Wee Eng Kim", title: "Secretary General" },
  { name: "James Hwang", title: "Treasurer" },
  { name: "Datin Sri Shanice Ng", title: "Director" },
  { name: "Apple Teo Siew Chyi", title: "Director" },
  { name: "Krishnaveni Selvaraju", title: "Director of Education Recruitment" },
  { name: "Chooi Mee See", title: "Director" },
] as const;

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
        recognition: enRecognition,
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

  it("renders the approved leadership package names, titles, and order", () => {
    render(<LeadershipPage locale="en" />);

    for (const member of approvedLeadershipPackage) {
      expect(screen.getByText(member.name)).toBeInTheDocument();
      expect(screen.getAllByText(member.title).length).toBeGreaterThan(0);
    }

    for (let index = 0; index < approvedLeadershipPackage.length - 1; index += 1) {
      const currentMember = screen.getByText(approvedLeadershipPackage[index].name);
      const nextMember = screen.getByText(approvedLeadershipPackage[index + 1].name);

      expect(
        currentMember.compareDocumentPosition(nextMember) & Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy();
    }

    for (const item of leadershipGroups[0].members[0].expertise) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
  });

  it("renders James Hwang with the approved static production portrait", () => {
    render(<LeadershipPage locale="en" />);

    expect(screen.getByAltText("Portrait of James Hwang, Treasurer of HMIOSS")).toHaveAttribute(
      "src",
      expect.stringContaining("/images/leadership/james-hwang.webp"),
    );
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

  it("renders only non-empty institutional credential groups on the recognition page", () => {
    render(<RecognitionPage locale="en" />);

    expect(screen.getByRole("heading", { name: enPages.recognition.title })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: enRecognition.groups.congratulatoryLetters.title }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: enRecognition.groups.officialRegistration.title }),
    ).not.toBeInTheDocument();

    expect(screen.getByText("Chinese Youth Entrepreneurs Association")).toBeInTheDocument();
    expect(
      screen.getByText("Holland-China Business Culture & Education Association"),
    ).toBeInTheDocument();
    expect(screen.getByText("Thayninga Institute for Strategic Studies")).toBeInTheDocument();
    expect(screen.queryByText("ROS Registration Certificate")).not.toBeInTheDocument();
    expect(screen.queryByText("Taiwan Chamber of Commerce in Orange County")).not.toBeInTheDocument();
    expect(screen.queryByText("Unidentified congratulatory letter")).not.toBeInTheDocument();
    expect(screen.queryByText(/WhatsApp Image/i)).not.toBeInTheDocument();

    for (const link of screen.getAllByRole("link", {
      name: enRecognition.groups.congratulatoryLetters.viewCredential,
    })) {
      expect(link).toHaveAttribute("target", "_blank");
    }
  });
});
