import { NextResponse } from "next/server";
import { DISCORD_LEAD_WEBHOOK_URL } from "../../config";

type LeadPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
};

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, phone } =
      (await req.json()) as LeadPayload;

    await fetch(DISCORD_LEAD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `🚨 **NEW PARTIAL LEAD CAPTURED** 🚨\n• **Name:** ${firstName ?? ""} ${lastName ?? ""}\n• **Email:** ${email ?? ""}\n• **Phone:** ${phone ?? ""}`,
      }),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
