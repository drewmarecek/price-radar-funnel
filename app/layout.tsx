import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PriceRadarAPI | AI Receptionists That Never Miss a Call",
  description:
    "PriceRadarAPI deploys AI receptionists that answer every call, book appointments, and capture leads 24/7 — so you never lose another customer to a missed call.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
