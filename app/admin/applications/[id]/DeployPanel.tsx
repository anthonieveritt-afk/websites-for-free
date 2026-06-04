"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeployPanel({
  applicationId,
  currentPreviewUrl,
}: {
  applicationId: string;
  currentPreviewUrl?: string | null;
}) {
  const [deploying, setDeploying] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentPreviewUrl ?? null);
  const [error, setError] = useState<string | null>(null);
  const [log, setLog] = useState<string | null>(null);
  const router = useRouter();

  async function deploy() {
    setDeploying(true);
    setError(null);
    setLog("🔧 Generating website from client data...");

    try {
      const res = await fetch(`/api/admin/applications/${applicationId}/deploy`, {
        method: "POST",
      });
      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? "Deploy failed");
        setLog(null);
        setDeploying(false);
        return;
      }

      setPreviewUrl(json.url);
      setLog("✅ Site deployed successfully!");
      router.refresh();
    } catch (e) {
      setError("Network error — please try again");
      setLog(null);
    }

    setDeploying(false);
  }

  return (
    <div className="space-y-3">
      {previewUrl ? (
        <div className="space-y-3">
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
            <p className="text-xs font-bold text-emerald-700 mb-1">✅ Site Live</p>
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-emerald-600 underline break-all"
            >
              {previewUrl}
            </a>
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(previewUrl)}
            className="w-full text-xs border border-gray-200 text-gray-600 py-2 rounded-full hover:bg-gray-50 transition-all"
          >
            📋 Copy preview link
          </button>
          <button
            onClick={deploy}
            disabled={deploying}
            className="w-full text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 py-2 rounded-full hover:bg-indigo-100 transition-all font-semibold disabled:opacity-50"
          >
            {deploying ? "Redeploying…" : "🔄 Redeploy"}
          </button>
        </div>
      ) : (
        <button
          onClick={deploy}
          disabled={deploying}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold py-3 rounded-full transition-all text-sm"
        >
          {deploying ? "Building & Deploying…" : "🚀 Generate & Deploy Site"}
        </button>
      )}

      {log && (
        <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-700">
          {log}
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
          ⚠️ {error}
        </div>
      )}

      <p className="text-[10px] text-gray-400 text-center">
        Admin approval required before client sees this link.
      </p>
    </div>
  );
}
