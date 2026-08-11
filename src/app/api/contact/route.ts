import { NextResponse } from "next/server";
import { Resend } from "resend";

// Contact form endpoint. Requires the following environment variables to be
// set (locally in `.env.local`, and in your hosting provider's project
// settings for production):
//
//   RESEND_API_KEY     - API key from https://resend.com/api-keys
//   CONTACT_TO_EMAIL    - inbox that should receive submissions (optional,
//                          defaults to info@b2zpartners.com)
//   CONTACT_FROM_EMAIL  - verified sender address (optional, defaults to
//                          Resend's shared test address, which only works
//                          for sending to your own Resend account email
//                          until you verify a domain in Resend)
//
// See README.md for the full setup guide.

export const runtime = "nodejs";

interface ContactPayload {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  message?: string;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const company = body.company?.trim();
  const phone = body.phone?.trim();
  const message = body.message?.trim();

  if (!name || !email || !company || !message) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error(
      "[contact] RESEND_API_KEY is not set — see README.md to configure email sending.",
    );
    return NextResponse.json(
      { error: "email_not_configured" },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const toEmail = process.env.CONTACT_TO_EMAIL || "info@b2zpartners.com";
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL || "B2Z Advisory <onboarding@resend.dev>";

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `Yeni iletişim formu — ${company}`,
      text: [
        `Ad Soyad: ${name}`,
        `E-posta: ${email}`,
        `Şirket: ${company}`,
        phone ? `Telefon: ${phone}` : null,
        "",
        "Mesaj:",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json({ error: "send_failed" }, { status: 500 });
  }
}
