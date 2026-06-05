import { Resend } from "resend";

let _resend: Resend | null = null;
function getResend() {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY ?? "placeholder");
  return _resend;
}

export const FROM = "yourwebsitenow.co.uk <noreply@yourwebsitenow.co.uk>";
export const ADMIN_EMAIL = "hello@yourwebsitenow.co.uk";

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    await getResend().emails.send({ from: FROM, to, subject, html });
  } catch (err) {
    console.error("Resend error:", err);
  }
}
