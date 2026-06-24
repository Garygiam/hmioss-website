import type { PropsWithChildren } from "react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export function SiteLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-[#1A1A1A]">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
