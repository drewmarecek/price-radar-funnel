import Image from "next/image";
import CtaButton from "./components/CtaButton";
import BookingProvider from "./components/BookingModal";

export default function Home() {
  return (
    <BookingProvider>
    <main className="min-h-screen bg-[#e9e9e9]">
      {/* ============ TOP WARNING BANNER ============ */}
      <div className="bg-yellow-300 px-4 py-3 text-center">
        <p className="mx-auto max-w-4xl text-sm font-bold text-gray-900 sm:text-base">
          <span aria-hidden>🚨</span> WARNING: Our AI Receptionist System Is ONLY
          For Businesses Serious About Never Missing Another Call
        </p>
      </div>

      {/* ============ HERO ============ */}
      <section className="px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-4xl rounded-xl bg-white px-5 py-10 shadow-xl sm:px-12">
          <h1 className="text-center text-3xl font-extrabold leading-tight text-gray-900 sm:text-5xl">
            We Stop You From Losing Money With an{" "}
            <span className="whitespace-nowrap">AI Receptionist</span> That Books
            Jobs 24/7
          </h1>

          <p className="mt-4 text-center text-lg font-bold text-red-600 sm:text-xl">
            Not Crappy Voicemail, Missed Calls, or Answering Services That DON&apos;T
            work!
          </p>

          <div className="mx-auto mt-6 max-w-2xl">
            <CtaButton className="cta-pulse text-lg sm:text-2xl">
              Click Here To Claim Your Spot, Limited Space Available
            </CtaButton>
          </div>

          <h2 className="mt-10 text-center text-xl font-medium text-gray-700 sm:text-2xl">
            How We Help Service Businesses Capture Every Lead in 7 Days
          </h2>

          {/* Live AI demo call block */}
          <div className="mx-auto my-8 max-w-3xl rounded-xl border border-gray-200 bg-white p-8 text-center shadow-lg">
            <h3 className="mb-2 text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Don&apos;t take our word for it. Test the AI right now.
            </h3>
            <p className="mx-auto mb-6 max-w-xl text-gray-600">
              Call our live agency demonstration line below. Speak to Riley. Ask
              her hard questions, try to interrupt her, and see exactly how she
              takes messages and handles scheduling in real-time.
            </p>

            <div className="mb-4 inline-flex items-center justify-center rounded-md border border-gray-200 bg-[#e9e9e9] px-6 py-4">
              <a
                href="tel:+16107078630"
                className="text-3xl font-black tracking-tight text-gray-900"
              >
                +1 (610) 707-8630
              </a>
            </div>

            <p className="mb-6 text-sm font-medium text-gray-500">
              Riley is live 24/7/365.
            </p>

            <div className="mx-auto max-w-md">
              <CtaButton className="text-base sm:text-lg">
                Book a call to get your custom AI Agent now!
              </CtaButton>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MID DARK CTA BAND ============ */}
      <section className="crosshatch px-4 py-12 text-center">
        <p className="mx-auto max-w-3xl text-lg font-semibold text-white sm:text-xl">
          Apply To Work With Us &amp; See If You&apos;re Eligible
        </p>
        <div className="mx-auto mt-5 max-w-2xl">
          <CtaButton className="text-lg sm:text-2xl">
            Click Here To Claim Your Spot
          </CtaButton>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="bg-white px-4 py-14">
        <h2 className="mx-auto max-w-3xl text-center text-2xl font-extrabold text-gray-900 sm:text-4xl">
          Here&apos;s What Our Clients Have To Say About Working With Us:
        </h2>

        <div className="mx-auto mt-10 grid max-w-4xl items-center gap-6 sm:grid-cols-2">
          {/* Testimonial 1 — iMessage screenshot (left) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/testimonials/imessage.png"
            alt="Client text message: Dude this thing is crazy. I'm still talking to it."
            width={1024}
            height={399}
            className="h-auto w-full rounded-xl"
          />

          {/* Testimonial 2 — Discord screenshot (right) */}
          <Image
            src="/testimonials/discord.png"
            alt="Discord testimonial from The UTR Guy about their AI demo"
            width={976}
            height={404}
            className="h-auto w-full rounded-xl"
          />
        </div>

        <div className="mx-auto mt-10 max-w-2xl px-1">
          <CtaButton className="text-xl sm:text-3xl">Claim Your Spot</CtaButton>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-[#0b0b0b] px-4 py-8 text-center text-sm text-gray-400">
        <p className="font-semibold text-white">
          PriceRadar<span className="text-brand-green">API</span>
        </p>
        <p className="mt-2">
          &copy; {new Date().getFullYear()} PriceRadarAPI. All rights reserved.
        </p>
      </footer>
    </main>
    </BookingProvider>
  );
}
