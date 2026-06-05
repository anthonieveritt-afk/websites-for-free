import Link from "next/link";
import { createServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function getStats() {
  try {
    const supabase = createServiceClient();
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

    const [
      { count: totalApps },
      { count: newLeads },
      { count: trialsLive },
      { count: activeSubscribers },
      { data: recentApps },
      { data: recentDeploys },
    ] = await Promise.all([
      supabase.from("applications").select("*", { count: "exact", head: true }),
      supabase.from("applications").select("*", { count: "exact", head: true }).eq("status", "new_lead"),
      supabase.from("applications").select("*", { count: "exact", head: true }).eq("status", "trial_live"),
      supabase.from("applications").select("*", { count: "exact", head: true }).eq("status", "active_subscriber"),
      supabase.from("applications").select("id,business_name,status,created_at,package").order("created_at", { ascending: false }).limit(5),
      supabase.from("deployments").select("id,deploy_url,created_at,status").order("created_at", { ascending: false }).limit(5),
    ]);

    return { totalApps, newLeads, trialsLive, activeSubscribers, recentApps: recentApps ?? [], recentDeploys: recentDeploys ?? [] };
  } catch {
    return { totalApps: 0, newLeads: 0, trialsLive: 0, activeSubscribers: 0, recentApps: [], recentDeploys: [] };
  }
}

const STATUS_BADGE: Record<string, { bg: string; text: string }> = {
  new_lead:          { bg: "bg-blue-100",    text: "text-blue-700" },
  accepted:          { bg: "bg-indigo-100",  text: "text-indigo-700" },
  in_design:         { bg: "bg-purple-100",  text: "text-purple-700" },
  in_build:          { bg: "bg-orange-100",  text: "text-orange-700" },
  trial_live:        { bg: "bg-emerald-100", text: "text-emerald-700" },
  active_subscriber: { bg: "bg-green-100",   text: "text-green-700" },
  cancelled:         { bg: "bg-gray-100",    text: "text-gray-500" },
};

export default async function AdminDashboard() {
  const { totalApps, newLeads, trialsLive, activeSubscribers, recentApps, recentDeploys } = await getStats();

  const stats = [
    { label: "Total Applications", value: totalApps ?? 0, colour: "text-gray-900", icon: "📋", href: "/admin/applications" },
    { label: "New Leads", value: newLeads ?? 0, colour: "text-blue-600", icon: "🔵", href: "/admin/applications" },
    { label: "Trials Live", value: trialsLive ?? 0, colour: "text-emerald-600", icon: "🟢", href: "/admin/applications" },
    { label: "Active Subscribers", value: activeSubscribers ?? 0, colour: "text-green-600", icon: "💳", href: "/admin/billing" },
  ];

  const quickActions = [
    { label: "View Applications", href: "/admin/applications", icon: "📋", desc: "Review new leads and manage clients" },
    { label: "Deployed Websites", href: "/admin/websites", icon: "🌐", desc: "All live client sites and deployments" },
    { label: "Billing", href: "/admin/billing", icon: "💳", desc: "Subscriptions, payments, and revenue" },
    { label: "Media Library", href: "/admin/media", icon: "🖼️", desc: "Client logos, photos, and uploads" },
    { label: "Coupons", href: "/admin/coupons", icon: "🎟️", desc: "Manage discount codes" },
    { label: "Settings", href: "/admin/settings", icon: "⚙️", desc: "Platform configuration" },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back. Here's what's happening.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{s.icon}</span>
            </div>
            <div className={`text-3xl font-black ${s.colour}`}>{s.value}</div>
            <div className="text-sm text-gray-500 mt-1">{s.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Applications */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-gray-900">Recent Applications</h2>
            <Link href="/admin/applications" className="text-xs text-indigo-600 font-semibold hover:underline">View all →</Link>
          </div>
          {recentApps.length === 0 ? (
            <div className="px-5 py-8 text-center text-sm text-gray-400">No applications yet</div>
          ) : (
            <div className="divide-y divide-gray-50">
              {recentApps.map((app: { id: string; business_name: string; status: string; created_at: string; package: string | null }) => {
                const badge = STATUS_BADGE[app.status] ?? { bg: "bg-gray-100", text: "text-gray-600" };
                return (
                  <Link key={app.id} href={`/admin/applications/${app.id}`} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs flex-shrink-0">
                      {app.business_name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 text-sm truncate">{app.business_name}</div>
                      <div className="text-xs text-gray-400">{new Date(app.created_at).toLocaleDateString("en-GB")}</div>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badge.bg} ${badge.text}`}>
                      {app.status.replace(/_/g, " ")}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Deployments */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-gray-900">Recent Deployments</h2>
            <Link href="/admin/websites" className="text-xs text-indigo-600 font-semibold hover:underline">View all →</Link>
          </div>
          {recentDeploys.length === 0 ? (
            <div className="px-5 py-8 text-center text-sm text-gray-400">No deployments yet</div>
          ) : (
            <div className="divide-y divide-gray-50">
              {recentDeploys.map((d: { id: string; deploy_url: string | null; created_at: string; status: string }) => (
                <div key={d.id} className="flex items-center gap-3 px-5 py-3">
                  <span className="text-lg">🌐</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">{d.deploy_url ?? "—"}</div>
                    <div className="text-xs text-gray-400">{new Date(d.created_at).toLocaleDateString("en-GB")}</div>
                  </div>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">{d.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickActions.map((a) => (
            <Link key={a.href} href={a.href} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:border-indigo-200 transition-all group">
              <div className="text-2xl mb-2">{a.icon}</div>
              <div className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors text-sm">{a.label}</div>
              <div className="text-xs text-gray-400 mt-0.5">{a.desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
