import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  website?: string;
};

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitBucket>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

function sanitize(value: string): string {
  return value.replace(/[\r\n]/g, " ").trim();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

async function sendViaResend({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return { sent: false };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `[Portfolio] ${subject}`,
      reply_to: email,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  });

  if (!response.ok) {
    throw new Error("Email provider rejected request");
  }

  return { sent: true };
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const now = Date.now();
  const bucket = rateLimitStore.get(ip);

  if (!bucket || now > bucket.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
  } else {
    if (bucket.count >= RATE_LIMIT_MAX) {
      return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });
    }

    bucket.count += 1;
    rateLimitStore.set(ip, bucket);
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const name = sanitize(body.name ?? "");
  const email = sanitize(body.email ?? "");
  const subject = sanitize(body.subject ?? "");
  const message = sanitize(body.message ?? "");
  const website = sanitize(body.website ?? "");

  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }

  if (message.length < 10 || message.length > 3000) {
    return NextResponse.json({ ok: false, error: "Message length is out of range" }, { status: 400 });
  }

  try {
    const result = await sendViaResend({ name, email, subject, message });

    if (!result.sent) {
      console.info("Contact form received but email provider is not configured", {
        name,
        email,
        subject,
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to send email" }, { status: 502 });
  }
}
