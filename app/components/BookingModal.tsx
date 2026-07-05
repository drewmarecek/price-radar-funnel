"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { GHL_BOOKING_URL } from "../config";
import { trackBookingIntent } from "../lib/track";

type BookingModalContextValue = {
  isBookingModalOpen: boolean;
  /** Open the booking modal. Pass a source label for analytics attribution. */
  openBookingModal: (source?: string) => void;
  closeBookingModal: () => void;
};

const BookingModalContext = createContext<BookingModalContextValue | null>(null);

export function useBookingModal() {
  const ctx = useContext(BookingModalContext);
  if (!ctx) {
    throw new Error("useBookingModal must be used within <BookingModalProvider>");
  }
  return ctx;
}

export default function BookingModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const openBookingModal = useCallback((source = "cta") => {
    trackBookingIntent(source);
    setIframeLoaded(false);
    setIsBookingModalOpen(true);
  }, []);

  const closeBookingModal = useCallback(() => setIsBookingModalOpen(false), []);

  // Lock background scroll strictly based on open state.
  useEffect(() => {
    if (isBookingModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Critical cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isBookingModalOpen]);

  // Close on Escape while the modal is open.
  useEffect(() => {
    if (!isBookingModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeBookingModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isBookingModalOpen, closeBookingModal]);

  return (
    <BookingModalContext.Provider
      value={{ isBookingModalOpen, openBookingModal, closeBookingModal }}
    >
      {children}

      {isBookingModalOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Book your free demo"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeBookingModal();
          }}
        >
          {/* Full-screen on mobile, centered card on desktop */}
          <div className="relative flex h-full w-full flex-col overflow-hidden bg-white shadow-2xl sm:h-auto sm:max-h-[92vh] sm:w-full sm:max-w-2xl sm:rounded-2xl">
            {/* Close button */}
            <button
              type="button"
              onClick={closeBookingModal}
              aria-label="Close booking"
              className="absolute top-3 right-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-600 shadow-sm transition hover:bg-slate-200"
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

            {/* Calendar area */}
            <div className="relative flex-1 overflow-y-auto">
              {/* Loading state — prevents a blank white flash while GHL fetches */}
              {!iframeLoaded && (
                <div className="absolute inset-0 z-0 flex flex-col items-center justify-center gap-3 bg-white">
                  <span
                    className="h-9 w-9 animate-spin rounded-full border-[3px] border-slate-200 border-t-brand-blue"
                    aria-hidden
                  />
                  <p className="text-sm font-medium text-ink-soft">
                    Loading available times…
                  </p>
                </div>
              )}

              <iframe
                src={GHL_BOOKING_URL}
                title="Book your free 15-minute PriceRadarAPI demo"
                scrolling="no"
                onLoad={() => setIframeLoaded(true)}
                className="relative z-[1] w-full"
                style={{ width: "100%", border: "none", minHeight: "650px" }}
              />
            </div>
          </div>
        </div>
      )}
    </BookingModalContext.Provider>
  );
}
