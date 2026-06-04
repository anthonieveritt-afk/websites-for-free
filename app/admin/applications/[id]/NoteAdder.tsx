"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NoteAdder({ applicationId }: { applicationId: string }) {
  const [body, setBody] = useState("");
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function submit() {
    if (!body.trim()) return;
    setSaving(true);
    await fetch(`/api/admin/applications/${applicationId}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body }),
    });
    setBody("");
    setSaving(false);
    router.refresh();
  }

  return (
    <div className="space-y-2">
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Add an internal note…"
        rows={3}
        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
      />
      <button
        onClick={submit}
        disabled={saving || !body.trim()}
        className="bg-gray-900 hover:bg-gray-800 disabled:opacity-40 text-white text-xs font-bold px-4 py-2 rounded-full transition-all"
      >
        {saving ? "Saving…" : "Add Note"}
      </button>
    </div>
  );
}
