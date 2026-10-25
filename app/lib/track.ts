/**
 * Lightweight, dependency-free analytics dispatch.
 *
 * Safely no-ops if no tag manager / pixel is installed yet. When you add
 * Google Tag Manager and/or the Meta (Facebook) Pixel, these events will start
 * flowing automatically.
 */
type Params = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
  }
}

export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });

  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", event, params);
  }
}

/** Fire when a visitor taps the live demo phone number. */
export function trackCall(source: string) {
  track("call_click", { source });
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "Contact", { source });
  }
}

/** Fire when a visitor engages a pilot / setup CTA. */
export function trackBookingIntent(source: string) {
  track("booking_intent", { source });
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "Schedule", { source });
  }
}

/** Fire when a visitor submits the pilot request form. Role only — no phone. */
export function trackLead(params: Params = {}) {
  track("lead", params);
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "Lead", params);
  }
}
