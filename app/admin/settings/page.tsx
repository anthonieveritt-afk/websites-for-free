import { BRAND, PLANS } from "@/lib/config/brand";

export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Platform configuration. Code changes are deployed instantly via GitHub.</p>
      </div>

      {/* Brand */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4">
        <h2 className="font-bold text-gray-900 mb-4">Brand</h2>
        <div className="space-y-3 text-sm">
          {[
            { label: "Brand name", value: BRAND.name },
            { label: "Domain", value: BRAND.domain },
            { label: "Email", value: BRAND.email },
            { label: "Trial period", value: `${BRAND.trialDays} days` },
            { label: "Grace period (post-trial)", value: `${BRAND.gracePeriodDays} days` },
            { label: "Grace period (payment fail)", value: `${BRAND.paymentFailureGraceDays} days` },
          ].map((r) => (
            <div key={r.label} className="flex justify-between py-2 border-b border-gray-50 last:border-0">
              <span className="text-gray-500">{r.label}</span>
              <span className="font-semibold text-gray-900 font-mono text-xs">{r.value}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-4">
          To change these, edit <code className="bg-gray-100 px-1 rounded">lib/config/brand.ts</code> and push to GitHub. Changes deploy in ~30 seconds.
        </p>
      </div>

      {/* Pricing */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4">
        <h2 className="font-bold text-gray-900 mb-4">Pricing Plans</h2>
        <div className="space-y-3">
          {Object.entries(PLANS).map(([key, plan]) => (
            <div key={key} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
              <div>
                <div className="font-semibold text-gray-900 capitalize">{plan.name}</div>
                <div className="text-xs text-gray-400">
                  Up to {plan.maxPages === Infinity ? "unlimited" : plan.maxPages} pages
                  {plan.stripePriceId ? ` · Stripe: ${plan.stripePriceId}` : " · No Stripe price set"}
                </div>
              </div>
              <div className="text-xl font-black text-indigo-600">£{plan.price}/mo</div>
            </div>
          ))}
        </div>
      </div>

      {/* Environment */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4">
        <h2 className="font-bold text-gray-900 mb-4">Connected Services</h2>
        <div className="space-y-2">
          {[
            { name: "Supabase", status: !!process.env.NEXT_PUBLIC_SUPABASE_URL, detail: "Database + Storage" },
            { name: "Clerk", status: !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, detail: "Authentication" },
            { name: "Stripe", status: !!process.env.STRIPE_SECRET_KEY, detail: "Payments" },
            { name: "Resend", status: !!process.env.RESEND_API_KEY, detail: "Email" },
            { name: "Vercel API", status: !!process.env.VERCEL_API_TOKEN, detail: "Site deployment" },
          ].map((s) => (
            <div key={s.name} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <div>
                <span className="font-semibold text-gray-900 text-sm">{s.name}</span>
                <span className="text-xs text-gray-400 ml-2">{s.detail}</span>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${s.status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                {s.status ? "✓ Connected" : "✗ Missing"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Webhook */}
      <div className="bg-amber-50 rounded-2xl border border-amber-100 p-6">
        <h2 className="font-bold text-amber-900 mb-2">Stripe Webhook</h2>
        <p className="text-sm text-amber-700 mb-3">Add this URL in your Stripe dashboard under Developers → Webhooks:</p>
        <code className="block bg-white border border-amber-200 rounded-xl px-4 py-3 text-sm text-gray-900 font-mono break-all">
          https://{BRAND.domain}/api/stripe/webhook
        </code>
        <p className="text-xs text-amber-600 mt-3">
          Events: <code>checkout.session.completed · invoice.payment_succeeded · invoice.payment_failed · customer.subscription.deleted</code>
        </p>
      </div>
    </div>
  );
}
