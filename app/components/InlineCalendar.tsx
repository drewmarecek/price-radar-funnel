import { GHL_BOOKING_URL } from "../config";

/**
 * Inline, on-page booking calendar. No modal, no redirect — the visitor books
 * their 15-minute sync right where they are to minimize friction.
 */
export default function InlineCalendar() {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-white">
      {/* Scroll container keeps the full GHL flow (time + details) reachable */}
      <div className="max-h-[760px] overflow-y-auto">
        <iframe
          src={GHL_BOOKING_URL}
          title="Book your free 15-minute PriceRadarAPI sync"
          className="w-full"
          style={{ border: "none", width: "100%", minHeight: "1100px" }}
        />
      </div>
    </div>
  );
}
