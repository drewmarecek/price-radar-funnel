"use client";

import { useBooking } from "./BookingModal";

type CtaButtonProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Every button in the funnel is a single conversion point: a clean interactive
 * button that opens the "Claim Your Spot" application popup (Step 1 form ->
 * Step 2 GHL 15-minute calendar).
 */
export default function CtaButton({ children, className = "" }: CtaButtonProps) {
  const { open } = useBooking();

  return (
    <button
      type="button"
      onClick={open}
      className={`group relative w-full rounded-md bg-brand-green px-6 py-5 text-center font-extrabold uppercase tracking-wide text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-green-dark hover:shadow-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-green-300 active:translate-y-0 ${className}`}
    >
      {children}
    </button>
  );
}
