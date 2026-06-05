import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import Stripe from "stripe";
import { PLANS, BRAND } from "@/lib/config/brand";
import { sendEmail } from "@/lib/email/resend";
import { createServiceClient } from "@/lib/supabase/server";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  const { id } = await params;
  const { plan, email, hasBasicShop } = await req.json();

  const supabase = createServiceClient();

  const planConfig = PLANS[plan as keyof typeof PLANS];
  if (!planConfig) return NextResponse.json({ error: "Invalid plan" }, { status: 400 });

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  const stripe = getStripe();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? `https://${BRAND.domain}`;

  // Resolve coupon from the application record
  const { data: appData } = await supabase
    .from("applications")
    .select("coupon_code")
    .eq("id", id)
    .single();

  let stripeCouponId: string | null = null;
  if (appData?.coupon_code) {
    const { data: coupon } = await supabase
      .from("coupons")
      .select("*")
      .eq("code", appData.coupon_code.trim().toUpperCase())
      .eq("enabled", true)
      .single();

    if (coupon) {
      // Reuse existing Stripe coupon or create a new one
      if (coupon.stripe_coupon_id) {
        stripeCouponId = coupon.stripe_coupon_id;
      } else {
        const stripeCoupon = await stripe.coupons.create(
          coupon.discount_type === "percentage"
            ? { percent_off: coupon.discount_value, duration: "once", name: coupon.code }
            : { amount_off: coupon.discount_value, currency: "gbp", duration: "once", name: coupon.code }
        );
        stripeCouponId = stripeCoupon.id;
        // Save back to DB for reuse
        await supabase.from("coupons").update({ stripe_coupon_id: stripeCoupon.id }).eq("id", coupon.id);
      }
      // Increment uses count
      await supabase.from("coupons").update({ uses_count: (coupon.uses_count ?? 0) + 1 }).eq("id", coupon.id);
    }
  }

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    { price: planConfig.stripePriceId, quantity: 1 },
  ];

  if (hasBasicShop && process.env.STRIPE_BASIC_SHOP_ADDON_PRICE_ID) {
    lineItems.push({ price: process.env.STRIPE_BASIC_SHOP_ADDON_PRICE_ID, quantity: 1 });
  }

  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: lineItems,
    customer_email: email,
    success_url: `${appUrl}/thank-you?subscribed=1`,
    cancel_url: `${appUrl}`,
    metadata: { applicationId: id, plan },
    subscription_data: {
      trial_period_days: BRAND.trialDays,
      metadata: { applicationId: id, plan },
    },
  };

  if (stripeCouponId) {
    sessionParams.discounts = [{ coupon: stripeCouponId }];
  }

  const session = await stripe.checkout.sessions.create(sessionParams);

  // Email the payment link to the client
  const { data: app } = await supabase
    .from("applications")
    .select("business_name, contact_name")
    .eq("id", id)
    .single();

  const contactName = app?.contact_name ?? "there";
  const businessName = app?.business_name ?? "your website";
  const monthlyPrice = planConfig.price + (hasBasicShop ? 10 : 0);

  await sendEmail({
    to: email,
    subject: `Your website is ready — complete your subscription`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
        <h2 style="color:#16a34a;">Your website is ready, ${contactName}! 🎉</h2>
        <p>We've built your website for <strong>${businessName}</strong> and you're happy with it — great news!</p>
        <p>To keep your site live, simply start your subscription below. You'll get your first <strong>${BRAND.trialDays} days completely free</strong>, then just <strong>£${monthlyPrice}/month</strong> after that. Cancel any time.</p>
        <div style="text-align:center;margin:32px 0;">
          <a href="${session.url}" style="display:inline-block;background:#16a34a;color:#fff;padding:16px 32px;border-radius:999px;text-decoration:none;font-weight:bold;font-size:1rem;">
            Start My Free Trial →
          </a>
        </div>
        <p style="color:#6b7280;font-size:0.875rem;">No charge today. Your card won't be billed until the trial ends. Cancel any time with one email.</p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;"/>
        <p style="color:#9ca3af;font-size:0.8rem;">— The ${BRAND.name} team · <a href="mailto:${BRAND.email}" style="color:#9ca3af;">${BRAND.email}</a></p>
      </div>
    `,
  });

  // Log the action and update status
  await supabase.from("activity_logs").insert({
    application_id: id,
    action: "payment_link_sent",
    meta: { email, plan, checkoutSessionId: session.id },
  });

  await supabase.from("applications").update({
    status: "trial_live",
    updated_at: new Date().toISOString(),
  }).eq("id", id);

  return NextResponse.json({ ok: true });
}
