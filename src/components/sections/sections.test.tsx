import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { AuthorityStrip } from "@/components/sections/AuthorityStrip";
import { CategoryFilters } from "@/components/sections/CategoryFilters";
import { InstitutionalMetrics } from "@/components/sections/InstitutionalMetrics";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { ProfileCard } from "@/components/sections/ProfileCard";
import { VisionStatement } from "@/components/sections/VisionStatement";

describe("institutional section components", () => {
  it("renders authority items as high-visibility credibility labels", () => {
    render(
      <AuthorityStrip
        items={[
          "ROS Registered",
          "Strategic Education Institution",
          "Leadership Development Focus",
        ]}
      />,
    );

    expect(screen.getByText("ROS Registered")).toBeInTheDocument();
    expect(screen.getByText("Strategic Education Institution")).toBeInTheDocument();
    expect(screen.getByText("Leadership Development Focus")).toBeInTheDocument();
  });

  it("renders institutional metrics with optional descriptions", () => {
    render(
      <InstitutionalMetrics
        items={[
          {
            value: "Leadership",
            label: "Development First",
            description: "Leadership remains the first institutional priority.",
          },
          {
            value: "Strategic",
            label: "Partnership Focus",
          },
        ]}
      />,
    );

    expect(screen.getByText("Development First")).toBeInTheDocument();
    expect(
      screen.getByText("Leadership remains the first institutional priority."),
    ).toBeInTheDocument();
    expect(screen.getByText("Partnership Focus")).toBeInTheDocument();
  });

  it("renders a reusable vision section with a CTA", () => {
    render(
      <VisionStatement
        body="Education and service strengthen institutional credibility."
        ctaHref="/mission-vision"
        ctaLabel="Learn More About Our Mission"
        eyebrow="Institutional Vision"
        imageAlt="Leadership planning session"
        imageSrc="https://example.com/vision.jpg"
        quote="Education builds capability. Leadership builds nations."
        title="Developing leaders with capability and service orientation"
      />,
    );

    expect(screen.getByText("Institutional Vision")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Learn More About Our Mission" }),
    ).toHaveAttribute("href", "/mission-vision");
    expect(screen.getByAltText("Leadership planning session")).toBeInTheDocument();
  });

  it("renders process steps in order", () => {
    render(
      <ProcessTimeline
        items={[
          {
            key: "explore",
            title: "Explore The Pathway",
            description: "Understand how the programme aligns with leadership goals.",
          },
          {
            key: "apply",
            title: "Apply Skills In Practice",
            description: "Translate programme learning into institutional work.",
          },
        ]}
      />,
    );

    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("Explore The Pathway")).toBeInTheDocument();
    expect(screen.getByText("Apply Skills In Practice")).toBeInTheDocument();
  });

  it("renders filter chips and reports the next selected category", () => {
    const onChange = vi.fn();

    render(
      <CategoryFilters
        activeCategory="All"
        categories={[
          { value: "All", label: "All" },
          { value: "News", label: "News" },
          { value: "Events", label: "Events" },
          { value: "Announcements", label: "Announcements" },
        ]}
        onChange={onChange}
      />,
    );

    const eventsChip = screen.getByRole("button", { name: "Events" });

    fireEvent.click(eventsChip);

    expect(onChange).toHaveBeenCalledWith("Events");
    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("renders leadership profile content including expertise tags", () => {
    render(
      <ProfileCard
        bio="Provides long-term strategic direction and leadership development guidance."
        expertise={["Institution Building", "Leadership Development"]}
        imageAlt="Portrait of Young Shang Yi"
        imageSrc="https://example.com/profile.jpg"
        name="Young Shang Yi"
        title="President / Founder"
      />,
    );

    expect(screen.getByText("Young Shang Yi")).toBeInTheDocument();
    expect(screen.getByText("President / Founder")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Provides long-term strategic direction and leadership development guidance.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Institution Building")).toBeInTheDocument();
    expect(screen.getByAltText("Portrait of Young Shang Yi")).toBeInTheDocument();
  });
});
