import { createServiceClient } from "@/lib/supabase/server";
import CouponManager from "./CouponManager";

export const dynamic = "force-dynamic";

async function getCoupons() {
  try {
    const supabase = createServiceClient();
    const { data } = await supabase
      .from("coupons")
      .select("*")
      .order("created_at", { ascending: false });
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function CouponsPage() {
  const coupons = await getCoupons();

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Coupons</h1>
          <p className="text-gray-500 mt-1">Create and manage discount codes for clients.</p>
        </div>
      </div>
      <CouponManager coupons={coupons} />
    </div>
  );
}
