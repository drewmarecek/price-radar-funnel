"use client";

import { useEffect, useRef, useState } from "react";

type LineKind = "kicker" | "title" | "body";

export type GlassLine = {
  text: string;
  kind: LineKind;
};

const TYPE_MS = 16;
const HOLD_MS = 3600;

function messageLength(lines: GlassLine[]) {
  return lines.reduce((total, line, index) => total + line.text.length + (index > 0 ? 1 : 0), 0);
}

function typedLines(lines: GlassLine[], count: number) {
  let left = count;
  const shown: GlassLine[] = [];
  for (let index = 0; index < lines.length; index += 1) {
    if (left <= 0) break;
    const line = lines[index];
    const take = Math.min(line.text.length, left);
    shown.push({ kind: line.kind, text: line.text.slice(0, take) });
    left -= take;
    if (index < lines.length - 1 && left > 0) left -= 1;
  }
  return shown;
}

export default function TypedGlass({
  messages,
  loop = true,
}: {
  messages: GlassLine[][];
  loop?: boolean;
}) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  const lines = messages[messageIndex] ?? messages[0];
  const length = messageLength(lines);
  const visible = reduceMotion ? lines : typedLines(lines, charCount);
  const spoken = lines.map((line) => line.text).join(" ");

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const script = messagesRef.current;
    if (reduceMotion) {
      if (!loop || script.length < 2) return;
      const hold = window.setInterval(() => {
        setMessageIndex((current) => (current + 1) % script.length);
      }, HOLD_MS);
      return () => window.clearInterval(hold);
    }

    let message = 0;
    let count = 0;
    let timer = 0;
    let stopped = false;

    const tick = () => {
      if (stopped) return;
      const sequence = messagesRef.current;
      const current = sequence[message] ?? sequence[0];
      const total = messageLength(current);
      if (count < total) {
        count += 1;
        setMessageIndex(message);
        setCharCount(count);
        timer = window.setTimeout(tick, TYPE_MS);
        return;
      }
      if (!loop || messagesRef.current.length < 2) return;
      timer = window.setTimeout(() => {
        message = (message + 1) % messagesRef.current.length;
        count = 0;
        setMessageIndex(message);
        setCharCount(0);
        timer = window.setTimeout(tick, TYPE_MS);
      }, HOLD_MS);
    };

    timer = window.setTimeout(tick, TYPE_MS);
    return () => {
      stopped = true;
      window.clearTimeout(timer);
    };
  }, [loop, reduceMotion]);

  return (
    <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5">
      <div
        aria-hidden
        className="inline-block max-w-[min(18rem,85vw)] rounded-2xl border border-white/35 bg-black/25 px-3 py-2 text-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] backdrop-blur-md sm:max-w-[24rem]"
      >
        {visible.map((line, index) => {
          const last = index === visible.length - 1;
          const caret = last && !reduceMotion && charCount < length ? <span className="typing-caret" /> : null;
          if (line.kind === "kicker") {
            return (
              <p key={`${messageIndex}-kicker`} className="text-[0.7rem] font-semibold tracking-[0.14em] text-[#e7f1ff]">
                {line.text}
                {caret}
              </p>
            );
          }
          if (line.kind === "title") {
            return (
              <p key={`${messageIndex}-title`} className="text-sm font-semibold sm:text-base">
                {line.text}
                {caret}
              </p>
            );
          }
          return (
            <p key={`${messageIndex}-${index}`} className="mt-1 text-sm leading-relaxed text-white/95">
              {line.text}
              {caret}
            </p>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        {reduceMotion || charCount >= length ? spoken : ""}
      </p>
    </div>
  );
}
