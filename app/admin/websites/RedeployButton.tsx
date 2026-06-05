"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RedeployButton({ applicationId }: { applicationId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function redeploy() {
    setLoading(true);
    await fetch(`/api/admin/applications/${applicationId}/deploy`, { method: "POST" });
    setLoading(false);
    router.refresh();
  }

  return (
    <button onClick={redeploy} disabled={loading}
      className="text-xs bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 px-3 py-1.5 rounded-full transition-colors font-semibold disabled:opacity-50">
      {loading ? "…" : "🔄 Redeploy"}
    </button>
  );
}
