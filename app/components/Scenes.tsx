import Image from "next/image";

export function HeroScene() {
  return (
    <div className="relative isolate aspect-[16/10] overflow-hidden rounded-[20px] bg-[#152033] sm:aspect-[2/1] sm:rounded-[28px]">
      <Image
        src="/images/hero.jpg"
        alt="Person taking an after-hours call on the phone outdoors"
        fill
        priority
        className="object-cover object-[center_40%]"
        sizes="(max-width: 920px) 100vw, 920px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
      <div className="absolute right-3 bottom-3 left-3 rounded-xl bg-white/92 px-3 py-2.5 text-[#00053D] shadow-sm backdrop-blur sm:right-auto sm:bottom-8 sm:left-10 sm:max-w-sm sm:rounded-2xl sm:p-5">
        <p className="text-sm font-semibold text-[#00031F]">A call comes in after hours</p>
        <p className="mt-1 hidden text-sm leading-relaxed sm:block">
          We answer, take the address, and reach a technician who is actually awake.
        </p>
      </div>
      <div className="absolute top-6 right-6 hidden w-[280px] rounded-2xl bg-white p-4 text-[#00053D] shadow-[0_16px_40px_rgba(0,0,0,0.28)] sm:block">
        <p className="text-xs font-semibold tracking-wide text-[#0B5CFF]">LIVE CALL</p>
        <p className="mt-2 text-sm font-semibold text-[#00031F]">Flooded basement</p>
        <p className="mt-1 text-sm leading-relaxed">14 Oak Street. Water is still running.</p>
        <div className="mt-4 rounded-xl bg-[#f3f8ff] px-3 py-2 text-sm text-[#00053D]">
          Calling on-call tech. Press 1 if you&apos;re awake.
        </div>
      </div>
    </div>
  );
}

export function TryScene() {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-[#241f1a] sm:aspect-auto sm:min-h-[380px] sm:rounded-[24px]">
      <Image
        src="/images/pipe-burst.jpg"
        alt="Burst pipe spraying water"
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 560px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      <p className="absolute bottom-5 left-5 rounded-full bg-[#5b4bdb] px-3 py-1.5 text-sm font-medium text-white">
        Pretend a pipe just burst.
      </p>
    </div>
  );
}

const USE_IMAGES = {
  water: {
    src: "/images/water-damage.jpg",
    alt: "Water-damaged interior after a flood",
  },
  plumbing: {
    src: "/images/pipe-burst.jpg",
    alt: "Burst pipe spraying water",
  },
  hvac: {
    src: "/images/hvac.jpg",
    alt: "Commercial HVAC equipment on a building",
  },
  agency: {
    src: "/images/agency.jpg",
    alt: "Agency team working on a laptop in a meeting",
  },
} as const;

export function UseScene({
  kind,
  label,
}: {
  kind: keyof typeof USE_IMAGES;
  label: string;
}) {
  const image = USE_IMAGES[kind];
  return (
    <div className="relative flex h-[200px] items-end overflow-hidden rounded-xl">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 320px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
      <span className="relative m-4 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-[#00031F]">
        {label}
      </span>
    </div>
  );
}

const PANELS = {
  answer: {
    src: "/images/feature-answer.jpg",
    alt: "Flooded basement with standing water",
    kicker: "11:30 PM",
    title: "Flooded basement",
    body: "Answered on the first ring. Address taken. Water still running.",
  },
  awake: {
    src: "/images/feature-awake.jpg",
    alt: "Technician answering a phone call",
    kicker: "On-call tech",
    title: "Press 1 if you're awake",
    body: "A voicemail can't press 1, so a sleeping phone can't take the job.",
  },
  next: {
    src: "/images/feature-next.jpg",
    alt: "Homeowner checking their phone during an emergency",
    kicker: "No answer",
    title: "Calling the next person",
    body: "Backup tech, then the owner. The job is not left in voicemail.",
  },
  text: {
    src: "/images/feature-text.jpg",
    alt: "Service technician reviewing a job in the van",
    kicker: "Text sent",
    title: "We're on the way",
    body: "The homeowner gets a message, so they stop calling the next company.",
  },
  software: {
    src: "/images/feature-software.jpg",
    alt: "Office manager writing the job into the system",
    kicker: "Job written",
    title: "14 Oak Street",
    body: "Address, notes, and the recording land in the system you already open.",
  },
} as const;

export function FeatureScene({ panel }: { panel: keyof typeof PANELS }) {
  const card = PANELS[panel];
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] sm:aspect-auto sm:min-h-[420px] sm:rounded-[24px]">
      <Image
        src={card.src}
        alt={card.alt}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 560px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      <div className="absolute right-3 bottom-3 left-3 rounded-xl bg-white px-3 py-2.5 text-[#00053D] shadow-[0_16px_40px_rgba(0,0,0,0.28)] sm:top-10 sm:right-8 sm:bottom-auto sm:left-auto sm:w-[300px] sm:rounded-2xl sm:p-5">
        <p className="text-xs font-semibold tracking-wide text-[#0B5CFF]">{card.kicker}</p>
        <p className="mt-1 text-base font-semibold text-[#00031F] sm:mt-2 sm:text-lg">{card.title}</p>
        <p className="mt-2 hidden text-sm leading-relaxed sm:block">{card.body}</p>
      </div>
    </div>
  );
}
