"use client";

import Link from "next/link";
import { useState } from "react";
import { BRAND_NAME, DEMO_PHONE_DISPLAY, trialHref } from "../config";
import CallLink from "./CallLink";
import { primaryBtn, secondaryBtn } from "./styles";

const NAV = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#who", label: "Who it's for" },
  { href: "/#agencies", label: "For agencies" },
  { href: "/#faq", label: "FAQs" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#e8eef6] bg-white pt-[env(safe-area-inset-top)]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-[60] focus:rounded-xl focus:bg-[#0B5CFF] focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-14 w-full max-w-[min(1400px,100%)] items-center gap-3 px-[clamp(1.25rem,4vw,2rem)] sm:h-[4.5rem] sm:gap-6">
        <Link
          href="/"
          className="shrink-0 text-[clamp(1.15rem,1.6vw,1.4rem)] font-semibold tracking-tight text-[#0B5CFF]"
          aria-label={`${BRAND_NAME} home`}
        >
          {BRAND_NAME}
        </Link>
        <nav
          aria-label="Page sections"
          className="hidden min-w-0 flex-1 items-center justify-center gap-[clamp(0.75rem,1.5vw,1.5rem)] text-[clamp(0.8125rem,0.9vw,0.875rem)] text-[#00053D] xl:flex"
        >
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="whitespace-nowrap hover:text-[#0B5CFF]">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden items-center gap-2 sm:flex">
            <CallLink
              source="header"
              ariaLabel={`Call the live line at ${DEMO_PHONE_DISPLAY}`}
              className="inline-flex min-h-11 items-center justify-center px-2 text-sm font-semibold whitespace-nowrap text-[#00053D] transition hover:text-[#0B5CFF] lg:px-3"
            >
              <span className="lg:hidden">{DEMO_PHONE_DISPLAY}</span>
              <span className="hidden lg:inline">Call {DEMO_PHONE_DISPLAY}</span>
            </CallLink>
            <a href={trialHref()} className={`${primaryBtn} text-sm whitespace-nowrap`}>
              Start free trial
            </a>
          </div>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-[#00053D] hover:bg-[#f3f8ff] xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden>
              {open ? (
                <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div
          id="mobile-nav"
          className="border-t border-[#e8eef6] px-[clamp(1.25rem,4vw,2rem)] py-4 xl:hidden"
        >
          <nav aria-label="Page sections" className="flex flex-col text-base font-medium text-[#00053D]">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="border-b border-[#eef2f8] py-3 last:border-b-0"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2 sm:hidden">
            <CallLink
              source="header-mobile"
              ariaLabel={`Call the live line at ${DEMO_PHONE_DISPLAY}`}
              className={secondaryBtn}
            >
              Call {DEMO_PHONE_DISPLAY}
            </CallLink>
            <a href={trialHref()} className={primaryBtn} onClick={() => setOpen(false)}>
              Start free trial
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
