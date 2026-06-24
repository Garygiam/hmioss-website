import Link from "next/link";

import type { NextPageWithLayout } from "@/types/page";

const NotFoundPage: NextPageWithLayout = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F5F5] px-6">
      <div className="w-full max-w-lg rounded-3xl border border-[#E0E0E0] bg-white p-10 text-center shadow-sm">
        <p className="font-heading text-4xl text-[#1A2A3A]">404</p>
        <p className="mt-4 text-sm leading-7 text-[#4A4A4A]">
          The page you’re looking for doesn’t exist.
        </p>
        <Link
          className="mt-8 inline-flex items-center justify-center rounded-full border border-[#1A2A3A] px-6 py-3 text-sm font-semibold tracking-[0.18em] uppercase text-[#1A2A3A] transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
          href="/en?lang=en"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

NotFoundPage.getLayout = (page) => page;

export default NotFoundPage;

