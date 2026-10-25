"use client";

import { useState } from "react";
import { FeatureScene } from "./Scenes";

const ITEMS = [
  {
    id: "answer",
    title: "Answers when you're closed",
    body: "After 5:00 PM, or after four rings, the call is picked up on the first ring. The number on your trucks does not change, and your daytime receptionist stays.",
  },
  {
    id: "awake",
    title: "Only an awake tech gets the job",
    body: "We call your on-call list and ask them to press 1. A voicemail can't press 1, so the job only goes to someone who is awake.",
  },
  {
    id: "next",
    title: "Then the next person, then you",
    body: "If the first technician doesn't answer, we hang up and call the backup, then the owner. It is not left in a personal voicemail until morning.",
  },
  {
    id: "text",
    title: "The homeowner hears back",
    body: "They get a text that you're on it, so they stop dialing the next company while your crew is still asleep.",
  },
  {
    id: "software",
    title: "The job lands where you already work",
    body: "The address, notes, and a recording show up in Encircle, ServiceTitan, Jobber, Housecall Pro, or the other tools your office already opens.",
  },
] as const;

type Panel = (typeof ITEMS)[number]["id"];

export default function FeatureAccordion() {
  const [open, setOpen] = useState<Panel>("answer");
  const current = ITEMS.find((item) => item.id === open) ?? ITEMS[0];

  return (
    <div className="mt-8 grid items-start gap-10 sm:mt-12 lg:grid-cols-2">
      <div>
        {ITEMS.map((item) => {
          const isOpen = item.id === open;
          return (
            <div key={item.id}>
              <button
                type="button"
                className="group flex w-full items-center gap-4 py-4 text-left text-base font-semibold text-[#00031F] hover:text-[#0B5CFF]"
                aria-expanded={isOpen}
                onClick={() => setOpen(item.id)}
              >
                <span
                  className={`flex min-w-0 flex-1 items-center justify-between gap-4 ${
                    isOpen ? "border-t-[3px] border-[#0B5CFF] pt-2" : ""
                  }`}
                >
                  <span>{item.title}</span>
                  <span aria-hidden className="shrink-0 text-xl font-normal text-inherit">
                    {isOpen ? "–" : "+"}
                  </span>
                </span>
              </button>
              {isOpen && (
                <div className="pb-5">
                  <p className="text-sm leading-relaxed text-[#00053D]">{item.body}</p>
                  <div className="mt-4 lg:hidden">
                    <FeatureScene panel={item.id} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="hidden lg:block">
        <FeatureScene panel={current.id} />
      </div>
    </div>
  );
}
