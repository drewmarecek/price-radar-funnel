"use client";

import { useEffect, useState } from "react";
import { BRAND_NAME, FOUNDER_EMAIL } from "../config";
import { trackLead } from "../lib/track";
import { primaryBtn } from "./styles";

export type PilotRole = "contractor" | "agency";

const ROLE_EVENT = "ahd-pilot-role";

type Field = "name" | "company" | "phone" | "role";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "sending" | "sent" | "email" | "invalid";

function isRole(value: unknown): value is PilotRole {
  return value === "contractor" || value === "agency";
}

function validate(values: {
  name: string;
  company: string;
  phone: string;
  role: string;
}): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Enter your name.";
  if (!values.company.trim()) errors.company = "Enter your company or agency name.";
  if (values.phone.replace(/\D/g, "").length < 10) {
    errors.phone = "Enter a cell number with at least 10 digits.";
  }
  if (!isRole(values.role)) {
    errors.role = "Select contractor or marketing agency.";
  }
  return errors;
}

export function PilotRoleLink({
  role,
  className,
  children,
}: {
  role: PilotRole;
  className?: string;
  children: React.ReactNode;
}) {
  const href = `/?role=${role}#start-trial`;

  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        if (window.location.pathname !== "/") return;
        event.preventDefault();
        window.dispatchEvent(new CustomEvent(ROLE_EVENT, { detail: role }));
        window.history.replaceState(null, "", href);
        document.getElementById("start-trial")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }}
    >
      {children}
    </a>
  );
}

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-[#d5dbe3] bg-white px-3 py-3 text-base text-[#1a1d26] placeholder:text-[#8b95a3]";

export default function PilotForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<"" | PilotRole>("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const fromQuery = new URLSearchParams(window.location.search).get("role");
    if (isRole(fromQuery)) setRole(fromQuery);

    const onRole = (event: Event) => {
      const next = (event as CustomEvent<unknown>).detail;
      if (!isRole(next)) return;
      setRole(next);
      setErrors((current) => ({ ...current, role: undefined }));
    };

    window.addEventListener(ROLE_EVENT, onRole);
    return () => window.removeEventListener(ROLE_EVENT, onRole);
  }, []);

  function mailtoHref() {
    const roleLabel = role === "agency" ? "Marketing Agency" : "Contractor";
    const subject = encodeURIComponent(
      `14-day trial request — ${company || BRAND_NAME}`,
    );
    const body = encodeURIComponent(
      `Name: ${name}\nCompany / Agency: ${company}\nCell: ${phone}\nRole: ${roleLabel}\n`,
    );
    return `mailto:${FOUNDER_EMAIL}?subject=${subject}&body=${body}`;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate({ name, company, phone, role });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("invalid");
      return;
    }

    setStatus("sending");
    const roleLabel = role === "agency" ? "Marketing Agency" : "Contractor";
    const payload = {
      name: name.trim(),
      company: company.trim(),
      phone: phone.trim(),
      role,
    };
    const summary = [
      `Name: ${payload.name}`,
      `Company: ${payload.company}`,
      `Cell: ${payload.phone}`,
      `Role: ${roleLabel}`,
    ].join("\n");

    try {
      const [emailRes] = await Promise.all([
        fetch(`https://formsubmit.co/ajax/${encodeURIComponent(FOUNDER_EMAIL)}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            _subject: `14-day trial request — ${payload.company}`,
            _template: "table",
            _captcha: "false",
            name: payload.name,
            company: payload.company,
            phone: payload.phone,
            role: roleLabel,
            message: summary,
          }),
        }),
        fetch("/api/pilot-request", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }),
      ]);

      const emailData = (await emailRes.json().catch(() => null)) as {
        success?: string | boolean;
      } | null;
      const emailed = emailData?.success === true || emailData?.success === "true";
      if (!emailed) {
        setStatus("email");
        return;
      }

      trackLead({ role, source: "pilot_form" });
      setStatus("sent");
    } catch {
      setStatus("email");
    }
  }

  if (status === "sent") {
    return (
      <div
        id="start-trial"
        role="status"
        className="anchor rounded-2xl border border-[#e6e8eb] bg-white p-6 shadow-[0_8px_30px_rgba(16,24,40,0.06)]"
      >
        <p className="display text-2xl text-[#00031F]">Request sent.</p>
        <p className="mt-3 text-sm leading-relaxed text-[#3c4450]">
          We&apos;ll text the number ending in {phone.replace(/\D/g, "").slice(-4)} to
          turn the night line on. Your daytime staff and main number stay as they are.
        </p>
      </div>
    );
  }

  return (
    <form
      id="start-trial"
      onSubmit={onSubmit}
      noValidate
      className="anchor rounded-2xl border border-[#e6e8eb] bg-white p-6 shadow-[0_8px_30px_rgba(16,24,40,0.06)]"
    >
      <h3 className="display text-2xl text-[#00031F]">Start the 14-day trial</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#5c6570]">
        Tell us who you are. We text you to turn it on. No calendar required.
      </p>

      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor="pilot-name" className="text-sm font-medium text-[#00031F]">
            Name
          </label>
          <input
            id="pilot-name"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
            maxLength={120}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "pilot-name-error" : undefined}
            className={fieldClass}
          />
          {errors.name && (
            <p id="pilot-name-error" className="mt-1 text-sm text-[#b42318]">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="pilot-company" className="text-sm font-medium text-[#00031F]">
            Company / Agency Name
          </label>
          <input
            id="pilot-company"
            name="company"
            autoComplete="organization"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            placeholder="Your company or agency"
            maxLength={160}
            aria-invalid={errors.company ? true : undefined}
            aria-describedby={errors.company ? "pilot-company-error" : undefined}
            className={fieldClass}
          />
          {errors.company && (
            <p id="pilot-company-error" className="mt-1 text-sm text-[#b42318]">
              {errors.company}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="pilot-phone" className="text-sm font-medium text-[#00031F]">
            Cell Phone
          </label>
          <input
            id="pilot-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="207-555-0148"
            maxLength={40}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? "pilot-phone-error" : undefined}
            className={fieldClass}
          />
          {errors.phone && (
            <p id="pilot-phone-error" className="mt-1 text-sm text-[#b42318]">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="pilot-role" className="text-sm font-medium text-[#00031F]">
            Role
          </label>
          <select
            id="pilot-role"
            name="role"
            value={role}
            onChange={(event) => {
              const next = event.target.value;
              setRole(isRole(next) ? next : "");
            }}
            aria-invalid={errors.role ? true : undefined}
            aria-describedby={errors.role ? "pilot-role-error" : undefined}
            className={fieldClass}
          >
            <option value="">Contractor or Marketing Agency</option>
            <option value="contractor">Contractor</option>
            <option value="agency">Marketing Agency</option>
          </select>
          {errors.role && (
            <p id="pilot-role-error" className="mt-1 text-sm text-[#b42318]">
              {errors.role}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className={`${primaryBtn} mt-5 w-full disabled:opacity-60`}
      >
        {status === "sending" ? "Sending…" : "Submit Trial Request"}
      </button>

      {status === "invalid" && Object.keys(errors).length === 0 && (
        <p role="status" className="mt-3 text-sm text-[#b42318]">
          Check the fields and send it again.
        </p>
      )}

      {status === "email" && (
        <div role="status" className="mt-4 rounded-lg border border-[#e6e8eb] bg-[#f5f8fc] p-3">
          <p className="text-sm leading-relaxed text-[#3c4450]">
            That didn&apos;t reach the inbox. Email the same request and include
            your cell so we can confirm the trial.
          </p>
          <a href={mailtoHref()} className={`${secondaryMailClass} mt-3`}>
            Email {FOUNDER_EMAIL}
          </a>
        </div>
      )}

      <p className="mt-4 text-xs leading-relaxed text-[#5c6570]">
        Or email{" "}
        <a href={`mailto:${FOUNDER_EMAIL}`} className="text-[#0E72ED] underline underline-offset-2">
          {FOUNDER_EMAIL}
        </a>
        . Your daytime receptionist stays on the main number.
      </p>
    </form>
  );
}

const secondaryMailClass =
  "inline-flex min-h-11 items-center justify-center rounded-lg border border-[#0E72ED] px-4 py-2 text-sm font-semibold text-[#0E72ED]";
