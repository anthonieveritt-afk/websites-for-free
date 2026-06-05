import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PLANS } from "@/lib/config/brand";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, );
}

export async function POST(req: NextRequest) {
  const { plan, applicationId, email, hasBasicShop } = await req.json();

  const planConfig = PLANS[plan as keyof typeof PLANS];
  if (!planConfig) return NextResponse.json({ error: "Invalid plan" }, { status: 400 });

  const stripe = getStripe();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://yourwebsitenow.co.uk";

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    { price: planConfig.stripePriceId, quantity: 1 },
  ];

  // Add Basic Shop addon if selected
  if (hasBasicShop && process.env.STRIPE_BASIC_SHOP_ADDON_PRICE_ID) {
    lineItems.push({ price: process.env.STRIPE_BASIC_SHOP_ADDON_PRICE_ID, quantity: 1 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: lineItems,
    customer_email: email,
    success_url: `${appUrl}/dashboard?subscribed=1&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/dashboard?cancelled=1`,
    metadata: { applicationId, plan },
    subscription_data: {
      trial_period_days: 10,
      metadata: { applicationId, plan },
    },
  });

  return NextResponse.json({ url: session.url });
}
