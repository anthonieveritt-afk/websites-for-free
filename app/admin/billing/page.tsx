import { createServiceClient } from "@/lib/supabase/server";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getData() {
  try {
    const supabase = createServiceClient();
    const { data } = await supabase
      .from("subscriptions")
      .select("*, applications(business_name, email, package)")
      .order("created_at", { ascending: false });
    return data ?? [];
  } catch { return []; }
}

const STATUS_STYLE: Record<string, { bg: string; text: string; label: string }> = {
  trialing:   { bg: "bg-blue-100",    text: "text-blue-700",   label: "Trial" },
  active:     { bg: "bg-green-100",   text: "text-green-700",  label: "Active" },
  past_due:   { bg: "bg-amber-100",   text: "text-amber-700",  label: "Past Due" },
  cancelled:  { bg: "bg-gray-100",    text: "text-gray-500",   label: "Cancelled" },
};

const PLAN_PRICE: Record<string, number> = { starter: 29, growth: 49, pro: 79 };

export default async function BillingPage() {
  const subs = await getData();

  const active = subs.filter((s: { status: string }) => s.status === "active");
  const trialing = subs.filter((s: { status: string }) => s.status === "trialing");
  const pastDue = subs.filter((s: { status: string }) => s.status === "past_due");
  const mrr = active.reduce((sum: number, s: { plan: string | null }) => sum + (PLAN_PRICE[s.plan ?? ""] ?? 0), 0);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900">Billing</h1>
        <p className="text-gray-500 mt-1">Subscription overview and payment status.</p>
      </div>

      {/* Revenue cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Monthly Revenue", value: `£${mrr}`, colour: "text-green-600" },
          { label: "Active Subscribers", value: active.length, colour: "text-green-600" },
          { label: "On Trial", value: trialing.length, colour: "text-blue-600" },
          { label: "Past Due", value: pastDue.length, colour: "text-amber-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className={`text-3xl font-black ${s.colour}`}>{s.value}</div>
            <div className="text-sm text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Subscriptions table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">All Subscriptions</h2>
        </div>
        {subs.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="text-4xl mb-3">💳</div>
            <div className="font-semibold text-gray-700 mb-1">No subscriptions yet</div>
            <div className="text-sm text-gray-400">Subscriptions will appear here once clients sign up via Stripe.</div>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {subs.map((s: {
              id: string;
              application_id: string;
              plan: string | null;
              status: string;
              created_at: string;
              stripe_subscription_id: string | null;
              applications: { business_name: string; email: string; package: string | null } | null;
            }) => {
              const style = STATUS_STYLE[s.status] ?? { bg: "bg-gray-100", text: "text-gray-600", label: s.status };
              return (
                <div key={s.id} className="flex items-center gap-4 px-6 py-4">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900">{s.applications?.business_name ?? "—"}</div>
                    <div className="text-xs text-gray-400">{s.applications?.email ?? "—"}</div>
                  </div>
                  <div className="hidden md:block text-sm font-bold text-gray-700 capitalize w-20">
                    {s.plan ?? "—"} <span className="text-gray-400 font-normal">£{PLAN_PRICE[s.plan ?? ""] ?? "?"}/mo</span>
                  </div>
                  <div className="hidden lg:block text-xs text-gray-400 w-24">
                    Since {new Date(s.created_at).toLocaleDateString("en-GB")}
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${style.bg} ${style.text}`}>
                    {style.label}
                  </span>
                  <Link href={`/admin/applications/${s.application_id}`}
                    className="text-xs text-indigo-600 hover:underline font-medium">
                    View →
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
