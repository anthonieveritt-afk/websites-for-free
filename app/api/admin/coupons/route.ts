import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  const body = await req.json();
  const { code, description, discount_type, discount_value, applicable_plans, expiry_at, max_uses } = body;

  if (!code || !discount_type || discount_value === undefined) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase.from("coupons").insert({
    code: code.toUpperCase(),
    description: description || null,
    discount_type,
    discount_value,
    applicable_plans: applicable_plans ?? ["starter", "growth", "pro"],
    expiry_at: expiry_at || null,
    max_uses: max_uses || null,
    enabled: true,
  }).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, data });
}
