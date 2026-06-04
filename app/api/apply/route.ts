import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

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
    ip_address: ip,
    status: "new_lead",
  }).select().single();

  if (error) {
    console.error("Supabase insert error:", error);
    // Don't expose DB errors to client — still redirect to thank-you
  }

  return NextResponse.json({ ok: true, id: data?.id ?? null });
}
