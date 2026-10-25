import type { Metadata } from "next";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { BRAND_NAME, FOUNDER_EMAIL } from "../config";

export const metadata: Metadata = {
  title: "Terms",
  description: `Terms for the ${BRAND_NAME} demo line and 14-day trial.`,
};

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h1 className="font-semibold tracking-tight text-4xl text-[#1c1917]">Terms</h1>
        <p className="mt-2 text-sm text-[#5c564c]">Last updated October 19, 2026</p>
        <div className="mt-8 space-y-4 text-sm leading-relaxed text-[#3f3a33]">
          <p>
            {BRAND_NAME} provides after-hours and 4-ring overflow emergency dispatch
            infrastructure. Calling the demo number or submitting the trial form is a
            request to evaluate that service. It is not a contract for a paid seat.
          </p>
          <h2 className="pt-2 font-semibold tracking-tight text-xl text-[#1c1917]">14-day trial</h2>
          <p>
            The contractor pilot leaves the published main number and daytime staff in
            place and turns on with conditional call forwarding after 5:00 PM or after
            4 unanswered rings. The price after a successful pilot is $397 a month. If
            the pilot does not catch a job during those 14 days, that charge is refunded
            in full. The agency pilot covers one flagship client for 14 days at no risk.
            After that, agency seats are $247 a month per client, and the agency sets
            the retail price. Any paid seat is agreed in writing.
          </p>
          <h2 className="pt-2 font-semibold tracking-tight text-xl text-[#1c1917]">Calls and recording</h2>
          <p>
            Dispatch calls may be recorded. Where required, callers hear a recording
            notice before the conversation continues. Texts sent during the live demo
            go to the handset that placed the call. You are responsible for having
            permission to share a customer&apos;s address and loss details with your
            on-call crew and CRM.
          </p>
          <h2 className="pt-2 font-semibold tracking-tight text-xl text-[#1c1917]">Not an emergency service</h2>
          <p>
            This line is business dispatch for restoration, plumbing, and HVAC
            contractors. It does not replace 911 or the fire department.
          </p>
          <h2 className="pt-2 font-semibold tracking-tight text-xl text-[#1c1917]">Contact</h2>
          <p>
            Questions about these terms go to{" "}
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
