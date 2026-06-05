import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { PLANS } from "@/lib/config/brand";

export async function POST(req: NextRequest) {
  const { code, plan } = await req.json();
  if (!code) return NextResponse.json({ error: "No code provided" }, { status: 400 });

  const supabase = createServiceClient();
  const { data: coupon, error } = await supabase
    .from("coupons")
    .select("*")
    .eq("code", code.trim().toUpperCase())
    .eq("enabled", true)
    .single();

  if (error || !coupon) {
    return NextResponse.json({ valid: false, error: "Invalid or expired coupon code" });
  }

  // Check expiry
  if (coupon.expiry_at && new Date(coupon.expiry_at) < new Date()) {
    return NextResponse.json({ valid: false, error: "This coupon has expired" });
  }

  // Check max uses
  if (coupon.max_uses !== null && coupon.uses_count >= coupon.max_uses) {
    return NextResponse.json({ valid: false, error: "This coupon has reached its usage limit" });
  }

  // Check plan eligibility
  if (plan && coupon.applicable_plans?.length > 0 && !coupon.applicable_plans.includes(plan)) {
    return NextResponse.json({ valid: false, error: `This coupon is not valid for the ${plan} plan` });
  }

  // Calculate discounted price
  const planPrice = plan ? PLANS[plan as keyof typeof PLANS]?.price ?? null : null;
  let discountedPrice: number | null = null;
  let savingAmount: number | null = null;

  if (planPrice !== null) {
    if (coupon.discount_type === "percentage") {
      savingAmount = Math.round(planPrice * (coupon.discount_value / 100) * 100) / 100;
      discountedPrice = Math.max(0, planPrice - savingAmount);
    } else {
      // fixed — stored in pence, convert to pounds
      savingAmount = coupon.discount_value / 100;
      discountedPrice = Math.max(0, planPrice - savingAmount);
    }
  }

  return NextResponse.json({
    valid: true,
    coupon: {
      code: coupon.code,
      description: coupon.description,
      discount_type: coupon.discount_type,
      discount_value: coupon.discount_value,
    },
    originalPrice: planPrice,
    discountedPrice,
    savingAmount,
  });
}
