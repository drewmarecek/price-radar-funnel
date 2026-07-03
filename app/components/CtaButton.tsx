"use client";

import { BOOKING_ANCHOR } from "../config";
import { trackBookingIntent } from "../lib/track";

type CtaButtonProps = {
  children: React.ReactNode;
  className?: string;
  /** Where the button scrolls to. Defaults to the inline calendar section. */
  targetId?: string;
  variant?: "green" | "blue";
  /** Analytics attribution label for this button's location. */
  source?: string;
};

const VARIANTS: Record<NonNullable<CtaButtonProps["variant"]>, string> = {
  green:
    "bg-brand-green hover:bg-brand-green-dark shadow-green-600/25 focus-visible:ring-green-300",
  blue: "bg-brand-blue hover:bg-brand-blue-dark shadow-blue-600/25 focus-visible:ring-blue-300",
};

/**
 * Primary conversion element. Instead of forcing a redirect/modal, it smoothly
 * scrolls the visitor to the inline booking calendar already on the page.
 */
export default function CtaButton({
  children,
  className = "",
  targetId = BOOKING_ANCHOR,
  variant = "green",
  source = "cta",
}: CtaButtonProps) {
  const scrollToTarget = () => {
    trackBookingIntent(source);
    document
      .getElementById(targetId)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTarget}
      className={`group inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus-visible:ring-4 active:translate-y-0 ${VARIANTS[variant]} ${className}`}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
        aria-hidden
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </button>
  );
}
