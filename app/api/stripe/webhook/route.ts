import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createServiceClient } from "@/lib/supabase/server";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, );
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, sig!, webhookSecret!);
  } catch {
    return NextResponse.json({ error: "Webhook signature invalid" }, { status: 400 });
  }

  const supabase = createServiceClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const { applicationId, plan } = session.metadata ?? {};
      if (applicationId) {
        await supabase.from("subscriptions").upsert({
          application_id: applicationId,
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: session.subscription as string,
          plan,
          status: "trialing",
          updated_at: new Date().toISOString(),
        });
        await supabase.from("applications").update({ status: "trial_live" }).eq("id", applicationId);
      }
      break;
    }
    case "invoice.payment_succeeded": {
      const invoice = event.data.object as Stripe.Invoice;
      const subId = (invoice as unknown as { subscription: string }).subscription;
      if (subId) {
        await supabase.from("subscriptions").update({ status: "active", updated_at: new Date().toISOString() })
          .eq("stripe_subscription_id", subId);
      }
      break;
    }
    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      const subId = (invoice as unknown as { subscription: string }).subscription;
      if (subId) {
        await supabase.from("subscriptions").update({ status: "past_due", updated_at: new Date().toISOString() })
          .eq("stripe_subscription_id", subId);
      }
      break;
    }
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      await supabase.from("subscriptions").update({ status: "cancelled", updated_at: new Date().toISOString() })
        .eq("stripe_subscription_id", sub.id);
      const { data } = await supabase.from("subscriptions").select("application_id").eq("stripe_subscription_id", sub.id).single();
      if (data?.application_id) {
        await supabase.from("applications").update({ status: "cancelled" }).eq("id", data.application_id);
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
