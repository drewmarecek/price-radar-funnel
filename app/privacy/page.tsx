import type { Metadata } from "next";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { BRAND_NAME, FOUNDER_EMAIL } from "../config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${BRAND_NAME} handles trial requests, demo calls, and call recordings.`,
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h1 className="font-semibold tracking-tight text-4xl text-[#1c1917]">Privacy Policy</h1>
        <p className="mt-2 text-sm text-[#5c564c]">Last updated October 19, 2026</p>
        <div className="mt-8 space-y-4 text-sm leading-relaxed text-[#3f3a33]">
          <p>
            {BRAND_NAME} is after-hours and overflow emergency dispatch infrastructure
            engineered in the United States (Maine and Utah). This page describes what
            the public website collects.
          </p>
          <h2 className="pt-2 font-semibold tracking-tight text-xl text-[#1c1917]">Trial request form</h2>
          <p>
            If you submit the 14-day trial form, we receive your name, company or
            agency name, cell phone number, and role (contractor or marketing agency).
            We use that information to contact you about the trial. We do not sell it.
          </p>
          <h2 className="pt-2 font-semibold tracking-tight text-xl text-[#1c1917]">Demo calls and texts</h2>
          <p>
            If you call the published demo line, that call may be recorded so we can
            send a dispatch card and audio recording back to the handset that placed
            the call. The text is part of the test you started by dialing. Production
            lines play a recording notice where the law requires one.
          </p>
          <h2 className="pt-2 font-semibold tracking-tight text-xl text-[#1c1917]">Analytics</h2>
          <p>
            This site loads Microsoft Clarity to understand which sections people use.
            Clarity can record page interactions. It is not required to call the demo
            line or submit the form.
          </p>
          <h2 className="pt-2 font-semibold tracking-tight text-xl text-[#1c1917]">Contact</h2>
          <p>
            Privacy questions go to{" "}
            <a className="text-[#0E72ED] underline decoration-[#0E72ED]/30 underline-offset-2" href={`mailto:${FOUNDER_EMAIL}`}>
              {FOUNDER_EMAIL}
            </a>
            .
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
