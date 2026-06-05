import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { sendEmail, ADMIN_EMAIL } from "@/lib/email/resend";

// Simple in-memory rate limiter (resets on cold start — good enough for low traffic)
const ipSubmissions: Record<string, { count: number; resetAt: number }> = {};

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const window = 60 * 60 * 1000; // 1 hour
  const entry = ipSubmissions[ip];
  if (!entry || now > entry.resetAt) {
    ipSubmissions[ip] = { count: 1, resetAt: now + window };
    return false;
  }
  if (entry.count >= 3) return true;
  entry.count++;
  return false;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  // Honeypot check
  const body = await req.json();
  if (body._hp) {
    return NextResponse.json({ ok: true }); // Silently drop bots
  }

  // Rate limit
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many submissions. Please try again later." }, { status: 429 });
  }

  const {
    businessName, industry, location, currentUrl, hasWebsite,
    goals, idealCustomers, competitorUrls,
    features, pageCount,
    fullName, email, phone, bestTime,
    budget, timeline, howFound,
    brandColours, domainStatus, existingDomain,
    wantsBasicShop, couponCode, specialNotes,
    socialLinks,
  } = body;

  if (!businessName || !email || !fullName) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Map budget label to plan key
  const planMap: Record<string, string> = {
    "£29/month": "starter",
    "£49/month": "growth",
    "£79/month": "pro",
  };

  const supabase = createServiceClient();

  const { data, error } = await supabase.from("applications").insert({
    business_name: businessName,
    industry,
    location,
    current_website: hasWebsite === "Yes" ? currentUrl : null,
    contact_name: fullName,
    email,
    phone,
    best_time: bestTime,
    goals: goals ?? [],
    ideal_customers: idealCustomers,
    competitor_urls: competitorUrls,
    features_wanted: features ?? [],
    page_count: pageCount,
    package: planMap[budget] ?? null,
    wants_basic_shop: wantsBasicShop ?? false,
    coupon_code: couponCode ?? null,
    brand_colours: brandColours,
    domain_status: domainStatus ?? "not_sure",
    existing_domain: existingDomain,
    how_found: howFound,
    timeline,
    special_notes: specialNotes,
    social_links: socialLinks ?? {},
    logo_url: body.logoUrl ?? null,
    hero_url: body.heroUrl ?? null,
    gallery_urls: body.galleryUrls ?? [],
    ip_address: ip,
    status: "new_lead",
  }).select().single();

  if (error) {
    console.error("Supabase insert error:", error);
  }

  // Notify admin of new application
  await sendEmail({
    to: ADMIN_EMAIL,
    subject: `🆕 New application — ${businessName}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
        <h2 style="color:#4f46e5;">New website application received</h2>
        <p><strong>${businessName}</strong> (${industry ?? "Unknown industry"}) has applied for a free website.</p>
        <table style="width:100%;border-collapse:collapse;margin:16px 0;">
          <tr><td style="padding:6px 0;color:#555;width:120px;"><strong>Contact</strong></td><td>${fullName}</td></tr>
          <tr><td style="padding:6px 0;color:#555;"><strong>Email</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:6px 0;color:#555;"><strong>Phone</strong></td><td>${phone ?? '—'}</td></tr>
          <tr><td style="padding:6px 0;color:#555;"><strong>Package</strong></td><td>${budget ?? 'Not selected'}</td></tr>
          <tr><td style="padding:6px 0;color:#555;"><strong>Timeline</strong></td><td>${timeline ?? '—'}</td></tr>
        </table>
        <a href="https://yourwebsitenow.co.uk/admin" style="display:inline-block;background:#4f46e5;color:#fff;padding:12px 24px;border-radius:24px;text-decoration:none;font-weight:bold;">View in Admin →</a>
      </div>
    `,
  });

  // Confirmation email to client
  await sendEmail({
    to: email,
    subject: `We've received your application — yourwebsitenow.co.uk`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
        <h2 style="color:#4f46e5;">Thanks, ${fullName}!</h2>
        <p>We've received your application for <strong>${businessName}</strong> and we'll get started on your website shortly.</p>
        <p>Here's what happens next:</p>
        <ol style="color:#555;line-height:1.8;">
          <li>We review your application (usually within 1 working day)</li>
          <li>We build your professional website</li>
          <li>We send you a preview link to approve</li>
          <li>Your free 10-day trial starts once you approve</li>
        </ol>
        <p style="color:#555;">If you have any questions, reply to this email or contact us at <a href="mailto:hello@yourwebsitenow.co.uk">hello@yourwebsitenow.co.uk</a>.</p>
        <p style="color:#555;">— The yourwebsitenow.co.uk team</p>
      </div>
    `,
  });

  return NextResponse.json({ ok: true, id: data?.id ?? null });
}
