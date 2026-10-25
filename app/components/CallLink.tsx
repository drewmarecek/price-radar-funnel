"use client";

import { DEMO_PHONE_HREF } from "../config";
import { trackCall } from "../lib/track";

type CallLinkProps = {
  children: React.ReactNode;
  className?: string;
  /** Where on the page this call link lives — used for analytics attribution. */
  source: string;
  ariaLabel?: string;
};

/** Tel link that fires an analytics event when tapped. */
export default function CallLink({
  children,
  className,
  source,
  ariaLabel,
}: CallLinkProps) {
  return (
    <a
      href={DEMO_PHONE_HREF}
      className={className}
      aria-label={ariaLabel}
      onClick={() => trackCall(source)}
    >
      {children}
    </a>
  );
}
