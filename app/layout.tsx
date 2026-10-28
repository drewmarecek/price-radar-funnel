import type { Metadata, Viewport } from "next";
import { Inter, Newsreader } from "next/font/google";
import Script from "next/script";
import { BRAND_NAME, SITE_URL } from "./config";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Newsreader({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-serif",
  display: "swap",
});

const TITLE = `${BRAND_NAME} | After-hours calls that become booked jobs`;
const DESCRIPTION =
  "AlwaysOnDispatch answers when the office is closed, makes sure a technician is awake, and sends the job to the software your crew already uses. Built for water restoration, plumbing, HVAC, and the agencies that market them.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${BRAND_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: BRAND_NAME,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: BRAND_NAME,
    type: "website",
    locale: "en_US",
    url: SITE_URL,
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <head>
        <Script id="microsoft-clarity" strategy="beforeInteractive">
          {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "z4vyqt1wt6");`}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
