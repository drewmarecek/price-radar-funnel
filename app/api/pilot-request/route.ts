import { NextResponse } from "next/server";

type Role = "contractor" | "agency";

function cleanText(value: unknown, max: number) {
  return String(value ?? "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/[@`]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function readLead(body: unknown) {
  if (!body || typeof body !== "object") return null;
  const record = body as Record<string, unknown>;
  const name = cleanText(record.name, 120);
  const company = cleanText(record.company, 160);
  const phone = cleanText(record.phone, 40);
  const role = record.role === "agency" || record.role === "contractor"
    ? (record.role as Role)
    : null;
  if (!name || !company || !role) return null;
  if (phone.replace(/\D/g, "").length < 10) return null;
  return {
    name,
    company,
    phone,
    role,
    roleLabel: role === "agency" ? "Marketing Agency" : "Contractor",
  };
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  const lead = readLead(body);
  if (!lead) {
    return NextResponse.json(
      { ok: false, error: "Name, company, cell phone, and role are required." },
      { status: 400 },
    );
  }

  const webhookUrl = process.env.DISCORD_LEAD_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { ok: false, reason: "unconfigured" },
      { status: 503 },
    );
  }

  try {
    const discord = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(8000),
      body: JSON.stringify({
        content: [
          "New 14-day trial request",
          `Name: ${lead.name}`,
          `Company: ${lead.company}`,
          `Cell: ${lead.phone}`,
          `Role: ${lead.roleLabel}`,
        ].join("\n"),
      }),
    });

    if (!discord.ok) {
      return NextResponse.json({ ok: false }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
