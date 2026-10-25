import { BRAND_NAME } from "../../config";

type CustomAnalysis = {
  caller_name?: string;
  property_address?: string;
  emergency_type?: string;
  water_shutoff_status?: string | null;
};

type RetellCall = {
  from_number?: string;
  recording_url?: string;
  call_analysis?: {
    call_summary?: string;
    custom_analysis_data?: CustomAnalysis;
  };
};

type RetellWebhook = {
  event?: string;
  call?: RetellCall;
};

const DISCORD_LIMIT = 2000;

function line(value: unknown, max = 300) {
  const text = String(value ?? "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/`/g, "'")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1)}…`;
}

function alertMessage(input: {
  fromNumber: string;
  callerName: string;
  emergencyType: string;
  propertyAddress: string;
  waterShutoff: string;
  recordingUrl: string;
  callSummary: string;
}) {
  const sms = [
    `[${BRAND_NAME} Demo]`,
    `🚨 Emergency Logged: ${input.emergencyType}`,
    `📍 Address: ${input.propertyAddress}`,
    `💧 Water Shutoff: ${input.waterShutoff}`,
    "📲 Status: Calling On-Call Tech #1 (Press-1 Awake Check Active)",
    `🎧 Audio Recording: ${input.recordingUrl}`,
  ].join("\n");

  const lines = [
    "After-hours call analyzed",
    `Phone: ${input.fromNumber}`,
    `Caller: ${input.callerName}`,
    `Emergency: ${input.emergencyType}`,
    `Address: ${input.propertyAddress}`,
    `Water shutoff: ${input.waterShutoff}`,
    `Recording: ${input.recordingUrl}`,
    `Summary: ${input.callSummary}`,
    "",
    "Paste into Google Voice / SMS:",
    "```",
    sms,
    "```",
  ];

  let content = lines.join("\n");
  if (content.length <= DISCORD_LIMIT) return content;

  lines[6] = "Recording: in the text below";
  const summaryRoom =
    DISCORD_LIMIT - lines.join("\n").length + input.callSummary.length;
  lines[7] =
    summaryRoom > 12 ? `Summary: ${line(input.callSummary, summaryRoom)}` : "Summary: —";
  content = lines.join("\n");
  if (content.length <= DISCORD_LIMIT) return content;

  const urlRoom = Math.max(
    16,
    input.recordingUrl.length - (content.length - DISCORD_LIMIT),
  );
  const shortUrl = input.recordingUrl.slice(0, urlRoom);
  lines[11] = [
    `[${BRAND_NAME} Demo]`,
    `🚨 Emergency Logged: ${input.emergencyType}`,
    `📍 Address: ${input.propertyAddress}`,
    `💧 Water Shutoff: ${input.waterShutoff}`,
    "📲 Status: Calling On-Call Tech #1 (Press-1 Awake Check Active)",
    `🎧 Audio Recording: ${shortUrl}`,
  ].join("\n");
  return lines.join("\n").slice(0, DISCORD_LIMIT);
}

export async function POST(request: Request) {
  let body: RetellWebhook;
  try {
    body = (await request.json()) as RetellWebhook;
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  if (body?.event !== "call_analyzed") {
    return new Response(null, { status: 204 });
  }

  const call = body.call || {};
  const analysis = call.call_analysis || {};
  const custom = analysis.custom_analysis_data || {};

  const from_number = line(call.from_number, 40) || "Unknown";
  const recording_url = line(call.recording_url, 900) || "Processing";
  const call_summary = line(analysis.call_summary, 800) || "No summary yet";
  const caller_name = line(custom.caller_name, 120) || "Unknown";
  const property_address = line(custom.property_address, 180) || "Captured on call";
  const emergency_type = line(custom.emergency_type, 120) || "After-Hours Emergency";
  const water_shutoff_status =
    custom.water_shutoff_status == null
      ? "Checked"
      : line(custom.water_shutoff_status, 80) || "Checked";

  const content = alertMessage({
    fromNumber: from_number,
    callerName: caller_name,
    emergencyType: emergency_type,
    propertyAddress: property_address,
    waterShutoff: water_shutoff_status,
    recordingUrl: recording_url,
    callSummary: call_summary,
  });

  const webhookUrl = process.env.DISCORD_LEAD_WEBHOOK_URL;
  if (!webhookUrl) {
    return Response.json({ ok: false, reason: "unconfigured" }, { status: 503 });
  }

  try {
    const discord = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(8000),
      body: JSON.stringify({ content }),
    });

    if (!discord.ok) {
      return Response.json({ ok: false }, { status: 502 });
    }
  } catch {
    return Response.json({ ok: false }, { status: 502 });
  }

  return Response.json({ ok: true });
}
