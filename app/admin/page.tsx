import Link from "next/link";
import { createServiceClient } from "@/lib/supabase/server";
import { Application, STATUS_LABELS, STATUS_COLOURS, ApplicationStatus } from "@/lib/types/application";
import { PLANS } from "@/lib/config/brand";

export const dynamic = "force-dynamic";

const PLAN_BADGE: Record<string, { bg: string; text: string; label: string }> = {
  starter: { bg: "bg-slate-100",  text: "text-slate-700", label: "Starter" },
  growth:  { bg: "bg-indigo-100", text: "text-indigo-700", label: "Growth" },
  pro:     { bg: "bg-violet-100", text: "text-violet-700", label: "Pro" },
};

async function getApplications(): Promise<Application[]> {
  try {
    const supabase = createServiceClient();
    const { data } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });
    return (data ?? []) as Application[];
  } catch {
    return [];
  }
}

function StatusBadge({ status }: { status: ApplicationStatus }) {
  const { bg, text } = STATUS_COLOURS[status] ?? { bg: "bg-gray-100", text: "text-gray-600" };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${bg} ${text}`}>
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}

export default async function AdminDashboard() {
  const applications = await getApplications();

  const counts = {
    total: applications.length,
    new: applications.filter((a) => a.status === "new_lead").length,
    active: applications.filter((a) => a.status === "active_subscriber").length,
    trial: applications.filter((a) => a.status === "trial_live").length,
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900">Applications</h1>
        <p className="text-gray-500 mt-1">Manage all client applications and website builds.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Applications", value: counts.total, colour: "text-gray-900" },
          { label: "New Leads", value: counts.new, colour: "text-blue-600" },
          { label: "Trials Live", value: counts.trial, colour: "text-emerald-600" },
          { label: "Active Subscribers", value: counts.active, colour: "text-green-600" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className={`text-3xl font-black ${stat.colour}`}>{stat.value}</div>
            <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Applications table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-gray-900">All Applications</h2>
          <span className="text-sm text-gray-500">{applications.length} total</span>
        </div>

        {applications.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="text-4xl mb-3">📋</div>
            <div className="font-semibold text-gray-700 mb-1">No applications yet</div>
            <div className="text-sm text-gray-400">Applications will appear here when clients submit the form.</div>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {applications.map((app) => (
              <Link
                key={app.id}
                href={`/admin/applications/${app.id}`}
                className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors group"
              >
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm flex-shrink-0">
                  {app.business_name.charAt(0).toUpperCase()}
                </div>

                {/* Main info */}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors truncate">
                    {app.business_name}
                  </div>
                  <div className="text-sm text-gray-500 truncate">
                    {app.contact_name} · {app.email}
                  </div>
                </div>

                {/* Industry */}
                <div className="hidden md:block text-sm text-gray-500 w-36 truncate">
                  {app.industry ?? "—"}
                </div>

                {/* Plan */}
                <div className="hidden lg:block w-24">
                  {app.package ? (
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${PLAN_BADGE[app.package]?.bg} ${PLAN_BADGE[app.package]?.text}`}>
                      {PLAN_BADGE[app.package]?.label}
                      {app.wants_basic_shop ? " + Shop" : ""}
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">Not set</span>
                  )}
                </div>

                {/* Status */}
                <div className="w-36 flex justify-end">
                  <StatusBadge status={app.status} />
                </div>

                {/* Date */}
                <div className="hidden xl:block text-xs text-gray-400 w-24 text-right">
                  {new Date(app.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                </div>

                <div className="text-gray-400 group-hover:text-indigo-400 transition-colors">→</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
