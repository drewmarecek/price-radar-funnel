import CallLink from "./components/CallLink";
import FeatureAccordion from "./components/FeatureAccordion";
import PilotForm, { PilotRoleLink } from "./components/PilotForm";
import { HeroScene, TryScene, UseScene } from "./components/Scenes";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import { BRAND_NAME, CALENDLY_URL, DEMO_PHONE_DISPLAY, SITE_DOMAIN } from "./config";
import { primaryBtn, secondaryBtn } from "./components/styles";

const BENEFITS = [
  {
    title: "Someone always picks up",
    body: "24/7 coverage that answers after hours and after four rings — so the homeowner never hits voicemail.",
    icon: "phone",
  },
  {
    title: "A sleeping tech can't take the job",
    body: "We call your on-call list and ask them to press 1. A voicemail can't press 1, so the job only goes to someone who is awake.",
    icon: "awake",
  },
  {
    title: "The homeowner hears back",
    body: "They get a text that you're on it, so they stop dialing the next company while your tech is still asleep.",
    icon: "text",
  },
  {
    title: "Keep your existing setup",
    body: "The address, notes, and a recording show up in the software they already open in the morning. Your daytime receptionist stays.",
    icon: "tools",
  },
] as const;

const USES = [
  {
    kind: "water",
    label: "11:30 PM",
    title: "Water damage restoration",
    body: "A flooded basement at 11:30 PM is often a $4,500 job. We take the address, ask if the water is shut off, and get someone moving.",
  },
  {
    kind: "plumbing",
    label: "Burst pipe",
    title: "Plumbing",
    body: "Burst pipes don't wait for morning. The call is answered, and the on-call plumber is actually reached.",
  },
  {
    kind: "hvac",
    label: "No heat",
    title: "HVAC",
    body: "No heat and no air get the same treatment: a person, a street address, and a technician who pressed 1.",
  },
  {
    kind: "agency",
    label: "Your brand",
    title: "Marketing agencies",
    body: "You bring in the calls. When a client lets them die after hours, they blame the leads. This answers under your name.",
  },
] as const;

const FAQS = [
  {
    q: "What happens to my daytime receptionist?",
    a: "She stays. This only picks up after 5:00 PM, or after four rings during the day. The number on your trucks and your Google listing does not change.",
  },
  {
    q: "Do my technicians have to download an app?",
    a: "No. They get a normal phone call. If they're awake, they press 1. If they don't, we call the next person.",
  },
  {
    q: "What if the first person doesn't pick up?",
    a: "We hang up and call the backup technician, then the owner. A voicemail box can't press 1, so a sleeping phone can't quietly swallow the job.",
  },
  {
    q: "Where does the job go?",
    a: "Into the system your office already uses — Encircle, Albiware, JobNimbus, ServiceTitan, Housecall Pro, Jobber, QuickBooks Online, or GoHighLevel — along with the address, notes, and a recording.",
  },
  {
    q: "Can an agency offer this under their own name?",
    a: "Yes. You can run it on one client for 14 days at no charge, then roll it out to the rest of the book at a flat wholesale rate.",
  },
  {
    q: "What does the 14-day trial cost?",
    a: "Nothing, if the night calls aren't handled cleanly. Contractors try it on the line they already publish. Agencies try it on one client.",
  },
  {
    q: "Are calls recorded?",
    a: "Yes. Callers hear a recording notice where one is required, and you can listen back to what was said.",
  },
  {
    q: "Is this a replacement for 911?",
    a: "No. It books your after-hours jobs. It does not dispatch police, fire, or an ambulance.",
  },
];

function Eyebrow({
  children,
  light = false,
  align = "center",
}: {
  children: React.ReactNode;
  light?: boolean;
  align?: "center" | "start";
}) {
  return (
    <p className={`flex items-center gap-2 text-sm font-medium ${align === "start" ? "justify-start" : "justify-center"} ${light ? "text-[#b4d0f8]" : "text-[#0B5CFF]"}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${light ? "bg-[#b4d0f8]" : "bg-[#0B5CFF]"}`} aria-hidden />
      {children}
    </p>
  );
}

function BenefitIcon({ name }: { name: (typeof BENEFITS)[number]["icon"] }) {
  const common = "h-10 w-10 text-[#0B5CFF]";
  if (name === "phone") {
    return (
      <svg className={common} viewBox="0 0 40 40" fill="none" aria-hidden>
        <path d="M14 8h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4c0 1-1 2-2 2C16 26 8 18 8 10c0-1 1-2 2-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "awake") {
    return (
      <svg className={common} viewBox="0 0 40 40" fill="none" aria-hidden>
        <circle cx="20" cy="20" r="6" stroke="currentColor" strokeWidth="1.8" />
        <path d="M20 8v3M20 29v3M8 20h3M29 20h3M11 11l2 2M27 27l2 2M29 11l-2 2M13 27l-2 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "text") {
    return (
      <svg className={common} viewBox="0 0 40 40" fill="none" aria-hidden>
        <rect x="8" y="10" width="24" height="16" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M14 26v4l5-4" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg className={common} viewBox="0 0 40 40" fill="none" aria-hidden>
      <rect x="8" y="10" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <rect x="22" y="10" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <rect x="8" y="22" width="10" height="8" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <rect x="22" y="22" width="10" height="8" rx="2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function Check({ light = false }: { light?: boolean }) {
  return (
    <svg className={`mt-0.5 h-4 w-4 shrink-0 ${light ? "text-white" : "text-[#0B5CFF]"}`} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 8.5 6.2 12 13 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="page-pad pt-[clamp(2rem,6vw,5rem)] pb-6">
          <div className="mx-auto w-full max-w-[min(56rem,100%)] text-center">
            <Eyebrow>{BRAND_NAME}</Eyebrow>
            <p className="mt-3 text-sm text-[#5c6b8a]">{SITE_DOMAIN}</p>
            <h1 className="display mx-auto mt-4 max-w-[min(52rem,100%)] text-[clamp(2rem,4.2vw,3.125rem)] leading-[1.2] text-[#00031F]">
              An after-hours line that turns
              <br className="hidden sm:block" />{" "}
              emergency calls into booked jobs.
            </h1>
            <p className="mx-auto mt-5 max-w-[min(52rem,100%)] text-[0.9375rem] leading-[1.6] text-[#00053D] sm:mt-6 sm:text-base sm:leading-[1.65]">
              <span className="font-medium text-[#0B5CFF]">{BRAND_NAME}</span> answers when
              the office is closed, makes sure a technician is actually awake,
              <br className="hidden lg:block" />{" "}
              and sends the job to the software your crew already uses. Keep your daytime
              receptionist.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:mt-8 sm:gap-3">
              <a href={CALENDLY_URL} className={primaryBtn}>
                Start a free trial
              </a>
              <CallLink
                source="hero"
                ariaLabel={`Call the live line at ${DEMO_PHONE_DISPLAY}`}
                className={secondaryBtn}
              >
                Call {DEMO_PHONE_DISPLAY}
              </CallLink>
            </div>
          </div>
          <div className="mx-auto mt-12 w-full max-w-[min(920px,100%)] sm:mt-16">
            <HeroScene />
          </div>
        </section>

        <section className="page-pad py-[clamp(3rem,6vw,5rem)]">
          <div className="mx-auto grid w-full max-w-[min(1218px,100%)] gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
            {BENEFITS.map((item) => (
              <article key={item.title} className="text-center sm:text-left">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e6f0ff] sm:mx-0">
                  <BenefitIcon name={item.icon} />
                </div>
                <h2 className="display mt-4 text-[clamp(1.4rem,2vw,1.75rem)] leading-[1.15] text-[#00031F]">
                  {item.title}
                </h2>
                <p className="mx-auto mt-3 max-w-[22rem] text-[0.9375rem] leading-[1.6] text-[#00053D] sm:mx-0 sm:max-w-none sm:text-base sm:leading-[1.65]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="try" className="anchor page-pad bg-[#181819] py-[clamp(3rem,6vw,5rem)] text-white">
          <div className="mx-auto grid w-full max-w-[min(1200px,100%)] items-center gap-10 lg:grid-cols-2">
            <TryScene />
            <div>
              <Eyebrow light align="start">Try it yourself</Eyebrow>
              <h2 className="display mt-3 text-left text-[clamp(1.75rem,3vw,2.4rem)] leading-tight">
                Pretend a pipe just burst.
              </h2>
              <CallLink
                source="try"
                ariaLabel={`Call ${DEMO_PHONE_DISPLAY}`}
                className={`${primaryBtn} mt-6`}
              >
                Call {DEMO_PHONE_DISPLAY}
              </CallLink>
            </div>
          </div>
        </section>

        <section id="who" className="anchor page-pad py-[clamp(3rem,7vw,6rem)]">
          <div className="mx-auto w-full max-w-[min(1360px,100%)]">
            <div className="mx-auto max-w-[min(920px,100%)] text-center">
              <Eyebrow>Who it&apos;s for</Eyebrow>
              <h2 className="display section-title mt-3 text-[#00031F]">
                Built for calls that can&apos;t wait until morning
              </h2>
            </div>
            <ul className="scroll-row -mx-[clamp(1.25rem,4vw,2rem)] mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-[clamp(1.25rem,4vw,2rem)] px-[clamp(1.25rem,4vw,2rem)] pb-2 sm:mx-0 sm:mt-12 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-8 sm:overflow-visible sm:px-0 sm:pb-0 xl:grid-cols-4">
              {USES.map((item) => (
                <li key={item.title} className="w-[78%] shrink-0 snap-start sm:w-auto">
                  <UseScene kind={item.kind} label={item.label} />
                  <h3 className="mt-4 text-lg font-semibold text-[#00031F]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#00053D]">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="how-it-works" className="anchor page-pad py-[clamp(3rem,7vw,6rem)]">
          <div className="mx-auto w-full max-w-[min(1200px,100%)]">
            <div className="mx-auto max-w-[min(920px,100%)] text-center">
              <Eyebrow>How it works</Eyebrow>
              <h2 className="display section-title mt-3 text-[#00031F]">
                It knows the job, not just a phone menu
              </h2>
            </div>
            <FeatureAccordion />
          </div>
        </section>

        <section id="book-trial" className="anchor page-pad py-[clamp(3rem,7vw,6rem)]">
          <div className="mx-auto w-full max-w-[min(1100px,100%)]">
            <div className="mx-auto max-w-[min(760px,100%)] text-center">
              <Eyebrow>Pricing</Eyebrow>
              <h2 className="display section-title mt-3 text-[#00031F]">
                Start with 14 days
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#00053D]">
                If the night calls aren&apos;t handled cleanly, you don&apos;t pay.
              </p>
            </div>
            <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-2">
              <article id="contractors" className="overflow-hidden rounded-2xl bg-[#e6f0ff]">
                <p className="bg-[#00053D] px-6 py-3 text-center text-sm font-medium text-white">
                  For contractors
                </p>
                <div className="p-6 sm:p-8">
                  <p className="text-sm font-medium text-[#00053D]">14-day trial</p>
                  <p className="display mt-2 text-[clamp(3rem,8vw,3.75rem)] text-[#00031F]">$0</p>
                  <p className="mt-2 text-sm text-[#00053D]">
                    if the night calls aren&apos;t handled cleanly
                  </p>
                  <PilotRoleLink role="contractor" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#00053D] px-5 py-2 text-base font-semibold text-white hover:bg-[#12183a]">
                    Start the contractor trial
                  </PilotRoleLink>
                  <ul className="mt-8 space-y-3 text-sm leading-relaxed text-[#00053D]">
                    <li className="flex gap-2"><Check /> 14 days on the line you already advertise.</li>
                    <li className="flex gap-2"><Check /> Turns on after 5:00 PM, or after four rings.</li>
                    <li className="flex gap-2"><Check /> Your daytime receptionist stays on the main number.</li>
                  </ul>
                </div>
              </article>

              <article id="agencies" className="anchor overflow-hidden rounded-2xl bg-[#0B5CFF] text-white">
                <p className="bg-[#00053D] px-6 py-3 text-center text-sm font-medium">
                  For agencies
                </p>
                <div className="p-6 sm:p-8">
                  <p className="text-sm font-medium text-white/90">One client, under your brand</p>
                  <p className="display mt-2 text-[clamp(3rem,8vw,3.75rem)]">$0</p>
                  <p className="mt-2 text-sm text-white/90">
                    for 14 days, then a flat wholesale rate
                  </p>
                  <PilotRoleLink role="agency" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-white px-5 py-2 text-base font-semibold text-[#00053D]">
                    Try it on one client
                  </PilotRoleLink>
                  <ul className="mt-8 space-y-3 text-sm leading-relaxed text-white">
                    <li className="flex gap-2"><Check light /> Your name on the greeting. Their office stays as it is.</li>
                    <li className="flex gap-2"><Check light /> One client, 14 days, at no charge.</li>
                    <li className="flex gap-2"><Check light /> After that, you set the retail price.</li>
                  </ul>
                </div>
              </article>
            </div>
            <div className="mx-auto mt-10 max-w-[min(560px,100%)]">
              <PilotForm />
            </div>
          </div>
        </section>

        <section id="faq" className="anchor page-pad bg-[#f7f9fc] py-[clamp(3rem,7vw,6rem)]">
          <div className="mx-auto w-full max-w-[min(920px,100%)]">
            <div className="text-center">
              <Eyebrow>FAQs</Eyebrow>
              <h2 className="display section-title mt-3 text-[#00031F]">
                Questions
              </h2>
            </div>
            <div className="mt-10">
              {FAQS.map((item) => (
                <details key={item.q} className="group border-b border-[#e1e8f2] py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-[#00053D]">
                    {item.q}
                    <span aria-hidden className="text-xl font-normal text-[#0B5CFF] group-open:hidden">+</span>
                    <span aria-hidden className="hidden text-xl font-normal text-[#0B5CFF] group-open:inline">–</span>
                  </summary>
                  <p className="mt-3 max-w-[68ch] text-sm leading-relaxed text-[#00053D]">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
