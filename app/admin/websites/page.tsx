import { createServiceClient } from "@/lib/supabase/server";
import Link from "next/link";
import RedeployButton from "./RedeployButton";

export const dynamic = "force-dynamic";

async function getData() {
  try {
    const supabase = createServiceClient();
    const { data } = await supabase
      .from("deployments")
      .select("*, applications(business_name, email, package, status)")
      .order("created_at", { ascending: false });
    return data ?? [];
  } catch { return []; }
}

export default async function WebsitesPage() {
  const deployments = await getData();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900">Deployed Websites</h1>
        <p className="text-gray-500 mt-1">All client sites you've built and deployed.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {deployments.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="text-4xl mb-3">🌐</div>
            <div className="font-semibold text-gray-700 mb-1">No deployments yet</div>
            <div className="text-sm text-gray-400">Sites deployed from the Applications page will appear here.</div>
            <Link href="/admin/applications" className="inline-block mt-4 text-sm text-indigo-600 font-semibold hover:underline">
              Go to Applications →
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {deployments.map((d: {
              id: string;
              application_id: string;
              deploy_url: string | null;
              status: string;
              created_at: string;
              applications: { business_name: string; email: string; package: string | null; status: string } | null;
            }) => (
              <div key={d.id} className="flex items-center gap-4 px-6 py-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm flex-shrink-0">
                  {(d.applications?.business_name ?? "?").charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900">{d.applications?.business_name ?? "Unknown"}</div>
                  {d.deploy_url ? (
                    <a href={d.deploy_url} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-indigo-600 hover:underline truncate block max-w-xs">
                      {d.deploy_url}
                    </a>
                  ) : (
                    <span className="text-xs text-gray-400">No URL</span>
                  )}
                </div>
                <div className="hidden md:block text-xs text-gray-400">
                  {new Date(d.created_at).toLocaleDateString("en-GB")}
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${d.status === "live" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>
                  {d.status}
                </span>
                {d.deploy_url && (
                  <a href={d.deploy_url} target="_blank" rel="noopener noreferrer"
                    className="text-xs bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full transition-colors font-medium">
                    View ↗
                  </a>
                )}
                {d.application_id && (
                  <RedeployButton applicationId={d.application_id} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
