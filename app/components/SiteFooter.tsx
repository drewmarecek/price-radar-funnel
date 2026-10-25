import Link from "next/link";
import {
  BRAND_NAME,
  DEMO_PHONE_DISPLAY,
  DEMO_PHONE_HREF,
  FOUNDER_EMAIL,
  SITE_DOMAIN,
  SITE_URL,
} from "../config";

export default function SiteFooter() {
  return (
    <footer className="page-pad bg-[#00053D] py-14 text-[#d5dbe8]">
      <div className="mx-auto flex w-full max-w-[min(1154px,100%)] flex-col gap-8 sm:flex-row sm:justify-between">
        <div>
          <p className="text-base font-semibold text-[#6BA3FF]">{BRAND_NAME}</p>
          <a href={SITE_URL} className="mt-2 inline-block text-sm text-[#9aa6c0] hover:text-white">
            {SITE_DOMAIN}
          </a>
          <p className="mt-3 max-w-sm text-sm leading-relaxed">
            Engineered in the USA | TCPA &amp; Call-Recording Compliant Dispatch
            Infrastructure.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <a href={DEMO_PHONE_HREF} className="text-white hover:underline">
            {DEMO_PHONE_DISPLAY}
          </a>
          <a href={`mailto:${FOUNDER_EMAIL}`} className="hover:underline">
            {FOUNDER_EMAIL}
          </a>
          <p className="mt-3 flex gap-4">
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
          </p>
          <p className="mt-4 text-xs text-[#9aa6c0]">
            &copy; {new Date().getFullYear()} {BRAND_NAME}
          </p>
        </div>
      </div>
    </footer>
  );
}
