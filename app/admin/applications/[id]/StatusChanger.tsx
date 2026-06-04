"use client";

import { useState } from "react";
import { ApplicationStatus, STATUS_LABELS } from "@/lib/types/application";
import { useRouter } from "next/navigation";

const ALL_STATUSES: ApplicationStatus[] = [
  "new_lead", "accepted", "in_design", "in_build",
  "waiting_for_client", "preview_sent", "trial_live",
  "active_subscriber", "trial_expired", "payment_failed", "cancelled",
];

export default function StatusChanger({
  applicationId,
  currentStatus,
}: {
  applicationId: string;
  currentStatus: ApplicationStatus;
}) {
  const [status, setStatus] = useState<ApplicationStatus>(currentStatus);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function save() {
    setSaving(true);
    await fetch(`/api/admin/applications/${applicationId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setSaving(false);
    router.refresh();
  }

  return (
    <div className="space-y-3">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
      >
        {ALL_STATUSES.map((s) => (
          <option key={s} value={s}>{STATUS_LABELS[s]}</option>
        ))}
      </select>
      <button
        onClick={save}
        disabled={saving || status === currentStatus}
        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-bold py-2.5 rounded-full transition-all"
      >
        {saving ? "Saving…" : "Update Status"}
      </button>
    </div>
  );
}
