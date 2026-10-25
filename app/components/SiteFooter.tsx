import Link from "next/link";
import { BRAND_NAME, DEMO_PHONE_DISPLAY, DEMO_PHONE_HREF, FOUNDER_EMAIL } from "../config";

export default function SiteFooter() {
  return (
    <footer className="page-pad bg-[#00053D] py-5 text-[#d5dbe8] sm:py-6">
      <div className="mx-auto w-full max-w-[min(1154px,100%)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <p className="text-sm font-semibold text-[#6BA3FF]">{BRAND_NAME}</p>
          <div className="flex flex-col gap-1 text-xs sm:items-end sm:text-sm">
            <a href={DEMO_PHONE_HREF} className="text-white hover:underline">
              {DEMO_PHONE_DISPLAY}
            </a>
            <a href={`mailto:${FOUNDER_EMAIL}`} className="hover:underline">
              {FOUNDER_EMAIL}
            </a>
            <p className="mt-1 flex gap-3">
              <Link href="/privacy" className="hover:text-white">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-white">
                Terms
              </Link>
            </p>
            <p className="mt-1 text-[0.7rem] text-[#9aa6c0]">
              &copy; {new Date().getFullYear()} {BRAND_NAME}
            </p>
          </div>
        </div>
        <p className="mt-3 whitespace-nowrap text-[2vw] leading-none sm:text-xs">
          Engineered in the USA | TCPA &amp; Call-Recording Compliant Dispatch Infrastructure.
        </p>
      </div>
    </footer>
  );
}
