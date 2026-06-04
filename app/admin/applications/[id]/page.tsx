import { notFound } from "next/navigation";
import Link from "next/link";
import { createServiceClient } from "@/lib/supabase/server";
import { Application, Note, STATUS_LABELS, STATUS_COLOURS, ApplicationStatus } from "@/lib/types/application";
import StatusChanger from "./StatusChanger";
import NoteAdder from "./NoteAdder";

export const dynamic = "force-dynamic";

async function getData(id: string) {
  try {
    const supabase = createServiceClient();
    const [{ data: app }, { data: notes }] = await Promise.all([
      supabase.from("applications").select("*").eq("id", id).single(),
      supabase.from("notes").select("*").eq("application_id", id).order("created_at", { ascending: false }),
    ]);
    return { app: app as Application | null, notes: (notes ?? []) as Note[] };
  } catch {
    return { app: null, notes: [] };
  }
}

function InfoRow({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="flex gap-3 py-2.5 border-b border-gray-50 last:border-0">
      <span className="text-sm text-gray-400 w-40 flex-shrink-0">{label}</span>
      <span className="text-sm text-gray-900 font-medium">{value}</span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4">
      <h3 className="font-bold text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  );
}

export default async function ApplicationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { app, notes } = await getData(id);

  if (!app) notFound();

  const statusColour = STATUS_COLOURS[app.status] ?? { bg: "bg-gray-100", text: "text-gray-600" };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Back */}
      <Link href="/admin" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-indigo-600 mb-6 transition-colors">
        ← Back to applications
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900">{app.business_name}</h1>
          <p className="text-gray-500 mt-1">{app.contact_name} · {app.email} · {app.phone ?? "No phone"}</p>
        </div>
        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold ${statusColour.bg} ${statusColour.text}`}>
          {STATUS_LABELS[app.status]}
        </span>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Left column — main info */}
        <div className="lg:col-span-2 space-y-4">
          <Section title="Business Details">
            <InfoRow label="Business Name" value={app.business_name} />
            <InfoRow label="Industry" value={app.industry} />
            <InfoRow label="Contact Name" value={app.contact_name} />
            <InfoRow label="Email" value={app.email} />
            <InfoRow label="Phone" value={app.phone} />
            <InfoRow label="Current Website" value={app.current_website} />
            <InfoRow label="Ideal Customers" value={app.ideal_customers} />
          </Section>

          <Section title="Website Requirements">
            <InfoRow label="Pages Needed" value={app.page_count} />
            <InfoRow label="Domain Status" value={app.domain_status} />
            <InfoRow label="Existing Domain" value={app.existing_domain} />
            <InfoRow label="Brand Colours" value={app.brand_colours} />
            <InfoRow label="Competitor URLs" value={app.competitor_urls} />

            {app.goals?.length > 0 && (
              <div className="flex gap-3 py-2.5 border-b border-gray-50">
                <span className="text-sm text-gray-400 w-40 flex-shrink-0">Goals</span>
                <div className="flex flex-wrap gap-1.5">
                  {app.goals.map((g) => (
                    <span key={g} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-medium">{g}</span>
                  ))}
                </div>
              </div>
            )}

            {app.features_wanted?.length > 0 && (
              <div className="flex gap-3 py-2.5">
                <span className="text-sm text-gray-400 w-40 flex-shrink-0">Features</span>
                <div className="flex flex-wrap gap-1.5">
                  {app.features_wanted.map((f) => (
                    <span key={f} className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-medium">{f}</span>
                  ))}
                </div>
              </div>
            )}
          </Section>

          {app.special_notes && (
            <Section title="Additional Notes from Client">
              <p className="text-sm text-gray-700 leading-relaxed">{app.special_notes}</p>
            </Section>
          )}

          {/* Notes */}
          <Section title="Internal Notes">
            <NoteAdder applicationId={app.id} />
            {notes.length === 0 ? (
              <p className="text-sm text-gray-400 mt-4">No notes yet.</p>
            ) : (
              <div className="mt-4 space-y-3">
                {notes.map((note) => (
                  <div key={note.id} className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-800">{note.body}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(note.created_at).toLocaleString("en-GB")}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Section>
        </div>

        {/* Right column — actions */}
        <div className="space-y-4">
          <Section title="Package">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Plan</span>
                <span className="font-bold capitalize text-gray-900">{app.package ?? "Not set"}</span>
              </div>
              {app.wants_basic_shop && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Add-on</span>
                  <span className="font-semibold text-emerald-700">Basic Shop +£10/mo</span>
                </div>
              )}
              {app.coupon_code && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Coupon</span>
                  <span className="font-mono font-semibold text-indigo-700">{app.coupon_code}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">How found</span>
                <span className="font-medium text-gray-700">{app.how_found ?? "—"}</span>
              </div>
            </div>
          </Section>

          <Section title="Change Status">
            <StatusChanger applicationId={app.id} currentStatus={app.status} />
          </Section>

          <Section title="Timeline">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Applied</span>
                <span className="font-medium text-gray-900">{new Date(app.created_at).toLocaleDateString("en-GB")}</span>
              </div>
              {app.trial_start_at && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Trial started</span>
                  <span className="font-medium text-gray-900">{new Date(app.trial_start_at).toLocaleDateString("en-GB")}</span>
                </div>
              )}
              {app.trial_end_at && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Trial ends</span>
                  <span className="font-medium text-red-600">{new Date(app.trial_end_at).toLocaleDateString("en-GB")}</span>
                </div>
              )}
              {app.preview_approved_at && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Preview approved</span>
                  <span className="font-medium text-emerald-700">{new Date(app.preview_approved_at).toLocaleDateString("en-GB")}</span>
                </div>
              )}
            </div>
          </Section>

          {/* Generate brief button */}
          <div className="bg-indigo-50 rounded-2xl border border-indigo-100 p-5">
            <h3 className="font-bold text-indigo-900 mb-1">Generate Website Brief</h3>
            <p className="text-xs text-indigo-600 mb-3">Export all client answers as a structured build brief.</p>
            <a
              href={`/api/admin/applications/${app.id}/brief`}
              target="_blank"
              className="block text-center bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold py-2.5 px-4 rounded-full transition-all"
            >
              Download Brief →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
