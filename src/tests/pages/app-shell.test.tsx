/* eslint-disable @next/next/no-sync-scripts */
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/script", () => ({
  default: ({
    children,
    id,
    src,
  }: {
    children?: React.ReactNode;
    id?: string;
    src?: string;
  }) =>
    src ? (
      <script data-testid="external-script" src={src} />
    ) : (
      <script data-testid={id ?? "inline-script"}>{children}</script>
    ),
}));

vi.mock("next/font/google", () => ({
  Inter: () => ({ variable: "--font-body" }),
  Playfair_Display: () => ({ variable: "--font-heading" }),
}));

vi.mock("next-i18next", () => ({
  appWithTranslation: <T,>(Component: T) => Component,
}));

vi.mock("@/components/layout/SiteLayout", () => ({
  SiteLayout: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("App shell analytics", () => {
  it("loads GA4 once globally with the approved measurement ID", async () => {
    const appModule = await import("@/pages/_app");
    const App = appModule.default;
    const Page = () => <main>Institutional page</main>;

    render(<App Component={Page} pageProps={{}} router={{} as never} />);

    expect(screen.getByText("Institutional page")).toBeInTheDocument();
    expect(screen.getByTestId("external-script")).toHaveAttribute(
      "src",
      "https://www.googletagmanager.com/gtag/js?id=G-9C9WT5DET0",
    );
    expect(screen.getByTestId("google-analytics")).toHaveTextContent("G-9C9WT5DET0");
  });
});
