"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { GHL_BOOKING_URL } from "../config";

type BookingContextValue = { open: () => void };

const BookingContext = createContext<BookingContextValue>({ open: () => {} });

export function useBooking() {
  return useContext(BookingContext);
}

/**
 * "Claim Your Spot" popup for the whole page. Any CTA calls `open()`.
 * The popup goes straight to the embedded 15-minute GHL calendar — GHL itself
 * collects the visitor's name/phone/email, so there's no separate lead form.
 */
export default function BookingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  // Lock background scroll + allow Escape to close while the modal is open.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  return (
    <BookingContext.Provider value={{ open }}>
      {children}

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
            {/* Close button */}
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute top-2.5 right-2.5 z-10 grid h-9 w-9 place-items-center rounded-full bg-gray-200/90 text-gray-600 shadow-md transition hover:bg-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="h-4 w-4"
                aria-hidden
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            {/* Striped header */}
            <div className="progress-stripes flex shrink-0 items-center justify-center py-3">
              <span className="text-sm font-bold text-white drop-shadow">
                Book Your Free Demo
              </span>
            </div>

            <div className="shrink-0 px-6 pt-5 text-center">
              <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
                Pick a Time For Your Call
              </h2>
              <p className="mt-1 text-sm text-gray-600 sm:text-base">
                <span aria-hidden>⚠️</span> Only Accepting 7 New Clients This
                Month — book your free 15-minute AI receptionist demo below.
              </p>
            </div>

            {/* Scrollable calendar area — the whole GHL flow (time picker +
                details form) is reachable via this scroll container. */}
            <div className="mt-3 min-h-0 flex-1 overflow-y-auto px-3 pb-4 sm:px-4">
              <iframe
                src={GHL_BOOKING_URL}
                title="Book your free 15-minute PriceRadarAPI demo"
                className="w-full rounded-lg border border-gray-200"
                style={{ border: "none", width: "100%", minHeight: "1100px" }}
              />
            </div>
          </div>
        </div>
      )}
    </BookingContext.Provider>
  );
}
