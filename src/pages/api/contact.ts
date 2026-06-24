import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

import { buildContactEmailHtml } from "@/lib/email/contactEmail";
import { contactSchema } from "@/lib/validation/contact";

type ApiResult =
  | { ok: true }
  | {
      ok: false;
      error: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResult>,
) {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method Not Allowed" });
    return;
  }

  const parsed = contactSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ ok: false, error: "Invalid request" });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !fromEmail || !toEmail) {
    res.status(500).json({ ok: false, error: "Email service not configured" });
    return;
  }

  const resend = new Resend(apiKey);
  const payload = parsed.data;

  await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: payload.email,
    subject: `[HMIOSS] ${payload.subject}`,
    html: buildContactEmailHtml(payload),
  });

  res.status(200).json({ ok: true });
}

