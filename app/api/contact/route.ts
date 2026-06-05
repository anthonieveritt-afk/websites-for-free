import { NextRequest, NextResponse } from "next/server";
import { sendEmail, ADMIN_EMAIL } from "@/lib/email/resend";

export async function POST(req: NextRequest) {
  const { name, email, phone, message, to, businessName } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const recipient = to ?? ADMIN_EMAIL;
  const subject = businessName
    ? `New enquiry for ${businessName} — from ${name}`
    : `New website enquiry from ${name}`;

  await sendEmail({
    to: recipient,
    subject,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
        <h2 style="color:#1a1a2e;margin-bottom:4px;">New Website Enquiry</h2>
        ${businessName ? `<p style="color:#666;margin-top:0;">Via <strong>${businessName}</strong>'s website</p>` : ""}
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;"/>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#555;width:100px;"><strong>Name</strong></td><td style="padding:8px 0;">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#555;"><strong>Email</strong></td><td style="padding:8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
          ${phone ? `<tr><td style="padding:8px 0;color:#555;"><strong>Phone</strong></td><td style="padding:8px 0;">${phone}</td></tr>` : ""}
          <tr><td style="padding:8px 0;color:#555;vertical-align:top;"><strong>Message</strong></td><td style="padding:8px 0;">${message.replace(/\n/g, "<br/>")}</td></tr>
        </table>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;"/>
        <p style="color:#999;font-size:12px;">Sent via yourwebsitenow.co.uk</p>
      </div>
    `,
  });

  return NextResponse.json({ ok: true });
}
